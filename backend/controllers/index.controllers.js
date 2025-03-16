import doctorDashboardController from "./dash/doctor.dash.controller.js";
import updateDoctorDetailsController from "./update/update.Doctor.Details.controller.js";
import updateDoctorSchedule from "./update/update.schedule.controller.js";
import getDoctorSchedule from "./dash/get.schedule.controller.js";
import getAllDoctors from "./get/getAllDoctors.controller.js";
import getAllDoctorsBySpec from "./get/getAllDoctorsBySpec.controller.js";
import bookAppointment from "./appointment/book.appointment.controller.js";
import getAllUsers from "./get/getAllUsers.controller.js";
import userDashboardController from "./dash/user.dash.controller.js";
import deleteDoctorByIdController from "./delete/deleteDoctorById.controller.js";
import deleteUserByIdController from "./delete/deleteUserById.controller.js";
import userLoginController from "./auth/login.user.auth.controller.js";
import doctorLoginController from "./auth/login.doctor.controller.js";
import adminLoginController from "./auth/login.admin.controller.js";
import userSignUpController from "./auth/signup.user.auth.controller.js";
import doctorSignUpController from "./auth/signup.doctor.auth.controller.js";
import getDoctorsByIdController from "./get/getDoctorById.controller.js";

const controllers = {
  UserSignUp: userSignUpController, // SignUp Controller for user...
  DoctorSignUp: doctorSignUpController, // SignUp Controller for doctor...
  UserLogin: userLoginController, // Login Controller for User...
  DoctorLogin: doctorLoginController, // Login Controller for Doctor...
  AdminLogin: adminLoginController, // Login Controller for Admin...
  GetDoctorById: getDoctorsByIdController, // Get Doctor by Id...
  DoctorDashboard: doctorDashboardController,
  UserDashboard: userDashboardController,
  UpdateDoctorDetails: updateDoctorDetailsController,
  UpdateDoctorSchedule: updateDoctorSchedule,
  GetDoctorSchedule: getDoctorSchedule,
  GetAllDoctors: getAllDoctors,
  GetAllDoctorsBySpec: getAllDoctorsBySpec,
  BookAppointment: bookAppointment,
  GetAllUsers: getAllUsers,
  DeleteDoctorById: deleteDoctorByIdController,
  DeleteUserById: deleteUserByIdController,
};

export default controllers;