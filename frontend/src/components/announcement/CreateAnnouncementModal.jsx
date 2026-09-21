import { useState } from "react";
import { createAnnouncement } from "../../services/announcementServices";

const CreateAnnouncementModal = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const handleSubmit = async () => {
    await createAnnouncement({
      title,
      message,
      expiresAt: expiresAt || null,
    });

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="font-bold mb-4">New Announcement</h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded mb-3"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 🔸 Expiry Date */}
        <label className="text-sm text-gray-600">Expires On (optional)</label>
        <input
          type="date"
          className="w-full border p-2 rounded mb-4"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;
