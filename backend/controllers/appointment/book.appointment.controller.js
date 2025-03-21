import { getReasonPhrase, StatusCodes } from "http-status-codes";

const bookAppointment = async (req, res, next) => {
    try {
        return res.status(StatusCodes.OK).json({
            status: 'OK',
            message: "Book a slot"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default bookAppointment;
