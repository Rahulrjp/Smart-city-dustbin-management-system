import { Router } from "express";
import { getAllDrivers, getDriverById } from "../controllers/driver.controller.js";

const router = Router();

router.route('/drivers').get(getAllDrivers);
router.route('/driver/:driverId').get(getDriverById);


// POST / api / drivers / location
// GET / api / drivers / location /: id
//to be added

const driverRouter = router;

export default driverRouter;
