import AlertModel from "../models/AlertSchema.js";
import { createAlertAndPickup } from "../services/bin.services.js";
import { findBinAndUpdate } from "../services/iot.services.js";

// ESP-32 Controller
export const updateBinData = async (req, res) => {
    const { fill, distance, binNumber } = req.body;

    console.log("Bin ID: ", binNumber);
    console.log("Fill: ", fill, "%");
    console.log("Distance: ", distance, "cm\n");

    try {
        const bin = await findBinAndUpdate(binNumber, fill, distance);
        const alertExist = await AlertModel.findOne({ bin: bin._id, isResolved: false });
        if (fill > 80 && !alertExist) {
            const alert = await createAlertAndPickup({
                binId: bin._id,
                message: `Bin number ${binNumber} is ${fill}% ${fill < 100 ? "full" : "overflowing"}. Please clean it up.`,
                severity: `high`
            })
            return res.status(200).json({
                message: "Data received",
                bin,
                alert: alert.alert,
                pickup: alert.pickup
            });
        }
        return res.status(200).json({ message: "Data received", bin });
    } catch (error) {
        return res.status(500).json({ message: "Data reception failed! please try again", error });
    }
}
