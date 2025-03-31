import express from "express";
import { StatusCodes } from "http-status-codes";
const router = express.Router();
import controllers from "../../controllers/index.controllers.js";
import upload from "../../middlewares/multer.middleware.js";
import Middlewares from "../../middlewares/index.middleware.js";
import getNearbyDoctors from "../../controllers/get/getNearbyDoctors.controller.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phonenumber
 *         - profileimage
 *         - secNumber
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password
 *         phonenumber:
 *           type: number
 *           description: The user's phone number
 *         profilepic:
 *           type: string
 *           description: URL of the user's profile image
 *         secNumber:
 *           type: number
 *           description: The user's secondary phone number, which is required for emergency
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phonenumber
 *         - password
 *         - specialization
 *         - registrationId
 *         - address
 *         - geoLocation
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the doctor.
 *           example: Dr. John Doe
 *         email:
 *           type: string
 *           description: Email address of the doctor.
 *           example: johndoe@hospital.com
 *         phonenumber:
 *           type: integer
 *           description: Phone number of the doctor.
 *           example: 1234567890
 *         password:
 *           type: string
 *           description: Password for the doctor's account.
 *           example: password123
 *         profilepic:
 *           type: string
 *           description: URL of the doctor's profile picture.
 *           example: https://example.com/profile.jpg
 *         specialization:
 *           type: array
 *           items:
 *             type: string
 *           description: List of specializations.
 *           example: ["Cardiology", "Dermatology"]
 *         registrationId:
 *           type: string
 *           description: Unique registration ID of the doctor.
 *           example: D12345
 *         address:
 *           type: string
 *           description: Address of the doctor.
 *           example: 123 Health Street, Wellness City
 *         geoLocation:
 *           type: object
 *           description: Geographical coordinates of the doctor's location.
 *           properties:
 *             type:
 *               type: string
 *               enum: ["Point"]
 *               example: "Point"
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *               description: Coordinates in [longitude, latitude] format.
 *               example: [88.3639, 22.5726]
 *         isVerified:
 *           type: boolean
 *           description: Indicates if the doctor is verified.
 *           example: true
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *           description: Languages spoken by the doctor.
 *           example: ["English", "Hindi"]
 *         education:
 *           type: string
 *           description: Educational qualifications of the doctor.
 *           example: MBBS, MD - Cardiology
 *         consultationFee:
 *           type: number
 *           description: Consultation fee of the doctor.
 *           example: 500
 *         facts:
 *           type: string
 *           description: A motivational or informative quote from the doctor.
 *           example: "Each patient is a story waiting to be heard—listen with compassion, heal with expertise."
 *         isOnline:
 *           type: boolean
 *           description: Indicates if the doctor is currently online.
 *           example: true
 *         isAvailable:
 *           type: boolean
 *           description: Indicates if the doctor is available for consultation.
 *           example: true
 *         isBusy:
 *           type: boolean
 *           description: Indicates if the doctor is currently busy.
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the doctor's record creation.
 *           example: 2025-03-30T14:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of the last update.
 *           example: 2025-03-30T14:00:00.000Z
 */

/**
 * Check health...
 * path: /api/v1/health
 * Permission: All
 */

/**
 * @swagger
 * paths:
 *  /health:
 *    get:
 *      summary: Check server health status
 *      description: Returns the health status of the server.
 *      responses:
 *        200:
 *          description: Server is up and running.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "OK"
 *                  message:
 *                    type: string
 *                    example: "Server is Up and Running"
 *        500:
 *          description: Internal server error.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: "Failed"
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

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user with basic details and geolocation.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: johndoe@example.com
 *               phonenumber:
 *                 type: integer
 *                 description: User's phone number.
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: strongpassword123
 *               geoLocation:
 *                 type: string
 *                 description: Geolocation in the format "latitude,longitude".
 *                 example: "22.5726,88.3639"
 *               secNumber:
 *                 type: integer
 *                 description: Secondary contact number.
 *                 example: 9876543210
 *               profilepic:
 *                 type: string
 *                 format: binary
 *                 description: User's profile picture.
 *     responses:
 *       201:
 *         description: Successfully Signed Up!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 message:
 *                   type: string
 *                   example: Successfully Signed Up!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 641a1f9b9e24dc001c3c423f
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     phonenumber:
 *                       type: integer
 *                       example: 1234567890
 *                     profilepic:
 *                       type: string
 *                       example: "https://example.com/profile.jpg"
 *                     geoLocation:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: Point
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                           example: [88.3639, 22.5726]
 *                     secNumber:
 *                       type: integer
 *                       example: 9876543210
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-30T14:00:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-03-30T14:00:00.000Z
 *       400:
 *         description: Bad Request - Missing required fields or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Please enter all required fields including location!
 *       409:
 *         description: Conflict - User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: User already exists!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Failed
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post(
  "/signup-user",
  upload.single("profileimage"),
  controllers.UserSignUp
);

/**
 * SignUp for Doctor
 * Path: /api/v1/signup-doctor
 * Permission: All
 */
router.post(
  "/signup-doctor",
  upload.single("profileimage"),
  controllers.DoctorSignUp
);

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
router.get("/doctors", controllers.GetAllDoctors); // For testing

//logout for doctor route
router.post("/logout-doctor", Middlewares.DoctorAuth, controllers.DoctorLogout);

//video call 
router.post(
  "/video-call/request",
  Middlewares.DoctorAuth,
  controllers.VideoCallRequest
);

router.post("/update-doctor-status", controllers.UpdateDoctorStatus)

/**
 * Get all doctors by spec
 * Path: /api/v1/doctors/specality
 * Body: specality and isVerified: true or false
 * Permission: User
 */
router.get("/doctors/specality", controllers.GetAllDoctorsBySpec); // For testing
// router.get('/doctors/specality', Middlewares.UserAuth('usertoken'), controllers.GetAllDoctorsBySpec);

/**
 * Get Doctor by id
 * Path: /api/v1/doctors/:id
 * Body: N/A
 * Permission: All
 */
router.get("/doctors/:id", controllers.GetDoctorById);

/**
 * Book an appointment
 * Path: /api/v1/appoint/book
 * Permission: User
 */
router.post("/appoint/book", controllers.BookAppointment);

/**
 * Get all users
 * Path: /api/v1/users
 * Body: userid if get user by id
 * Permission: Admin
 */
router.get("/users", controllers.GetAllUsers);

/**
 * Get User By Id
 * Path: /api/v1/users/:id
 * Permission: All
 */
router.get("/users/:id", controllers.GetUserById);

/**
 * Delete doctor by id
 * Path: /api/v1/doctor
 * Body: doctorid
 * Permission: Admin
 */
router.delete("/doctor", controllers.DeleteDoctorById); // For testing

/**
 * Delete user by id
 * Path: /api/v1/user
 * Body: userid
 * Permission: Admin
 */
router.delete("/user", Middlewares.AdminAuth, controllers.DeleteUserById); // For testing

/**
 * Verify doctors
 * Path: /api/v1/verifyDoctor
 * Body: doctorid
 * Permission: Admin
 */
router.post("/verifyDoctor", Middlewares.AdminAuth, controllers.VerifyDoctor);

/**
 * Get Nearby Doctors
 * path: /api/v1/nearby-doctors
 * Permission: All
 */
router.get("/nearby-doctors", getNearbyDoctors);

/**
 * Upload Medical Certificate
 * Path: /api/v1/upload-medical-certificate
 * Permission: User
 */
router.post(
  "/upload-medical-certificate",
  Middlewares.UploadFile.upload("files", 5), // Call upload function properly
  controllers.UploadMedicalCertificate
);

export default router;