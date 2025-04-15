import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "error",
        message:
          "Invalid status. Must be one of: pending, confirmed, cancelled",
      });
    }

    const appointment = await Models.AppointmentModel.findById(appointmentId)
      .populate("userId", "name email")
      .populate("doctorId", "name email");

    if (!appointment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Appointment not found",
      });
    }

    appointment.status = status;
    await appointment.save();

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Appointment status updated successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Failed to update appointment status",
      error: error.message,
    });
  }
};

export default updateAppointmentStatus;
