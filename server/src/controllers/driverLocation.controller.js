import DriverLocationModel from "../models/DriverLocationSchema.js";

// ➕ Add new driver location
export const addDriverLocation = async (req, res) => {
    try {
        const { driverId, lng, lat } = req.body;

        const location = await DriverLocationModel.create({
            driver: driverId,
            location: {
                type: "Point",
                coordinates: [lng, lat]
            }
        });

        res.status(201).json({
            success: true,
            data: location
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📍 Get latest location of driver
export const getDriverLocation = async (req, res) => {
    try {
        const { driverId } = req.params;

        const location = await DriverLocationModel.findOne({ driver: driverId })
            .sort({ createdAt: -1 });

        res.json({ success: true, data: location });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📜 Get location history
export const getDriverLocationHistory = async (req, res) => {
    try {
        const { driverId } = req.params;

        const locations = await DriverLocationModel.find({ driver: driverId })
            .sort({ createdAt: -1 });

        res.json({ success: true, data: locations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📍 Get nearby drivers
export const getNearbyDrivers = async (req, res) => {
    const { lng, lat, distance = 5000 } = req.query;

    try {
        const drivers = await DriverLocationModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lng), parseFloat(lat)]
                    },
                    $maxDistance: parseInt(distance)
                }
            }
        }).populate("driver");

        res.json({ success: true, nearbyDrivers: drivers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🧹 Delete all locations of a driver (cleanup)
export const deleteDriverLocations = async (req, res) => {
    try {
        const { driverId } = req.params;

        await DriverLocationModel.deleteMany({ driver: driverId });

        res.json({
            success: true,
            message: "Driver location history deleted"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};