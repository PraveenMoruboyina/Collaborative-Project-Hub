import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch dashboard data for statistics
        const dashboardResponse = await api.get("/dashboard");
        setDashboard(dashboardResponse.data);

        // Try to get user profile from localStorage (set during login)
        const profileResponse = await api.get(
  "/auth/profile"
);

setUser(profileResponse.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-blue-500">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.name ?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900">
                  {user?.name || "User"}
                </h1>
                <p className="text-gray-600 text-lg">
                  {user?.email || "No email available"}
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Projects Owned</p>
                  <p className="text-4xl font-bold text-purple-600 mt-2">
                    {dashboard?.projectsOwned || 0}
                  </p>
                </div>
                <div className="text-5xl">👑</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Projects Joined</p>
                  <p className="text-4xl font-bold text-blue-600 mt-2">
                    {dashboard?.projectsJoined || 0}
                  </p>
                </div>
                <div className="text-5xl">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Tasks Assigned</p>
                  <p className="text-4xl font-bold text-green-600 mt-2">
                    {dashboard?.tasksAssigned || 0}
                  </p>
                </div>
                <div className="text-5xl">✓</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Tasks Completed</p>
                  <p className="text-4xl font-bold text-emerald-600 mt-2">
                    {dashboard?.tasksCompleted || 0}
                  </p>
                </div>
                <div className="text-5xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Activity Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Pending Invitations</span>
                <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-bold">
                  {dashboard?.pendingInvitations || 0}
                </span>
              </div>

              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-gray-700">Active Projects</span>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-bold">
                  {(dashboard?.projectsOwned || 0) + (dashboard?.projectsJoined || 0)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Tasks in Progress</span>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-bold">
                  {(dashboard?.tasksAssigned || 0) - (dashboard?.tasksCompleted || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Quick Actions
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/projects")}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow font-medium"
              >
                Browse Projects
              </button>

              <button
                onClick={() => navigate("/invitations")}
                className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow font-medium"
              >
                View Invitations
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
