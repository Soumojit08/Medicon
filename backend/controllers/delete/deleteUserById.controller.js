import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const deleteUserByIdController = async (req, res) => {
    try {
        const { userid } = req.body;
        if (!userid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: "Please provide the user id!"
            });
        }
        try {
            await Models.UserModel.findByIdAndDelete(userid);
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "OK",
                message: "User deleted!"
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: `${userid} is not a valid user's id!`
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default deleteUserByIdController;