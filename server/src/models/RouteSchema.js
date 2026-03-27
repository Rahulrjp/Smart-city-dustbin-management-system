import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver"
    },
    bins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bin"
    }],
    routePolyline: String // optional for maps
}, { timestamps: true });

const RouteModel = mongoose.model("Route", RouteSchema);

export default RouteModel;