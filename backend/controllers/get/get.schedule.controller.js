import { StatusCodes } from "http-status-codes";
import Schedule from "../../models/Schedule.model.js";

const getDoctorSchedule = async function (req, res, next) {
  try {
    const doctorId = req.params.id;

    if (!doctorId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: "Failed",
        message: "Doctor ID is required",
      });
    }

    const schedule = await Schedule.findOne({ doctorId });

    if (!schedule) {
      // Return empty schedules array instead of 404
      return res.status(StatusCodes.OK).json({
        status: "Success",
        message: "No schedule found for the specified doctor",
        data: { schedules: [] },
      });
    }

    // Format the data to match the expected structure in the frontend
    // Assuming the schedule model has a 'schedules' field that's an array
    // If not, we need to transform the data accordingly
    const formattedData = {
      schedules: schedule.schedules || [],
    };

    return res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Schedule fetched successfully",
      data: formattedData,
    });
  } catch (err) {
    console.error("Error fetching schedule:", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Error fetching schedule",
      error: err.message,
    });
  }
};

export default getDoctorSchedule;