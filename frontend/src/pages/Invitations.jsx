import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Invitations() {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await api.get(
          "/invitations"
        );

        setInvitations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvitations();
  }, []);

  const acceptInvitation = async (
    invitationId
  ) => {
    try {
      await api.post(
        `/invitations/${invitationId}/accept`
      );

      setInvitations(
        invitations.map((invitation) =>
          invitation.id === invitationId
            ? {
                ...invitation,
                status: "ACCEPTED"
              }
            : invitation
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      BACKEND: "bg-green-100 text-green-800",
      FRONTEND: "bg-blue-100 text-blue-800",
      TESTER: "bg-orange-100 text-orange-800"
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Invitations
          </h1>
          <p className="text-gray-600">Manage your project invitations and join teams</p>
        </div>

        {invitations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-600 text-lg">
              No invitations found. When team members invite you, they'll appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-2">
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {invitations.filter(i => i.status === "PENDING").length} Pending
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {invitations.filter(i => i.status === "ACCEPTED").length} Accepted
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {invitations.map((invitation) => (
                <div
                  key={invitation.id}
                  className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 ${
                    invitation.status === "ACCEPTED"
                      ? "bg-white border-green-500"
                      : "bg-white border-amber-500"
                  }`}
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">
                      {invitation.email}
                    </h2>

                    <div className="flex gap-2 flex-wrap">
                      <span className={`inline-block px-3 py-1 ${getRoleColor(invitation.role)} rounded-full text-sm font-medium`}>
                        {invitation.role}
                      </span>

                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          invitation.status === "ACCEPTED"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {invitation.status === "ACCEPTED" ? "✓ Accepted" : "⏳ Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    {invitation.status !== "ACCEPTED" && (
                      <button
                        onClick={() =>
                          acceptInvitation(
                            invitation.id
                          )
                        }
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow font-medium"
                      >
                        Accept Invitation
                      </button>
                    )}
                    {invitation.status === "ACCEPTED" && (
                      <div className="text-center py-2 text-green-700 font-medium">
                        You are now a member of this project!
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}