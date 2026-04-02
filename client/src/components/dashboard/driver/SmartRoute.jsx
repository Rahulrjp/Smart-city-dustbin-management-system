import { Clock, MapPin } from "lucide-react";
import MapView from "../MapView";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { normalizeBin, parseLocation } from "../../../utils/utils";
import { getBinData, getDriverProfile } from "../../../utils/api";

const SmartRoute = () => {

    const { user } = useAuth();

    const navigate = useNavigate();
    const [liveBins, setLiveBins] = useState([]);
    const [assignedRouteBins, setAssignedRouteBins] = useState([]);
    const [routeError, setRouteError] = useState("");
    const [activeSection, setActiveSection] = useState("Today's Route");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [driverProfile, setDriverProfile] = useState({});
    const hasCheckedSession = useRef(false);
    const [driverLocation, setDriverLocation] = useState({ lat: 20.2961, lng: 85.8245 });

    const sortedByPriority = useMemo(
        () => [...liveBins].filter((bin) => !bin.pickedUp).sort((a, b) => b.fill - a.fill),
        [liveBins]
    );

    const alerts = useMemo(
        () =>
            sortedByPriority.slice(0, 5).map((bin, index) => ({
                id: bin.id,
                fill: bin.fill,
                zone: `Zone ${String.fromCharCode(65 + (index % 4))}`,
                time: `${index + 1}h ago`,
            })),
        [sortedByPriority]
    );

    const driverStops = useMemo(() => {
        if (assignedRouteBins.length > 0) {
            return assignedRouteBins.filter((bin) => !bin.pickedUp);
        }
        return sortedByPriority.slice(0, 8);
    }, [assignedRouteBins, sortedByPriority]);

    const fetchBinsData = useCallback(async () => {
        try {
            const bins = await getBinData();
            setLiveBins([normalizeBin(bins[0], 0)]);
            console.log("Fetched bins data:", bins);
        } catch (error) {
            console.error("Error fetching bins data:", error);
        }
    }, [normalizeBin]);


    const fetchDriverProfile = useCallback(async () => {
        try {
            const driverData = await getDriverProfile(user?._id);
            if (driverData) {
                setDriverProfile(driverData);
            }
            setVehicleNumber(driverData?.vehicleNumber || "");
        } catch (error) {
            console.error("Error fetching driver profile:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchDriverProfile();
    }, [user]);

    useEffect(() => {
        fetchBinsData();

        const intervalId = setInterval(fetchBinsData, 30000); // Poll every 30 seconds
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [fetchBinsData]);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setDriverLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                console.log("Updated driver location:", driverLocation);
            },
            (error) => {
                console.error("Error watching location:", error);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );

        // cleanup when component unmounts
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return <div className="h-full z-0 flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500 overflow-hidden">
        <div className="flex justify-between items-center shrink-0">
            <h2 className="text-2xl font-bold text-white">Optimized Route</h2>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">Live Traffic Enabled</span>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
            <div className="xl:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative min-h-87.5">


                {/* MAP PLACEHOLDER */}
                <div className="h-150 overflow-hidden rounded-xl border border-(--color-accent-25)">
                    <MapView bins={liveBins} routeBins={driverStops} driverLocation={driverLocation} />
                </div>

            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 overflow-y-auto custom-scrollbar">
                <h3 className="font-bold mb-6 flex items-center gap-2 text-white"><Clock className="w-4 h-4 text-emerald-400" /> Turn-by-turn Navigation</h3>
                <div className="space-y-8">
                    {[
                        { dir: 'Turn Right', road: 'Main Avenue', dist: '200m', active: true },
                        { dir: 'Keep Left', road: 'Metro Bypass', dist: '800m', active: false },
                        { dir: 'Destination', road: 'Sector 15 Station', dist: 'Arrive', active: false },
                    ].map((step, idx) => (
                        <div key={idx} className={`flex gap-4 items-start relative ${step.active ? 'opacity-100' : 'opacity-40'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${step.active ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                                <span className="text-xs font-black">{idx + 1}</span>
                            </div>
                            {idx !== 2 && <div className="absolute top-8 left-4 w-px h-8 bg-slate-800"></div>}
                            <div>
                                <p className={`font-bold leading-none mb-1 ${step.active ? 'text-white text-lg' : 'text-slate-400'}`}>{step.dir}</p>
                                <p className="text-xs text-slate-500">{step.road} • {step.dist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
};

export default SmartRoute;