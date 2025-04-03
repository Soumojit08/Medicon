import { getReasonPhrase, StatusCodes } from "http-status-codes"
import Models from "../../models/index.models.js";

const getCertificateController = async (req, res) => {
    try {
        const userId = req.user._id;
        if(!userId){
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: getReasonPhrase(StatusCodes.BAD_REQUEST)
            });
        }
        const certificates = await Models.MedicalCertificateModel.findOne({userId: userId});
        if(!certificates || certificates == null) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'Failed',
                message: "No Certificate Found!"
            });
        }
        return res.status(StatusCodes.OK).json({
            status: 'OK',
            message: `${userId}'s Certificates!`,
            data: certificates
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default getCertificateController;