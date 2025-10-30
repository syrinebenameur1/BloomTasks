import { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";

const priorities = ["High", "Medium", "Low"];
const statuses = ["To Do", "In Progress", "Done"];

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });

  // Fetch tasks
  const loadTasks = () => 
    api.get("/tasks").then(res => {
      setTasks(res.data);
      calculateStats(res.data);
    });
  
  useEffect(() => { loadTasks(); }, []);

  const calculateStats = (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Done").length;
    const pending = total - completed;
    setStats({ total, completed, pending });
  };

  // Filtered tasks
  const filtered = tasks.filter(t => {
    return (!statusFilter || t.status === statusFilter)
      && (!priorityFilter || t.priority === priorityFilter);
  });

  // Add or edit
  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/tasks/${editing._id}`, data);
      } else {
        await api.post("/tasks", data);
      }
      setShowModal(false); 
      setEditing(null);
      loadTasks();
    } catch (e) { 
      setError("Could not save task."); 
    }
  };
  
  const handleEdit = (task) => { 
    setEditing(task); 
    setShowModal(true); 
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await api.delete(`/tasks/${id}`); 
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">🌸</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                BloomTasks
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <span className="hidden sm:block font-medium ">{user?.name || "User"}</span>
              </Link>
<button 
  onClick={logout}
  className="px-4 py-2 text-sm font-medium text-white bg-[#00b4d8] rounded-xl hover:bg-[#0099c3] transition-colors duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
>
  Logout
</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Hello, {user?.name?.split(' ')[0] || "User"}! <span className="text-2xl">🌸</span>
              </h2>
              <p className="text-gray-600 mt-2">Manage your tasks with elegance</p>
            </div>
            <button 
              onClick={() => { setShowModal(true); setEditing(null); }} 
              className="mt-4 md:mt-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-pink-600">📋</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-green-600">✅</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl text-yellow-600">⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select 
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Priority</label>
              <select 
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                value={priorityFilter} 
                onChange={e => setPriorityFilter(e.target.value)}
              >
                <option value="">All Priorities</option>
                {priorities.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
            <p className="text-rose-600 text-center">{error}</p>
          </div>
        )}

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🌷</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-600 mb-4">Start by creating your first task!</p>
              <button 
                onClick={() => { setShowModal(true); setEditing(null); }}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Your First Task
              </button>
            </div>
          ) : (
            filtered.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDelete(task._id)}
              />
            ))
          )}
        </div>
      </div>

      <TaskModal
        open={showModal}
        onClose={() => { setShowModal(false); setEditing(null); }}
        onSave={handleSave}
        initialData={editing}
      />
    </div>
  );
}