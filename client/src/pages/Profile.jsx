import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({ completed: 0, inProgress: 0, total: 0 });
  const [meta, setMeta] = useState({ createdAt: null, lastActive: null });

  useEffect(() => {
    if (!user) return;
    // Fetch tasks for stats
    api.get("/tasks").then(res => {
      const all = res.data || [];
      const completed = all.filter(t => t.status === 'Done').length;
      const inProgress = all.filter(t => t.status === 'In Progress').length;
      setStats({ completed, inProgress, total: all.length });
    });
    // Fetch (or load from user) meta info
    api.get(`/auth/me`).then(res => {
      setMeta({
        createdAt: res.data.createdAt,
        lastActive: res.data.lastActive
      });
    }).catch(() => {
      // fallback to local context user and now for activity
      setMeta({
        createdAt: user.createdAt,
        lastActive: new Date().toISOString()
      });
    });
  }, [user]);
  
  const formatDate = s => s ? new Date(s).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : '—';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🌸</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  BloomTasks
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors">Dashboard</Link>
              <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-[#00b4d8] rounded-xl hover:bg-[#0099c3] transition-colors duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">Logout</button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl shadow-pink-200/50 border border-white/20 p-8">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
              {user?.name?.charAt(0) || "U"}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{user?.name || "User"}</h2>
            <p className="text-gray-600">{user?.email || "No email"}</p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-pink-50 rounded-2xl">
              <div className="text-2xl font-bold text-pink-600 mb-2">{stats.completed}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>
            <div className="text-center p-6 bg-rose-50 rounded-2xl">
              <div className="text-2xl font-bold text-rose-600 mb-2">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {stats.total > 0 ? `${Math.round((stats.completed/stats.total)*100)}%` : '—'}
              </div>
              <div className="text-sm text-gray-600">Productivity</div>
            </div>
          </div>
          {/* Account Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-gray-600">Member Since</div>
                <div className="font-semibold text-gray-900">{formatDate(meta.createdAt)}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-gray-600">Last Active</div>
                <div className="font-semibold text-gray-900">{meta.lastActive ? formatDate(meta.lastActive) : '—'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}