import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const UpdateHealthDataController = async (req, res) => {
    try {
        const { bpData, spO2Data, heartRateData, userId } = req.body;

        if (!userId || !bpData || !spO2Data || !heartRateData) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: "error",
                message: "Missing required fields",
            });
        }

        const user = await Models.UserModel.findById(userId);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: "error",
                message: "User not authorized",
            });
        }

        const updated = await Models.HealthModel.findOneAndUpdate(
            { user: userId },
            { bpData, spO2Data, heartRateData },
            { new: true, upsert: true }
        );

        return res.status(StatusCodes.OK).json({
            status: "success",
            message: `Health data updated for ${user.name}`,
            data: updated,
        });
    } catch (error) {
        console.error("UpdateHealthData Error:", error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
};

export default UpdateHealthDataController;