import { getReasonPhrase, StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Models from "../../models/index.models.js";
import configs from "../../configs/index.configs.js";

const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.BAD_REQUEST) });
        }

        // Check if user or not...
        const User = await Models.UserModel.findOne({ email: email });
        if (User && User !== null) {
            // Check Password...
            const hashed_password = User.password;
            const isPasswordMatch = await bcrypt.compare(password, hashed_password);
            if (isPasswordMatch) {
                const playLoad = {
                    name: User.name,
                    email: User.email,
                    role: "user",
                };
                const token = await JWT.sign(playLoad, configs.JWT_SECRET, { expiresIn: '1h' });

                return res.status(StatusCodes.OK).json({
                    status: 'OK',
                    message: "Successfully logged in",
                    token: token,
                    data: {
                        name: playLoad.name,
                        email: playLoad.email,
                        role: playLoad.role,
                    }
                });
            }

            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: 'Failed',
                message: "Unauthorized",
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default userLoginController;