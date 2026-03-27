import AlertModel from "../models/AlertSchema.js";
import PickupModel from "../models/PickupSchema.js";

export const getBinStatus = (fill) => {
    if (fill < 25) {
        return 'EMPTY';
    } else if (fill > 25 && fill <= 80) {
        return 'PARTIAL';
    } else if (fill > 80 && fill <= 99) {
        return 'FULL';
    } else {
        return 'OVERFLOW';
    }
}

export const createAlertAndPickup = async ({ binId, message, severity }) => {
    try {
        const alert = await AlertModel.create({
            bin: binId, //objectId of bin
            message,
            severity
        });

        const pickup = await PickupModel.create({
            bin: binId,        //objectId
            status: "pending",
            assignedAt: new Date()
        });

        console.log("Alert created");
        console.log("Pickup created");

        return { alert, pickup };
    } catch (error) {
        console.log("Error creating alert: ", error);
        throw new Error(error.message);
    }
};