import JWT from 'jsonwebtoken';
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import configs from "../configs/index.configs.js";

function doctorauthmiddleware(token) {
  return async (req, res, next) => {
    try {
      console.log("Auth Middleware: Checking token...");
      const tokenValue = req.cookies[token];

      if (!tokenValue) {
        console.log("Auth Middleware: Token not found!");
        return res.render("errorpage", {
          errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        });
      }

      const userPayload = JWT.verify(tokenValue, configs.JWT_SECRET);
      console.log("Auth Middleware: Token verified, payload:", userPayload);

      if (!userPayload || !userPayload._id) {
        console.log("Auth Middleware: Invalid token payload!");
        return res.render("errorpage", {
          errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        });
      }

      // For Doctor...
      if (userPayload.role === "doctor") {
        req.user = {
          id: userPayload._id,
          role: userPayload.role,
        };
        req.doctor = userPayload;
        res.locals.doctor = userPayload;
        console.log("Auth Middleware: Doctor authenticated");
        return next();
      }
      console.log("Auth Middleware: Unauthorized role!");
      return res.render("errorpage", {
        errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      });
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      return res.render("errorpage", {
        errorMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };
}

export default doctorauthmiddleware;