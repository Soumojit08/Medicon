import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, userId, date } = req.body;

    // Validate required fields
    if (!doctorId || !userId || !date) {
      console.error("Validation Error: Missing required fields");
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor ID, user ID, and date are required.",
      });
    }

    // Debugging logs
    console.log("Booking appointment with data:", { doctorId, userId, date });

    // Check if doctor exists
    const doctor = await Models.DoctorModel.findById(doctorId);
    if (!doctor) {
      console.error("Doctor not found:", doctorId);
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "Failed",
        message: "Doctor not found.",
      });
    }

    // Check if user exists
    const user = await Models.UserModel.findById(userId);
    if (!user) {
      console.error("User not found:", userId);
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "Failed",
        message: "User not found.",
      });
    }

    // Create the appointment
    const newAppointment = new Models.AppointmentModel({
      doctorId,
      userId,
      date,
      status: "pending",
    });

    // Save the appointment to the database
    await newAppointment.save();

    console.log("Appointment saved successfully:", newAppointment);

    return res.status(StatusCodes.CREATED).json({
      status: "OK",
      message: "Appointment booked successfully!",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "An error occurred while booking the appointment.",
      error: error.message, // Include error details for debugging
    });
  }
};

export default bookAppointment;
