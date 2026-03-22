import BinModel from "../models/Bin.Schema.js";
import { findBinAndUpdate, getBinById } from "../services/db.services.js";

export const createBin = async (req, res) => {
    const { location, binHeight, binId } = req.body;

    const binData = {
        binId,
        location,
        totalHeight: {
            value: binHeight,
        },
        distance: {
            value: binHeight,
        }
    }

    try {
        const bin = await BinModel.create(binData);
        return res.status(201).json({ message: "Bin created successfully", bin });
    } catch (error) {
        return res.status(500).json({ message: "Bin creation failed! please try again", error });
    }
}

export const updateBinData = async (req, res) => {
    const { fill, distance, binId } = req.body;

    console.log("Bin ID: ", binId);
    console.log("Fill: ", fill, "%");
    console.log("Distance: ", distance, "cm\n");

    try {
        const bin = await findBinAndUpdate(binId, fill, distance);
        return res.status(200).json({ message: "Data received", bin });
    } catch (error) {
        return res.status(500).json({ message: "Data reception failed! please try again", error });
    }
}

export const getBinData = async (req, res) => {
    const { binId } = req.params;

    try {
        const bin = await getBinById(binId);
        return res.status(200).json({ bin });
    } catch (error) {
        return res.json(404).json({ message: "Bin not found", error })
    }
}

