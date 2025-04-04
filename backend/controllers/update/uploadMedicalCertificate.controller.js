import MedicalCertificate from "../../models/MedicalCertificate.model.js"; // Import model

const UploadMedicalCertificate = async (req, res) => {
  try {
    // 🔹 1️⃣ Check if files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // 🔹 2️⃣ Extract user ID (Assuming it's coming from authentication)
    const userId = req.user._id; // `req.user` should be set by auth middleware

    // 🔹 3️⃣ Extract file details (filename and secure_url)
    const fileDetails = req.files.map((file) => {
      if (!file.mimetype.includes("pdf")) {
        throw new Error("Only PDF files are allowed");
      }
      return {
        filename: req.body.filename || file.originalname, // Use provided filename or fallback to original name
        fileURL: file.secure_url || file.path, // Fallback to `file.path` if `secure_url` is unavailable
      };
    });

    // 🔹 4️⃣ Check if user already has medical certificates
    let userCertificates = await MedicalCertificate.findOne({ userId });

    if (userCertificates) {
      // If already exists, update it by pushing new files
      userCertificates.files.push(...fileDetails);
      await userCertificates.save();
    } else {
      // If not exists, create a new record
      userCertificates = new MedicalCertificate({
        userId,
        files: fileDetails,
      });
      await userCertificates.save();
    }

    // 🔹 5️⃣ Return success response
    return res.status(201).json({
      success: true,
      message: "Medical certificates uploaded successfully",
      data: userCertificates,
    });
  } catch (error) {
    console.error("Error uploading medical certificate:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default UploadMedicalCertificate;