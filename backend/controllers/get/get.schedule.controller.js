import { StatusCodes } from "http-status-codes";
import Schedule from "../../models/Schedule.model.js";

const getDoctorSchedule = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { date } = req.query;

    if (!doctorId || !date) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor ID and date are required.",
      });
    }

    const schedule = await Schedule.findOne({ doctorId });

    if (!schedule) {
      return res.status(StatusCodes.OK).json({
        status: "Success",
        message: "No schedule found for the specified doctor.",
        data: { schedules: [] },
      });
    }

    const availableSlots = schedule.schedules[date] || [];
    return res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Schedule fetched successfully.",
      data: { schedules: availableSlots },
    });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Error fetching schedule.",
    });
  }
};

export default getDoctorSchedule;