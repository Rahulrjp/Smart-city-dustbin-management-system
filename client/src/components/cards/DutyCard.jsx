import { Clock, CloudRain } from "lucide-react";

const DutyCard = () => {
    return <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <h3 className="font-bold mb-4 text-sm flex items-center gap-2 text-white">
            <Clock className="w-4 h-4 text-emerald-400" /> Shift Details</h3>
        <div className="space-y-4">
            <div className="flex justify-between text-xs">
                <span className="text-slate-500">Shift Started</span>
                <span className="font-mono text-white">08:00 AM</span>
            </div>
            <div className="flex justify-between text-xs">
                <span className="text-slate-500">Next Break</span>
                <span className="font-mono text-amber-400 font-bold">12:30 PM</span>
            </div>
            <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                    <CloudRain className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase">Weather</span>
                </div>
                <p className="text-[11px] text-slate-400 italic">Expect light rain in the evening. Keep safety lights on.</p>
            </div>
        </div>
    </div>
};
export default DutyCard;