import { useEffect, useState } from "react";
import { fetchAnnouncements } from "../../services/announcementServices";
import AnnouncementCard from "./AnnouncementCard";
import CreateAnnouncementModal from "./CreateAnnouncementModal";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const role = localStorage.getItem("role"); // ADMIN | FACULTY | STUDENT
  const canCreate = role === "ADMIN" || role === "FACULTY";

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const res = await fetchAnnouncements();
      setAnnouncements(res.data || []);
    } catch (err) {
      console.error("❌ Failed to load announcements", err);
      setAnnouncements([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Announcements
        </h2>

        {/* Create button (Admin / Faculty only) */}
        {canCreate && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            + New Announcement
          </button>
        )}
      </div>

      {/* Empty state */}
      {announcements.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No announcements available at the moment.
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <AnnouncementCard
              key={a._id}
              data={a}
              onRefresh={loadAnnouncements}
            />
          ))}
        </div>
      )}

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <CreateAnnouncementModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={loadAnnouncements}
        />
      )}
    </div>
  );
};

export default AnnouncementList;
