import { getReasonPhrase, StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Models from "../../models/index.models.js";
import configs from "../../configs/index.configs.js";

const doctorLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            // return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.BAD_REQUEST) });
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: "All fields are required!"
            });
        }
        
        const Doctor = await Models.DoctorModel.findOne({ email: email });
        if (Doctor && Doctor !== null) {
            // Validate Password...
            const isValidPassword = await bcrypt.compare(password, Doctor.password);
            if (isValidPassword) {
                const playLoad = {
                    _id: Doctor._id,
                    name: Doctor.name,
                    email: Doctor.email,
                    RegId: Doctor.registrationId,
                    isVerified: Doctor.isVerified,
                    specialization: Doctor.specialization,
                    profileimage: Doctor.profilepic,
                    address: Doctor.address,
                    role: "doctor",
                };
                // Create token...
                const token = await JWT.sign(playLoad, configs.JWT_SECRET);
                // return res.cookie('doctortoken', token).redirect('/doctorDash');
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
            // return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
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

export default doctorLoginController;