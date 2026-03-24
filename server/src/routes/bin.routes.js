import { Router } from 'express';
import { createBin, getBinData, updateBinData } from '../controllers/bin.controller.js';

const router = Router();

router.route('/bin/create').post(createBin);
router.route('/bin/:binId').get(getBinData);

router.route('/bin/esp-32/update').patch(updateBinData);    // fetched by the ESP-32 module


export const binRouter = router;