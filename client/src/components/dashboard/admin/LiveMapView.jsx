import { Layers, MapIcon, TrendingUp } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getBinData, getDriverProfile, getAllDriversLocations } from "../../../utils/api";
import { normalizeBin } from "../../../utils/utils";
import MapView from "../MapView";

const LiveMapView = () => {

    const { user } = useAuth();

    const [liveBins, setLiveBins] = useState([]);
    const navigate = useNavigate();
    const [assignedRouteBins, setAssignedRouteBins] = useState([]);
    const [routeError, setRouteError] = useState("");
    const [activeSection, setActiveSection] = useState("Today's Route");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [driverProfile, setDriverProfile] = useState({});
    const hasCheckedSession = useRef(false);
    const [driverLocation, setDriverLocation] = useState({ lat: 20.2961, lng: 85.8245 });
    const [locations, setLocations] = useState([]);


    const fetchBinsData = async () => {
        try {
            const bins = await getBinData();
            setLiveBins(bins);
            // console.log("Fetched bins data........................:", liveBins);
        } catch (error) {
            console.error("Error fetching bins data:", error);
        }
    };

    const fetchDriversLocation = async () => {
        try {
            const locs = await getAllDriversLocations();
            setLocations(locs);
        } catch (error) {
            console.error("Error fetching driver locations:", error); s
        }
    }

    useEffect(() => {
        fetchBinsData();
        fetchDriversLocation();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchBinsData();
            fetchDriversLocation();
            console.log("Driver locations updated:", locations);
        }, 10000); // Poll every 30 seconds
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setDriverLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                // console.log("Updated driver location:", driverLocation);
            },
            (error) => {
                console.error("Error watching location:", error);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );

        // cleanup when component unmounts
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white">Live Operations Map</h2>
                    <p className="text-sm text-slate-400">Real-time tracking of bins and fleet across all zones.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-white">All Zones</button>
                    <button className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-white">Active Only</button>
                </div>
            </div>

            <div className="flex-1 bg-slate-900 rounded-3xl border-slate-800 overflow-hidden relative border-2 border-dashed m-2">
                {/* MAP PLACEHOLDER */}
                <div className="h-150 overflow-hidden rounded-xl border border-(--color-accent-25)">
                    <MapView bins={liveBins} driverLocation={driverLocation} driverLocations={locations} />
                </div>
            </div>
        </div>
    )
};

export default LiveMapView;