import { getReasonPhrase, StatusCodes } from "http-status-codes";
import JWT from 'jsonwebtoken';
import configs from "../configs/index.configs.js";

function userauthmiddleware(token) {
    return async (req, res, next) => {
        try {
            const tokenValue = req.cookies[token];
            if (!tokenValue) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    status: 'Failed',
                    message: getReasonPhrase(StatusCodes.UNAUTHORIZED)
                });
            } else {
                try {
                    const userPayload = JWT.verify(tokenValue, configs.JWT_SECRET);

                    // For User...
                    if (userPayload.role === 'user') {
                        req.user = {
                            id: userPayload._id,
                            role: userPayload.role,
                        };
                        req.user = userPayload;
                        return next();
                    }
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        status: 'Failed',
                        message: getReasonPhrase(StatusCodes.UNAUTHORIZED)
                    });
                } catch (error) {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        status: 'Failed',
                        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
                    });
                }
            }
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: 'Failed',
                message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
            });
        }
    }
}

export default userauthmiddleware;