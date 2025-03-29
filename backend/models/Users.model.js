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
<<<<<<< HEAD
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/035/066/209/non_2x/user-avatar-male-illustration-design-free-png.png"
    }
}, { timestamps: true });
=======
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
>>>>>>> 85ca1fd5be43ac107d69be98df0e25ce40f06d74

const User = mongoose.model('User', UserSchema);

export default User;