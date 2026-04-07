import AlertModel from "../models/AlertSchema.js";

// 📋 Get all alerts
export const getAllAlerts = async (req, res) => {
    try {
        const alerts = await AlertModel.find()
            .populate("bin")
            .sort({ createdAt: -1 });

        res.json({ success: true, alerts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔍 Get alert by ID
export const getAlertById = async (req, res) => {
    const alertId = req.params.id;
    try {
        const alert = await AlertModel.findById(alertId)
            .populate("bin");

        res.json({ success: true, data: alert });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🗑️ Get alerts for a bin
export const getAlertsByBin = async (req, res) => {
    try {
        const { binId } = req.params;

        const alerts = await AlertModel.find({ bin: binId })
            .sort({ createdAt: -1 });

        res.json({ success: true, data: alerts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Resolve alert
export const resolveAlert = async (req, res) => {
    try {
        const alert = await AlertModel.findByIdAndUpdate(
            req.params.id,
            { isResolved: true },
            { new: true }
        );

        res.json({ success: true, data: alert });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ❌ Delete alert
export const deleteAlert = async (req, res) => {

    const { id } = req.params;

    try {
        await AlertModel.findByIdAndDelete(id);
        console.log(`Alert with ID ${id} deleted successfully.`);
        return res.json({
            success: true,
            message: "Alert deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};