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
} from "lucide-react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctortoken");
    localStorage.removeItem("usertoken");
    localStorage.removeItem("admintoken");
    setIsAuth(false);
    setRole(null);
    navigate("/loginDashboard");
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
      name: "Verify Doctors",
      path: "/verify-doctors",
      icon: ShieldCheck,
      show: role === "admin",
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
            >
              Medicon
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navLinks
              .filter((link) => link.show)
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <link.icon className="w-4 h-4 mr-2" />
                  {link.name}
                </Link>
              ))}

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
            <div className="pt-2 pb-3 space-y-1">
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
