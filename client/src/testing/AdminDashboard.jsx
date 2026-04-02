import React, { useState, useEffect } from 'react';
import {
    BarChart3,
    Truck,
    Trash2,
    Bell,
    AlertTriangle,
    Settings,
    LogOut,
    Menu,
    X,
    Activity,
    ShieldCheck,
    Map as MapIcon,
} from 'lucide-react';
import { notifications, systemAlerts } from '../data/mockAdminData.js';
import Overview from '../components/dashboard/admin/Overview.jsx';
import BinMonitoring from '../components/dashboard/admin/BinMonitoring.jsx';
import FleetManagement from '../components/dashboard/admin/FleetManagement.jsx';
import LiveMapView from '../components/dashboard/admin/LiveMapView.jsx';
import AlertsView from '../components/dashboard/admin/AlertView.jsx';
import NotificationsView from '../components/dashboard/admin/NotificationView.jsx';
import SettingsView from '../components/dashboard/admin/SettingsView.jsx';
import SidebarLink from '../components/dashboard/admin/SidebarLink.jsx';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);


    return (
        <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
            {/* NAVBAR */}
            <nav className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-50 shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 hover:bg-slate-800 rounded-lg">
                        <Menu className="w-6 h-6 text-emerald-400" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                            <Trash2 className="text-emerald-400 w-6 h-6" />
                        </div>
                        <span className="font-black text-lg tracking-tighter uppercase">EcoClean <span className="text-emerald-400 text-xs">Admin</span></span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-sm font-mono font-bold text-emerald-400">{currentTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="h-8 w-px bg-slate-800 hidden md:block"></div>
                    <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-full pl-3 pr-1 border border-slate-700">
                        <span className="text-[10px] font-bold text-slate-300">System Root</span>
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden">
                {/* SIDEBAR */}
                <aside className={`fixed inset-y-0 left-0 z-60 w-72 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:w-64 flex-col bg-slate-900 border-r border-slate-800 shrink-0`}>
                    {isSidebarOpen && <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm -z-10 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

                    <div className="p-6 flex justify-between items-center border-b border-slate-800">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">City Hub</span>
                            <span className="font-bold text-white text-sm">Control Center</span>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden"><X className="w-5 h-5 text-slate-400" /></button>
                    </div>

                    <div className="flex-1 py-4 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                        <SidebarLink id="overview" icon={BarChart3} label="Dashboard" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} />
                        <SidebarLink id="map" icon={MapIcon} label="Live Map" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} />
                        <SidebarLink id="bins" icon={Activity} label="Bin Monitoring" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} />
                        <SidebarLink id="fleet" icon={Truck} label="Fleet & Drivers" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} />

                        <SidebarLink id="alerts" icon={AlertTriangle} label="Priority Alerts" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} badge={systemAlerts.length} badgeColor="bg-red-500" />
                        <SidebarLink id="notifications" icon={Bell} label="Notifications" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} badge={notifications.filter(n => !n.read).length} badgeColor="bg-emerald-500" />

                        <div className="h-px bg-slate-800 mx-2 my-4"></div>

                        <SidebarLink id="settings" icon={Settings} label="Settings" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} />
                    </div>

                    <div className="p-4 border-t border-slate-800">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold">
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* MAIN SECTION (Scrollable) */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar bg-slate-950">
                    {activeTab === 'overview' && <Overview setActiveTab={setActiveTab} />}
                    {activeTab === 'map' && <LiveMapView />}
                    {activeTab === 'bins' && <BinMonitoring />}
                    {activeTab === 'fleet' && <FleetManagement />}
                    {activeTab === 'alerts' && <AlertsView />}
                    {activeTab === 'notifications' && <NotificationsView />}
                    {activeTab === 'settings' && <SettingsView />}
                </main>
            </div>
        </div>
    );
};

// --- Helper UI Components ---





export default AdminDashboard;