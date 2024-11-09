import { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Share2, Heart, User, Users, ChevronDown, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getEventById } from '../config/eventStore'; 
import Loading from '../components/ui/Loading';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const EventDetailPage = () => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleViewDetails = (eventId) => {
    if (selectedTicketType) {
      navigate(`/checkout/${eventId}`, {
        state: {
          ticketData: {
            ticketType: selectedTicketType,
            quantity: 1,
          },
        },
      });
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const eventData = await getEventById(id);
        
        if (!eventData) {
          throw new Error('Event not found');
        }

        setEvent(eventData);
        setError(null);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <p className="text-gray-600 mb-6">{error}</p>
          <a 
            href="/events"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            Back to Events
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 relative">
        <Link
          to="/events"
          className="absolute top-20 left-4 z-50 md:left-6 lg:left-44"
        >
          <ArrowLeft className="h-6 w-6 text-white/80" />
        </Link>

        <div className="relative h-[60vh] md:h-[50vh] bg-purple-900">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-[78rem] mx-auto">
              <div className="flex items-center gap-2 mb-4">
                {event.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-purple-500/30 backdrop-blur-sm rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {event.time}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Attendees</div>
                      <div className="text-xl font-bold text-gray-900">{event.attendees}</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Share2 className="h-6 w-6 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <Heart className="h-6 w-6 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <div className={`prose max-w-none ${isDescriptionExpanded ? '' : 'line-clamp-6'}`}>
                  <p className="whitespace-pre-line">{event.description}</p>
                </div>
                <button 
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="mt-4 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
                >
                  {isDescriptionExpanded ? 'Show less' : 'Read more'}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDescriptionExpanded ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">Organizer</h2>
                <div className="flex items-center gap-4">
                  <img 
                    src={event.organizer.logo} 
                    alt={event.organizer.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{event.organizer.name}</h3>
                    <p className="text-gray-600 mb-2">{event.organizer.description}</p>
                    <div className="text-sm text-gray-500">
                      {event.organizer.events} events organized
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold mb-6">Select Tickets</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div 
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedTicketType === 'regular' 
                          ? 'border-purple-600 bg-purple-50' 
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                      onClick={() => setSelectedTicketType('regular')}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold">Regular Ticket</h3>
                          <p className="text-sm text-gray-600">General admission</p>
                        </div>
                        <div className="text-lg font-bold">₦{event.price.regular.toLocaleString()}</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <User className="h-4 w-4 inline mr-1" />
                        {event.tickets?.regular || 0} tickets left
                      </div>
                    </div>

                    {event.price.vip && (
                      <div 
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selectedTicketType === 'vip' 
                            ? 'border-purple-600 bg-purple-50' 
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                        onClick={() => setSelectedTicketType('vip')}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">VIP Ticket</h3>
                            <p className="text-sm text-gray-600">Premium seating + Swag bag</p>
                          </div>
                          <div className="text-lg font-bold">₦{event.price.vip.toLocaleString()}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          <User className="h-4 w-4 inline mr-1" />
                          {event.tickets?.vip || 0} tickets left
                        </div>
                      </div>
                    )}

                    {event.price.premium && (
                      <div 
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                          selectedTicketType === 'premium' 
                            ? 'border-purple-600 bg-purple-50' 
                            : 'border-gray-200 hover:border-purple-200'
                        }`}
                        onClick={() => setSelectedTicketType('premium')}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">Premium Ticket</h3>
                            <p className="text-sm text-gray-600">VIP + Private networking session</p>
                          </div>
                          <div className="text-lg font-bold">₦{event.price.premium.toLocaleString()}</div>
                        </div>
                        <div className="text-sm text-gray-500">
                          <User className="h-4 w-4 inline mr-1" />
                          {event.tickets?.premium || 0} tickets left
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                      selectedTicketType 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    onClick={() => handleViewDetails(event.id)}
                    disabled={!selectedTicketType}
                  >
                    {selectedTicketType ? 'Purchase Tickets' : 'Select a Ticket Type'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetailPage;