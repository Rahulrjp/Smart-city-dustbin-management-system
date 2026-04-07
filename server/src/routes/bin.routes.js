import { Router } from 'express';
import { createBin, getAllBins, deleteBin, getBinData, updateBinById } from '../controllers/bin.controller.js';

const router = Router();

router.route('/').post(createBin);
router.route('/').get(getAllBins);
router.route('/:binId').patch(updateBinById)
router.route('/:binId').get(getBinData);
router.route('/:binId').delete(deleteBin);


const binRouter = router;

export default binRouter;