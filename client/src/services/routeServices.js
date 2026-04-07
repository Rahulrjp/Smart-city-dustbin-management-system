import axios from "axios";

const API_KEY = import.meta.env.VITE_ORS_API_KEY;

export const getRoute = async (start, end) => {
    try {
        const res = await axios.post(
            "https://api.openrouteservice.org/v2/directions/driving-car",
            {
                coordinates: [
                    [start.lng, start.lat],
                    [end.lng, end.lat],
                ],
            },
            {
                headers: {
                    Authorization: API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );

        return res.data.routes[0];
    } catch (error) {
        console.error("Route error:", error);
        return null;
    }
};