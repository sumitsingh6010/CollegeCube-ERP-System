import { useEffect, useState, useRef } from "react";
import {
  fetchGroupMessages,
  fetchPrivateMessages,
} from "../../services/messengerService";
import MessageBubble from "./MessageBubble";

const MessageList = ({ activeChat, refreshTrigger }) => {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadMessages();
  }, [activeChat, refreshTrigger]);

  const handleDelete = (id) => {
  setMessages((prev) =>
    prev.filter((m) => m._id !== id)
  );
};


  const loadMessages = async () => {
    if (!activeChat) return;

    if (activeChat.type === "GROUP") {
      const res = await fetchGroupMessages();
      setMessages(res.data);
    } else {
      const res = await fetchPrivateMessages(
        activeChat.user._id
      );
      setMessages(res.data);
    }
  };

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto p-4 space-y-3">
      {messages.map((msg) => (
        <MessageBubble
         key={msg._id}
          msg={msg}
          onDelete={handleDelete} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
