import { Router } from "express";
import { updateBinData } from "../controllers/iot.controller.js";

const router = Router();

router.route('/bin/esp-32/update').patch(updateBinData);    // fetched by the ESP-32 module

const iotRouter = router;

export default iotRouter;