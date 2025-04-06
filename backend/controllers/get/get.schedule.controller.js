import { StatusCodes } from "http-status-codes";
import Schedule from "../../models/Schedule.model.js";
import redis from "../../Redis/client.js"; // Import Redis client

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

    // 🔹 2️⃣ Check Redis cache for the schedule
    const redisKey = day
      ? `doctorSchedule:${doctorId}:${day}`
      : `doctorSchedule:${doctorId}:all`;
    const cachedSchedule = await redis.get(redisKey);

    if (cachedSchedule) {
      // If schedule is found in cache, return it
      return res.status(StatusCodes.OK).json({
        status: "Success",
        message: day
          ? `Schedule for ${day} fetched successfully (from cache).`
          : "Weekly schedule fetched successfully (from cache).",
        data: JSON.parse(cachedSchedule),
      });
    }

    // 🔹 3️⃣ Fetch schedule from the database
    const schedule = await Schedule.findOne({ doctorId });

    if (!schedule) {
      return res.status(StatusCodes.OK).json({
        status: "Success",
        message: "No schedule found for the specified doctor.",
        data: day ? { enabled: false, slots: [] } : {},
      });
    }

    // 🔹 4️⃣ Handle specific day or full schedule
    if (day) {
      const daySchedule = schedule.schedules[day];

      if (!daySchedule || !daySchedule.enabled) {
        return res.status(StatusCodes.OK).json({
          status: "Success",
          message: `No schedule available for ${day}.`,
          data: { enabled: false, slots: [] },
        });
      }

      // 🔹 5️⃣ Store the result in Redis cache for the specific day
      await redis.set(redisKey, JSON.stringify(daySchedule), "EX", 3600); // Cache for 1 hour

      // 🔹 6️⃣ Return the response for the specific day
      return res.status(StatusCodes.OK).json({
        status: "Success",
        message: `Schedule for ${day} fetched successfully.`,
        data: daySchedule,
      });
    }

    // 🔹 7️⃣ Handle full weekly schedule
    const weeklySchedule = schedule.schedules;

    // 🔹 8️⃣ Store the result in Redis cache for the full schedule
    await redis.set(redisKey, JSON.stringify(weeklySchedule), "EX", 3600); // Cache for 1 hour

    // 🔹 9️⃣ Return the response for the full schedule
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