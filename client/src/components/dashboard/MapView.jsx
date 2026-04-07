import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getColor } from "../../utils/utils";
import { createDriverIcon } from "../icons/DriverIcon";
import { createBinIcon } from "../icons/BinIcon";
import { getRoute } from "../../services/routeServices";
import polyline from "@mapbox/polyline";
import { useAuth } from "../../context/AuthContext";

const MapView = ({ bins, driverLocation, driverLocations, directions, setDirections }) => {
    const { user } = useAuth();
    const driverIcon = createDriverIcon("oklch(50% 0.183 134.934)");
    const redBin = createBinIcon("#FD3B3B");
    const orangeBin = createBinIcon("oklch(70% 0.183 55.934)");
    const greenBin = createBinIcon("oklch(60% 0.183 134.934)");

    const [roadRoute, setRoadRoute] = useState([]);
    const [selectedBin, setSelectedBin] = useState(null);


    const getStatusLabel = (fill) => {
        const color = getColor(fill);
        if (color === "red") return "Critical";
        if (color === "yellow") return "Warning";
        return "Normal";
    };

    // 🚀 MAIN FUNCTION
    const handleBinClick = async (bin) => {
        if (!driverLocation) return;

        const start = {
            lat: driverLocation.lat,
            lng: driverLocation.lng,
        };

        const end = {
            lat: bin.location.coordinates[0],
            lng: bin.location.coordinates[1],
        };

        const data = await getRoute(start, end);

        if (!data) return;

        // ✅ Decode route
        const decoded = polyline.decode(data.geometry);
        const latLngs = decoded.map(([lat, lng]) => [lat, lng]);

        setRoadRoute(latLngs);

        // ✅ Extract directions
        const steps = data.segments[0].steps;


        const currentStepIndex = 0; // later you can make this dynamic

        const formatted = steps.map((step, i) => ({
            instruction: step.instruction,
            distance: Math.round(step.distance),
            active: i === currentStepIndex,
        }));

        setDirections(formatted);
        console.log("Directions:", formatted);
        setSelectedBin(bin);
    };

    return (
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
            <MapContainer
                center={[20.2412658, 85.757551]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Driver */}
                {user.role === "driver" && driverLocation && (
                    <Marker
                        position={[driverLocation.lat, driverLocation.lng]}
                        icon={driverIcon}
                    >
                        <Popup>🚛 Driver Location</Popup>
                    </Marker>
                )}

                {/* Bins */}
                {bins.map((bin) => (
                    <Marker
                        key={bin._id}
                        position={[
                            bin.location.coordinates[0],
                            bin.location.coordinates[1],
                        ]}
                        icon={
                            bin.fill.value > 80
                                ? redBin
                                : bin.fill.value > 50
                                    ? orangeBin
                                    : greenBin
                        }
                        eventHandlers={{
                            click: () => handleBinClick(bin),
                        }}
                    />
                ))}
                {user.role === "admin" && driverLocations.map((location) => (
                    <Marker
                        key={location._id}
                        position={[
                            location.lat,
                            location.lng,
                        ]}
                        icon={
                            createDriverIcon("oklch(50% 0.183 134.934)")
                        }
                        eventHandlers={{
                            click: () => handleBinClick(bin),
                        }}
                    />
                ))}

                {/* Route */}
                {roadRoute.length > 1 && (
                    <Polyline
                        positions={roadRoute}
                        pathOptions={{ color: "blue", weight: 5 }}
                    />
                )}
            </MapContainer>

            {/* 📦 Bin Info */}
            {selectedBin && (
                <div
                    className={`${selectedBin.fill.value > 80
                        ? "bg-red-500"
                        : selectedBin.fill.value > 50
                            ? "bg-orange-400"
                            : "bg-green-500"
                        } absolute top-2 right-2 p-3 rounded-lg shadow-lg min-w-52 max-w-84`}
                    style={{ zIndex: 1000 }}
                >
                    <strong>{selectedBin.binNumber}</strong><br />
                    Fill: {selectedBin.fill.value}%<br />
                    Status: {getStatusLabel(selectedBin.fill.value)}<br />
                    Location: {selectedBin.location.area}
                </div>
            )}

            {/* 🧭 Directions Panel
            {directions.length > 0 && (
                <div
                    style={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        width: "300px",
                        maxHeight: "300px",
                        overflowY: "auto",
                        background: "red",
                        padding: "12px",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                        zIndex: 1000,
                    }}
                >
                    <h4>🧭 Directions</h4>

                    {directions.map((step, i) => (
                        <div key={i} style={{ marginBottom: "8px" }}>
                            <strong>{i + 1}.</strong> {step.instruction}
                            <br />
                            <small>{step.distance} m</small>
                        </div>
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default MapView;