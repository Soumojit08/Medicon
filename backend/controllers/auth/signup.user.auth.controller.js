import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import bcrypt from "bcryptjs"
import configs from "../../configs/index.configs.js";
import clodinary from "../../services/cloudinary.js";
import fs from "fs";
import sendMail from "../../services/sendMail.js";

const userSignUpController = async (req, res) => {
    try {
        let { name, email, phonenumber, password, geoLocation } = req.body;
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
            profilepic: profileimage_url,
            geoLocation: geoLocation
        });

        const emailData = {
            to: email,
            subject: "Welcome to Medicon - Your Smart Health Companion",
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Medicon</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    .content {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    h1 {
                        color: #333333;
                    }
                    p {
                        color: #666666;
                    }
                    .button {
                        display: inline-block;
                        padding: 10px 20px;
                        margin-top: 20px;
                        background-color: #007BFF;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #999999;
                        font-size: 12px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="content">
                        <h1>Welcome to Medicon!</h1>
                        <p>Dear ${name},</p>
                        <p>Thank you for signing up for <strong>Medicon</strong>, your smart health appointment booking system.</p>
                        <p>With Medicon, you can:</p>
                        <ul style="text-align: left;">
                            <li>📅 Book appointments with top doctors easily.</li>
                            <li>💬 Chat with doctors for quick consultations.</li>
                            <li>📹 Experience seamless one-to-one video calls.</li>
                            <li>🤖 Get instant health advice from our AI-powered chatbot.</li>
                        </ul>
                        <p>We are excited to have you onboard and look forward to supporting your healthcare needs.</p>
                        <a href="https://medicon.onrender.com" class="button">Start Your Journey</a>
                        <div class="footer">
                            <p>&copy; 2024 Medicon. All rights reserved.</p>
                            <p>Medicon HealthTech Pvt Ltd, 123 Wellness Avenue, HealthCity, HC 56789</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>`
        };

        await sendMail(emailData, (error, info) => {
            if (error) {
                console.log("Mail Sending Error: " + error);
            } else {
                console.log("Mail Sent: " + info);
            }
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