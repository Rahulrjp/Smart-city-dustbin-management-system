import { Layers, MapIcon, TrendingUp } from "lucide-react";

const LiveMapView = () => {
    return (
        <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white">Live Operations Map</h2>
                    <p className="text-sm text-slate-400">Real-time tracking of bins and fleet across all zones.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-white">All Zones</button>
                    <button className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-bold text-slate-400 hover:text-white">Active Only</button>
                </div>
            </div>

            <div className="flex-1 bg-slate-900 rounded-3xl border-slate-800 overflow-hidden relative border-2 border-dashed m-2">
                {/* MAP PLACEHOLDER */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50">
                    <div className="relative mb-6">
                        <MapIcon className="w-16 h-16 text-slate-700 animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-2">Map Interface Ready</h3>
                    <p className="text-slate-500 text-sm max-w-md text-center px-8">
                        Integrate your preferred Map API (Google Maps, Mapbox, or Leaflet) here to visualize bin positions and fleet telemetry.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-[10px] text-slate-400 font-black uppercase">Bins Online</span>
                        </div>
                        <div className="bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-[10px] text-slate-400 font-black uppercase">Fleet Active</span>
                        </div>
                    </div>
                </div>

                {/* Floating Map Controls Mockup */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                    <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-700 shadow-xl">
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"><TrendingUp className="w-5 h-5" /></button>
                    </div>
                    <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl border border-slate-700 shadow-xl">
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"><Layers className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LiveMapView;