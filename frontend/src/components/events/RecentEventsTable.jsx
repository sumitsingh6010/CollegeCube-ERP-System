const RecentEventsTable = ({ events }) => {

  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 mt-8 text-center">
        <h2 className="text-lg font-semibold mb-3">Recent Events</h2>

        <p className="text-gray-500">
          No events available yet.
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Create your first event to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-8">
      <h2 className="text-lg font-semibold mb-4">Recent Events</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-2">Event Title</th>
            <th>Date & Time</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr key={event._id} className="border-b">
              <td className="py-3">{event.title}</td>

              <td>
                {new Date(event.date).toLocaleDateString()}, {event.time}
              </td>

              <td>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs">
                  {event.category}
                </span>
              </td>

              <td>
                <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 text-xs">
                  {event.status}
                </span>
              </td>

              <td>
                <button className="text-blue-600 hover:underline">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentEventsTable;