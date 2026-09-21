import { useEffect, useState } from "react";
import { fetchMessengerUsers } from "../../services/messengerService";

const MessengerSidebar = ({ onSelectChat }) => {
  const [users, setUsers] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await fetchMessengerUsers();
    setUsers(res.data);
  };

  return (
   <div className="flex flex-col h-full">
    <div className="p-4 border-b font-semibold text-lg shrink-0">
      Department Chat
    </div>


      <div className="flex-1 overflow-y-auto">

        {/* GROUP */}
        <div
          onClick={() => {
            setActiveId("GROUP");
            onSelectChat({ type: "GROUP", user: null });
          }}
          className={`flex items-center gap-3 p-3 cursor-pointer transition ${
            activeId === "GROUP"
              ? "bg-blue-50 border-r-4 border-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
            💬
          </div>
          <div>
            <div className="font-medium">Department Group</div>
            <div className="text-xs text-gray-400">
              Group Conversation
            </div>
          </div>
        </div>

        {/* USERS */}
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              setActiveId(user._id);
              onSelectChat({ type: "PRIVATE", user });
            }}
            className={`flex items-center gap-3 p-3 cursor-pointer transition ${
              activeId === user._id
                ? "bg-blue-50 border-r-4 border-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            {/* Avatar */}
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />

            <div className="flex flex-col">
              <span className="font-medium">
                {user.name}
              </span>

              {/* Better role styling */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                  user.role === "FACULTY"
                    ? "bg-purple-100 text-purple-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessengerSidebar;
