import { BiSearchAlt } from "react-icons/bi";
import { RiLogoutCircleLine } from "react-icons/ri";
import useLogout from "../hooks/useLogout";
import { LoaderBtn, LoaderComponent } from "./Loading";
import useGetConversation from "../hooks/useGetConversation";
import { getRandomEmoji } from "../utils/emojis";
import useConversationStore from "../libs/conversationStore";

const Sidebar = () => {
  const { loading, logout } = useLogout();
  const { isLoading, conversations } = useGetConversation();
  const { selectedConversation, setSelectedConversation } = useConversationStore();

  console.log({ isLoading, conversations }, "<----disidebar");

  return (
    <div className="bg-violt-500 flex flex-col gap-10 border-e-[1px] border-slate-500 border-opacity-50 p-8">
      {/* Top */}
      <form action="">
        <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
          <input type="text" placeholder="Search..." className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
          <BiSearchAlt size={20} className="text-gray-500" />
        </div>
      </form>

      {/* Center */}
      <div className="scrollbar-hide bg-tal-500 flex flex-col gap-4 py-5 border-t-[1px] border-slate-500 border-opacity-50 max-h-96 overflow-y-scroll">
        {isLoading ? (
          <LoaderComponent />
        ) : conversations.length > 0 ? (
          conversations.map((conversation, idx) => {
            const lastIdx = idx === conversations.length - 1;
            const isSelected = conversation._id === selectedConversation?._id;

            return (
              <div
                className={`${isSelected ? "bg-primary rounded-md" : ""} flex items-center gap-24 p-2 ${!lastIdx ? "border-b-[1px] border-slate-500 border-opacity-50" : ""} hover:border-primary transition-all duration-300 cursor-pointer`}
                key={conversation._id}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center gap-2 flex-1">
                  <img src={conversation.profilePicture || "/noAvatar.png"} alt="Avatar" className="w-12 h-12 rounded-full border-[1px] border-slate-500 border-opacity-50 p-1" />
                  <span>{conversation.fullName || conversation.username}</span>
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
