import doctorauthmiddleware from "./doctorauth.middleware.js";
import userauthmiddleware from "./userauth.middleware.js";
import adminauthMiddleware from "./adminauth.middleware.js";

const Middlewares = {
    DoctorAuth: doctorauthmiddleware,
    UserAuth: userauthmiddleware,
    AdminAuth: adminauthMiddleware,
}

export default Middlewares;