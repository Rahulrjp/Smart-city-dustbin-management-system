import { Router } from 'express';
import { loginUser, logoutUser, registerUser, sendOtp, verifyOtp } from '../controllers/auth.controller.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').delete(logoutUser);

router.route('/otp/send').post(sendOtp);
router.route('/otp/verify').post(verifyOtp);

export const authRouter = router;