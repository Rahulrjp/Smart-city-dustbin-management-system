const SettingsOption = ({ icon: Icon, label, sub }) => {
    return <button className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-800 transition-colors text-left w-full group">
        <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-all">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="font-bold text-white leading-none mb-1">{label}</p><p className="text-xs text-slate-500 leading-tight">{sub}</p>
        </div>
    </button>
};

export default SettingsOption;