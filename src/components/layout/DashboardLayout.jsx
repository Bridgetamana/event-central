import { useState } from "react";
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
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../ui/Logo";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");

  const sidebarItems = [
    {
      section: "MAIN",
      items: [
        { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/dashboard/user-dashboard" },
        { id: "events", label: "Events", icon: Calendar, path: "/dashboard/event"},
        { id: "attendees", label: "Attendees", icon: Users },
      ],
    },
    {
      section: "MANAGEMENT",
      items: [
        { id: "analytics", label: "Analytics", icon: FileText },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "settings", label: "Settings", icon: Settings },
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
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all mb-6">
            <div className="flex items-center justify-center space-x-2">
              <PlusSquare className="w-4 h-4" />
              <span className="font-medium">Create Event</span>
            </div>
          </button>

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
                    onClick={() => setActiveNavItem(item.id)}
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

      <div
        className="transition-all duration-300 lg:ml-60"
      >
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
              <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3 border-l pl-4 cursor-pointer">
                <p>JD</p>
                <ChevronDown className="w-4 h-4 text-gray-500" />
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
