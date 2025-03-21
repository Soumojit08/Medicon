import mongoose from "mongoose";

const AppointmentSchema = mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  timeSlots: [
    {
      startTime: { type: String, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
