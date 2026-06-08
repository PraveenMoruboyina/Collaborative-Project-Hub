import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects");
        console.log(
          "PROJECTS RESPONSE:",
          response.data
        );

        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const createProject = async () => {
    try {
      const response = await api.post(
        "/projects",
        {
          name,
          description,
        }
      );

      setProjects([
        ...projects,
        response.data,
      ]);

      setName("");
      setDescription("");

    } catch (error) {
      console.error(error);
      alert("Failed to create project");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Projects
          </h1>
          <p className="text-gray-600">Create and manage your collaborative projects</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-blue-500">

          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            ➕ Create New Project
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={createProject}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-lg hover:shadow-lg transition-shadow font-medium"
            >
              Create Project
            </button>
          </div>

        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-5xl mb-4">📁</div>
            <p className="text-gray-600 text-lg">
              No projects yet. Create one to get started!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {projects.length} Project{projects.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {projects.map((membership) => (
                <div
                  key={membership.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all border-l-4 border-blue-500 flex flex-col"
                >
                  <h2 className="text-2xl font-bold mb-3 text-slate-900">
                    {membership.project.name}
                  </h2>

                  <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                    {membership.project.description || "No description provided"}
                  </p>

                  <div className="mb-4 pb-4 border-t border-gray-200">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        membership.role === "OWNER"
                          ? "bg-purple-100 text-purple-800"
                          : membership.role === "FRONTEND"
                          ? "bg-blue-100 text-blue-800"
                          : membership.role === "BACKEND"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {membership.role === "OWNER" ? "👑 " : ""}
                      {membership.role}
                    </span>
                  </div>

                  <Link
                    to={`/projects/${membership.project.id}`}
                    className="inline-block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow font-medium"
                  >
                    Open Project
                  </Link>
                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </>
  );
}