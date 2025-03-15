import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import Schedule from "../../models/Schedule.model.js";

const updateDoctorSchedule = async function (req, res, next) {
  try {
    const doctorId = req.user?.id || req.doctor?._id;

    if (!doctorId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "Failed",
        message: "Doctor ID not found in request",
      });
    }

    const scheduleData = {
      doctorId,
      schedules: req.body,
      lastUpdated: new Date(),
    };

    const updatedSchedule = await Schedule.findOneAndUpdate(
      { doctorId: doctorId },
      scheduleData,
      {
        new: true,
      }
    );

    return res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Schedule updated successfully",
      data: updatedSchedule,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Error updating schedule",
      error: err.message,
    });
  }
};

export default updateDoctorSchedule;
