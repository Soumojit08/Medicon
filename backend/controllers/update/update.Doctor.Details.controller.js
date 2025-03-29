import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const updateDoctorDetailsController = async (req, res, next) => {
  try {
    const doctorId = req.user?.id || req.doctor?._id;
    console.log("Doctor ID:", doctorId);

    if (!doctorId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "Failed",
        message: "Doctor ID not found in request",
      });
    }

    const updatedDetails = { ...req.body };

    // ✅ Convert consultationFee to number safely
    if (updatedDetails.consultationFee !== undefined) {
      const fee = Number(
        String(updatedDetails.consultationFee).replace(/[^0-9.-]+/g, "")
      );
      if (isNaN(fee)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: "Failed",
          message: "Invalid consultation fee value",
        });
      }
      updatedDetails.consultationFee = fee;
    }

    // ✅ Convert experience to a number
    if (updatedDetails.experience !== undefined) {
      const exp = Number(updatedDetails.experience);
      if (isNaN(exp)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          status: "Failed",
          message: "Invalid experience value",
        });
      }
      updatedDetails.experience = exp;
    }

    // ✅ Ensure education is a string
    if (updatedDetails.education !== undefined) {
      updatedDetails.education = String(updatedDetails.education);
    }

    // ✅ Ensure specialization & languages are arrays
    if (updatedDetails.languages && !Array.isArray(updatedDetails.languages)) {
      updatedDetails.languages = [updatedDetails.languages];
    }

    if (
      updatedDetails.specialization &&
      !Array.isArray(updatedDetails.specialization)
    ) {
      updatedDetails.specialization = [updatedDetails.specialization];
    }

    // ✅ Update in database
    const updatedDoctorDetails = await Models.DoctorModel.findByIdAndUpdate(
      doctorId,
      { $set: updatedDetails },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDoctorDetails) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "Failed",
        message: "Doctor not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Doctor details updated successfully",
      data: updatedDoctorDetails,
    });
  } catch (error) {
    console.error("Update Doctor Error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default updateDoctorDetailsController;
