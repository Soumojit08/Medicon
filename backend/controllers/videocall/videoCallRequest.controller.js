import { getReasonPhrase, StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Models from "../../models/index.models.js";
import configs from "../../configs/index.configs.js";

const videoCallRequestController = async (req, res) => {
  try {
    const { doctorId, isBusy } = req.body;

    if (!doctorId || isBusy === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor ID and isBusy status are required",
      });
    }

    const doctor = await Models.DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "Failed",
        message: "Doctor not found",
      });
    }

    // Update isBusy status
    doctor.isBusy = isBusy;
    await doctor.save();

    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: `Doctor is now ${isBusy ? "busy" : "available"}`,
    });
  } catch (error) {
    console.error("Video Call Request Error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

export default videoCallRequestController