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
        type: String
    },
    geoLocation: {
        type: String
    },
    secNumber: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;