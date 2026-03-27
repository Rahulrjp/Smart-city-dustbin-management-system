import { Router } from "express";
import {
    getAllDrivers,
    getDriverById,
    updateDriverStatus,
    createDriver
} from "../controllers/driver.controller.js";

const router = Router();

router.route('/').get(getAllDrivers);

router.route('/').post(createDriver);

router.route('/:driverId').get(getDriverById);

// PUT /api/drivers/:id/status
router.route("/:driverId/status").patch(updateDriverStatus);

const driverRouter = router;

export default driverRouter;