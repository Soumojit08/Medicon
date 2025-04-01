import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../db.js";
import Schedule from "../models/Schedule.model.js";
import Doctor from "../models/Doctors.model.js";

dotenv.config();

const updateDoctors = async () => {
    try {

    } catch (error) {
        console.error("❌ Error seeding doctors:", error);
        process.exit(1);
    }
}