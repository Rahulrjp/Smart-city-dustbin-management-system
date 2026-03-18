import UserModel from "../models/UserSchema.js"

export const getUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email });
    return user;
}