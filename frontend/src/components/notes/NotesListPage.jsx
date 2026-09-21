import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchNotes,
  deleteNote,
} from "../../services/notesService";
import UploadNoteModal from "../../components/notes/UploadNoteModal";

const NotesListPage = () => {
  const { subjectId, unit } = useParams();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadNotes();
  }, [subjectId, unit]);

  const loadNotes = async () => {
    try {
      const res = await fetchNotes(subjectId, unit);
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to load notes", err);
      setNotes([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Unit {unit} Notes
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Access all uploaded study materials
            </p>
          </div>

          {role === "FACULTY" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white 
                         px-6 py-3 rounded-lg 
                         shadow-lg transition-all duration-300"
            >
              + Upload Note
            </button>
          )}
        </div>

        {/* EMPTY STATE */}
        {notes.length === 0 ? (
          <div className="bg-white border border-gray-200 
                          rounded-2xl shadow-xl p-12 text-center 
                          text-gray-500">
            No notes uploaded yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-2xl border border-gray-200
                           shadow-xl shadow-blue-100/50
                           hover:shadow-2xl hover:-translate-y-2
                           transition-all duration-300
                           p-6 flex flex-col justify-between"
              >
                {/* TOP SECTION */}
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg text-slate-800">
                      {note.topic}
                    </h3>

                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      note.fileType === "PDF"
                        ? "bg-red-100 text-red-600"
                        : note.fileType === "IMAGE"
                        ? "bg-green-100 text-green-600"
                        : "bg-purple-100 text-purple-600"
                    }`}>
                      {note.fileType}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">
                    By {note.uploadedBy?.name || "Faculty"}
                  </p>

                  {/* IMAGE */}
                  {note.fileType === "IMAGE" && (
                    <img
                      src={note.fileUrl}
                      alt="note"
                      onClick={() => setPreviewImage(note.fileUrl)}
                      className="h-40 w-full object-cover rounded-lg 
                                 cursor-pointer hover:scale-105 transition"
                    />
                  )}

                  {/* VIDEO */}
                  {note.fileType === "VIDEO" && (
                    <div className="relative">
                      <video
                        src={note.fileUrl}
                        className="h-40 w-full object-cover rounded-lg cursor-pointer"
                        onClick={() => setPreviewVideo(note.fileUrl)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center 
                                      text-white text-lg font-semibold 
                                      bg-black/40 rounded-lg">
                        ▶ Preview
                      </div>
                    </div>
                  )}

                  {/* PDF */}
                  {note.fileType === "PDF" && (
                    <a
                      href={note.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center 
                                 bg-blue-600 hover:bg-blue-700 
                                 text-white py-3 rounded-lg 
                                 font-medium shadow-md transition"
                    >
                      📄 View PDF
                    </a>
                  )}
                </div>

                {/* DELETE BUTTON */}
                {role === "FACULTY" && (
                  <button
                    onClick={async () => {
                      await deleteNote(note._id);
                      loadNotes();
                    }}
                    className="mt-4 text-red-500 text-sm hover:underline self-start"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <UploadNoteModal
          subjectId={subjectId}
          unit={unit}
          onClose={() => setShowModal(false)}
          onSuccess={loadNotes}
        />
      )}

      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-6 right-10 text-white text-4xl"
          >
            ✕
          </button>
          <img
            src={previewImage}
            alt="preview"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
          />
        </div>
      )}

      {/* VIDEO PREVIEW MODAL */}
      {previewVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={() => setPreviewVideo(null)}
            className="absolute top-6 right-10 text-white text-4xl"
          >
            ✕
          </button>
          <video
            src={previewVideo}
            controls
            autoPlay
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default NotesListPage;
