import { useState } from 'react';
import { Search, Calendar, MapPin, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const EventsPage = () => {

  const [events] = useState([
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "Nov 15, 2024",
      time: "09:00 AM",
      location: "Lagos, Nigeria",
      category: "Technology",
      price: 5000,
      image: "",
      attendees: 234,
      description: "Join us for the biggest tech conference in West Africa",
    },
    {
      id: 2,
      title: "Music Festival",
      date: "Nov 20, 2024",
      time: "06:00 PM",
      location: "Abuja, Nigeria",
      category: "Entertainment",
      price: 3000,
      image: "",
      attendees: 567,
      description: "Experience the best of African music",
    },
    {
      id: 3,
      title: "Art Exhibition",
      date: "Nov 25, 2024",
      time: "10:00 AM",
      location: "Port Harcourt",
      category: "Art",
      price: 2000,
      image: "",
      attendees: 122,
      description: "Showcasing contemporary Nigerian art",
    },
    {
      id: 4,
      title: "Food & Wine Festival",
      date: "Dec 1, 2024",
      time: "12:00 PM",
      location: "Lagos, Nigeria",
      category: "Food",
      price: 4000,
      image: "",
      attendees: 445,
      description: "Taste the finest cuisines and wines",
    },
  ]);

  const [filters, setFilters] = useState({
    category: "",
    date: "",
    price: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); 
  };

  const filteredEvents = events
    .filter(event => (filters.category ? event.category === filters.category : true))
    .filter(event => {
      if (filters.price === "free") return event.price === 0;
      if (filters.price === "paid") return event.price > 0;
      return true;
    });

  const paginatedEvents = filteredEvents.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredEvents.length / eventsPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Amazing Events
          </h1>
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Search events, venues, or cities..."
              className="w-full px-6 py-4 rounded-lg shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <Search className="absolute right-4 top-4 text-gray-400 h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 items-center">
          <select name="category" onChange={handleFilterChange} className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="">Category</option>
            <option value="Technology">Technology</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Art">Art</option>
            <option value="Food">Food</option>
          </select>
          
          <select name="date" onChange={handleFilterChange} className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="">Date</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="weekend">This Weekend</option>
            <option value="month">This Month</option>
          </select>

          <select name="price" onChange={handleFilterChange} className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="">Price</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>

          <button className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Filter className="h-4 w-4 inline-block mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {paginatedEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    ₦{event.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-purple-600 font-semibold mb-2">
                    {event.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date} • {event.time}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {event.attendees} attendees
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center">
        <nav className="flex items-center gap-2">
          <button onClick={handlePrevPage} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50" disabled={currentPage === 1}>
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <span className="px-4 py-2">{currentPage}</span>
          <button onClick={handleNextPage} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50" disabled={currentPage >= Math.ceil(filteredEvents.length / eventsPerPage)}>
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default EventsPage;
