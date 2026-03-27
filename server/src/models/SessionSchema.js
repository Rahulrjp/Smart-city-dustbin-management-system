import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    valid: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    },
})

const SessionModel = mongoose.model('Session', SessionSchema);

export default SessionModel;
