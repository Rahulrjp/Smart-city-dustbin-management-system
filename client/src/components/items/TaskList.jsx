import { Filter, Search } from "lucide-react";
import TaskItem from "./TaskItem";
import { tasks } from "../../data/mockDriverData.js";

const TaskList = () => {

    return <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Assigned Tasks</h2>
            <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" placeholder="Search bins..." className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-emerald-500 text-white" />
                </div>
                <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800"><Filter className="w-5 h-5 text-slate-400" /></button>
            </div>
        </div>
        <div className="grid gap-4">{tasks.map(task => <TaskItem key={task.id} task={tasks} detailed />)}</div>
    </div>
};

export default TaskList