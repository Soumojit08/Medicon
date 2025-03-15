import mongoose from "mongoose";

const ScheduleSchema = mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  
  schedules: {
    Monday: {
      enabled: Boolean,
      slots: [
        {
          start: String,
          end: String,
        },
      ],
    },

    Tuesday: {
      enabled: Boolean,
      slots: [
        {
          start: String,
          end: String,
        },
      ],
    },

    Wednesday: {
      enabled: Boolean,
      slots: [
        {
          start: String,
          end: String,
        },
      ],
    },

    Thursday: {
      enabled: Boolean,
      slots: [
        {
          start: String,
          end: String,
        },
      ],
    },

    Friday: {
      enabled: Boolean,
      slots: [
        {
          start: String,
          end: String,
        },
      ],
    },
  },

  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
