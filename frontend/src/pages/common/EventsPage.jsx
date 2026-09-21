import { useEffect, useState } from "react";
import { getAllEvents } from "../../services/eventService";
import EventCard from "../../components/events/EventCard";
import RecentEventsTable from "../../components/events/RecentEventsTable";
import { registerEvent } from "../../services/eventService";
import CreateEventModal from "../../components/events/CreateEventModal";
const role = localStorage.getItem("role");

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //  Get user from localStorage instead of Redux
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  loadEvents();
}, []);

const loadEvents = async () => {
  try {
    const response = await getAllEvents();
    setEvents(response.data.events);
  } catch (error) {
    console.log("failed to fetch events")
    console.error(error);
  }
};


// const upcomingEvents = events.filter(
//   (e) => new Date(e.date) >= new Date()
// );

const today = new Date();
today.setHours(0,0,0,0);

const upcomingEvents = events.filter((e) => {
  const eventDate = new Date(e.date);
  eventDate.setHours(0,0,0,0);
  // return eventDate >= today;   for upcoming events onle
  return eventDate ; // for all events
});

const handleRegister = async (eventId) => {
  try {
    await registerEvent({ eventId });

    alert("Successfully registered!");

    loadEvents(); // refresh event list
  } catch (error) {
    console.error(error);
    alert("Registration failed");
  }
};

  return (
    <div className="p-6">
      {/* Header */}
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>

        {user?.role === "ADMIN" && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Create Event
          </button>
        )}
      </div> */}

      {showModal && (
        <CreateEventModal
         onClose={() => setShowModal(false)}
        refresh={loadEvents}
        />
      )}

      {/* Upcoming Events */}
      {role === "ADMIN" && (
       <button
         onClick={() => setShowModal(true)}
         className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
      >
         + Create Event
      </button>
      )}
      <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {upcomingEvents.map((event) => (
          <EventCard key={event._id} event={event} onRegister={handleRegister}/>
        ))}
      </div>

      {/* Recent Events */}
      <RecentEventsTable events={events} />
    </div>
  );
};

export default EventsPage;