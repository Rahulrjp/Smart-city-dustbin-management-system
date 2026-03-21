import mongoose from "mongoose"

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    },
}, { timestamps: true });

const OtpModel = mongoose.model("Otp", OtpSchema);

export default OtpModel;