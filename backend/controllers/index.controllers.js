import doctorDashboardController from "./dash/doctor.dash.controller.js";
import updateDoctorDetailsController from "./update/update.Doctor.Details.controller.js";
import updateDoctorSchedule from "./update/update.schedule.controller.js";
import getDoctorSchedule from "./get/get.schedule.controller.js";
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
import getUserByIdController from "./get/getUserById.controller.js";
import verifyDoctorController from "./update/verifyDoctor.controller.js";
import UploadMedicalCertificate from "./update/uploadMedicalCertificate.controller.js";
import doctorLogoutController from "./auth/logout.doctor.controller.js";
import videoCallRequestController from "./videocall/videoCallRequest.controller.js";
import updateDoctorStatusController from "./update/update.onlineStatus.controller.js";
import getNearbyDoctors from "./get/getNearbyDoctors.controller.js";
import getCertificateController from "./get/getCertificates.controller.js";
import deleteMedicalCertificateController from "./delete/deleteMedicalCertificate.controller.js";

const controllers = {
  UserSignUp: userSignUpController, // SignUp Controller for user...
  DoctorSignUp: doctorSignUpController, // SignUp Controller for doctor...
  UserLogin: userLoginController, // Login Controller for User...
  DoctorLogin: doctorLoginController, // Login Controller for Doctor...
  AdminLogin: adminLoginController, // Login Controller for Admin...
  GetDoctorById: getDoctorsByIdController, // Get Doctor by Id...
  GetUserById: getUserByIdController, // Get User by Id...
  DoctorDashboard: doctorDashboardController,
  UserDashboard: userDashboardController,
  UpdateDoctorDetails: updateDoctorDetailsController,
  UpdateDoctorSchedule: updateDoctorSchedule,
  GetDoctorSchedule: getDoctorSchedule, // Get Doctor's Schedule...
  GetAllDoctors: getAllDoctors,
  GetAllDoctorsBySpec: getAllDoctorsBySpec, // Get All Doctors by Specialization...
  BookAppointment: bookAppointment,
  GetAllUsers: getAllUsers,
  DeleteDoctorById: deleteDoctorByIdController,
  DeleteUserById: deleteUserByIdController,
  VerifyDoctor: verifyDoctorController, // Verify Doctor...
  DoctorLogout: doctorLogoutController, // Doctor Logout..
  UploadMedicalCertificate: UploadMedicalCertificate, // Upload Medical Certificate...
  VideoCallRequest: videoCallRequestController, //Video call request
  UpdateDoctorStatus: updateDoctorStatusController,
  GetNearbyDoctors: getNearbyDoctors, // Get nearby doctors
  GetMedicalCertificates: getCertificateController, // Get logged-In user's medical certificates
  DeleteMedicalCertificate: deleteMedicalCertificateController, // Delete Medical Certificates...
};

export default controllers;