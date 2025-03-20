import express from "express";
import { StatusCodes } from "http-status-codes";
const router = express.Router();
import controllers from "../../controllers/index.controllers.js";
import upload from "../../middlewares/multer.middleware.js";
import Middlewares from "../../middlewares/index.middleware.js";

/**
 * Check health...
 * path: /api/v1/health
 * Permission: All
 */
router.get("/health", (req, res, next) => {
  try {
    res.status(StatusCodes.OK).send({
      status: "OK",
      message: "Server is Up and Running",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "Failed",
    });
  }
});

/**
 * SignUp for user
 * Path: /api/v1/signup-user
 * Permission: All
 */
router.post("/signup-user", upload.single("profileimage"), controllers.UserSignUp);

/**
 * SignUp for Doctor
 * Path: /api/v1/signup-doctor
 * Permission: All
 */
router.post("/signup-doctor", upload.single("profileimage"), controllers.DoctorSignUp);

/**
 * Login for user
 * Path: /api/v1/login-user
 * Permission: All
 */
router.post("/login-user", controllers.UserLogin);

/**
 * Login for doctor
 * Path: /api/v1/login-doctor
 * Permission: All
 */
router.post("/login-doctor", controllers.DoctorLogin);

/**
 * Login for admin
 * Path: /api/v1/login-admin
 * Permission: All
 */
router.post("/login-admin", controllers.AdminLogin);

/**
 * Update Schedule
 * Path: /api/v1/updateSchedule
 * Permission: Doctor
 */
router.post(
  "/updateSchedule",
  Middlewares.DoctorAuth,
  controllers.UpdateDoctorSchedule
);

/**
 * Get all Schedules
 * Path: /api/v1/getSchedule
 * Permission: Doctor
 */
router.get(
  "/getSchedule/:id",
  // (req, res, next) => {
  //   console.log("Route: /api/v1/getSchedule - Request received");
  //   next();
  // },
  Middlewares.DoctorAuth,
  controllers.GetDoctorSchedule
);

/**
 * Update Doctor's Dets
 * Path: /api/v1/updateDetails
 * Permission: Doctor
 */
router.post(
  "/updateDetails",
  Middlewares.DoctorAuth, // Protected for Doctors
  controllers.UpdateDoctorDetails
);

/**
 * Get all Doctors
 * Path: /api/v1/doctors
 * Body: isVerified: true or false
 * Permission: User
 */
// router.get('/doctors', Middlewares.UserAuth, controllers.GetAllDoctors);
router.get('/doctors', controllers.GetAllDoctors); // For testing

/**
 * Get all doctors by spec
 * Path: /api/v1/doctors/specality
 * Body: specality and isVerified: true or false
 * Permission: User
 */
router.get('/doctors/specality', controllers.GetAllDoctorsBySpec); // For testing
// router.get('/doctors/specality', Middlewares.UserAuth('usertoken'), controllers.GetAllDoctorsBySpec);

/**
 * Get Doctor by id
 * Path: /api/v1/doctors/:id
 * Body: N/A
 * Permission: All
 */
router.get('/doctors/:id', controllers.GetDoctorById);

/**
 * Book an appointment
 * Path: /api/v1/appoint/book
 * Permission: User
 */
router.post('/appoint/book', controllers.BookAppointment);

/**
 * Get all users
 * Path: /api/v1/users
 * Body: userid if get user by id
 * Permission: Admin
 */
router.get('/users', controllers.GetAllUsers);

/**
 * Get User By Id
 * Path: /api/v1/users/:id
 * Permission: All
 */
router.get('/users/:id', controllers.GetUserById);

/**
 * Delete doctor by id
 * Path: /api/v1/doctor
 * Body: doctorid
 * Permission: Admin
 */
router.delete('/doctor' ,controllers.DeleteDoctorById); // For testing

/**
 * Delete user by id
 * Path: /api/v1/user
 * Body: userid
 * Permission: Admin
 */
router.delete('/user', Middlewares.AdminAuth, controllers.DeleteUserById); // For testing

export default router;