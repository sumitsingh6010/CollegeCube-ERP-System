import { Calendar, Clock, MapPin } from "lucide-react";

const categoryImages = {
  Technical: "/event-images/technical.jpg",
  Cultural: "/event-images/cultural.jpg",
  Workshop: "/event-images/workshop.jpg",
  Sports: "/event-images/sports.jpg",
  Seminar: "/event-images/seminar.jpg",
};

const EventCard = ({ event , onRegister }) => {
  const imageSrc =
    categoryImages[event.category] || "/event-images/default.jpg";
   

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden">
      <img
        src={imageSrc}
        alt={event.title}
        className="h-36 w-full object-cover"
      />

      <div className="p-4">
        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
          {event.category}
        </span>

        <h3 className="text-md font-semibold mt-2 line-clamp-1">
          {event.title}
        </h3>

        <div className="flex items-center gap-2 text-sm mt-2">
          <Calendar size={14} />
          {new Date(event.date).toDateString()}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock size={14} />
          {event.time}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin size={14} />
          {event.venue}
        </div>

        <div className="mt-3 text-sm font-medium text-green-600">
          {event.registeredCount * 10}+  Registered
          {/* {event.registeredCount ?? 0}+ Registered */}
        </div>

        {event.isRegistered ? (

          <button
            disabled
            className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg cursor-not-allowed"
          >
            Registered ✓
         </button>

        ) : (

          <button
            onClick={() => onRegister(event._id)}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
           Register Now
         </button>

)}
      </div>
    </div>
  );
};

export default EventCard;