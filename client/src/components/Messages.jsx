import { IoLogoWechat } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import useConversationStore from "../libs/conversationStore";
import { useEffect, useState } from "react";
import useSendMessage from "../hooks/useSendMessage";

const Messages = () => {
  const { selectedConversation, setSelectedConversation } = useConversationStore();

  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  useEffect(() => {
    return setSelectedConversation(null); //cleanup function (unmount)
  }, [setSelectedConversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) return;

    await sendMessage(message);
    setMessage("");
  };

  return (
    <>
      {selectedConversation ? (
        <div className="bg-tal-500 flex flex-col gap-2 min-w-[30rem] h-full">
          {/* Top */}
          <div className="bg-secondary flex items-center gap-2 px-5 py-3">
            <span className="text-neutral-400 text-sm">To:</span>
            <h1 className="text-primary text-xl font-semibold">{selectedConversation.username}</h1>
          </div>

          {/* Center */}
          <div className="bg-ros-500 flex flex-col flex-1 px-5 overflow-y-scroll scrollbar-hide">
            {[...Array(10)].map((_, i) => (
              <div className="chat chat-end" key={i}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="User" src="/noAvatar.png" />
                  </div>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
              </div>
            ))}
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="User" src="/noAvatar.png" />
                </div>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          </div>

          {/* Bottom */}
          <form onSubmit={handleSubmit} className="bg-sy-500 pb-2 px-5">
            <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
              <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
              {loading ? <div className="loading loading-spinner loading-xs"></div> : <IoIosSend size={20} className="text-gray-500 hover:text-primary transition-all duration-300 cursor-pointer" />}
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-tal-500 flex flex-col items-center justify-center gap-2 p-10 min-w-[30rem]">
          <h1 className="text-3xl">
            Welcome <span className="text-primary font-bold">Andry Ariadi</span>
          </h1>
          <h2 className="text-xl">Select a chat to start messaging</h2>
          <IoLogoWechat size={70} className="text-gray-500 hover:text-primary transition-all duration-300" />
        </div>
      )}
    </>
  );
};

export default Messages;
