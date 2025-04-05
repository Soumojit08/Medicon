import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import bcrypt from "bcryptjs";
import configs from "../../configs/index.configs.js";
import clodinary from "../../services/cloudinary.js";
import fs from "fs";
import redis from "../../Redis/client.js";

const doctorSignUpController = async (req, res) => {
  try {
    const { name, email, phonenumber, password, specialization, registrationId, address, geoLocation } = req.body;

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

    // Generate a unique Redis key for checking if the doctor already exists
    const redisKey = `doctorExists:${email}:${phonenumber}:${registrationId}`;
    const cachedDoctor = await redis.get(redisKey);

    if (cachedDoctor) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor already exists! (from cache)",
      });
    }

    // Check if doctor already exists in the database
    const existingDoctor = await Models.DoctorModel.findOne({
      $or: [
        { email: email },
        { phonenumber: phonenumber },
        { registrationId: registrationId },
      ],
    });

    if (existingDoctor) {
      // Store the result in Redis cache with a short expiration (5 minutes)
      await redis.set(redisKey, JSON.stringify(existingDoctor), "EX", 300);

      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor already exists!",
      });
    }

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
          status: "Failed",
          message: "Something Went Wrong in Cloudinary!",
        });
      }
    }

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

    // Save to DB
    await newDoctor.save();

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
      status: "Failed",
      message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
};

export default doctorSignUpController;