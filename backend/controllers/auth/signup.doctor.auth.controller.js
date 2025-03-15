import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import bcrypt from "bcryptjs"
import configs from "../../configs/index.configs.js";
import clodinary from "../../services/cloudinary.js";
import fs from "fs";

const doctorSignUpController = async (req, res) => {
    try {
        const { name, email, phonenumber, password, specialization, registrationId, location } = req.body;
        // console.log(req.body);

        if (!name || !email || !phonenumber || !password || !specialization || !registrationId || !location) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: "Please enter all required fields!"
            });
        }
        // console.log("Check 1");

        // Check if doctor already exists
        const existingDoctor = await Models.DoctorModel.findOne({
            $or: [
                { email: email },
                { phonenumber: phonenumber },
                { registrationId: registrationId }
            ]
        });
        // console.log("Check 2");

        if (existingDoctor) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: "Doctor already exists!"
            });
        }
        // console.log("Check 3");

        // Hash password
        const hashed_password = await bcrypt.hash(password, Number(configs.SALT));

        // Upload profile picture to Cloudinary
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
        // console.log("Check 4")

        // Create new doctor instance
        const newDoctor = new Models.DoctorModel({
            name,
            email,
            phonenumber,
            password: hashed_password,
            profilepic: profileimage_url,
            specialization,
            registrationId,
            address: location,
        });
        // console.log("Check 5", newDoctor);

        // Save to DB
        await newDoctor.save();
        // console.log("Check 6")

        return res.status(StatusCodes.CREATED).json({
            status: 'OK',
            message: "New Doctor Created Successfully!",
            data: newDoctor
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default doctorSignUpController;