import { useState } from "react";
import MessengerSidebar from "./MessengerSidebar";
import ChatWindow from "./ChatWindow";

const MessengerLayout = () => {
  const [activeChat, setActiveChat] = useState({
    type: "GROUP",
    user: null,
  });

  return (
    <div className="flex h-[calc(100vh-150px)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 h-full border-r bg-white flex flex-col">
        <MessengerSidebar onSelectChat={setActiveChat} />
      </div>

      {/* Chat Area */}
      <div className="flex-1 h-full flex flex-col">
        <ChatWindow activeChat={activeChat} />
      </div>
    </div>
  );
};

export default MessengerLayout;
