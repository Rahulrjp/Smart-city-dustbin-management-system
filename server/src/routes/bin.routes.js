import { Router } from 'express';
import { createBin, deleteBin, getBinData } from '../controllers/bin.controller.js';

const router = Router();

router.route('/bin/create').post(createBin);
router.route('/bin/:binId').get(getBinData);
router.route('/bin/delete').delete(deleteBin);

export const binRouter = router;