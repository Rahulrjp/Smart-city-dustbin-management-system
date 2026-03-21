import OtpModel from "../models/OtpSchema.js";
import UserModel from "../models/UserSchema.js";
import { authenticateUser, generateOtp, hashPassword, verifyPassword } from "../services/auth.services.js";
import { getUserByEmail } from "../services/db.services.js";
import sendMail from "../services/nodemailer.services.js";

export const registerUser = async (req, res) => {
    const { name, email, role, password } = req.body;

    console.log("req.body : ", req.body);

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Email associated with another account" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
        name,
        email,
        role,
        password: hashedPassword
    });

    return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const userExist = await getUserByEmail(email);
    if (!userExist || !(await verifyPassword(password, userExist.password))) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = await authenticateUser(req, res, userExist);

    console.log("User authenticated");


    req.user = {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email
    }

    return res.status(200).json({
        message: "Login successful",
        user: userExist,
        isLoggedIn: true,
        accessToken: token
    })
}

export const logoutUser = async (req, res) => {
    const baseConfig = {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    }

    res.clearCookie('access_token', { ...baseConfig });
    res.clearCookie('refresh_token', { ...baseConfig });

    return res.status(200).json({ message: "Logout successful" });
}

export const sendOtp = async (req, res) => {
    const { email } = req.body;

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
}

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const otpExist = await OtpModel.findOne({ email });
    if (!otpExist) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpExist.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    await OtpModel.deleteOne({ email });

    return res.status(200).json({ message: "OTP verified successfully" });
};
