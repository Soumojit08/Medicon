import logincontroller from "./auth/login.auth.controller.js";
import signupController from "./auth/signup.auth.controller.js";
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

const controllers = {
  SignUp: signupController, // SignUp Controller Path config
  Login: logincontroller,
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