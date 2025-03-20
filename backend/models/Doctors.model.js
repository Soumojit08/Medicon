import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    required: false,
  },
  specialization: {
    type: [String],
    enum: [
      "General Physician",
      "Cardiology",
      "Dermatology",
      "Endocrinology",
      "Gastroenterology",
      "Hematology",
      "Neurology",
      "Nephrology",
      "Oncology",
      "Ophthalmology",
      "Orthopedics",
      "Otolaryngology (ENT)",
      "Pediatrics",
      "Psychiatry",
      "Pulmonology",
      "Radiology",
      "Rheumatology",
      "Surgery",
      "Urology",
      "Gynecology",
      "Dentistry",
      "Anesthesiology",
    ],
    required: true,
  },
  registrationId: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  languages: {
    type: [String],
    default: ["English"],
  },
  education: {
    type: String,
  },
  consultationFee: {
    type: Number,
    default: 0,
  },
  facts: {
    type: String,
    default:
      "Each patient is a story waiting to be heard—listen with compassion, heal with expertise.",
  },
});

// Add geospatial index for location-based queries
DoctorSchema.index({ geoLocation: "2dsphere" });

const Doctor = mongoose.model('Doctor', DoctorSchema);

export default Doctor;