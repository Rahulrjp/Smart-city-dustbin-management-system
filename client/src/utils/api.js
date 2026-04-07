import axios from "axios";
import { normalizeBin } from "./utils";

export const getBinData = async () => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/bins`;
        const res = await axios.get(url, { withCredentials: true });
        const bins = res.data.bins;
        // console.log("Fetched bin data:", bins);
        return bins;
    } catch (error) {
        throw new Error("Error fetching bin data: " + error.message);
    }
}

export const getDriverProfile = async (userId) => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/drivers/users/${userId}`;
        const res = await axios.get(url, { withCredentials: true });
        // console.log("Fetched driver profile:", res.data);
        return res.data;
    } catch (error) {
        throw new Error("Error fetching driver profile: " + error.message);
    }
}

export const getAlerts = async () => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/alerts`;
        const res = await axios.get(url, { withCredentials: true });
        const alerts = res.data.alerts;
        // console.log("Fetched alerts data:", alerts);
        return alerts;
    } catch (error) {
        throw new Error("Error fetching alerts: " + error.message);
    }
}

export const getPickups = async () => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/pickups`;
        const res = await axios.get(url, { withCredentials: true });
        const pickups = res.data.pickups;
        // console.log("Fetched pickups data:", pickups);
        return pickups;
    } catch (error) {
        throw new Error("Error fetching pickups: " + error.message);
    }
}

export const getPendingPickups = async () => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/pickups/pending`;
        const res = await axios.get(url, { withCredentials: true });
        const pickups = res.data.pickups;
        // console.log("Fetched pending pickups data:", pickups);
        return pickups;
    } catch (error) {
        throw new Error("Error fetching pending pickups: " + error.message);
    }
}

export const getOngoingPickups = async () => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/pickups/ongoing`;
        const res = await axios.get(url, { withCredentials: true });
        const pickups = res.data.pickups;
        // console.log("Fetched ongoing pickups data:", pickups);
        return pickups;
    } catch (error) {
        throw new Error("Error fetching ongoing pickups: " + error.message);
    }
}


export const handleLogout = async (e) => {
    e.preventDefault();

    try {
        const user = await axios.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/api/v1/auth/logout`, { withCredentials: true });
        // console.log('Logout successful:', user.data);
        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
    }
}

export const updateDriverLocationOnServer = async (driverId, lat, lng) => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/driver/location`;
        const res = await axios.post(url, { driverId, lat, lng }, { withCredentials: true });
        console.log("Driver location updated:", res.data);
    } catch (error) {
        console.error("Error updating driver location:", error);
    }
}

export const getAllDriversLocations = async () => {
    try {
        const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/driver/locations`;
        const res = await axios.get(url, { withCredentials: true });
        console.log("Fetched driver locations:", res.data);
        return res.data.drivers;
    } catch (error) {
        console.error("Error fetching driver locations:", error);
        throw new Error("Error fetching driver locations: " + error.message);
    }
}