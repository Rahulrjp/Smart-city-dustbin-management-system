import AlertCard from "../../cards/AlertCard";
import DutyCard from "../../cards/DutyCard";
import StatCard from "../../cards/StatCard";
import TaskItem from "../../items/TaskItem";
import { driverStats, tasks } from '../../../data/mockDriverData.js'
import { Activity, Battery, CheckCircle2, MapPin, Truck } from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useCallback, useEffect, useState } from "react";
import { getBinData, getDriverProfile } from "../../../utils/api.js";

const Overview = ({ driverProfile }) => {

    const { user } = useAuth();
    const [liveBins, setLiveBins] = useState([]);

    const fetchBinsData = async () => {
        try {
            const bins = await getBinData();
            setLiveBins(bins);
            // console.log("Fetched bins data........................:", liveBins);
        } catch (error) {
            console.error("Error fetching bins data:", error);
        }
    };

    useEffect(() => {
        fetchBinsData();

        const intervalId = setInterval(() => {
            fetchBinsData();
        }, 10000); // Poll every 30 seconds
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);



    return <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name || 'Driver'}!</h1>
            <p className="text-sm text-slate-400">Your current shift: 08:00 AM - 04:00 PM</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Truck} label="Vehicle No." value={driverProfile.vehicleNumber} color="emerald" tag="Active" />
            <StatCard icon={Battery} label="Fuel Level" value={`${driverStats.fuel}%`} color="blue" progress={driverStats.fuel} />
            <StatCard icon={CheckCircle2} label="Progress" value="50%" color="purple" subValue={`${driverStats.binsCollected}/${driverStats.totalBins} Bins`} />
            <StatCard icon={MapPin} label="Total Distance" value={driverStats.distanceCovered} color="amber" />
        </div>

        <div className="flex flex-col gap-8">
            <div className="lg:col-span-2 space-y-8">
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                            <Activity className="w-5 h-5 text-emerald-400" />
                            Live Bin Levels
                        </h2>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Bin ID</th>
                                    <th className="px-6 py-4">Zone</th>
                                    <th className="px-6 py-4">Fill Level</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {liveBins.map(bin => (
                                    <tr key={bin._id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm text-emerald-400">{bin.binNumber}</td>
                                        <td className="px-6 py-4 text-sm text-white font-semibold">{bin.location.area || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 bg-slate-800 h-1.5 rounded-full min-w-15 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${bin.fill.value > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                        style={{ width: `${bin.fill.value}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-slate-300">{bin.fill.value}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${bin.fill.value > 80 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                                {bin.fill.value > 80 ? 'CRITICAL' : 'OPTIMAL'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    </div>
};

export default Overview;