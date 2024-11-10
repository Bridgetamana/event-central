import { useState } from "react";
import { Plus, Save, AlertCircle, } from "lucide-react";

const Settings = () => {
  const [isNotificationsActive, setIsNotificationsActive] = useState(true);

  const toggleNotification = () => {
    setIsNotificationsActive(!isNotificationsActive);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Profile Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="john@example.com"
                />
              </div>
              <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Password
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="********"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="********"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="********"
                />
              </div>
              <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-700">
                  Password must be at least 8 characters long and include
                  uppercase, lowercase, numbers, and special characters.
                </div>
              </div>
              <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Security
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Recent Activity
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last sign in</span>
                  <span className="text-gray-900">Today, 2:34 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last password change</span>
                  <span className="text-gray-900">30 days ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Payment method
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      VISA
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      **** 4242
                    </p>
                    <p className="text-sm text-gray-500">Expires 12/24</p>
                  </div>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">
                  Edit
                </button>
              </div>
              <button
                type="button"
                className="w-full py-2 px-4 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add New Payment Type
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Notifications
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500">
                    Receive email updates about your events
                  </p>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isNotificationsActive ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                  onClick={toggleNotification}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isNotificationsActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
