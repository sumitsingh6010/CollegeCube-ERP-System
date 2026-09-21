import { useState } from "react";
import {
  sendGroupMessage,
  sendPrivateMessage,
} from "../../services/messengerService";

const MessageInput = ({ activeChat, onMessageSent }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);

      if (activeChat.type === "GROUP") {
        await sendGroupMessage({ content });
      } else {
        await sendPrivateMessage({
          receiverId: activeChat.user._id,
          content,
        });
      }

      setContent("");
      onMessageSent(); // 🔥 Trigger refresh
    } catch (err) {
      console.error("Message send failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-t bg-white shrink-0">
      <div className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
