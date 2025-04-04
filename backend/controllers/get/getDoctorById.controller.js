import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import redis from "../../Redis/client.js";

const getDoctorsByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "Failed",
                message: "id is required!",
            });
        }

        // Generate a unique Redis key for the doctor ID
        const redisKey = `doctor:${id}`;

        // Check if data is present in Redis cache
        const cachedDoctor = await redis.get(redisKey);
        if (cachedDoctor) {
            return res.status(StatusCodes.OK).json({
                status: 'OK',
                message: `Doctor with id: ${id}`,
                data: JSON.parse(cachedDoctor),
            });
        }

        // Fetch from database if not in cache
        const doctorData = await Models.DoctorModel.findById(id).select("-password");
        if (!doctorData) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'Failed',
                message: "Doctor not found!",
            });
        }

        // Store the result in Redis cache with a 5-minute expiration
        await redis.set(redisKey, JSON.stringify(doctorData), "EX", 300);

        return res.status(StatusCodes.OK).json({
            status: 'OK',
            message: `Doctor with id: ${id}`,
            data: doctorData,
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
};

export default getDoctorsByIdController;
