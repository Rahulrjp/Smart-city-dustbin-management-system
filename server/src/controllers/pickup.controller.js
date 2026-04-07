import PickupModel from "../models/PickupSchema.js";
import BinModel from "../models/BinSchema.js";
import DriverModel from "../models/DriverSchema.js";
import AlertModel from "../models/AlertSchema.js";

// ➕ Create pickup
export const createPickup = async (req, res) => {
    const { binId } = req.body;
    try {
        const pickup = await PickupModel.create({
            bin: binId,        //objectId
            status: "pending",
            assignedAt: new Date()
        });

        res.status(201).json({
            success: true,
            pickup
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📦 Get all pickups
export const getAllPickups = async (req, res) => {
    try {
        const pickups = await PickupModel.find()
            .populate("bin")
            .populate("driver")
            .sort({ createdAt: -1 });

        console.log(pickups);


        res.json({ success: true, pickups });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📦 Get pending pickups

export const getPendingPickups = async (req, res) => {
    try {
        const pickups = await PickupModel.find({ status: "pending" })
            .populate("bin")
            .populate("driver")
            .sort({ createdAt: -1 });
        console.log("Pending pickups:", pickups);
        res.json({ success: true, pickups });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 📦 Get ongoing pickups

export const ongoingPickups = async (req, res) => {
    try {
        const pickups = await PickupModel.find({ status: "accepted" })
            .populate("bin")
            .populate("driver")
            .sort({ createdAt: -1 });
        console.log("Ongoing pickups:", pickups);
        res.json({ success: true, pickups });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// 📦 Get pickup by ID
export const getPickupById = async (req, res) => {

    const { pickupId } = req.params;

    try {
        const pickup = await PickupModel.findById(pickupId)
            .populate("bin")
            .populate("driver");

        res.json({ success: true, pickup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🚚 Get pickups for a driver
export const getDriverPickups = async (req, res) => {
    const { driverId } = req.params;

    try {
        const pickups = await PickupModel.find({ driver: driverId })
            .populate("bin")
            .sort({ createdAt: -1 });

        res.json({ success: true, pickups });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Accept pickup by driver
export const acceptPickup = async (req, res) => {
    try {
        const { driverId } = req.body;
        const { pickupId } = req.params;

        const pickup = await PickupModel.findByIdAndUpdate(
            pickupId,
            {
                driver: driverId,
                status: "accepted"
            },
            { new: true }
        ).populate("bin");

        await DriverModel.findByIdAndUpdate(driverId, { status: "busy" });

        res.json({ success: true, pickup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🏁 Complete pickup
export const completePickup = async (req, res) => {
    const { pickupId } = req.params;

    try {
        const pickup = await PickupModel.findByIdAndUpdate(
            pickupId,
            {
                status: "completed",
                completedAt: new Date()
            },
            { returnDocument: "after" }
        ).populate("bin");

        console.log("Pickup after completion:", pickup);

        // 🔄 Optional: reset bin after collection
        await AlertModel.findOneAndUpdate({ bin: pickup.bin, isResolved: false }, { isResolved: true });

        await BinModel.findByIdAndUpdate(pickup.bin, {
            fillLevel: 0,
            status: "EMPTY"
        });

        res.json({ success: true, pickup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ❌ Delete pickup
export const deletePickup = async (req, res) => {
    const { pickupId } = req.params;
    try {
        await PickupModel.findByIdAndDelete(pickupId);

        res.json({
            success: true,
            message: "Pickup deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};