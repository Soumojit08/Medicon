import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Doctor from "../../models/Doctors.model.js";
import Appointment from "../../models/Appointment.model.js";

const bookAppointment = async (req, res) => {
    try {
        const { doctorId, date, timeSlot } = req.body;

        // 🔹 1️⃣ Validate required fields
        if (!doctorId || !date || !timeSlot) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "Failed",
                message: "Please provide doctorId, date, and timeSlot.",
            });
        }

        // 🔹 2️⃣ Check if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: "Failed",
                message: "Doctor not found.",
            });
        }

        // 🔹 3️⃣ Check if the doctor has available slots on the given date
        const existingAppointment = await Appointment.findOne({
            day: date,
            "timeSlots.startTime": timeSlot,
        });

        if (existingAppointment) {
            return res.status(StatusCodes.CONFLICT).json({
                status: "Failed",
                message: "This time slot is already booked. Please choose another.",
            });
        }

        // 🔹 4️⃣ Book the appointment
        const newAppointment = new Appointment({
            day: date,
            timeSlots: [{ startTime: timeSlot }],
            status: "pending",
        });

        await newAppointment.save();

        return res.status(StatusCodes.CREATED).json({
            status: "OK",
            message: "Appointment booked successfully.",
            appointment: newAppointment,
        });

    } catch (error) {
        console.error("Error booking appointment:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "Failed",
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
};

export default bookAppointment;