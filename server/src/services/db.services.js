import BinModel from "../models/Bin.Schema.js";
import UserModel from "../models/UserSchema.js"
import { getBinStatus } from "./bin.services.js";

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
    const bin = await BinModel.findOne({ binId });
    return bin;
}

export const findBinAndUpdate = async (binId, fill, distance) => {
    const bin = await BinModel.findOneAndUpdate({ binId }, { fill, distance, status: getBinStatus(fill) }, { returnDocument: "after" });
    return bin;
}