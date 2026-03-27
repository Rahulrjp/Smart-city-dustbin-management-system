//Optional Routes

import express from "express";
import {
    createRoute,
    getRoutes,
    getRouteByDriver,
    getRouteById,
    optimizeRoute,
    deleteRoute
} from "../controllers/route.controller.js";

const router = express.Router();

// 🧭 Create route manually
router.route("/").post(createRoute);

// 📋 Get all routes
router.route("/").get(getRoutes);

// 🚚 Get route for a driver
router.route("/drivers/:driverId").get(getRouteByDriver);

// 🔍 Get route by ID
router.route("/:id").get(getRouteById);

// ⚡ Generate optimized route
router.route("/:driverId/optimize").post(optimizeRoute);

// ❌ Delete route
router.route("/:id").delete(deleteRoute);

const routeRouter = router;

export default routeRouter;