import UserModel from "../models/UserSchema.js"
import { hashPassword } from "../services/auth.services.js";

export const getUsers = async (req, res) => {
    const users = await UserModel.find().select("-password");
    return res.json(users);
}

export const getUserById = async (req, res) => {
    const id = req.user._id;
    const user = await UserModel.findById(id).select("-password");
    return res.status(200).json(user);
}

export const updateUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const id = req.user._id;

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.findByIdAndUpdate(id,
        { name, email, password: hashedPassword, role },
        { returnDocument: 'after' })
        .select("-password");
    return res.status(200).json({ message: "User updated successfully", user });
}

export const deleteUser = async (req, res) => {
    const id = req.user._id;
    res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'none' });
    res.clearCookie('refresh_token', { httpOnly: true, secure: true, sameSite: 'none' });
    const user = await UserModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "User deleted successfully", user });
}