import { Database, Layers, MapPin, ShieldCheck, Users } from "lucide-react";

const SettingsView = () => {
    return (
        <div className="max-w-3xl space-y-8 animate-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-bold text-white">System Configuration</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
                <div className="flex items-center gap-6 pb-8 border-b border-slate-800">
                    <div className="p-6 bg-slate-800 rounded-3xl border-2 border-emerald-500/20">
                        <Layers className="w-12 h-12 text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">System Admin Node</h3>
                        <p className="text-slate-400">Control Center #01 • New Delhi</p>
                        <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20 uppercase mt-2 inline-block">Secure Access</span>
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                    <SettingsOption icon={MapPin} label="Zone Management" sub="Add or redefine city collection zones" />
                    <SettingsOption icon={Users} label="Fleet & Personnel" sub="Manage driver profiles and shifts" />
                    <SettingsOption icon={Database} label="Data & Backups" sub="Access bin logs and historical data" />
                    <SettingsOption icon={ShieldCheck} label="System Security" sub="Control API keys and node access" />
                </div>
                <div className="pt-4 flex gap-4">
                    <button className="flex-1 py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all border border-emerald-400 shadow-lg shadow-emerald-500/10 uppercase tracking-widest text-xs">Save Configuration</button>
                    <button className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700 uppercase tracking-widest text-xs">Reset Node</button>
                </div>
            </div>
        </div>
    )
};

const SettingsOption = ({ icon: Icon, label, sub }) => (
    <button className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-800 transition-colors text-left w-full group">
        <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="font-bold text-white leading-none mb-1">{label}</p>
            <p className="text-xs text-slate-500 leading-tight">{sub}</p>
        </div>
    </button>
);

export default SettingsView;