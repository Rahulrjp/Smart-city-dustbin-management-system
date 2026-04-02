import { Filter, Search, Trash2 } from "lucide-react";
import { binData } from "../../../data/mockAdminData";

const BinMonitoring = () => {
    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-white">Bin Monitoring Center</h2>
                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input type="text" placeholder="Search by ID or Zone..." className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500" />
                    </div>
                    <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800">
                        <Filter className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {binData.map(bin => (
                    <div key={bin.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-emerald-500/50 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${bin.level > 80 ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                                    <Trash2 className={`w-6 h-6 ${bin.level > 80 ? 'text-red-500' : 'text-emerald-500'}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-white">{bin.id}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{bin.zone}</p>
                                </div>
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase border ${bin.level > 80 ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                                {bin.type}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-slate-400">Fill Level</span>
                                    <span className={`font-bold ${bin.level > 80 ? 'text-red-500' : 'text-emerald-400'}`}>{bin.level}%</span>
                                </div>
                                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-1000 ${bin.level > 80 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${bin.level}%` }}></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-800/50 p-3 rounded-2xl">
                                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Battery</p>
                                    <p className={`text-sm font-bold ${bin.battery < 20 ? 'text-amber-500' : 'text-white'}`}>{bin.battery}%</p>
                                </div>
                                <div className="bg-slate-800/50 p-3 rounded-2xl">
                                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Last Sync</p>
                                    <p className="text-sm font-bold text-white">{bin.lastPing}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default BinMonitoring;