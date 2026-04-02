import { Navigation, Smartphone, Truck, Users } from "lucide-react";
import { fleetData } from "../../../data/mockAdminData";

const FleetManagement = () => {
    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Fleet & Drivers</h2>
                <button className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm hover:bg-emerald-400 transition-all flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Onboard Driver
                </button>
            </div>

            <div className="grid gap-4">
                {fleetData.map(driver => (
                    <div key={driver.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col md:flex-row items-center gap-6 group hover:bg-slate-800/30 transition-all">
                        <div className="relative">
                            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center">
                                <User className="w-8 h-8 text-slate-500" />
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-slate-900 ${driver.status === 'On Route' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                                <h4 className="font-black text-white team-none text-lg">{driver.name}</h4>
                                <span className="text-[10px] font-bold text-slate-500 px-2 py-0.5 bg-slate-800 rounded uppercase tracking-tighter">{driver.id}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> {driver.vehicle}</span>
                                <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> {driver.status}</span>
                            </div>
                        </div>

                        <div className="w-full md:w-64 space-y-1">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Route Progress</span>
                                <span>{driver.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${driver.progress}%` }}></div>
                            </div>
                        </div>

                        <button className="p-3 bg-slate-800 text-white rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition-all group-hover:scale-105">
                            <Smartphone className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default FleetManagement;