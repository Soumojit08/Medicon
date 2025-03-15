import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const getAllUsers = async (req, res) => {
    try {
        const { userid } = req.body;
        if (userid) {
            try {
                const Users = await Models.UserModel.find({ _id: userid }).select("-password");
                return res.status(StatusCodes.OK).json({
                    status: 'OK',
                    data: Users
                });
            } catch (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'Failed',
                    message: "Please enter a valid user id!"
                });
            }
        }
        const Users = await Models.UserModel.find().select("-password");
        return res.status(StatusCodes.OK).json({
            status: 'OK',
            data: Users
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default getAllUsers;