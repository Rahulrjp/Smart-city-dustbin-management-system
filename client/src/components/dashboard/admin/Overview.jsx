import { Activity, AlertTriangle, Database, Loader2, PieChart, Trash2, TrendingUp, Truck } from "lucide-react";
import { useState } from "react";
import StatCard from "../../cards/StatCard";
import { adminStats, binData } from "../../../data/mockAdminData";

const Overview = ({ setActiveTab }) => {
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const [reportStatus, setReportStatus] = useState(null);

    const DistributionRow = ({ label, percent, color }) => (
        <div>
            <div className="flex justify-between text-xs mb-1.5 font-bold">
                <span className="text-slate-400">{label}</span>
                <span className="text-white">{percent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );

    const handleGenerateReport = () => {
        setIsGeneratingReport(true);
        setReportStatus(null);

        // Simulate generation process
        setTimeout(() => {
            setIsGeneratingReport(false);
            setReportStatus('City_Waste_Report_April_2026.pdf generated successfully!');

            // Auto-clear status after 5 seconds
            setTimeout(() => setReportStatus(null), 5000);
        }, 2500);
    };
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">City Overview</h1>
                    <p className="text-slate-400">Live monitoring of waste management infrastructure.</p>
                </div>
                <div className="relative">
                    <button
                        onClick={handleGenerateReport}
                        disabled={isGeneratingReport}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg ${isGeneratingReport
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/10'
                            }`}
                    >
                        {isGeneratingReport ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Database className="w-4 h-4" />
                        )}
                        {isGeneratingReport ? 'Compiling Data...' : 'Generate System Report'}
                    </button>

                    {reportStatus && (
                        <div className="absolute top-full right-0 mt-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] px-3 py-1.5 rounded-lg font-bold animate-in fade-in slide-in-from-top-1">
                            {reportStatus}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard icon={Trash2} label="Total Smart Bins" value={adminStats.totalBins} color="emerald" subValue="+12 this month" />
                <StatCard icon={Truck} label="Fleet Activity" value={adminStats.activeDrivers} color="blue" subValue="92% active now" />
                <StatCard icon={AlertTriangle} label="Critical Alerts" value={adminStats.criticalBins} color="red" subValue="Requires attention" />
                <StatCard icon={TrendingUp} label="Waste Collected" value={adminStats.wasteCollected} color="purple" subValue="Monthly target: 85%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                                <Activity className="w-5 h-5 text-emerald-400" />
                                Live Bin Levels
                            </h2>
                            <button onClick={() => setActiveTab('bins')} className="text-xs font-bold text-emerald-400 hover:underline">View Monitoring</button>
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
                                    {binData.map(bin => (
                                        <tr key={bin.id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4 font-mono text-sm text-emerald-400">{bin.id}</td>
                                            <td className="px-6 py-4 text-sm text-white font-semibold">{bin.zone}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-slate-800 h-1.5 rounded-full min-w-15 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${bin.level > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                            style={{ width: `${bin.level}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-300">{bin.level}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${bin.level > 80 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                                    {bin.level > 80 ? 'CRITICAL' : 'OPTIMAL'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-blue-400" />
                            Waste Distribution
                        </h3>
                        <div className="space-y-4">
                            <DistributionRow label="Organic" percent={55} color="bg-emerald-500" />
                            <DistributionRow label="Recyclable" percent={30} color="bg-blue-500" />
                            <DistributionRow label="Hazardous" percent={15} color="bg-amber-500" />
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl shadow-emerald-500/10">
                        <h3 className="font-black text-lg mb-2">Fleet Efficiency</h3>
                        <p className="text-sm opacity-90 mb-6 leading-relaxed">Today's collection routes are 14% more efficient than last week.</p>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase font-bold opacity-75">Avg Speed</p>
                                <p className="text-xl font-black tracking-tighter">24 km/h</p>
                            </div>
                            <div className="h-10 w-px bg-white/20"></div>
                            <div>
                                <p className="text-xs uppercase font-bold opacity-75">Turnaround</p>
                                <p className="text-xl font-black tracking-tighter">18 mins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Overview;