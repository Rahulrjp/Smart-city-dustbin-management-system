import BinModel from "../models/BinSchema.js";
import { getBinById } from "../services/db.services.js";

const normalizeLocationPayload = (location) => {
    if (!location) {
        return { type: "Point", coordinates: [0, 0] };
    }

    if (Array.isArray(location.coordinates) && location.coordinates.length >= 2) {
        return {
            type: location.type || "Point",
            coordinates: [Number(location.coordinates[0]), Number(location.coordinates[1])],
        };
    }

    if (typeof location.lat !== "undefined" && typeof location.lng !== "undefined") {
        return {
            type: "Point",
            coordinates: [Number(location.lng), Number(location.lat)],
        };
    }

    if (typeof location === "string") {
        const [latStr, lngStr] = location.split(",").map((v) => v.trim());
        const lat = Number(latStr);
        const lng = Number(lngStr);
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
            return {
                type: "Point",
                coordinates: [lng, lat],
            };
        }
    }

    return location;
};

export const getBinData = async (req, res) => {
    const { binId } = req.params;

    try {
        const bin = await getBinById(binId);
        return res.status(200).json({ bin });
    } catch (error) {
        return res.json(404).json({ message: "Bin not found", error })
    }
}

export const getAllBins = async (req, res) => {
    try {
        const bins = await BinModel.find({});
        return res.status(200).json({ bins });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching bins", error });
    }
}


export const createBin = async (req, res) => {
    const { location, binHeight, binNumber } = req.body;

    const binData = {
        binNumber,
        location: normalizeLocationPayload(location),
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
    const { binId } = req.params;

    try {
        const bin = await BinModel.findOneAndDelete({ binId });
        return res.status(200).json({ message: "Bin deleted successfully", bin });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting bin", error });
    }
}


