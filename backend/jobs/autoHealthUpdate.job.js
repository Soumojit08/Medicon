import cron from "node-cron";
import mongoose from "mongoose";
import Models from "../models/index.models.js";

// Utility: Generate Random Health Values
const generateRandomHealthData = () => {
  return {
    heartRateData: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // 60-100 bpm
    spO2Data: Math.floor(Math.random() * (100 - 90 + 1)) + 90, // 90-100%
    bpData: {
      systolic: Math.floor(Math.random() * (130 - 110 + 1)) + 110, // 110-130 mmHg
      diastolic: Math.floor(Math.random() * (90 - 70 + 1)) + 70, // 70-90 mmHg
    },
  };
};

// User IDs to Update
const targetUserIds = [
  new mongoose.Types.ObjectId("680a709ea27cbc948cb00572"),
  new mongoose.Types.ObjectId("680b19d65c7b105178d4e73f"),
];

const autoHealthUpdate = async () => {
  try {
    for (const userId of targetUserIds) {
      const data = generateRandomHealthData();

      const updated = await Models.HealthModel.findOneAndUpdate(
        { user: userId },
        {
          $set: {
            heartRateData: data.heartRateData,
            spO2Data: data.spO2Data,
            bpData: {
              systolic: data.bpData.systolic,
              diastolic: data.bpData.diastolic,
            },
          },
        },
        { new: true, upsert: true }
      );

      console.log(`✅ Updated health data for user ${userId}:`);
    }
  } catch (err) {
    console.error("❌ Error updating health data:", err.message);
  }
};

// ⏱️ Run every 20 seconds
cron.schedule("*/20 * * * * *", autoHealthUpdate);

export default autoHealthUpdate;