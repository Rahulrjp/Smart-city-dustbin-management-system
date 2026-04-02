import AlertCard from "../../cards/AlertCard";
import DutyCard from "../../cards/DutyCard";
import StatCard from "../../cards/StatCard";
import TaskItem from "../../items/TaskItem";
import { driverStats, tasks } from '../../../data/mockDriverData.js'
import { Battery, CheckCircle2, MapPin, Truck } from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";

const Overview = () => {

    const { user } = useAuth();

    return <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name || 'Driver'}!</h1>
            <p className="text-sm text-slate-400">Your current shift: 08:00 AM - 04:00 PM</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Truck} label="Vehicle No." value={driverStats.vehicle} color="emerald" tag="Active" />
            <StatCard icon={Battery} label="Fuel Level" value={`${driverStats.fuel}%`} color="blue" progress={driverStats.fuel} />
            <StatCard icon={CheckCircle2} label="Progress" value="50%" color="purple" subValue={`${driverStats.binsCollected}/${driverStats.totalBins} Bins`} />
            <StatCard icon={MapPin} label="Total Distance" value={driverStats.distanceCovered} color="amber" />
        </div>

        <div className="flex flex-col gap-8">
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">Next Pickups</h2>
                <div className="space-y-4">
                    {tasks.slice(0, 3).map(task => <TaskItem key={task.id} task={task} />)}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pace-y-6">
                <AlertCard onClick={() => setActiveTab('alerts')} />
                <DutyCard />
            </div>
        </div>
    </div>
};

export default Overview;