import { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatWindow = ({ activeChat }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

 return (
  <div className="flex flex-col h-full bg-gray-50">
    {/* Header */}
    <div className="p-4 border-b bg-white font-semibold shadow-sm shrink-0">
      {activeChat.type === "GROUP"
        ? "Department Group"
        : activeChat.user.name}
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-hidden">
      <MessageList
        activeChat={activeChat}
        refreshTrigger={refreshTrigger}
      />
    </div>

    {/* Input */}
    <div className="shrink-0">
      <MessageInput
        activeChat={activeChat}
        onMessageSent={() =>
          setRefreshTrigger((prev) => prev + 1)
        }
      />
    </div>
  </div>
);

};

export default ChatWindow;
