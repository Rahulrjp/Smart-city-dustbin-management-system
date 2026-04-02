import { Bell, ShieldCheck, Smartphone, Truck, User } from "lucide-react";
import { driverStats } from "../../../data/mockDriverData";
import SettingsOption from "./SettingsOption";

const SettingsView = () => {

    return <div className="max-w-3xl space-y-8 animate-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
            <div className="flex items-center gap-6 pb-8 border-b border-slate-800">
                <div className="relative">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" className="w-24 h-24 rounded-full border-4 border-emerald-500/20 object-cover" />
                    <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full border-4 border-slate-900 text-slate-900"><Smartphone className="w-4 h-4" /></button>
                </div>
                <div><h3 className="text-xl font-bold text-white">{driverStats.name}</h3><p className="text-slate-400">Senior Field Executive</p><span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20 uppercase mt-2 inline-block">Verified Driver</span></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                <SettingsOption icon={User} label="Personal Information" sub="Edit phone, address, and profile pic" />
                <SettingsOption icon={Truck} label="Vehicle Diagnostics" sub="Check engine, tires, and oil status" />
                <SettingsOption icon={Bell} label="Notifications" sub="Toggle sound, alerts, and SMS" />
                <SettingsOption icon={ShieldCheck} label="Security" sub="Change PIN and authentication" />
            </div>
            <div className="pt-4"><button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all border border-slate-700">Export Shift Report (.PDF)</button></div>
        </div>
    </div>
};

export default SettingsView;