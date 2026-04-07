import { Filter, Navigation, Search, Trash2 } from "lucide-react";
import TaskItem from "../../items/TaskItem.jsx";
import { tasks } from "../../../data/mockDriverData.js";
import { useCallback, useEffect, useState } from "react";
import { getDriverProfile, getOngoingPickups, getPendingPickups, getPickups } from "../../../utils/api.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getRelativeDate } from "../../../utils/formatDate.js";
import axios from "axios";

const TaskList = ({ setActiveTab, driverProfile }) => {

    const { user } = useAuth();
    const [pickups, setPickups] = useState([]);
    const [pendingPickups, setPendingPickups] = useState([]);
    const [ongoingPickups, setOngoingPickups] = useState([]);

    useEffect(() => {
        const fetchPickups = async () => {
            try {
                const pending = await getPendingPickups();
                const accepted = await getOngoingPickups();
                setPendingPickups(pending);
                setOngoingPickups(accepted);
            } catch (error) {
                console.error("Error fetching ongoing pickups:", error);
            }
        }
        fetchPickups();
        const intervalId = setInterval(() => {
            fetchPickups();
        }, 30000); // Poll every 30 seconds
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [])

    const handleAcceptPickup = async (pickupId) => {
        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/pickups/${pickupId}/accept`
            const res = await axios.patch(url, { driverId: driverProfile?._id }, { withCredentials: true });
            setPendingPickups(prev => prev.filter(pickup => pickup._id !== pickupId));
            setOngoingPickups(prev => [...prev, res.data.pickup]);
            console.log("Pickup accepted:", res.data);
        } catch (error) {
            console.error("Error accepting pickup:", error);
        }
    }

    const handleCompletePickup = async (pickupId) => {
        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/pickups/${pickupId}/complete`
            const res = await axios.patch(url, {}, { withCredentials: true });
            setOngoingPickups(prev => prev.filter(pickup => pickup._id !== pickupId));
            console.log("Pickup completed:", res.data);
        } catch (error) {
            console.error("Error completing pickup:", error);
        }
    }


    return <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Assigned Tasks</h2>
            <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" placeholder="Search bins..." className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 text-slate-700" />
                </div>
                <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800"><Filter className="w-5 h-5 text-slate-400" /></button>
            </div>
        </div>

        {/* Ongoing Pickups  */}
        <h3 className="text-lg font-bold text-white">Ongoing Pickups</h3>
        <div className="grid gap-4">{ongoingPickups?.map(pickup => <div key={pickup._id} className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 hover:bg-slate-800/40 transition-all group border-l-4 border-l-transparent hover:border-l-emerald-500">
            <div className="w-full sm:w-16 h-16 rounded-2xl bg-slate-800 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                <Trash2 className="w-5 h-5 text-slate-500 z-10" />
                <span className="text-[10px] font-black text-white z-10">{pickup.bin.fill.value}%</span>
                <div className={`absolute bottom-0 left-0 w-full opacity-30 ${pickup.bin.fill.value >= 80 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ height: `${pickup.bin.fill.value}%` }}>
                </div>
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${pickup.bin.status === 'FULL' ? 'text-red-400 bg-red-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>{pickup.bin.status}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{pickup.type || 'Unknown type'}</span>
                </div><h4 className="font-bold text-white leading-tight">{pickup.bin.location.area || 'Location Not Added'}</h4>
                <p className="text-xs text-slate-500 mt-1">Last updated: {getRelativeDate(pickup.bin.lastUpdated) || '-'}</p>
            </div>
            <div className="flex gap-2 items-center">
                <button className="w-full sm:w-auto p-3.5 bg-emerald-500 text-slate-950 rounded-2xl font-black hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                    onClick={() => setActiveTab('route')}>
                    <Navigation className="w-5 h-5" />
                    <span className="sm:hidden">Start Route</span>
                </button>
                <button className="w-full sm:w-auto p-3.5 bg-emerald-500 text-slate-950 rounded-2xl font-black hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                    onClick={() => handleCompletePickup(pickup._id)}>
                    <span className="text-gray-800">Complete pickup</span>
                </button>
            </div>
        </div>)}
        </div>
        {ongoingPickups.length === 0 &&
            <div className="flex items-center justify-center h-24">
                <p className="text-slate-500 font-bold text-lg">No ongoing pickups</p>
            </div>}

        {/* Pending Pickups  */}
        <h3 className="text-lg font-bold text-white">Pending Pickups</h3>
        <div className="grid gap-4">{pendingPickups?.map(pickup => <div key={pickup._id} className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 hover:bg-slate-800/40 transition-all group border-l-4 border-l-transparent hover:border-l-emerald-500">
            <div className="w-full sm:w-16 h-16 rounded-2xl bg-slate-800 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
                <Trash2 className="w-5 h-5 text-slate-500 z-10" />
                <span className="text-[10px] font-black text-white z-10">{pickup.bin.fill.value}%</span>
                <div className={`absolute bottom-0 left-0 w-full opacity-30 ${pickup?.bin.fill.value >= 80 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ height: `${pickup?.bin.fill.value}%` }}>
                </div>
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${pickup.bin.status === 'FULL' ? 'text-red-400 bg-red-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>{pickup.bin.status}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{pickup.type || 'Unknown type'}</span>
                </div><h4 className="font-bold text-white leading-tight">{pickup.bin.location.area || 'Location Not Added'}</h4>
                <p className="text-xs text-slate-500 mt-1">Last updated: {getRelativeDate(pickup.bin.lastUpdated) || '-'}</p>
            </div>
            <div className="flex gap-2 items-center">
                <button className="w-full sm:w-auto p-3.5 bg-emerald-500 text-slate-950 rounded-2xl font-black hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                    onClick={() => setActiveTab('route')}>
                    <Navigation className="w-5 h-5" />
                    <span className="sm:hidden">Start Route</span>
                </button>
                <button className="w-full sm:w-auto p-3.5 bg-emerald-500 text-slate-950 rounded-2xl font-black hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                    onClick={() => handleAcceptPickup(pickup._id)}>
                    <span className="text-gray-800">Accept pickup</span>
                </button>
            </div>
        </div>)}
            {pendingPickups.length === 0 && <div className="flex items-center justify-center h-24">
                <p className="text-slate-500 font-bold text-lg">No pending pickups</p>
            </div>}
        </div>
    </div>
};

export default TaskList