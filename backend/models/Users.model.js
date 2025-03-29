import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phonenumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/035/066/209/non_2x/user-avatar-male-illustration-design-free-png.png"
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;