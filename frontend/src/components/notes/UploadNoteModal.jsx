import { useState } from "react";
import { uploadNote } from "../../services/notesService";

const UploadNoteModal = ({
  subjectId,
  unit,
  onClose,
  onSuccess,
}) => {
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("subjectId", subjectId);
    formData.append("unit", unit);
    formData.append("topic", topic);
    formData.append("file", file);

    await uploadNote(formData);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="font-bold mb-4">
          Upload Note
        </h2>

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic"
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="mb-3"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadNoteModal;
