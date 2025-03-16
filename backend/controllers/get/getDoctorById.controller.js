import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const getDoctorsByIdController = async (req, res) => {
    try {
        const id = req.params['id'];
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: "id is required!"
            });
        }
        const doctorData = await Models.DoctorModel.findById(id).select("-password");
        return res.status(StatusCodes.OK).json({
            status: 'OK',
            message: `Doctor with id: ${id}`,
            data: doctorData
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default getDoctorsByIdController;
