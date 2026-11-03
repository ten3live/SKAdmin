import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";
import THEME, { WEB } from "../theme";
import logo from "../assets/1 (1).jpg";

const CustomNavbar = ({ counts }) => {
  const [user, setUser] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const GetUser = () => {
    const users = localStorage.getItem("user");
    const data = JSON.parse(users);

    if (data) {
      setUser(data);
    }
  };

  useEffect(() => {
    GetUser();
  }, []);

  const { logout } = useAuth();


  const isActive = (path) => (location.pathname === path ? "text-blue-500" : "text-gray-700");

  const handleLogout = () => {
    logout();
  };

  const handleUpdateAdminClick = (user) => {
    navigate(`/updateadmin/${user.userId}`, {
      state: { clientData: user },
    });
  };

  return (
    <div className="bg-gray-100 text-gray-800 p-3 flex justify-between items-center h-16">
      <div className="flex items-center space-x-4">
        <Link to="/admindashboard">
          <img src={logo} alt="Logo" className="w-12 h-12" loading="lazy" />
        </Link>
        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/admindashboard" className={`rounded px-4 py-2 ${isActive("/admindashboard")}`}>
            Home
          </Link>
          <Link to="/allclients" className={`rounded px-4 py-2 ${isActive("/allclients")}`}>
            Clients
          </Link>
          <Link to="/dashboard" className={`rounded px-4 py-2 ${isActive("/dashboard")}`}>
            Dashboard
          </Link>
          <button
            onClick={() => handleUpdateAdminClick(user)}
            className={`rounded px-4 py-2 ${isActive(`/updateadmin/${user?.userId}`)}`}
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="rounded px-4 py-2 text-gray-700 hover:text-blue-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 rounded-fulle"
       
        >Menu
          {/* <img loading="lazy"src={logo} alt="Avatar" className="w-10 h-10 rounded-full" />
           */}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
            <Link
              to="/admindashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/allclients"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              Clients
            </Link>
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                handleUpdateAdminClick(user);
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              Settings
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomNavbar;
