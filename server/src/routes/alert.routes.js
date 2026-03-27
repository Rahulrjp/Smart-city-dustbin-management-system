import express from "express";
import {
    getAllAlerts,
    getAlertById,
    getAlertsByBin,
    resolveAlert,
    deleteAlert
} from "../controllers/alert.controller.js";

const router = express.Router();

// 📋 Get all alerts
router.route("/").get(getAllAlerts);

// 🔍 Get alert by ID
router.route("/:id").get(getAlertById);

// 🗑️ Get alerts for a specific bin
router.route("/bins/:binId").get(getAlertsByBin);

// ✅ Mark alert as resolved
router.route("/:id/resolve").patch(resolveAlert);

// ❌ Delete alert (admin)
router.route("/:id").delete(deleteAlert);

const alertRouter = router;

export default alertRouter;