import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import sendMail from "../../services/sendMail.js";
import redis from "../../Redis/client.js";

const verifyDoctorController = async (req, res) => {
  try {
    const { doctorId, isVerified } = req.body;

    // Validate required fields
    if (!doctorId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor ID is required!",
      });
    }

    // Find and update the doctor
    const updatedDoctor = await Models.DoctorModel.findByIdAndUpdate(
      doctorId,
      { isVerified },
      { new: true }
    ).select("-password");

    if (!updatedDoctor) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "Failed",
        message: `Doctor with ID ${doctorId} not found!`,
      });
    }

    // Generate a unique Redis key for the doctor's details
    const redisKey = `doctorDetails:${doctorId}`;

    if (isVerified) {
      // Update the cache with the verified doctor's details
      await redis.set(redisKey, JSON.stringify(updatedDoctor), "EX", 3600); // Cache for 1 hour
    } else {
      // Invalidate the cache if the doctor is rejected
      await redis.del(redisKey);
    }

    // Send verification email if the doctor is verified
    if (isVerified) {
      const emailData = {
        to: updatedDoctor.email,
        subject: "Your Medicon Account is Now Verified 🎉",
        html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Medicon Verification Success</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 100%;
                            padding: 20px;
                            background-color: #f4f4f4;
                        }
                        .content {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
                        h1 {
                            color: #333333;
                        }
                        p {
                            color: #666666;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            margin-top: 20px;
                            background-color: #28a745;
                            color: #ffffff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                            color: #999999;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="content">
                            <h1>🎉 Congratulations, Dr. ${updatedDoctor.name}!</h1>
                            <p>Your Medicon account has been successfully verified by our admin team.</p>
                            <p>You can now start consulting with patients, managing appointments, and providing expert healthcare services.</p>
                            <p>🚀 <strong>Next Steps:</strong></p>
                            <ul style="text-align: left;">
                                <li>✅ Log in to your Medicon dashboard.</li>
                                <li>📅 Manage patient appointments efficiently.</li>
                                <li>💬 Chat and video call with patients for seamless consultations.</li>
                                <li>🤖 Use the AI chatbot to enhance patient interactions.</li>
                            </ul>
                            <p>Click the button below to access your doctor portal:</p>
                            <a href="https://medicon.onrender.com/doctor-dashboard" class="button">Go to Dashboard</a>
                            <div class="footer">
                                <p>&copy; 2024 Medicon. All rights reserved.</p>
                                <p>Medicon HealthTech Pvt Ltd, 123 Wellness Avenue, HealthCity, HC 56789</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>`,
      };
      await sendMail(emailData, (error, info) => {
        if (error) {
          console.log("Mail Sending Error: " + error);
        } else {
          console.log("Mail Sent: " + info);
        }
      });
    }

    return res.status(StatusCodes.OK).json({
      status: "OK",
      message: isVerified
        ? "Doctor verified successfully!"
        : "Doctor rejected successfully!",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error("Error verifying doctor:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Server error occurred!",
      error: error.message,
    });
  }
};

export default verifyDoctorController;