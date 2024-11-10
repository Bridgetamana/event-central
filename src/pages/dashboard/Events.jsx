import { useState } from 'react';
import { 
  PlusSquare, Search, Calendar, 
  Clock, MapPin, Users, 
  MoreVertical, Tag, Globe 
} from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Conference Lagos 2024",
      date: "Mar 15, 2024",
      time: "9:00 AM",
      location: "Lagos, Nigeria",
      type: "Physical",
      category: "Technology",
      status: "Published",
      ticketsSold: 150,
      totalTickets: 200,
    },
    {
      id: 2,
      name: "Virtual Workshop: Digital Marketing",
      date: "Apr 5, 2024",
      time: "2:00 PM",
      type: "Virtual",
      category: "Marketing",
      status: "Draft",
      ticketsSold: 75,
      totalTickets: 100,
    }
  ]);

  const [filterView, setFilterView] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">No Events Yet</h2>
            <p className="mt-2 text-gray-600 max-w-sm mx-auto">
              Create your first event and start selling tickets to your audience.
            </p>
            <div className="mt-8">
              <a
                href="/events/create"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                <PlusSquare className="w-5 h-5 mr-2" />
                Create New Event
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Your Events</h1>
              <a
                href="/events/create"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md"
              >
                <PlusSquare className="w-5 h-5 mr-2" />
                Create New Event
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setFilterView('all')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterView === 'all' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Events
                </button>
                <button
                  onClick={() => setFilterView('published')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterView === 'active' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Published
                </button>
                <button
                  onClick={() => setFilterView('draft')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterView === 'draft' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Drafts
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`bg-green-100 text-green-800 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium `}>
                            {event.status}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900 truncate">
                          {event.name}
                        </h3>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-2" />
                            {event.date} • {event.time}
                          </div>
                          {event.type === 'Physical' && (
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.location}
                            </div>
                          )}
                          {event.type === 'Virtual' && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Globe className="w-4 h-4 mr-2" />
                              Virtual Event
                            </div>
                          )}
                          <div className="flex items-center text-sm text-gray-500">
                            <Tag className="w-4 h-4 mr-2" />
                            {event.category}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-2" />
                          {event.ticketsSold}/{event.totalTickets} tickets sold
                        </div>
                        <a
                          href='//'
                          className="text-indigo-600 text-sm font-medium hover:text-indigo-700"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Events;