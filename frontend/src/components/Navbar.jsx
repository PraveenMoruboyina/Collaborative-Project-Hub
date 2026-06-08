import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-xl font-bold hover:text-blue-400 transition">
        Collaborative Project Hub
      </Link>

      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="hover:text-blue-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="hover:text-blue-400 transition"
        >
          Projects
        </Link>

        <Link
          to="/invitations"
          className="hover:text-blue-400 transition"
        >
          Invitations
        </Link>

        <Link
          to="/profile"
          className="hover:text-blue-400 transition"
        >
          Profile
        </Link>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}