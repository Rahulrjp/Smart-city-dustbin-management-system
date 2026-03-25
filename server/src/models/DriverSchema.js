import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    vehicleNumber: String,
    licenseNumber: String,
    status: {
        type: String,
        enum: ["available", "busy", "offline"],
        default: "available"
    }
}, { timestamps: true });

const DriverModel = mongoose.model("Driver", DriverSchema);

export default DriverModel;