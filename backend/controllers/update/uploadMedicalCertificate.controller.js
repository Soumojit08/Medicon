import MedicalCertificate from "../../models/MedicalCertificate.model.js";// Import model

const UploadMedicalCertificate = async (req, res) => {
  try {
    // 🔹 1️⃣ Check if files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // 🔹 2️⃣ Extract user ID (Assuming it's coming from authentication)
    const userId = req.user._id; // `req.user` should be set by auth middleware
    // console.log(userId)

    // 🔹 3️⃣ Extract file URLs from Cloudinary
    const fileUrls = req.files.map((file) => file.path); // Cloudinary provides the path

    // 🔹 4️⃣ Check if user already has medical certificates
    let userCertificates = await MedicalCertificate.findOne({ userId });

    if (userCertificates) {
      // If already exists, update it by pushing new files
      userCertificates.files.push(...fileUrls);
      await userCertificates.save();
    } else {
      // If not exists, create a new record
      userCertificates = new MedicalCertificate({
        userId,
        files: fileUrls,
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