import { getReasonPhrase, StatusCodes } from "http-status-codes";
import JWT from 'jsonwebtoken';
import configs from "../configs/index.configs.js";

function userauthmiddleware(token) {
    return async (req, res, next) => {
        try {
            const tokenValue = req.cookies[token];
            if (!tokenValue) {
                return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
            } else {
                try {
                    const userPayload = JWT.verify(tokenValue, configs.JWT_SECRET);

                    // For Doctor...
                    if (userPayload.role === 'user') {
                        req.user = {
                            id: userPayload._id,
                            role: userPayload.role,
                        };
                        req.user = userPayload;
                        res.locals.user = userPayload;
                        return next();
                    }
                    return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
                } catch (error) {
                    return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
                }
            }
        } catch (error) {
            return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
        }
    }
}

export default userauthmiddleware;