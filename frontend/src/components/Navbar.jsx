import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      {/* Brand */}
      <Link to="/" className="text-2xl font-bold text-green-600">
        EcoTrack
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
