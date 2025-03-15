import doctorauthmiddleware from "./doctorauth.middleware.js";
import userauthmiddleware from "./userauth.middleware.js";

const Middlewares = {
    DoctorAuth: doctorauthmiddleware,
    UserAuth: userauthmiddleware
}

export default Middlewares;