import { useState } from "react";
import { deleteMessage as deleteMessageApi } from "../../services/messengerService";

const MessageBubble = ({ msg, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!msg) return null;

  const myId = localStorage.getItem("userId");
  const myRole = localStorage.getItem("role"); // make sure role is stored

  const isMe = msg?.senderId?._id === myId;
  const isFaculty = myRole === "FACULTY";

  const canDelete = isMe || isFaculty;

  console.log("msg.senderId:", msg.senderId);
console.log("myId:", myId);


  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      setLoading(true);
      await deleteMessageApi(msg._id);

      if (onDelete) {
        onDelete(msg._id); // remove instantly from UI
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setLoading(false);
      setShowActions(false);
    }
  };

  return (
    <div

       
      onClick={() => setShowActions((prev) => !prev)}
      className={`relative max-w-xs p-3 rounded-lg text-sm mb-2 cursor-pointer ${
        isMe
          ? "bg-blue-600 text-white ml-auto"
          : "bg-white border"
      }`}
    >
      {!isMe && (
        <p className="text-xs font-semibold mb-1">
          {msg?.senderId?.name}
        </p>
      )}
      

      {msg?.content}

      {showActions && canDelete && (
        <button
          onClick={handleDelete}
          disabled={loading}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md hover:bg-red-600"
        >
          {loading ? "..." : "Delete"}
        </button>
      )}
    </div>
  );
};

export default MessageBubble;
