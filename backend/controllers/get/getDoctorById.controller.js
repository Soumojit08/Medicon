import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Models.DoctorModel.findById(doctorId);

    if (!doctor) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      status: "OK",
      data: doctor,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Server error",
      error: error.message,
    });
  }
};

export default getDoctorById;
