const StatCard = ({ icon: Icon, label, value, color, progress, subValue, tag }) => {
    return <div className={`bg-slate-900 p-5 rounded-3xl border border-slate-800 hover:border-${color}-500/40 transition-all shadow-sm group`}>
        <div className="flex items-center justify-between mb-3">
            <div className={`p-2.5 bg-${color}-500/10 rounded-xl group-hover:scale-110 transition-transform`}>
                <Icon className={`text-${color}-400 w-5 h-5`} />
            </div>
            {tag && <span className={`text-[10px] bg-${color}-500/20 text-${color}-400 px-2.5 py-1 rounded-full font-black uppercase tracking-widest`}>{tag}</span>}
        </div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</p>
        <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-bold text-white">{value}</h3>
            {subValue && <span className="text-[10px] text-slate-500 font-bold">{subValue}</span>}
        </div>
        {progress !== undefined && <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className={`h-full bg-${color}-500 rounded-full transition-all duration-1000`} style={{ width: `${progress}%` }}>
            </div>
        </div>}
    </div>
};

export default StatCard;