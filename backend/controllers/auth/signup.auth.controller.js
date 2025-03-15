/**
 * Signup controller
 */

import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import bcrypt from "bcryptjs"
import configs from "../../configs/index.configs.js";
import clodinary from "../../services/cloudinary.js";
import fs from "fs";

const signupController = async (req, res, next) => {
    try {
        let role = typeof req.body.role === "string" ? req.body.role.toLowerCase() : "";

        if (role === 'doctor') {
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

        } else if (role === 'user') {
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
        }

        // If role is not doctor
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'Failed',
            message: "Not a valid role, Please set the role as 'doctor' or 'user'"
        });

    } catch (error) {
        // console.error("Signup Error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: "Internal Server Error"
        });

    }
};

export default signupController;