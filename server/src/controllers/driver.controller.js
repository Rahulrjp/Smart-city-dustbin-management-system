import UserModel from "../models/UserSchema.js"

export const getAllDrivers = async (req, res) => {
    try {
        const drivers = await UserModel.find({ role: 'driver' });
        return res.status(200).json({ message: "Drivers fetched successfully", drivers });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching drivers", error });
    }
}

export const getDriverById = async (req, res) => {
    const { driverId } = req.params;

    try {
        const driver = await UserModel.findById(driverId);
        return res.status(200).json({ message: "Driver fetched successfully", driver });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching driver", error });
    }
}