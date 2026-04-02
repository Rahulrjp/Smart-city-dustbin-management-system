const SidebarLink = ({ id, icon: Icon, label, active, set, close, badge, badgeColor }) => (
    <button
        onClick={() => { set(id); close(); }}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all mb-1 ${active === id ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white font-bold'}`}
    >
        <div className="flex items-center gap-3">
            <Icon className="w-5 h-5" />
            <span className="text-sm">{label}</span>
        </div>
        {badge > 0 && (
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${active === id ? 'bg-slate-900 text-white' : `${badgeColor} text-white`}`}>
                {badge}
            </span>
        )}
    </button>
);

export default SidebarLink;