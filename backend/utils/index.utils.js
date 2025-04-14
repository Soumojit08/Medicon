import appointmentBookingSuccessfulMailTemplate from "./Mails/appointmentBook.mail.template.js";
import deletedDoctorMailContent from "./Mails/deleteDoctor.mail.template.js";
import doctorWelcomeMailContent from "./Mails/signUpDoctor.mail.template.js";
import UserSignUpMailConfirmationMailContent from "./Mails/signUpUser.mail.template.js";
import updatedDoctorMailContent from "./Mails/updateDoctorDets.mail.template.js";

const MailTemplates = {
    SignUpMailContent: UserSignUpMailConfirmationMailContent,
    AppointBookMailContent: appointmentBookingSuccessfulMailTemplate,
    DeleteDoctorMailContent: deletedDoctorMailContent,
    UpdateDoctorDetsMailContent: updatedDoctorMailContent,
    SignUpDoctorMailContent: doctorWelcomeMailContent
}

export default MailTemplates;