import BinModel from "../models/Bin.Schema.js";
import { getBinStatus } from "./bin.services.js";

export const findBinAndUpdate = async (binId, fill, distance) => {
    const bin = await BinModel.findOneAndUpdate({ binId }, {
        fill: {
            value: fill,
        },
        distance: {
            value: distance,
        },
        status: getBinStatus(fill)
    }, { returnDocument: "after" });
    return bin;
}