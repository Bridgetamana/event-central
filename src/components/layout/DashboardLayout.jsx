import { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  PlusSquare,
  FileText,
  CreditCard,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Logo from "../ui/Logo";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "New Event Registration",
      message: "John Doe registered for your event",
      time: "5m ago",
    },
    {
      id: 2,
      title: "Payment Received",
      message: "Payment of ₦5000 received for Event ",
      time: "1h ago",
    },
  ];

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.log("User document not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("No authenticated user.");
      }
    };
  
    fetchUserData();
  }, [auth, db]);
  

  const getInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`;
    }
    return '';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleNavItemClick = (itemId) => {
    setActiveNavItem(itemId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleClickOutside = (e) => {
    if (
      !e.target.closest(".notification-dropdown") &&
      !e.target.closest(".notification-button")
    ) {
      setShowNotifications(false);
    }
    if (
      !e.target.closest(".profile-dropdown") &&
      !e.target.closest(".profile-button")
    ) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sidebarItems = [
    {
      section: "MAIN",
      items: [
        { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/dashboard/user-dashboard" },
        { id: "events", label: "Events", icon: Calendar, path: "/dashboard/event"},
        { id: "attendees", label: "Attendees", icon: Users, path: "/dashboard/attendees" },
      ],
    },
    {
      section: "MANAGEMENT",
      items: [
        { id: "analytics", label: "Analytics", icon: FileText, path: "/dashboard/analytics" },
        { id: "billing", label: "Billing", icon: CreditCard, path: "/dashboard/billing" },
        { id: "settings", label: "Settings", icon: Settings, path: "/dashboard/settings" },
      ],
    },
    {
      section: "SUPPORT",
      items: [{ id: "help", label: "Help Center", icon: HelpCircle }],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-30 transition-all duration-300 
        ${
          isSidebarOpen
            ? "w-60 translate-x-0"
            : "w-60 -translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Logo />
        </div>

        <div className="p-4">
          <Link
            to="/dashboard/create-event"
            className="inline-flex items-center justify-center gap-1 w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all mb-6"
          >
            <PlusSquare className="w-4 h-4" />
            Create Event
          </Link>

          <nav className="space-y-6">
            {sidebarItems.map((section) => (
              <div key={section.section}>
                <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">
                  {section.section}
                </h3>
                {section.items.map((item) => (
                  <Link
                    to={item.path}
                    key={item.id}
                    onClick={() => handleNavItemClick(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-all
                      ${
                        activeNavItem === item.id
                          ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className="transition-all duration-300 lg:ml-60">
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex-1 flex items-center space-x-4">
              <div className="hidden lg:flex relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="lg:hidden p-2 text-gray-500 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                <Search className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="notification-button relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="notification-dropdown absolute right-[-50px] mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                            <p className="font-medium text-sm text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <Bell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No notifications yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <div
                  onClick={toggleProfileMenu}
                  className="profile-button flex items-center space-x-3 border-l pl-4 cursor-pointer"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-indigo-600">
                      {getInitials()}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

                {showProfileMenu && (
                  <div className="profile-dropdown absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
