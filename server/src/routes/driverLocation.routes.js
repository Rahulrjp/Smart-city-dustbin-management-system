import express from "express";
import {
    addDriverLocation,
    getDriverLocation,
    getDriverLocationHistory,
    getNearbyDrivers,
    deleteDriverLocations,
    getAllDriversLocations
} from "../controllers/driverLocation.controller.js";

const router = express.Router();

// 📍 Add / Update driver location
router.route("/location").post(addDriverLocation);

// 📍 Get location of all active drivers
router.route("/locations").get(getAllDriversLocations);

// 📍 Get latest location of a driver
router.route("/:driverId/location").get(getDriverLocation);

// 📍 Get location history of a driver
router.route("/:driverId/location/history").get(getDriverLocationHistory);

// 📍 Get nearby drivers (for smart routing)
router.route("/nearby/location").get(getNearbyDrivers);

// 🧹 Delete old location logs (optional cleanup)
router.route("/:driverId/location/logs").delete(deleteDriverLocations);

const driverLocationRouter = router;

export default driverLocationRouter;