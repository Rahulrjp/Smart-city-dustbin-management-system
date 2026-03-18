import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getColor } from "../../utils/utils";
import useLocation from "../../hooks/useLocation";
import { createDriverIcon } from "../icons/driverIcon";
import { createBinIcon } from "../icons/binIcon";

const MapView = ({ bins }) => {

    const { location } = useLocation();
    const driverIcon = createDriverIcon();
    const binIcon = createBinIcon();

    return (
        <MapContainer center={[20.2961, 85.8245]} zoom={14} style={{ height: "100%", width: "100%" }}>

            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Driver Location */}
            {location && (
                <Marker position={[location.lat, location.lng]} icon={driverIcon}>
                    <Popup>🚛 Driver Location</Popup>
                </Marker>
            )}

            {/* Bins */}
            {bins.map((bin) => (
                <Marker
                    icon={binIcon}
                    key={bin.id} position={[bin.lat, bin.lng]}>
                    <Popup>
                        <strong>{bin.id}</strong><br />
                        Fill: {bin.fill}%<br />
                        Status: {getColor(bin.fill)}
                    </Popup>
                </Marker>
            ))}

        </MapContainer>
    );
};

export default MapView;