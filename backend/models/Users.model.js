import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
    },
    geoLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    secNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Add geospatial index for location-based queries
UserSchema.index({ geoLocation: "2dsphere" });

const User = mongoose.model('User', UserSchema);

export default User;