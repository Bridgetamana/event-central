import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getFeaturedEvents } from "../config/eventStore";
import Loading from "../components/ui/Loading";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    events: 0,
    organizers: 0,
    attendees: 0,
  });

  useEffect(() => {
    const loadFeaturedEvents = async () => {
      try {
        setLoading(true);
        const events = await getFeaturedEvents();
        setFeaturedEvents(events);
      } catch (err) {
        setError("Failed to load featured events");
        console.error("Error loading featured events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedEvents();
  }, []);

  const handleViewDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["featured-event", "pricing"];
      const scrollPosition = window.scrollY;

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">

      <section className="relative min-h-screen pt-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 py-8 lg:py-0 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 text-sm font-medium">
              Elevate Your Event Experience
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Where Great Events
              <br />
              Come to Life
            </h1>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-8">
              The complete platform for event success. Create, promote, and
              manage events of any size. From registration to post-event
              analytics, we&apos;ve got you covered.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-16">
              {[
                {
                  label: "Successful Events",
                  value: stats.events,
                  suffix: "+",
                },
                {
                  label: "Professional Organizers",
                  value: stats.organizers,
                  suffix: "+",
                },
                {
                  label: "Satisfied Attendees",
                  value: stats.attendees,
                  suffix: "+",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-indigo-600 mb-2">
                    {stat.value.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-zinc-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all">
                Create Your Event
              </button>
              <button className="px-8 py-4 rounded-lg border-2 border-indigo-200 text-indigo-700 font-medium hover:bg-indigo-50 transform hover:scale-105 transition-all">
                <Link to="/events">Browse Events</Link>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="featured-event" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-800 text-transparent bg-clip-text mb-4">
              Featured Events
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Discover trending events that match your interests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredEvent(index)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <div className="relative aspect-w-16 aspect-h-9">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-zinc-600">
                      <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-zinc-600">
                      <MapPin className="w-4 h-4 mr-2 text-indigo-600" />
                      {event.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-indigo-600">
                      {typeof event.price === "number"
                        ? event.price === 0
                          ? "Free"
                          : `NGN${event.price.toLocaleString()}`
                        : event.price}
                    </span>
                    <button
                    onClick={() => handleViewDetails(event.id)} 
                    className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-colors">
                      Get Tickets
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-800 text-transparent bg-clip-text mb-4">
              Trusted by Event Professionals
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Join thousands of successful event organizers who&apos;ve grown
              their business with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "EventHub transformed how we manage our tech conferences. The analytics tools helped us increase attendance by 40%.",
                author: "Sarah Smith",
                role: "Director of Events, TechCorp Global",
              },
              {
                quote:
                  "The most user-friendly platform I've used. Their support team is incredible, and the marketing tools are game-changing.",
                author: "Olushola Akin",
                role: "Event manager, SoundWave Events",
              },
              {
                quote:
                  "We've seen a 60% reduction in management time and a 25% increase in ticket sales since switching to EventHub.",
                author: "Emmanuel Philip",
                role: "CEO, Conference Solutions",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-b from-indigo-50 to-white p-8 rounded-xl shadow-lg"
              >
                <div className="space-y-6">
                  <Star className="w-8 h-8 text-yellow-400" />
                  <p className="text-lg text-zinc-700 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-semibold text-zinc-900">
                        {testimonial.author}
                      </h4>
                      <p className="text-zinc-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="py-20 bg-gradient-to-b from-white to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-800 text-transparent bg-clip-text mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Choose the plan that fits your event needs
            </p>
          </motion.div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Free Events",
                price: "NGN0",
                features: [
                  "No processing fee",
                  "Standard ticketing options",
                  "Basic analytics",
                  "Email support",
                ],
              },
              {
                name: "Paid Events",
                price: "3.7% + NGN70",
                features: [
                  "All free event features",
                  "Advanced analytics",
                  "Marketing tools",
                  "Priority support",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom pricing",
                features: [
                  "All free event features",
                  "Custom branding",
                  "Add-Ons",
                  "Dedicated support team",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-8 ${
                  plan.highlighted
                    ? "bg-gradient-to-b from-indigo-600 to-purple-600 text-white shadow-xl transform scale-105"
                    : "bg-white text-zinc-900 shadow-lg"
                }`}
              >
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{plan.price}</div>
                    <div
                      className={
                        plan.highlighted ? "text-indigo-100" : "text-zinc-600"
                      }
                    >
                      per ticket
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      plan.highlighted
                        ? "bg-white text-indigo-600 hover:bg-indigo-50"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="bg-white p-10 rounded-lg max-w-4xl mx-auto shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-indigo-600 mb-4">
                Enhance Your Event with Add-Ons
              </h3>
              <p className="text-lg text-zinc-600 mb-8">
                Select from our exclusive add-ons to maximize your event’s
                impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  "Featured Listing",
                  "Staffing",
                  "Social Media Promotion",
                  "Branded Event Page",
                  "Email Campaign",
                ].map((addon, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold border border-indigo-200"
                  >
                    {addon}
                  </span>
                ))}
              </div>
              <p className="text-zinc-600 text-md mb-4">
                Interested in customizing your event with add-ons? Get in touch
                with us.
              </p>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-3xl font-semibold mb-6">
              Stay in the Loop with Event Updates
            </h2>
            <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter to receive the latest news on upcoming
              events, trends, and exclusive insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-gray-800 w-full sm:w-auto"
              />
              <button className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
