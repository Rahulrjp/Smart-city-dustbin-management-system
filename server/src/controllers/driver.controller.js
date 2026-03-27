import DriverLocationModel from "../models/DriverLocationSchema.js";
import DriverModel from "../models/DriverSchema.js";

export const createDriver = async (req, res) => {
    const { userId, vehicleNumber, liscenceNumber } = req.body;

    try {
        const existingDriver = await DriverModel.findOne({ user: userId });
        if (existingDriver) {
            return res.status(400).json({ message: "Driver already exists" });
        }
        const driver = await DriverModel.create({
            user: userId,
            vehicleNumber,
            liscenceNumber
        });
        return res.status(201).json(driver);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

// GET all drivers
export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await DriverModel.find().populate("user");
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET driver by ID
export const getDriverById = async (req, res) => {
    try {
        const driver = await DriverModel.findById(req.params.driverId).populate("user");
        if (!driver) {
            return res.status(404).json({ message: "Driver not found" });
        }
        res.json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE driver status
export const updateDriverStatus = async (req, res) => {
    const { status } = req.body;
    const { driverId } = req.params;

    try {
        const driver = await DriverModel.findByIdAndUpdate(
            driverId,
            { status },
            { new: true }
        );

        res.json(driver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
