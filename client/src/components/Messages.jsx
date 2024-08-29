import { IoLogoWechat } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import useConversationStore from "../libs/conversationStore";
import { useEffect, useRef, useState } from "react";
import useSendMessage from "../hooks/useSendMessage";
import { GoDotFill } from "react-icons/go";
import useGetMessages from "../hooks/useGetMessages";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthContext } from "../context/AuthContext";
import { format } from "timeago.js";
import useListenMessages from "../hooks/useListenMessages";

const Messages = () => {
  const { selectedConversation, setSelectedConversation } = useConversationStore();
  const { isLoading, messages } = useGetMessages();
  const { currentUser } = useAuthContext();
  useListenMessages();

  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const lastMessageRef = useRef();

  useEffect(() => {
    return setSelectedConversation(null); //cleanup function (unmount)
  }, [setSelectedConversation]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

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
          <div className="relative bg-secondary flex items-center gap-2 px-5 py-3">
            <span className="text-neutral-400 text-sm">To:</span>
            <h1 className="text-primary text-xl font-semibold">{selectedConversation.username}</h1>
            <GoDotFill size={10} className="absolute top-5 left-12 text-green-600 animate-ping" />
          </div>

          {/* Center */}
          <div className="bg-ros-500 flex flex-col flex-1 px-5 overflow-y-scroll scrollbar-hide">
            {!isLoading &&
              messages.length > 0 &&
              messages.map((message) => {
                const isSender = message.senderId === currentUser._id;
                const chatClassName = isSender ? "chat-end" : "chat-start";
                const profilePic = isSender ? currentUser.profilePicture : selectedConversation.profilePicture;
                const bubbleBgColor = isSender ? "bg-sky-500" : "";
                const shakeClass = message.shouldShake ? "shake" : "";

                console.log({ isSender, currentUser }, "<----disender");

                return (
                  <div className={`chat ${chatClassName} mb-3`} key={message._id} ref={lastMessageRef}>
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img alt="User" src={profilePic} />
                      </div>
                    </div>
                    <div className={`chat-bubble ${bubbleBgColor} ${shakeClass} text-white`}>{message.message}</div>
                    <div className="chat-footer opacity-50 text-sm"> {format(message.createdAt)}</div>
                  </div>
                );
              })}

            {isLoading && [...Array(4)].map((_, i) => <MessageSkeleton key={i} />)}

            {!isLoading && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-5 h-full">
                <h2 className="text-xl">
                  Send a message to {selectedConversation.username} <br /> to start a conversation!
                </h2>
                <IoLogoWechat size={70} className="text-gray-500 hover:text-primary transition-all duration-300" />
              </div>
            )}
          </div>

          {/* Bottom */}
          <form onSubmit={handleSubmit} className="bg-sy-500 pb-2 px-5">
            <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
              <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." autoComplete="off" className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
              {loading ? <div className="loading loading-spinner loading-xs"></div> : <IoIosSend size={20} className="text-gray-500 hover:text-primary transition-all duration-300 cursor-pointer" />}
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-tal-500 flex flex-col items-center justify-center gap-2 p-10 min-w-[30rem]">
          <h1 className="text-3xl">
            Welcome <span className="text-primary font-bold">{currentUser.fullName || currentUser.username}</span>
          </h1>
          <h2 className="text-xl">Select a chat to start messaging</h2>
          <IoLogoWechat size={70} className="text-gray-500 hover:text-primary transition-all duration-300" />
        </div>
      )}
    </>
  );
};

export default Messages;
