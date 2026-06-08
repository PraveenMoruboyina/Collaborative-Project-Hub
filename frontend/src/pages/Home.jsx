import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Home() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setDashboard(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  const StatCard = ({ icon, label, value, color }) => (
    <div className={`${color} rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-5xl opacity-20">{icon}</div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        <div className="mb-2">
          <h1 className="text-4xl font-bold text-slate-900 mb-1">
            Dashboard
          </h1>
          <p className="text-gray-600">Welcome back! Here's your project overview.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
          <StatCard 
            icon="📁"
            label="Projects Owned" 
            value={dashboard.projectsOwned}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />

          <StatCard 
            icon="👥"
            label="Projects Joined" 
            value={dashboard.projectsJoined}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />

          <StatCard 
            icon="📬"
            label="Pending Invitations" 
            value={dashboard.pendingInvitations}
            color="bg-gradient-to-br from-amber-500 to-amber-600"
          />

          <StatCard 
            icon="✓"
            label="Tasks Assigned" 
            value={dashboard.tasksAssigned}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />

          <StatCard 
            icon="🎯"
            label="Tasks Completed" 
            value={dashboard.tasksCompleted}
            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          />
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link
            to="/projects"
            className="group block bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                  Browse Projects
                </h3>
                <p className="text-gray-600 mt-1">View and manage your projects</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </Link>

          <Link
            to="/invitations"
            className="group block bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-amber-500"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition">
                  View Invitations
                </h3>
                <p className="text-gray-600 mt-1">Accept pending project invitations</p>
              </div>
              <div className="text-3xl">📮</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}