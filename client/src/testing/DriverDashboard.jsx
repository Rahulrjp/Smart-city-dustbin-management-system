import { useState, useEffect, useCallback } from 'react';
import {
    Truck,
    Trash2,
    Bell,
    Navigation,
    CheckCircle2,
    AlertTriangle,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';
import SidebarLink from '../components/dashboard/driver/SidebarLink';
import SettingsView from '../components/dashboard/driver/SettingsView';
import NotificationsView from '../components/dashboard/driver/NotificationView';
import AlertsView from '../components/dashboard/driver/AlertsView';
import Overview from '../components/dashboard/driver/Overview';
import SmartRoute from '../components/dashboard/driver/SmartRoute';
import TaskList from '../components/dashboard/driver/TaskList.jsx';
import { tasks, systemAlerts, notifications } from '../data/mockDriverData.js';
import axios from 'axios';
import { getDriverProfile, handleLogout } from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx';

const DriverDashboard = () => {

    const { user } = useAuth();

    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [driverProfile, setDriverProfile] = useState({});

    const fetchDriverProfile = useCallback(async () => {
        try {
            console.log("Fetching driver profile for user ID:", user?._id);
            const driverData = await getDriverProfile(user?._id);

            // update state
            setDriverProfile(driverData);
            setVehicleNumber(driverData?.vehicleNumber || "");

            // log raw API response
            console.log("Fetched driver data:", driverData);
        } catch (error) {
            console.error("Error fetching driver profile:", error);
        }
    }, [user]);

    useEffect(() => {
        fetchDriverProfile();
    }, [user]);


    // useEffect(() => {
    //     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    //     return () => clearInterval(timer);
    // }, []);

    return (
        <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden">
            {/* HEADER */}
            <nav className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-50 shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-all">
                        <Menu className="w-6 h-6 text-emerald-400" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                            <Trash2 className="text-emerald-400 w-6 h-6" />
                        </div>
                        <span className="font-bold text-lg tracking-tight uppercase">EcoClean <span className="text-emerald-400 text-xs">Driver</span></span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-sm font-mono font-bold text-emerald-400">{currentTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="h-8 w-px bg-slate-800 hidden md:block"></div>
                    <img
                        src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-emerald-500 shadow-lg shadow-emerald-500/10 cursor-pointer hover:scale-105 transition-transform"
                    />
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden">
                {/* SIDEBAR */}
                <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:w-64 flex-col bg-slate-900 border-r border-slate-800 shrink-0`}>
                    {isSidebarOpen && <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm -z-10 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
                    <div className="p-6 flex justify-between items-center border-b border-slate-800">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Fleet Management</span>
                            <span className="font-bold text-white text-sm">Active Session</span>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden"><X className="w-5 h-5 text-slate-400" /></button>
                    </div>
                    <div className="flex-1 py-4 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                        <SidebarLink id="overview" icon={Truck} label="Dashboard" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} />
                        <SidebarLink id="route" icon={Navigation} label="Smart Route" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} />
                        <SidebarLink id="tasks" icon={CheckCircle2} label="Task List" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} />
                        <SidebarLink id="alerts" icon={AlertTriangle} label="Priority Alerts" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} badge={systemAlerts.length} badgeColor="bg-red-500" />
                        <SidebarLink id="notifications" icon={Bell} label="Notifications" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} badge={notifications.filter(n => !n.read).length} badgeColor="bg-emerald-500" />
                        <div className="h-px bg-slate-800 mx-2 my-4"></div>
                        <SidebarLink id="settings" icon={Settings} label="Settings" active={activeTab} set={setActiveTab} close={() => setIsSidebarOpen(false)} />
                    </div>
                    <div className="p-4 border-t border-slate-800">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold"
                            onClick={handleLogout}>
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar bg-slate-950">
                    {activeTab === 'overview' && <Overview driverProfile={driverProfile} />}
                    {activeTab === 'route' && <SmartRoute driverProfile={driverProfile} />}
                    {activeTab === 'tasks' && <TaskList setActiveTab={setActiveTab} driverProfile={driverProfile} />}
                    {activeTab === 'alerts' && <AlertsView setActiveTab={setActiveTab} />}
                    {activeTab === 'notifications' && <NotificationsView />}
                    {activeTab === 'settings' && <SettingsView driverProfile={driverProfile} setActiveTab={setActiveTab} />}
                </main>
            </div>
        </div>
    );
};

export default DriverDashboard;