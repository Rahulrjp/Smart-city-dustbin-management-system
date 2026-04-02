import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getColor } from "../../utils/utils";
import { createDriverIcon } from "../icons/DriverIcon";
import { createBinIcon } from "../icons/BinIcon";
import axios from "axios";

const MapView = ({ bins, routeBins, driverLocation }) => {

    const driverIcon = createDriverIcon();
    const binIcon = createBinIcon();
    const [roadRoute, setRoadRoute] = useState([]);

    const routePoints = useMemo(
        () => routeBins.map((bin) => [bin.lat, bin.lng]),
        [routeBins]
    );

    const driverLat = driverLocation?.lat;
    const driverLng = driverLocation?.lng;

    const routeWithDriver = useMemo(
        () => (driverLat != null && driverLng != null ? [[driverLat, driverLng], ...routePoints] : routePoints),
        [driverLat, driverLng, routePoints]
    );

    useEffect(() => {
        console.log("Route Bins : ", routeBins);
        console.log("Route points : ", routePoints);
        console.log("Route with driver : ", routeWithDriver);


        const fetchRoadRoute = async () => {
            if (routeWithDriver.length < 2) {
                setRoadRoute([]);
                return;
            }

            try {
                const coordinates = routeWithDriver
                    .map(([lat, lng]) => `${lng},${lat}`)
                    .join(";");

                const response = await axios.get(
                    `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`
                );

                const data = response.data;

                if (!data?.routes?.length) {
                    throw new Error("No route found");
                }

                const roadPoints = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
                setRoadRoute(roadPoints);
            } catch (error) {
                console.error("Error fetching road route:", error);
                setRoadRoute(routeWithDriver);
            }
        };

        console.log("Calculating route for points:", routeBins);

        fetchRoadRoute();
    }, [routeWithDriver]);

    const getStatusLabel = (fill) => {
        const color = getColor(fill);
        if (color === "red") return "Critical";
        if (color === "yellow") return "Warning";
        return "Normal";
    };

    return (
        <MapContainer
            center={[20.2412658, 85.757551]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}   // ✅ enable mouse wheel zoom
            touchZoom={true} >

            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Driver Location */}
            {driverLocation && (
                <Marker position={[driverLocation.lat, driverLocation.lng]} icon={driverIcon}>
                    <Popup>🚛 Driver Location</Popup>
                </Marker>
            )}

            {/* Bins */}
            {bins.map((bin) => (
                <Marker
                    icon={binIcon}
                    key={bin.id} position={[bin.lat, bin.lng]}>
                    <Popup>
                        <strong>{bin.binNumber}</strong><br />
                        Fill: {bin.fill}%<br />
                        Status: {bin.pickedUp ? "Picked Up" : getStatusLabel(bin.fill)}
                    </Popup>
                </Marker>
            ))}

            {roadRoute.length > 1 && (
                <Polyline positions={roadRoute} pathOptions={{ color: "blue", weight: 4 }} />
            )}

        </MapContainer>
    );
};

export default MapView;