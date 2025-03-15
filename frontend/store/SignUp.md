# Path: /api/v1/signup
### Permission: All

**Doctor Registration** requires **specialization, registration ID, and location**.  

**User Registration** requires basic details like **name, email, and phone number**.  

If a **profile image** is provided, it will be uploaded to **Cloudinary**.

---

## 🔑 Request Body (Doctor)
```json
{
  "role": "doctor",
  "name": "Dr. John Doe",
  "email": "johndoe@example.com",
  "phonenumber": "9876543210",
  "password": "securepassword",
  "specialization": "Cardiologist",
  "registrationId": "DOC123456",
  "location": "New York, USA"
}
```

## 🔑 Request Body (User)
```json
{
  "role": "user",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phonenumber": "9876543210",
  "password": "securepassword",
}