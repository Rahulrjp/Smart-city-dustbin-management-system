import { Router } from 'express';
import { createBin, getBinData, updateBinData } from '../controllers/bin.controller.js';

const router = Router();

router.route('/bin/:binId').get(getBinData);
router.route('/bin').post(updateBinData);
router.route('/bin/create').post(createBin);

export const binRouter = router;