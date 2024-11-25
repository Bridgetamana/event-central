import { Calendar, DollarSign, Clock, MapPin, ChevronRight,
  TrendingUp, Filter, Download, Eye,
  Share2, Star, AlertCircle
} from 'lucide-react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const upcomingEvents = [
    {
      id: 1,
      name: "Tech Conference Lagos 2024",
      date: "Mar 15, 2024",
      time: "9:00 AM",
      location: "Lagos, Nigeria",
      ticketsSold: "150/200"
    },
    {
      id: 2,
      name: "Music Festival Abuja 2024",
      date: "Apr 20, 2024",
      time: "4:00 PM",
      location: "Abuja, Nigeria",
      ticketsSold: "85/150"
    },
    {
      id: 3,
      name: "Business Summit Port Harcourt",
      date: "May 10, 2024",
      time: "10:00 AM",
      location: "Port Harcourt, Nigeria",
      ticketsSold: "120/200"
    }
  ];
  const [hasEvents, setHasEvents] = useState(false); 

  return (
    <div>
      {hasEvents ? (
        <div className="text-center space-y-6 max-w-md mx-auto p-6">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create Your First Event</h2>
          <p className="text-gray-600">Start by creating an event and watch your dashboard come to life with real-time analytics and insights.</p>
          <Link to="/dashboard/create-event" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
            Create New Event
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="mt-1 text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue (30d)</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">$24,563</h3>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>12.5%</span>
                  </div>
                </div>
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">Page Views</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">3,428</h3>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>18.2%</span>
                  </div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">4.2%</h3>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>2.1%</span>
                  </div>
                </div>
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Star className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Events</p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900">8</h3>
                  <div className="mt-2 flex items-center text-sm text-green-600">
                    <Share2 className="w-4 h-4 mr-1" />
                    <span>5 Published</span>
                  </div>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg text-white">
              <h3 className="font-semibold mb-2">Quick Insights</h3>
              <p className="text-sm opacity-90">Most popular ticket type: VIP Pass</p>
              <p className="text-sm opacity-90 mt-1">Peak booking time: 2PM - 4PM</p>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-900">Attention Needed</h3>
                  <p className="text-sm text-orange-700 mt-1">2 events are nearing capacity</p>
                </div>
              </div>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900">Today&apos;s Sales</h3>
              <p className="text-2xl font-bold text-green-700 mt-1">$1,248</p>
              <p className="text-sm text-green-600 mt-1">28 tickets sold today</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View all</button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 sm:p-6 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-8 h-8 text-indigo-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">{event.name}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{event.ticketsSold}</p>
                        <p className="text-sm text-gray-500">Tickets Sold</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
