import BinModel from "../models/BinSchema.js";
import { getBinById } from "../services/db.services.js";

const normalizeLocationPayload = (location, area) => {
    if (!location) {
        console.log("No location provided");
        return { type: "Point", coordinates: [0, 0], area: area || 'Unspecified Area' };
    }

    if (Array.isArray(location.coordinates) && location.coordinates.length >= 2) {
        return {
            area: area || 'Unspecified Area',
            type: location.type || "Point",
            coordinates: [Number(location.coordinates[0]), Number(location.coordinates[1])],
        };
    }

    if (typeof location.lat !== "undefined" && typeof location.lng !== "undefined") {
        return {
            area: area || 'Unspecified Area',
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
                area: area || 'Unspecified Area',
                type: "Point",
                coordinates: [lat, lng],
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
    const { location, binHeight, binNumber, area } = req.body;
    console.log("Received bin data:", req.body);

    const binData = {
        binNumber,
        location: normalizeLocationPayload(location, area),

        totalHeight: {
            value: binHeight,
        },
        distance: {
            value: binHeight,
        }
    }
    console.log("Creating bin with data:", binData);
    try {
        const bin = await BinModel.create(binData);
        console.log("Bin created successfully:", bin);
        return res.status(201).json({ message: "Bin created successfully", bin });
    } catch (error) {
        console.error("Error creating bin:", error);
        return res.status(500).json({ message: "Bin creation failed! please try again", error });
    }
}

export const updateBinById = async (req, res) => {
    const { binId } = req.params;
    const { binHeight, location, area } = req.body;
    try {
        const bin = await BinModel.findOneAndUpdate(
            { binId },
            {
                totalHeight: {
                    value: binHeight,
                },
                location: normalizeLocationPayload(location, area),
            },
            { returnDocument: "after" }
        );
        return res.status(200).json({ message: "Bin updated successfully", bin });
    } catch (error) {
        return res.status(500).json({ message: "Error updating bin", error });
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


