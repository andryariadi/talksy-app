import { BiSearchAlt } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import useLogout from "../hooks/useLogout";
import { LoaderBtn, LoaderComponent } from "./Loading";
import useGetConversation from "../hooks/useGetConversation";
import { getRandomEmoji } from "../utils/emojis";
import useConversationStore from "../libs/conversationStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";

const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

const Sidebar = () => {
  const { loading, logout } = useLogout();
  const { isLoading, conversations, setConversations } = useGetConversation();
  const { selectedConversation, setSelectedConversation } = useConversationStore();
  const { onlineUsers } = useSocketContext();

  const [search, setSearch] = useState("");
  const [originalConversations, setOriginalConversations] = useState([]);

  useEffect(() => {
    if (conversations.length > 0 && originalConversations.length === 0) {
      setOriginalConversations(conversations);
    }
  }, [conversations, originalConversations]);

  useEffect(() => {
    if (!search) {
      setConversations(originalConversations);
      return;
    }

    if (search.length < 3) {
      toast.error("Search must be at least 3 characters long", { style: toastStyle });
      return;
    }

    const filteredConversations = originalConversations.filter((c) => c.username.toLowerCase().includes(search.toLowerCase()));

    if (filteredConversations.length > 0) {
      setConversations(filteredConversations);
    } else {
      toast.error("No such conversation found!", { style: toastStyle });
    }
  }, [search, originalConversations, setConversations]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  console.log({ isLoading, conversations }, "<----disidebar");

  return (
    <div className="bg-violt-500 h-full flex flex-col gap-10 border-e-[1px] border-slate-500 border-opacity-50 p-8">
      {/* Top */}
      <form onSubmit={handleSearchChange}>
        <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
          <BiSearchAlt size={20} className="text-gray-500 cursor-pointer" />
        </div>
      </form>

      {/* Center */}
      <div className="scrollbar-hide bg-tal-500 flex flex-1 flex-col gap-4 py-5 border-t-[1px] border-slate-500 border-opacity-50 max-h-96 overflow-y-scroll">
        {isLoading ? (
          <LoaderComponent />
        ) : conversations.length > 0 ? (
          conversations.map((conversation, idx) => {
            const lastIdx = idx === conversations.length - 1;
            const isSelected = conversation._id === selectedConversation?._id;
            const isOnline = onlineUsers.includes(conversation._id);

            console.log({ isOnline, onlineUsers }, "<---isOnline di sidebar");

            return (
              <div
                className={`${isSelected ? "bg-primary rounded-md" : ""} flex items-center gap-24 p-2 ${!lastIdx ? "border-b-[1px] border-slate-500 border-opacity-50" : ""} hover:border-primary transition-all duration-300 cursor-pointer`}
                key={conversation._id}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="relative flex items-center gap-2 flex-1">
                  <img src={conversation.profilePicture || "/noAvatar.png"} alt="Avatar" className="w-12 h-12 rounded-full border-[1px] border-slate-500 border-opacity-50 p-1" />
                  <span>{conversation.fullName || conversation.username}</span>
                  {isOnline && <GoDotFill size={18} className="absolute top-0 left-8 text-green-600" />}
                </div>
                <span>{getRandomEmoji()}</span>
              </div>
            );
          })
        ) : (
          <div className="text-gray-500 text-center">No conversations found</div>
        )}
      </div>

      {/* Bottom */}
      <div>
        <button onClick={logout} disabled={loading} className="flex items-center justify-center">
          {loading ? <LoaderBtn /> : <RiLogoutCircleLine size={20} className="hover:text-primary transition-all duration-300 cursor-pointer" />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
