import axios from "axios";
import { normalizeBin } from "./utils";

export const getBinData = async () => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/bins`;
        const res = await axios.get(url, { withCredentials: true });
        const bins = res.data.bins;
        return bins;
    } catch (error) {
        throw new Error("Error fetching bin data: " + error.message);
    }
}

export const getDriverProfile = async (userId) => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/drivers/users/${userId}`;
        const res = await axios.get(url, { withCredentials: true });
        return res.data;
    } catch (error) {
        throw new Error("Error fetching driver profile: " + error.message);
    }
}