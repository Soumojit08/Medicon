import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import bcrypt from "bcryptjs"
import configs from "../../configs/index.configs.js";
import clodinary from "../../services/cloudinary.js";
import fs from "fs";
import sendMail from "../../services/sendMail.js";
import MailTemplates from "../../utils/index.utils.js";

const userSignUpController = async (req, res) => {
  try {
    let { name, email, phonenumber, password, geoLocation, secNumber } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !phonenumber ||
      !password ||
      !secNumber ||
      !geoLocation
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Please enter all required fields including location!",
      });
    }

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
        message: "Invalid location format. Please enable location services.",
      });
    }

    // Check if the user already exists
    const redisKey = `userExists:${email}`;
    const cachedUser = await redis.get(redisKey);

    if (cachedUser) {
      return res.status(StatusCodes.CONFLICT).json({
        status: "Failed",
        message: "User already exists! (from cache)",
      });
    }

    // If not in cache, check the database
    const User = await Models.UserModel.findOne({ email: email });
    if (User) {
      // Store the result in Redis cache with a short expiration
      await redis.set(redisKey, JSON.stringify(User), "EX", 300); // Cache for 5 minutes
      return res.status(StatusCodes.CONFLICT).json({
        status: "Failed",
        message: "User already exists!",
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
          status: "Failed",
          message: "Something Went Wrong in Cloudinary!",
        });
      }
    }

    let newUser = new Models.UserModel({
      name: name,
      email: email,
      phonenumber: phonenumber,
      password: hashed_password,
      profilepic: profileimage_url,
      geoLocation: {
        type: "Point",
        coordinates: [longitude, latitude], // MongoDB expects [longitude, latitude]
      },
      secNumber: secNumber,
    });

    const emailData = MailTemplates.SignUpMailContent({
      email: email,
      name: name,
      subject: "Welcome to Medicon",
    });

    console.log("Email Data:", emailData);

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
      data: newUser,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Failed',
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
}

export default userSignUpController;