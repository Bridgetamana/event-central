import { useState } from "react";
import { DollarSign,
  Image,
  Plus,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";

const CreateEvent = () => {
  const [eventType, setEventType] = useState("physical");
  const [loading, setLoading] = useState(false);
  const [isFreeEvent, setIsFreeEvent] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: 1,
      name: "",
      price: "",
      quantity: "",
      description: "",
      isFree: false,
    },
  ]);

  const addTicketType = () => {
    setTickets([
      ...tickets,
      {
        id: tickets.length + 1,
        name: "",
        price: "",
        quantity: "",
        description: "",
        isFree: false,
      },
    ]);
  };

  const removeTicketType = (id) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Event Details
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Event Banner
                </label>
                <div className="mt-2 flex justify-center px-6 py-10 border-2 border-dashed border-indigo-300 rounded-xl hover:border-indigo-400 transition-colors bg-indigo-50/50">
                  <div className="text-center">
                    <Image className="mx-auto h-12 w-12 text-indigo-400" />
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 px-3 py-2">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1 pt-2">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Event name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Event Description
                </label>
                <textarea
                  rows={4}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Tell people what your event is about..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="physical">Physical Event</option>
                    <option value="virtual">Virtual Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Category
                  </label>
                  <select className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Tech Conference</option>
                    <option>Music & Entertainment</option>
                    <option>Business & Networking</option>
                    <option>Workshop & Training</option>
                    <option>Religious & Cultural</option>
                    <option>Sports & Fitness</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Date & Time
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Start Date & Time
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="">
                      <input
                        type="date"
                        className=" block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="">
                      <input
                        type="time"
                        className=" block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    End Date & Time
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="">
                      <input
                        type="date"
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="">
                      <input
                        type="time"
                        className="block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {eventType !== "virtual" && (
            <div className="bg-white rounded-xl shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  Location Details
                </h2>
              </div>
              <div className="p-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Full Address
                  </label>
                  <input
                    type="text"
                    className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter the complete venue address"
                  />
                </div>
              </div>
            </div>
          )}

          {(eventType === "virtual") && (
            <div className="bg-white rounded-xl shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  Virtual Event Details
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Platform
                    </label>
                    <select className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Zoom</option>
                      <option>Google Meet</option>
                      <option>Microsoft Teams</option>
                      <option>Custom Link</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Meeting Link
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        className="appearance-none relative block w-full px-3 py-2 pl-10 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="https://..."
                      />
                      <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                    </div>
                    <p className="mt-1 text-sm text-zinc-500">
                      The link will be shared with attendees after registration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  Ticket Information
                </h2>
                <div className="flex items-center">
                  <label className="mr-3 text-sm text-zinc-600">
                    Free Event?
                  </label>
                  <input
                    type="checkbox"
                    checked={isFreeEvent}
                    onChange={(e) => setIsFreeEvent(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {tickets.map((ticket, index) => (
                <div
                  key={ticket.id}
                  className="space-y-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      Ticket Type {index + 1}
                    </h3>
                    {tickets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTicketType(ticket.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Ticket Name
                      </label>
                      <input
                        type="text"
                        className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g. Regular, VIP, Early Bird"
                      />
                    </div>
                    {!isFreeEvent && (
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">
                          Price (₦)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            className="appearance-none relative block w-full px-3 py-2 pl-10 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="0.00"
                          />
                          <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Available Quantity
                      </label>
                      <input
                        type="number"
                        className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter number of tickets"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="What's included in this ticket?"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addTicketType}
                className="w-full py-2 px-4 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-colors flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Another Ticket Type
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-zinc-300 rounded-lg text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-colors disabled:opacity-60"
            >
              {loading ? "Creating Event..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
