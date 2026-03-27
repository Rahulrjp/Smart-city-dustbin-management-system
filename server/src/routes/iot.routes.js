import { Router } from "express";
import { updateBinData } from "../controllers/iot.controller.js";

const router = Router();

router.route('/').patch(updateBinData);    // fetched by the ESP-32 module

const iotRouter = router;

export default iotRouter;