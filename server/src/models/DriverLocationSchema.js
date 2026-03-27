import mongoose from "mongoose";

const DriverLocationSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver"
    },
    location: {
        type: { type: String, default: "Point" },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    timestamp: { type: Date, default: Date.now }
});

DriverLocationSchema.index({ location: "2dsphere" });

const DriverLocationModel = mongoose.model("DriverLocation", DriverLocationSchema);

export default DriverLocationModel;