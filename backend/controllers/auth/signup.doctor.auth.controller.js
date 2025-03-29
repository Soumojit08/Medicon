import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import bcrypt from "bcryptjs"
import configs from "../../configs/index.configs.js";
import clodinary from "../../services/cloudinary.js";
import fs from "fs";

const doctorSignUpController = async (req, res) => {
    try {
        const { name, email, phonenumber, password, specialization, registrationId, address, geoLocation } = req.body;
        // console.log(req.body);

        if (
          !name ||
          !email ||
          !phonenumber ||
          !password ||
          !specialization ||
          !registrationId ||
          !address ||
          !geoLocation
        ) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            status: "Failed",
            message: "Please enter all required fields including location!",
          });
        }
        // console.log("Check 1");

        // Validate and convert geolocation to GeoJSON format
        const [latitude, longitude] = geoLocation.split(",").map(Number);
        if (
          isNaN(latitude) ||
          isNaN(longitude) ||
          latitude < -90 ||
          latitude > 90 ||
          longitude < -180 ||
          longitude > 180
        ) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            status: "Failed",
            message:
              "Invalid location format. Please enable location services.",
          });
        }

        // Check if doctor already exists
        const existingDoctor = await Models.DoctorModel.findOne({
          $or: [
            { email: email },
            { phonenumber: phonenumber },
            { registrationId: registrationId },
          ],
        });
        // console.log("Check 2");

        if (existingDoctor) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            status: "Failed",
            message: "Doctor already exists!",
          });
        }
        // console.log("Check 3");

        // Hash password
        const hashed_password = await bcrypt.hash(
          password,
          Number(configs.SALT)
        );

        // Upload profile picture to Cloudinary
        let profileimage_url = "";
        if (req.file) {
          try {
            let uploadImageUrl = await clodinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);
            profileimage_url = uploadImageUrl.secure_url;
          } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
              status: "Failed",
              message: "Something Went Wrong in Cloudinary!",
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
          address,
          geoLocation: {
            type: "Point",
            coordinates: [longitude, latitude], // MongoDB expects [longitude, latitude]
          },
        });
        // console.log("Check 5", newDoctor);

        // Send Mail...
        // const emailData = {
        //     to: email,
        //     subject: "Welcome to Medicon - Join Our Doctor Network",
        //     html: `
        //     <!DOCTYPE html>
        //     <html lang="en">
        //     <head>
        //         <meta charset="UTF-8">
        //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //         <title>Welcome to Medicon</title>
        //         <style>
        //             body {
        //                 font-family: Arial, sans-serif;
        //                 background-color: #f4f4f4;
        //                 margin: 0;
        //                 padding: 0;
        //             }
        //             .container {
        //                 width: 100%;
        //                 padding: 20px;
        //                 background-color: #f4f4f4;
        //             }
        //             .content {
        //                 max-width: 600px;
        //                 margin: 0 auto;
        //                 background-color: #ffffff;
        //                 padding: 20px;
        //                 border-radius: 8px;
        //                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        //                 text-align: center;
        //             }
        //             h1 {
        //                 color: #333333;
        //             }
        //             p {
        //                 color: #666666;
        //             }
        //             .button {
        //                 display: inline-block;
        //                 padding: 10px 20px;
        //                 margin-top: 20px;
        //                 background-color: #28a745;
        //                 color: #ffffff;
        //                 text-decoration: none;
        //                 border-radius: 5px;
        //             }
        //             .footer {
        //                 text-align: center;
        //                 margin-top: 20px;
        //                 color: #999999;
        //                 font-size: 12px;
        //             }
        //         </style>
        //     </head>
        //     <body>
        //         <div class="container">
        //             <div class="content">
        //                 <h1>Welcome to Medicon, Dr. ${name}!</h1>
        //                 <p>We are thrilled to have you as a part of our expert doctor network.</p>
        //                 <p>With <strong>Medicon</strong>, you can:</p>
        //                 <ul style="text-align: left;">
        //                     <li>📅 Manage and schedule patient appointments seamlessly.</li>
        //                     <li>💬 Communicate with patients through secure chat.</li>
        //                     <li>📹 Offer virtual consultations via high-quality video calls.</li>
        //                     <li>🤖 Leverage AI-powered chatbot assistance for patient inquiries.</li>
        //                 </ul>
        //                 <p>Thank you for joining Medicon and making healthcare more accessible!</p>
        //                 <a href="https://medicon.onrender.com/doctor-dashboard" class="button">Go to Your Dashboard</a>
        //                 <div class="footer">
        //                     <p>&copy; 2024 Medicon. All rights reserved.</p>
        //                     <p>Medicon HealthTech Pvt Ltd, 123 Wellness Avenue, HealthCity, HC 56789</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </body>
        //     </html>`
        // };

        // await sendMail(emailData, (error, info) => {
        //     if (error) {
        //         console.log("Mail Sending Error: " + error);
        //     } else {
        //         console.log("Mail Sent: " + info);
        //     }
        // });

        // Save to DB
        await newDoctor.save();
        // console.log("Check 6")

        return res.status(StatusCodes.CREATED).json({
          status: "OK",
          message: "Successfully Signed Up!",
          data: {
            name: newDoctor.name,
            email: newDoctor.email,
            specialization: newDoctor.specialization,
            registrationId: newDoctor.registrationId,
            address: newDoctor.address,
            geoLocation: newDoctor.geoLocation,
          },
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default doctorSignUpController;