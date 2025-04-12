import appointmentBookingSuccessfulMailTemplate from "./Mails/appointmentBook.mail.template.js";
import deletedDoctorMailContent from "./Mails/deleteDoctor.mail.template.js";
import UserSignUpMailConfirmationMailContent from "./Mails/signUpUser.mail.template.js";

const MailTemplates = {
    SignUpMailContent: UserSignUpMailConfirmationMailContent,
    AppointBookMailContent: appointmentBookingSuccessfulMailTemplate,
    DeleteDoctorMailContent: deletedDoctorMailContent,
}

export default MailTemplates;