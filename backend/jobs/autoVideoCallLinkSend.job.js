import cron from "node-cron";
import Models from "../models/index.models.js";
import sendMail from "../services/sendMail.js";

const generateVideoCallLink = (appointmentId) => {
    // You can replace this with your actual ZEGOCLOUD/Agora link generation logic
    return `https://medicon-za1z.vercel.app/videocall/${appointmentId}`;
};

const autoVideoCallLinkSend = async () => {
    try {
        const now = new Date();
        const currentDate = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
        const currentTime = now.toTimeString().split(" ")[0].slice(0, 5); // "HH:MM"

        // Get appointments for now ± 1 minute to handle time sync tolerance
        const confirmedAppointments = await Models.AppointmentModel.find({
            status: "confirmed",
            date: { $lte: now },
        }).populate("userId doctorId");

        for (const appt of confirmedAppointments) {
            // Match time window
            const apptStart = appt.startTime;
            const [apptHour, apptMin] = apptStart.split(":").map(Number);
            const apptTime = new Date(appt.date);
            apptTime.setHours(apptHour, apptMin);

            const diff = Math.abs(now - apptTime);
            const diffMinutes = Math.floor(diff / 60000); // milliseconds to minutes

            if (diffMinutes <= 1) {
                const link = generateVideoCallLink(appt._id);

                const userMail = {
                    to: appt.userId.email,
                    subject: "Your Video Appointment Link",
                    html: `<p>Hello ${appt.userId.name},</p>
                <p>Your video consultation is about to begin. Join using the link below:</p>
                <a href="${link}">${link}</a>`,
                };

                const doctorMail = {
                    to: appt.doctorId.email,
                    subject: "Patient Video Call Link",
                    html: `<p>Hello Dr. ${appt.doctorId.name},</p>
                <p>You have an upcoming consultation. Join using the link below:</p>
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

                console.log(`Video call link sent for appointment: ${appt._id}`);
            }
        }

        console.log("Video call link job finished.");
    } catch (error) {
        console.error("Error in autoVideoCallLinkSend:", error.message);
    }
};

// Run every 2 minutes
cron.schedule("*/2 * * * *", autoVideoCallLinkSend);

export default autoVideoCallLinkSend;