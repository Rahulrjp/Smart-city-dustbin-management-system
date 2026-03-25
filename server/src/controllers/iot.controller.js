import { findBinAndUpdate } from "../services/iot.services.js";

// ESP-32 Controller
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
