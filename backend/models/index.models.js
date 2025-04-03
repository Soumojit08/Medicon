import Doctor from "./Doctors.model.js";
import User from "./Users.model.js";
import Appointment from "./Appointment.model.js";
import Schedule from "./Schedule.model.js";
import Admin from "./Admins.model.js";
import MedicalCertificate from "./MedicalCertificate.model.js";

const Models = {
  UserModel: User,
  DoctorModel: Doctor,
  AppointmentModel: Appointment,
  ScheduleModel: Schedule,
  AdminModel: Admin,
  MedicalCertificateModel: MedicalCertificate
};

export default Models;