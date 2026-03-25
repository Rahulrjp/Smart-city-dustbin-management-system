import BinModel from "../models/Bin.Schema.js";
import { getBinById } from "../services/db.services.js";

export const getBinData = async (req, res) => {
    const { binId } = req.params;

    try {
        const bin = await getBinById(binId);
        return res.status(200).json({ bin });
    } catch (error) {
        return res.json(404).json({ message: "Bin not found", error })
    }
}

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

export const deleteBin = async (req, res) => {
    const { binId } = req.body;

    try {
        const bin = await BinModel.findOneAndDelete({ binId });
        return res.status(200).json({ message: "Bin deleted successfully", bin });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting bin", error });
    }
}


