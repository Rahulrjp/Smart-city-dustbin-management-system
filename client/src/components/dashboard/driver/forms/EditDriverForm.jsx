import { useState } from "react";

const EditDriverForm = ({ driver, onClear }) => {
    const [formData, setFormData] = useState(driver);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setFleet(prev => prev.map(d => d.id === formData.id ? formData : d));
            setIsSaving(false);
            onClear();
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center"><User className="w-6 h-6 text-emerald-400" /></div>
                        <div><h3 className="text-xl font-black text-white uppercase tracking-tighter">Edit Driver Profile</h3><p className="text-xs text-slate-500 font-mono">{driver.id}</p></div>
                    </div>
                    <button onClick={onClear} className="p-2 hover:bg-slate-800 rounded-full text-slate-400"><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Vehicle Assignment</label>
                            <input type="text" value={formData.vehicle} onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all font-mono" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Contact Number</label>
                            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Assigned Shift</label>
                            <select value={formData.shift} onChange={(e) => setFormData({ ...formData, shift: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-all appearance-none"><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Night</option></select>
                        </div>
                    </div>
                    <div className="pt-6 flex gap-4">
                        <button type="submit" disabled={isSaving} className="flex-1 bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 uppercase tracking-widest text-xs">{isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes</button>
                        <button type="button" onClick={onClear} className="flex-1 bg-slate-800 text-slate-300 font-black py-4 rounded-2xl hover:bg-slate-700 transition-all uppercase tracking-widest text-xs">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDriverForm;