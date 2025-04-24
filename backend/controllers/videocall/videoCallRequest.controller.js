import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import { generateVideoCallLink } from "../../jobs/autoVideoCallLinkSend.job.js";
import sendMail from "../../services/sendMail.js";

const videoCallRequestController = async (req, res) => {
  try {
    const { appointmentId, doctorId } = req.body;

    // Check appointment exists and is confirmed
    const appointment = await Models.AppointmentModel.findOne({
      _id: appointmentId,
      doctorId: doctorId,
      status: "confirmed",
    }).populate("userId doctorId");

    if (!appointment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "Failed",
        message: "Confirmed appointment not found.",
      });
    }

    // Generate video call link
    const link = generateVideoCallLink(appointment._id);

    // Send mail to User
    const userMail = {
      to: appointment.userId.email,
      subject: "Your Video Appointment Link",
      html: `<p>Hello ${appointment.userId.name},</p>
            <p>Your video consultation is ready. Click the link below to join:</p>
            <a href="${link}">${link}</a>`,
    };

    // Send mail to Doctor
    const doctorMail = {
      to: appointment.doctorId.email,
      subject: "Patient Video Call Link",
      html: `<p>Hello ${appointment.doctorId.name},</p>
            <p>Your consultation is ready. Join via this link:</p>
            <a href="${link}">${link}</a>`,
    };

    await sendMail(userMail, (error, info) => {
      if (error) {
        console.log("Mail Sending Error:", error);
      } else {
        console.log("Mail Sent:", info);
      }
    });
    await sendMail(doctorMail, (error, info) => {
      if (error) {
        console.log("Mail Sending Error:", error);
      } else {
        console.log("Mail Sent:", info);
      }
    });

    return res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Video call link sent to doctor and user.",
      link,
    });
  } catch (error) {
    console.error("Video Call Request Error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

export default videoCallRequestController;