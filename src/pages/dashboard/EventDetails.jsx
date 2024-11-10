import { useState } from "react";

const EventEdit = () => {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({
    name: "Tech Conference Lagos 2024",
    description:
      "Join us for the biggest tech conference in West Africa, featuring industry leaders and innovative workshops.",
    date: "2024-03-15",
    time: "09:00",
    location: "Lagos, Nigeria",
    venue: "Landmark Center",
    type: "Physical",
    category: "Technology",
    totalTickets: "200",
    price: "50000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    window.location.href = "/dashboard/event";
  };

  const handleCancel = () => {
    console.log("Edit cancelled");
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
        </div>

        <div className="bg-white shadow rounded-xl ">
          <div className="p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={event.name}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Event Type
                </label>
                <select
                  name="type"
                  value={event.type}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Physical">Physical</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={event.category}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Business">Business</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={event.date}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={event.time}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={event.location}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={event.venue}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Total Tickets
                </label>
                <input
                  type="number"
                  name="totalTickets"
                  value={event.totalTickets}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Price (₦)
                </label>
                <input
                  type="number"
                  name="price"
                  value={event.price}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={event.description}
                  onChange={handleChange}
                  rows="4"
                  className="appearance-none relative block w-full px-3 py-2 border border-zinc-300 rounded-lg placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </form>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-zinc-300 rounded-lg text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-colors disabled:opacity-60"
              >
                {loading ? "Saving Event..." : "Save Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventEdit;
