import { Navigation, Trash2 } from "lucide-react";

const TaskItem = ({ task, detailed }) => {
    return <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 hover:bg-slate-800/40 transition-all group border-l-4 border-l-transparent hover:border-l-emerald-500">
        <div className="w-full sm:w-16 h-16 rounded-2xl bg-slate-800 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
            <Trash2 className="w-5 h-5 text-slate-500 z-10" />
            <span className="text-[10px] font-black text-white z-10">{task.fill.value}%</span>
            <div className={`absolute bottom-0 left-0 w-full opacity-30 ${task.fill.value >= 90 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ height: `${task.fill.value}%` }}>
            </div>
        </div>
        <div className="flex-1 w-full text-center sm:text-left">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${task.status === 'FULL' ? 'text-red-400 bg-red-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>{task.status}</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{task.type || 'Unknown type'}</span>
            </div><h4 className="font-bold text-white leading-tight">{task.location.coodinates?.[1]}</h4>{detailed && <p className="text-xs text-slate-500 mt-1">Est. Collection Time: {task.lastCollected || '-'}</p>}
        </div>
        <button className="w-full sm:w-auto p-3.5 bg-emerald-500 text-slate-950 rounded-2xl font-black hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">
            <Navigation className="w-5 h-5" />
            <span className="sm:hidden">Start Route</span>
        </button>
    </div>
};

export default TaskItem;