import { Bell, CheckCircle2, Info } from "lucide-react";
import { notifications } from "../../../data/mockDriverData";

const NotificationsView = () => {
    return <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-emerald-400">
                <Bell className="w-8 h-8" />
                General Notifications
            </h2>
            <button className="text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">Mark All as Read</button>
        </div>
        <div className="grid gap-4">
            {notifications.map(n => (
                <div key={n.id} className={`bg-slate-900 border ${!n.read ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800'} rounded-3xl p-6 transition-all`}>
                    <div className="flex gap-6 items-start">
                        <div className={`p-3 rounded-2xl ${n.type === 'task' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {n.type === 'task' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-white text-lg">{n.title}</h3>
                                <span className="text-xs text-slate-500 font-mono">{n.time}</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">{n.message}</p>
                            {!n.read && <button className="text-xs font-bold text-emerald-400 hover:underline">Mark as read</button>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
};

export default NotificationsView;