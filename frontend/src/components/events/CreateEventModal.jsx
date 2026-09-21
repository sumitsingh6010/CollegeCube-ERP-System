import { useState } from "react";
import { createEvent } from "../../services/eventService";

const CreateEventModal = ({ onClose, refresh }) => {
  const [form, setForm] = useState({
    title: "",
    category: "Technical",
    date: "",
    time: "",
    venue: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createEvent(form);
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">

        <h2 className="text-lg font-semibold mb-4">
          Create Event
        </h2>

        <input
          name="title"
          placeholder="Event title"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <select
          name="category"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        >
          <option>Technical</option>
          <option>Cultural</option>
          <option>Workshop</option>
          <option>Sports</option>
          <option>Seminar</option>
        </select>

        <input
          type="date"
          name="date"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="time"
          placeholder="Time"
          className="border p-2 w-full mb-2"
          onChange={handleChange}
        />

        <input
          name="venue"
          placeholder="Venue"
          className="border p-2 w-full mb-4"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Create
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;