import { useState, useEffect } from "react";
import {
  Search, Calendar, MapPin, ChevronLeft,ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllEvents, getEventsByCategory, filterEventsByPrice,searchEvents,
} from "../config/eventStore";
import Loading from "../components/ui/Loading";
import PageLoader from "../components/ui/PageLoader";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const EventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    date: "",
    price: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getAllEvents();
        setEvents(allEvents);
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while fetching events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      try {
        const searchResults = await searchEvents(searchTerm);
        setEvents(searchResults);
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while searching for events. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFilterChange = async (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);

    setLoading(true);
    try {
      let filteredResults = events;

      if (name === "category" && value) {
        filteredResults = await getEventsByCategory(value);
      }

      if (name === "price") {
        filteredResults = filterEventsByPrice(filteredResults, value);
      }

      setEvents(filteredResults);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while filtering events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = async () => {
    setFilters({
      category: "",
      date: "",
      price: "",
    });
    setCurrentPage(1);
    setLoading(true);
    try {
      const allEvents = await getAllEvents();
      setEvents(allEvents);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while clearing filters. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const paginatedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(events.length / eventsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {loading && <PageLoader />}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 px-4">
          <div className="max-w-7xl mx-auto mt-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Discover Amazing Events
            </h1>
            <div className="relative max-w-2xl">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search events, or cities..."
                className="w-full px-6 py-4 rounded-lg shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <Search className="absolute right-4 top-5 text-gray-400 h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              name="category"
              onChange={handleFilterChange}
              value={filters.category}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Category</option>
              <option value="Technology">Technology</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Art">Art</option>
              <option value="Food">Food</option>
            </select>

            <select
              name="date"
              onChange={handleFilterChange}
              value={filters.date}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Date</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="weekend">This Weekend</option>
              <option value="month">This Month</option>
            </select>

            <select
              name="price"
              onChange={handleFilterChange}
              value={filters.price}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Price</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>

            <button
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {error ? (
            <p className="text-center text-gray-500">{error}</p>
          ) : paginatedEvents.length === 0 ? (
            <p className="text-center text-gray-500">
              No events match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                >
                  {loading && event.id === paginatedEvents[0].id && (
                    <Loading />
                  )}
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                      {event.price?.regular === 0 ? "Free" : `₦${(event.price?.regular || 0).toLocaleString()}`}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-purple-600 font-semibold mb-2">
                      {event.tags?.[0] || event.category || "Uncategorized"}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {event.title}
                    </h3>
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
                      <button
                        onClick={() => handleViewDetails(event.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                      >
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
            <button
              onClick={handlePrevPage}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className="px-4 py-2">{currentPage}</span>
            <button
              onClick={handleNextPage}
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              disabled={currentPage >= Math.ceil(events.length / eventsPerPage)}
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </nav>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
