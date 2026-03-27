import BinModel from "../models/BinSchema.js";
import { getBinStatus } from "./bin.services.js";

export const findBinAndUpdate = async (binNumber, fill, distance) => {
    const bin = await BinModel.findOneAndUpdate({ binNumber }, {
        fill: {
            value: fill,
        },
        distance: {
            value: distance,
        },
        status: getBinStatus(fill)
    }, { returnDocument: "after" });

    console.log("Bin updated");
    return bin;
}