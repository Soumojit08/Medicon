import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const getAllDoctoreBySpec = async (req, res, next) => {
    try {
        const { specialization, isVerified } = req.body;
        if (isVerified) {
            const doctors = await Models.DoctorModel.find({ specialization: specialization, isVerified: true }).select("-password");
            return res.status(StatusCodes.OK).json({
                status: 'OK',
                data: doctors
            });
        }
        const doctors = await Models.DoctorModel.find({ specialization: specialization }).select("-password");
        return res.status(StatusCodes.OK).json({
            status: 'OK',
            data: doctors
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: "Internal Server Error!"
        });
    }
}

export default getAllDoctoreBySpec;