
# MEDICON
MEDICON - This healthcare system is designed to streamline the process of patient-doctor interaction by providing an efficient appointment booking system, AI-powered health assistance, and secure video consultations. Patients can easily register, book appointments with doctors, and receive emergency health guidance through an integrated chatbot. Doctors can manage appointments and provide consultations, while admins oversee doctor approvals and system operations. The platform ensures a seamless and secure healthcare experience for both patients and medical professionals.




## Authors

- [@Soumojit08](https://github.com/Soumojit08)
- [@Samiran2004](https://github.com/Samiran2004)
- [@subrata-code](https://github.com/subrata-code)
- [@SayanRik](https://github.com/SayanRik)
-  [@Kishan-009](https://github.com/kishan-009)



## Roadmap

Phase 1: Planning & Requirement Analysis
Define project scope and objectives.
Identify necessary features:
Patient appointment booking.
Doctor registration & approval system.
Chatbot for emergency health assistance.
Video consultation system.
Choose technology stack (Frontend, Backend, Database, AI integration).

Phase 2: System Architecture & Database Design
Design ERD (Entity Relationship Diagram) for database.
Define API endpoints for user authentication, appointments, and consultations.
Structure admin panel for managing doctors and appointments.

Phase 3: Doctor & Patient Module Development
3.1 Doctor Module
Signup, login, and profile management.
Approval system (admin verification).
Appointment management (approve/reject patient requests).
Video consultation system integration.

3.2 Patient Module
Signup, login, and profile creation.
Book an appointment with available doctors.
View appointment status.
Access video consultation system.

Phase 4: Admin Panel Development
Admin login and authentication.
Manage doctor approvals.
Monitor appointments and consultations.
View system analytics and reports.

Phase 5: AI Chatbot Development
Train a chatbot for health assistance.
Provide emergency guidance and basic health advice.
Integrate with appointment and consultation systems.

Phase 6: Video Consultation Integration
Implement real-time video calls between doctors and patients.
Ensure secure and encrypted communication.
Enable appointment-based video sessions.

Phase 7: Testing & Deployment
Perform unit and integration testing.
Fix bugs and optimize performance.
Deploy the system on a cloud server.
Implement security measures for patient data.


Phase 8: Feedback & Future Enhancements
Gather user feedback and improve UX.
Add new AI capabilities to chatbot.
Introduce e-prescriptions and medical record storage.
Expand doctor availability across different specialties.

## Features

Patient Module

Sign up, login, and profile management
Book appointments with doctors
View appointment status
Access video consultations
Doctor Module

Sign up, login, and profile approval by admin
Manage and approve/reject appointments
Conduct video consultations
Admin Panel

Approve or reject doctor registrations
Monitor appointments and consultations
Manage system analytics
AI Chatbot

Provide emergency health assistance
Offer basic medical advice
Video Consultation

Secure real-time video calls between doctors and patients
Encrypted communication for privacy



## API Reference

- google gemini API

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


## Support

For support, email: mediconhelp32@gmail.com or join our Slack channel.

