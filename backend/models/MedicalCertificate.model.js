import mongoose from "mongoose";

const medicalCertificateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  files: [
    {
      type: String, // Cloudinary file URL
      required: true,
    },
  ],
}, { timestamps: true });

const MedicalCertificate = mongoose.model("MedicalCertificate", medicalCertificateSchema);

export default MedicalCertificate;