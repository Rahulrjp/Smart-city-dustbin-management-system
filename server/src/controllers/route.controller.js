// Optional Controller 

import RouteModel from "../models/RouteSchema.js";
import BinModel from "../models/BinSchema.js";

// ➕ Create route manually
export const createRoute = async (req, res) => {
    try {
        const { driverId, bins } = req.body;

        const route = await RouteModel.create({
            driver: driverId,
            bins
        });

        res.status(201).json({
            success: true,
            data: route
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 📋 Get all routes
export const getRoutes = async (req, res) => {
    try {
        const routes = await RouteModel.find()
            .populate("driver")
            .populate("bins");

        res.json({ success: true, data: routes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🚚 Get route by driver
export const getRouteByDriver = async (req, res) => {
    try {
        const route = await RouteModel.findOne({ driver: req.params.driverId })
            .populate("bins");

        res.json({ success: true, data: route });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔍 Get route by ID
export const getRouteById = async (req, res) => {
    try {
        const route = await RouteModel.findById(req.params.id)
            .populate("driver")
            .populate("bins");

        res.json({ success: true, data: route });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ⚡ Optimize route (basic version)
export const optimizeRoute = async (req, res) => {
    try {
        const { driverId } = req.params;
        const { lng, lat } = req.query;

        // 🔍 Find FULL bins
        const bins = await BinModel.find({
            status: { $in: ["FULL", "OVERFLOW"] }
        });

        // 🧠 Sort by nearest distance (simple logic)
        const sortedBins = bins.sort((a, b) => {
            const distA = Math.sqrt(
                Math.pow(a.location.coordinates[0] - lng, 2) +
                Math.pow(a.location.coordinates[1] - lat, 2)
            );
            const distB = Math.sqrt(
                Math.pow(b.location.coordinates[0] - lng, 2) +
                Math.pow(b.location.coordinates[1] - lat, 2)
            );
            return distA - distB;
        });

        const route = await RouteModel.create({
            driver: driverId,
            bins: sortedBins.map(b => b._id)
        });

        res.json({
            success: true,
            data: route
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ❌ Delete route
export const deleteRoute = async (req, res) => {
    try {
        await RouteModel.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Route deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};