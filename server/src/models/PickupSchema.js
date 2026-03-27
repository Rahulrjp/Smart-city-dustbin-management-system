import mongoose from "mongoose";

const PickupSchema = new mongoose.Schema({
    bin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bin"
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver"
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "completed"],
        default: "pending"
    },
    assignedAt: Date,
    completedAt: Date
}, { timestamps: true });

const PickupModel = mongoose.model("Pickup", PickupSchema);

export default PickupModel;