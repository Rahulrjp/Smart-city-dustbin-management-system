import { AlertTriangle } from "lucide-react";

const AlertCard = ({ onClick }) => {
    return <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6 relative overflow-hidden group">
        <div className="flex items-center gap-2 text-red-500 mb-2"><AlertTriangle className="w-5 h-5 animate-pulse" />
            <span className="font-black text-[10px] uppercase tracking-[0.2em]">Priority Alert</span>
        </div>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed">Bin
            <span className="font-bold text-white">#902</span>
            is overflowed. Immediate clearance requested by Sector Admin.
        </p>
        <button onClick={onClick} className="absolute bottom-4 left-4 right-4 py-3.5 bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">Reroute Now</button>
    </div>
};

export default AlertCard;