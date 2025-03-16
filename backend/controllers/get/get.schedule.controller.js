import { StatusCodes } from "http-status-codes";
import Schedule from "../../models/Schedule.model.js";

const getDoctorSchedule = async function (req, res, next) {
  try {
    // console.log("Controller: Fetching doctor schedule...");
    const doctorId = req.query.doctorId || req.user?.id || req.doctor?._id;

    if (!doctorId) {
      // console.log("Controller: Doctor ID not found in request!");
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "Failed",
        message: "Doctor ID not found in request",
      });
    }

    // console.log("Controller: Doctor ID:", doctorId);
    const schedule = await Schedule.findOne({ doctorId });

    if (!schedule) {
      // console.log("Controller: No schedule found for doctor ID:", doctorId);
      return res.status(StatusCodes.OK).json({
        status: "Success",
        message: "No schedule found",
        data: null,
      });
    }

    // console.log("Controller: Schedule fetched successfully for doctor ID:", doctorId);
    return res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Schedule fetched successfully",
      data: schedule,
    });
  } catch (err) {
    // console.error("Controller: Error fetching schedule:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Error fetching schedule",
      error: err.message,
    });
  }
};

export default getDoctorSchedule;
