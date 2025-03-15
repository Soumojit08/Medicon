import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const userDashboardController = async (req, res) => {
  try {
    const doctors = await Models.DoctorModel.find().select("-password");
    return res.render("patientDashboard", {
      user: req.user,
      doctors: doctors,
    });
  } catch (error) {
    return res.render("errorpage", {
      errorMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
};

export default userDashboardController;