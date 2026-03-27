import express from "express";
import {
    createPickup,
    getAllPickups,
    getPickupById,
    getDriverPickups,
    acceptPickup,
    completePickup,
    deletePickup
} from "../controllers/pickup.controller.js";

const router = express.Router();

// 📦 Create pickup request (bin is full)
router.route("/").post(createPickup);

// 📦 Get all pickups
router.route("/").get(getAllPickups);

// 📦 Get single pickup
router.route("/:pickupId").get(getPickupById);

// 🚚 Get pickups assigned to a driver
router.route("/driver/:driverId").get(getDriverPickups);

// ✅ Accept pickup
router.route("/:pickupId/accept").patch(acceptPickup);

// 🏁 Complete pickup
router.route("/:pickupId/complete").patch(completePickup);

// ❌ Delete pickup (admin use)
router.route("/:pickupId").delete(deletePickup);

const pickupRouter = router;

export default pickupRouter;