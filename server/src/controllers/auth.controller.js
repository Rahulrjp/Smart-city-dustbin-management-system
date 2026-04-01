import OtpModel from "../models/OtpSchema.js";
import { authenticateUser, deleteSession, generateOtp, hashPassword, verifyJwtToken, verifyPassword } from "../services/auth.services.js";
import { createUser, getUserByEmail } from "../services/db.services.js";
import sendMail from "../services/nodemailer.services.js";

export const registerUser = async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
        const userExists = await getUserByEmail(email.toLowerCase());
        if (userExists) {
            return res.status(400).json({ message: "Email associated with another account" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await createUser(name, email.toLowerCase(), role, hashedPassword);

        const token = await authenticateUser(req, res, user);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            isLoggedIn: true,
            accessToken: token,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await getUserByEmail(email, true);
        if (!userExist || !(await verifyPassword(password, userExist.password))) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = await authenticateUser(req, res, userExist);

        console.log("User authenticated");
        console.log("User Exist : ", userExist);

        const user = {
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            role: userExist.role,
        };

        return res.status(200).json({
            message: "Login successful",
            user,
            isLoggedIn: true,
            accessToken: token,
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logoutUser = async (req, res) => {
    const baseConfig = {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    }
    const sessionId = verifyJwtToken(req.cookies.refresh_token).sessionId;
    try {
        await deleteSession(sessionId);
        res.clearCookie('access_token', { ...baseConfig });
        res.clearCookie('refresh_token', { ...baseConfig });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Logout failed" });
    }
}

export const sendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const userExist = await getUserByEmail(email);
        if (userExist) {
            return res.status(400).json({ message: "Email associated with another account" });
        }
        const otpExist = await OtpModel.findOne({ email });
        if (otpExist) {
            await OtpModel.deleteOne({ email });
        }
        const otp = generateOtp();
        sendMail(email, otp);
        await OtpModel.create({ email, otp });
        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "OTP sending failed" });
    }
}

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const otpExist = await OtpModel.findOne({ email });
        if (!otpExist) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if (otpExist.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        await OtpModel.deleteOne({ email });

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        return res.status(500).json({ message: "OTP verification failed" });
    }
};
