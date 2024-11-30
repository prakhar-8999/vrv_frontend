import {Calendar, LogOut} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/authStore";

export const Navbar = () => {
  const {user, setUser} = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold">Event Manager</span>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome,&nbsp;&nbsp; {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-700 hover:text-indigo-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
