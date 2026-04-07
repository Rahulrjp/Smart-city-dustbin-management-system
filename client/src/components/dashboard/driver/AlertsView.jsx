import { AlertTriangle, ShieldAlert } from "lucide-react";
import { systemAlerts } from "../../../data/mockDriverData";
import { useEffect, useState } from "react";
import { getAlerts } from "../../../utils/api";
import { getRelativeDate } from "../../../utils/formatDate";
import axios from "axios";

const AlertsView = ({ setActiveTab }) => {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const alertsData = await getAlerts();
                setAlerts(alertsData);
            } catch (error) {
                console.error("Error fetching alerts:", error);
            }
        }

        fetchAlerts();

        const intervalId = setInterval(() => {
            fetchAlerts();
        }, 30000); // Poll every 30 seconds
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [])

    const handleDismiss = async (alertId) => {
        try {
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/api/alerts/${alertId}`;
            const res = await axios.delete(url, { withCredentials: true });
            setAlerts(prevAlerts => prevAlerts.filter(alert => alert._id !== alertId));
            console.log("Alert dismissed:", res.data);
        } catch (error) {
            console.error("Error deleting alert:", error);
            throw new Error("Error deleting alert: " + error.message);
        }

    }


    return <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-red-500">
                <ShieldAlert className="w-8 h-8" />
                Priority Alerts
            </h2>
            <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest px-4 py-2 bg-slate-900 rounded-xl border border-slate-800">Dismiss All</button>
        </div>
        <div className="grid gap-4">
            {alerts?.map(alert => (
                <div key={alert._id} className={`bg-slate-900 border ${alert.severity === 'high' ? 'border-red-500/30 bg-red-500/5' : 'border-slate-800'} rounded-3xl p-6 hover:bg-slate-800/40 transition-all group`}>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className={`p-4 rounded-2xl ${alert.severity === 'high' ? 'bg-red-500/20 text-red-500' : 'bg-amber-500/20 text-amber-500'}`}>
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className={`text-xl font-bold ${alert.severity === 'high' ? 'text-red-400' : 'text-amber-400'}`}>{alert.title || "Unknown Alert"}</h3>
                                <span className="text-xs text-slate-500 font-mono">{getRelativeDate(alert.updatedAt)}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed mb-6">{alert.message}</p>
                            <div className="flex gap-3">
                                <button className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all text-sm"
                                    onClick={() => setActiveTab('tasks')}>Take Action</button>
                                <button
                                    onClick={() => handleDismiss(alert._id)}
                                    className="px-6 py-2.5 bg-slate-800 text-slate-300 font-bold rounded-xl hover:bg-slate-700 transition-all text-sm">Dismiss</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {alerts.length === 0 && <div className="flex items-center justify-center h-24">
                <p className="text-slate-500 font-bold text-lg">No alerts</p>
            </div>}
        </div>
    </div>
};

export default AlertsView;