import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const getAllDoctors = async (req, res, next) => {
    try {
        const { isVerified } = req.body;
        if(req.query.search){
            const doctors = await Models.DoctorModel.find({specialization: { $regex: req.query.search, $options: "i" }}).select("-password");
            return res.status(StatusCodes.OK).json({
                status: 'OK',
                message: "All Doctors",
                data: doctors
            });
        }
        if (isVerified) {
            const doctors = await Models.DoctorModel.find({ isVerified: true }).select("-password");
            return res.status(StatusCodes.OK).json({
                status: 'OK',
                message: "All verified Doctors!",
                data: doctors
            });
        }
        const doctors = await Models.DoctorModel.find().select("-password");
        return res.status(StatusCodes.OK).json({
            status: 'OK',
            message: "All Doctors",
            data: doctors
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: "Internal Server Error!"
        });
    }
}

export default getAllDoctors;