import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema({
    bin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bin"
    },
    message: String,
    severity: {
        type: String,
        enum: ["low", "medium", "high"]
    },
    isResolved: { type: Boolean, default: false }
}, { timestamps: true });

const AlertModel = mongoose.model("Alert", AlertSchema);

export default AlertModel;