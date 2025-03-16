import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const getUserByIdController = async (req, res) => {
    try {
        const id = req.params['id'];
        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: "id is required!",
            });
        }
        try {
            const User = await Models.UserModel.findById(id).select("-password");
            return res.status(StatusCodes.OK).json({
                status: 'OK',
                message: `User with id: ${id}`,
                data: User
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: "Invalid Id!"
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default getUserByIdController;