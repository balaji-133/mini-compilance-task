import { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import { Filter, Plus, ClipboardList, CheckCircle2, AlertCircle } from 'lucide-react';
import { isPast, startOfDay } from 'date-fns';

export default function TaskList({ client }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [client._id]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${client._id}`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (task) => {
    try {
      const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
      const res = await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== 'All' && task.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;
    return true;
  });

  // Summary Metrics
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const overdueTasks = tasks.filter(t => t.status === 'Pending' && new Date(t.dueDate) < startOfDay(new Date())).length;

  return (
    <div className="h-full flex flex-col pt-4">
      {/* Client Header & Stats */}
      <div className="px-8 pb-6 border-b border-zinc-200 shrink-0">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">{client.companyName}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-zinc-100 text-zinc-600 rounded-lg">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Total Tasks</p>
              <p className="text-2xl font-bold text-zinc-900">{totalTasks}</p>
            </div>
          </div>
          
          <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Pending</p>
              <p className="text-2xl font-bold text-zinc-900">{pendingTasks}</p>
            </div>
          </div>
          
          <div className="bg-white border border-red-200 rounded-xl p-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className={`p-3 rounded-lg ${overdueTasks > 0 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Overdue</p>
              <p className={`text-2xl font-bold ${overdueTasks > 0 ? 'text-red-600' : 'text-zinc-900'}`}>{overdueTasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-8 py-4 bg-zinc-50/50 border-b border-zinc-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-zinc-500" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm border-zinc-200 rounded-lg bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-sm border-zinc-200 rounded-lg bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Tax">Tax</option>
            <option value="Filing">Filing</option>
            <option value="Legal">Legal</option>
            <option value="Audit">Audit</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-8">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
          </div>
        ) : filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredTasks.map(task => (
              <TaskCard key={task._id} task={task} onStatusToggle={handleStatusToggle} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500">
            <ClipboardList className="w-16 h-16 text-zinc-300 mb-4" />
            <h3 className="text-lg font-medium text-zinc-900 mb-1">No tasks found</h3>
            <p className="text-sm">There are no tasks matching your current filters.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddTaskModal 
          client={client} 
          onClose={() => setIsModalOpen(false)} 
          onTaskAdded={() => { setIsModalOpen(false); fetchTasks(); }} 
        />
      )}
    </div>
  );
}
