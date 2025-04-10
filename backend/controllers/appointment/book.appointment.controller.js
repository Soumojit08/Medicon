import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

// Helper function to check slot conflict
const isTimeConflict = (start1, end1, start2, end2) => {
  return start1 < end2 && start2 < end1;
};

const bookAppointmentController = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { doctorId, date, startTime, endTime } = req.body;
    const userId = req.user._id;

    if (!doctorId || !userId || !date || !startTime || !endTime) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor ID, User ID, Date, Start Time, and End Time are required.",
      });
    }

    const appointmentDate = new Date(date);
    const dayOfWeek = appointmentDate.toLocaleString("en-US", { weekday: "long" });

    const doctor = await Models.DoctorModel.findById(doctorId).session(session);
    if (!doctor) {
      await session.abortTransaction();
      session.endSession();
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Doctor not found" });
    }

    const user = await Models.UserModel.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    const schedule = await Models.ScheduleModel.findOne({ doctorId }).session(session);
    if (!schedule || !schedule.schedules[dayOfWeek] || !schedule.schedules[dayOfWeek].enabled) {
      await session.abortTransaction();
      session.endSession();
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Doctor is not available on this day." });
    }

    const slotAvailable = schedule.schedules[dayOfWeek].slots.some(slot => {
      return slot.start === startTime && slot.end === endTime;
    });

    if (!slotAvailable) {
      await session.abortTransaction();
      session.endSession();
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Selected time slot is not available." });
    }

    // Check for existing appointment conflicts
    const existing = await Models.AppointmentModel.findOne({
      doctorId,
      date: appointmentDate,
      status: { $ne: "cancelled" },
      $or: [
        {
          $and: [
            { startTime: { $lt: endTime } },
            { endTime: { $gt: startTime } },
          ],
        },
      ],
    }).session(session);

    if (existing) {
      await session.abortTransaction();
      session.endSession();
      return res.status(StatusCodes.CONFLICT).json({
        status: "Failed",
        message: "Time slot is already booked.",
      });
    }

    const newAppointment = new Appointment({
      doctorId,
      userId,
      date: appointmentDate,
      startTime,
      endTime,
      status: "pending",
    });

    await newAppointment.save({ session });
    await session.commitTransaction();
    session.endSession();

    return res.status(StatusCodes.CREATED).json({
      message: "Appointment booked successfully.",
      appointment: newAppointment,
    });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error("Booking error:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong.",
      error: err.message,
    });
  }
};

export default bookAppointmentController;