import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import bcrypt from "bcryptjs"
import configs from "../../configs/index.configs.js";
import clodinary from "../../services/cloudinary.js";
import fs from "fs";

const userSignUpController = async (req, res) => {
    try {
        let { name, email, phonenumber, password } = req.body;
        if (!name || !email || !phonenumber || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "Failed",
                message: "Please enter all required fields!"
            });
        }

        // Check user is exist or not through email...
        const User = await Models.UserModel.findOne({ email: email });
        if (User && User !== null) {
            return res.status(StatusCodes.CONFLICT).json({
                status: "Failed",
                message: "User is already exist!"
            });
        }

        // Hash the password...
        const hashed_password = await bcrypt.hash(password, Number(configs.SALT));

        // Save profile image...
        let profileimage_url = "";
        if (req.file) {
            try {
                let uploadImageUrl = await clodinary.uploader.upload(req.file.path);
                fs.unlinkSync(req.file.path);
                profileimage_url = uploadImageUrl.secure_url;
            } catch (error) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'Failed',
                    message: "Something Went Wrong in Cloudinary!"
                });
            }
        }

        let newUser = new Models.UserModel({
            name: name,
            email: email,
            phonenumber: phonenumber,
            password: hashed_password,
            profilepic: profileimage_url
        });

        await newUser.save();
        return res.status(StatusCodes.CREATED).json({
            status: "OK",
            message: "Successfully Signed Up!",
            data: newUser
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default userSignUpController;