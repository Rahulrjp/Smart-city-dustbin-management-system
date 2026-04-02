import { AlertTriangle, ShieldAlert } from "lucide-react";
import { systemAlerts } from "../../../data/mockDriverData";

const AlertsView = () => {
    return <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-red-500">
                <ShieldAlert className="w-8 h-8" />
                Priority Alerts
            </h2>
            <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">Dismiss All</button>
        </div>
        <div className="grid gap-4">
            {systemAlerts.map(alert => (
                <div key={alert.id} className={`bg-slate-900 border ${alert.severity === 'critical' ? 'border-red-500/30 bg-red-500/5' : 'border-slate-800'} rounded-3xl p-6 hover:bg-slate-800/40 transition-all group`}>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className={`p-4 rounded-2xl ${alert.severity === 'critical' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}>
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={`text-xl font-bold ${alert.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>{alert.title}</h3>
                                <span className="text-xs text-slate-500 font-mono">{alert.time}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed mb-6">{alert.message}</p>
                            <div className="flex gap-3">
                                <button className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all text-sm">Take Action</button>
                                <button className="px-6 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-all text-sm">Dismiss</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
};

export default AlertsView;