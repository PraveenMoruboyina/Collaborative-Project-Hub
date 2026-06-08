import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("BACKEND");

  useEffect(() => {
    // Decode JWT to get current user ID
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decodedToken = JSON.parse(jsonPayload);
        setCurrentUserId(decodedToken.id);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await api.get(
          `/projects/${id}`
        );

        const membersResponse = await api.get(
          `/projects/${id}/members`
        );

        const tasksResponse = await api.get(
          `/projects/${id}/tasks`
        );

        setProject(projectResponse.data);
        setMembers(membersResponse.data);
        setTasks(tasksResponse.data);

        // Determine current user's role
        if (currentUserId && membersResponse.data) {
          const userMembership = membersResponse.data.find(
            (m) => m.user.id === currentUserId
          );
          if (userMembership) {
            setCurrentUserRole(userMembership.role);
          }
        }

      } catch (error) {
        console.error(error);
      }
    };

    if (currentUserId) {
      fetchData();
    }
  }, [id, currentUserId]);

  const updateTaskStatus = async (
    taskId,
    status
  ) => {
    try {
      await api.patch(
        `/tasks/${taskId}/status`,
        { status }
      );

      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, status }
            : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      const response = await api.post(
        "/tasks",
        {
          title,
          description,
          projectId: id,
          assigneeId
        }
      );

      setTasks([
        ...tasks,
        response.data
      ]);

      setTitle("");
      setDescription("");
      setAssigneeId("");

    } catch (error) {
      console.error(error);
    }
  };

  const inviteMember = async () => {
    try {
      await api.post(
        `/projects/${id}/invite`,
        {
          email,
          role
        }
      );

      alert("Invitation sent");

      setEmail("");
      setRole("BACKEND");

    } catch (error) {
      console.error(error);

      console.log(error.response?.data);
      console.log(error.response?.status);

      alert(
        error.response?.data?.message ||
        "Failed to send invitation"
      );
    }
  };

  const isOwner = currentUserRole === "OWNER";

  const getStatusBadge = (status) => {
    const statusConfig = {
      TODO: { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-400" },
      IN_PROGRESS: { bg: "bg-yellow-100", text: "text-yellow-800", dot: "bg-yellow-400" },
      DONE: { bg: "bg-green-100", text: "text-green-800", dot: "bg-green-400" }
    };
    const config = statusConfig[status] || statusConfig.TODO;
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 ${config.bg} ${config.text} rounded-full text-sm font-medium`}>
        <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
        {status}
      </span>
    );
  };

  const getAssigneeName = (assigneeId) => {
    const member = members.find(m => m.user.id === assigneeId);
    return member ? member.user.name : "Unassigned";
  };

  if (!project) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3 text-slate-900">
                {project.name}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
            {isOwner && (
              <span className="ml-4 px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-bold text-sm whitespace-nowrap">
                👑 Owner
              </span>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-slate-900">
          👥 Team Members
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500"
            >
              <p className="font-bold text-lg text-slate-900">
                {member.user.name}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {member.user.email}
              </p>

              <span
                className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-medium ${
                  member.role === "OWNER"
                    ? "bg-purple-100 text-purple-800"
                    : member.role === "FRONTEND"
                    ? "bg-blue-100 text-blue-800"
                    : member.role === "BACKEND"
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {member.role === "OWNER" ? "👑 " : ""}
                {member.role}
              </span>
            </div>
          ))}
        </div>

        {isOwner && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-purple-500">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              ✉️ Invite Member
            </h2>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Member Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="BACKEND">
                  Backend Developer
                </option>

                <option value="FRONTEND">
                  Frontend Developer
                </option>

                <option value="TESTER">
                  QA Tester
                </option>
              </select>

              <button
                onClick={inviteMember}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-3 rounded-lg hover:shadow-lg transition-shadow font-medium"
              >
                Send Invitation
              </button>
            </div>
          </div>
        )}

        {isOwner && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              ➕ Create Task
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                placeholder="Task Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                rows="3"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={assigneeId}
                onChange={(e) =>
                  setAssigneeId(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select Assignee
                </option>

                {members.map((member) => (
                  <option
                    key={member.user.id}
                    value={member.user.id}
                  >
                    {member.user.name}
                  </option>
                ))}
              </select>

              <button
                onClick={createTask}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-lg hover:shadow-lg transition-shadow font-medium"
              >
                Create Task
              </button>
            </div>
          </div>
        )}

        {!isOwner && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
            <p className="text-blue-800">
              <span className="font-bold">📌 Note:</span> Only project owners can invite members and create tasks. Contact the project owner for these actions.
            </p>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-slate-900">
          📋 Tasks ({tasks.length})
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {tasks.length === 0 ? (
            <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-500 text-lg">No tasks yet. {isOwner ? "Create one to get started!" : "Waiting for tasks to be created."}</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h3 className="font-bold text-lg text-slate-900 flex-1">
                    {task.title}
                  </h3>
                  {getStatusBadge(task.status)}
                </div>

                {task.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {task.description}
                  </p>
                )}

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Assigned to:</span> {getAssigneeName(task.assigneeId)}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Update Status
                  </label>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateTaskStatus(
                        task.id,
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="TODO">
                      TODO
                    </option>

                    <option value="IN_PROGRESS">
                      IN_PROGRESS
                    </option>

                    <option value="DONE">
                      DONE
                    </option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}
