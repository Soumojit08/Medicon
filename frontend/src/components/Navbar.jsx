import { useEffect, useState } from "react";
import {
  Contact,
  HomeIcon,
  Settings,
  Menu,
  LogOut,
  UserCircle,
  Stethoscope,
  ShieldCheck,
  X,
  Bell,
  Search,
  Calendar,
} from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const checkAuth = () => {
    const doctorToken = localStorage.getItem("doctortoken");
    const userToken = localStorage.getItem("usertoken");
    const adminToken = localStorage.getItem("admintoken");

    if (doctorToken) {
      setIsAuth(true);
      setRole("doctor");
    } else if (userToken) {
      setIsAuth(true);
      setRole("user");
    } else if (adminToken) {
      setIsAuth(true);
      setRole("admin");
    } else {
      setIsAuth(false);
      setRole(null);
    }
  };

  useEffect(() => {
    checkAuth();
    setIsOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  useEffect(() => {
    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctortoken");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("admintoken");
    setIsAuth(false);
    setRole(null);
    navigate("/loginDashboard");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/find-doctors?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const getDashboardLink = () => {
    const userId = localStorage.getItem(
      role === "doctor" ? "doctorId" : "userId"
    );
    switch (role) {
      case "doctor":
        return `/doctorDashboard/${userId}`;
      case "user":
        return `/patientDashboard/${userId}`;
      case "admin":
        return "/adminDashboard";
      default:
        return "/";
    }
  };

  // Mock notifications - replace with real data
  const notifications = [
    { id: 1, text: "New appointment request", time: "5m ago" },
    { id: 2, text: "Doctor approved your appointment", time: "1h ago" },
    { id: 3, text: "Reminder: Appointment tomorrow", time: "2h ago" },
  ];

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: HomeIcon,
      show: true,
    },
    {
      name: "Dashboard",
      path: getDashboardLink(),
      icon: Settings,
      show: isAuth,
    },
    {
      name: "Find Doctors",
      path: "/find-doctors",
      icon: Stethoscope,
      show: true,
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: Calendar,
      show: isAuth && role !== "admin",
    },
    {
      name: "Verify Doctors",
      path: "/verify-doctors",
      icon: ShieldCheck,
      show: role === "admin",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:opacity-90 transition-opacity flex items-center"
            >
              <Stethoscope className="w-8 h-8 mr-2 text-blue-600" />
              Medicon
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for doctors, specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            {navLinks
              .filter((link) => link.show)
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.name}
                </Link>
              ))}

            {/* Notifications */}
            {isAuth && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`flex items-center p-2 rounded-full transition-colors ${
                    showNotifications
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Notifications
                      </h3>
                    </div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <p className="text-sm text-gray-800">
                          {notification.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                    <div className="px-4 py-2 border-t border-gray-100">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Button */}
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors ml-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/loginDashboard"
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors ml-2"
              >
                <UserCircle className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="sm:hidden">
            {/* Mobile Search */}
            <div className="px-2 pt-2 pb-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for doctors, specialties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>

            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks
                .filter((link) => link.show)
                .map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === link.path
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="w-5 h-5 mr-3" />
                    {link.name}
                  </Link>
                ))}

              {isAuth ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors mt-2"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/loginDashboard"
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  <UserCircle className="w-5 h-5 mr-3" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
