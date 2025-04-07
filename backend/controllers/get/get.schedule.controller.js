import { StatusCodes } from "http-status-codes";
import Schedule from "../../models/Schedule.model.js";

const getDoctorSchedule = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { day } = req.query; // Optional query parameter for a specific day

    // 🔹 1️⃣ Validate input
    if (!doctorId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor ID is required.",
      });
    }

    // 🔹 2️⃣ Fetch schedule from the database
    const schedule = await Schedule.findOne({ doctorId });

    if (!schedule) {
      return res.status(StatusCodes.OK).json({
        status: "Success",
        message: "No schedule found for the specified doctor.",
        data: day ? { enabled: false, slots: [] } : {},
      });
    }

    // 🔹 3️⃣ Handle specific day or full schedule
    if (day) {
      const daySchedule = schedule.schedules[day];

      if (!daySchedule || !daySchedule.enabled) {
        return res.status(StatusCodes.OK).json({
          status: "Success",
          message: `No schedule available for ${day}.`,
          data: { enabled: false, slots: [] },
        });
      }

      return res.status(StatusCodes.OK).json({
        status: "Success",
        message: `Schedule for ${day} fetched successfully.`,
        data: daySchedule,
      });
    }

    // 🔹 4️⃣ Handle full weekly schedule
    const weeklySchedule = schedule.schedules;

    return res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Weekly schedule fetched successfully.",
      data: weeklySchedule,
    });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Error fetching schedule.",
    });
  }
};

export default getDoctorSchedule;