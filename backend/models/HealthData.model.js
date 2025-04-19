import mongoose from "mongoose";

const HealthSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bpData: {
        type: Number,
        required: true
    },
    spO2Data: {
        type: Number,
        required: true
    },
    heartRateData: {
        systolic: {
            type: Number,
            required: true
        },
        diastolic: {
            type: Number,
            required: true
        }
    }
}, {
    timestamps: true
});

const Health = mongoose.model("Health", HealthSchema);

export default Health;