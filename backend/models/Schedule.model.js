import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  start: { type: String, required: true }, 
  end: { type: String, required: true },   
});

const dayScheduleSchema = new mongoose.Schema({
  enabled: { type: Boolean, default: false }, 
  slots: [slotSchema], 
});

const scheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  schedules: {
    Monday: { type: dayScheduleSchema, default: { enabled: false, slots: [] } },
    Tuesday: { type: dayScheduleSchema, default: { enabled: false, slots: [] } },
    Wednesday: { type: dayScheduleSchema, default: { enabled: false, slots: [] } },
    Thursday: { type: dayScheduleSchema, default: { enabled: false, slots: [] } },
    Friday: { type: dayScheduleSchema, default: { enabled: false, slots: [] } },
    Saturday: { type: dayScheduleSchema, default: { enabled: false, slots: [] } },
    Sunday: { type: dayScheduleSchema, default: { enabled: false, slots: [] } },
  },
  lastUpdated: { type: Date, default: Date.now },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;