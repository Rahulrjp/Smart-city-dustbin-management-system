import BinModel from "../models/BinSchema.js";
import UserModel from "../models/UserSchema.js"

export const getUserByEmail = async (email, includePassword = false) => {
    if (includePassword) {
        const user = await UserModel.findOne({ email });
        return user;
    }
    const user = await UserModel.findOne({ email }).select("-password");
    return user;
}

export const createUser = async (name, email, role, password) => {
    const user = await UserModel.create({
        name,
        email,
        role,
        password
    });
    return user;
}

export const getBinById = async (binId) => {
    const bin = await BinModel.findOne({ _id: binId });
    return bin;
}
