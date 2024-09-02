import { IoCloseCircleSharp, IoLogoWechat } from "react-icons/io5";
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
import CldUploadWidget from "./UploadWidget";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiWinkFill } from "react-icons/bs";
import { MessageNotification } from "./MessageNotification";

const Messages = () => {
  const { selectedConversation, setSelectedConversation } = useConversationStore();
  const { isLoading, messages } = useGetMessages();
  const { currentUser } = useAuthContext();

  const [message, setMessage] = useState("");
  const [newMessageNotif, setNewMessageNotif] = useState(null);
  const [image, setImage] = useState([]);
  console.log(image, "<---image di messages.jsx");

  console.log(newMessageNotif, "<---newMessageNotif di messages.jsx");

  const { loading, sendMessage } = useSendMessage();

  const lastMessageRef = useRef();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useListenMessages(setNewMessageNotif);

  useEffect(() => {
    return setSelectedConversation(null); //cleanup function (unmount)
  }, [setSelectedConversation]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    if (newMessageNotif) {
      const timer = setTimeout(() => {
        setNewMessageNotif(null);
      }, 10000);

      return () => clearTimeout(timer); // Cleanup timer on component unmount or when newMessageNotif changes
    }
  }, [newMessageNotif]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message && !image) return;

    const imgUrl = image;

    await sendMessage({ message, imgUrl });
    setMessage("");
    handleCloseImg();
  };

  const handleCloseImg = () => {
    setImage([]);
  };

  const handleEmoji = (e) => {
    console.log(e);
    setMessage((prev) => prev + e.emoji);
    setOpen(!open);
  };

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  console.log(message, "<---message di messages.jsx");

  return (
    <>
      {selectedConversation ? (
        <div className="bg-tal-500 flex flex-col gap-2 min-w-[35rem] h-full">
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
                const bubbleBgColor = isSender ? "bg-primary" : "";
                const shakeClass = message.shouldShake ? "shake" : "";

                console.log({ isSender, currentUser }, "<----disender");

                return (
                  <>
                    <div className={`bg-ros-500 chat ${chatClassName} mb-3`} key={message._id} ref={lastMessageRef}>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img alt="User" src={profilePic} />
                        </div>
                      </div>
                      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`} style={{ maxWidth: "70%" }}>
                        {message.image && <img src={message.image} alt="Image" className={`h-[15rem] w-[70] object-cover rounded-md`} onClick={() => handleOpenModal(message.image)} />}

                        {message.message && <span className="text-white">{message.message}</span>}
                      </div>
                      <div className="chat-footer opacity-50 text-sm"> {format(message.createdAt)}</div>
                    </div>
                  </>
                );
              })}
            {image[0] && (
              <div className="bg-tal-500 relative">
                {image[0] && <img src={image} alt="Image" className={`h-[15rem] max-w-[70%] object-cover rounded-md ml-auto`} />}
                <IoCloseCircleSharp size={22} className="absolute top-0 right-0 cursor-pointer" onClick={handleCloseImg} />
              </div>
            )}

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
          <div className="pb-2 px-5 flex items-center gap-3">
            <CldUploadWidget
              uwConfig={{
                cloudName: "andryariadi",
                uploadPreset: "talksy",
                multiple: false,
                maxImageFileSize: 2000000,
                folder: "avatars",
              }}
              setImage={setImage}
            />

            <div className="relative flex items-center gap-2">
              <BsEmojiWinkFill size={18} className="hover:text-primary transition-all duration-300 cursor-pointer" onClick={() => setOpen(!open)} />
              <div className="absolute -top-[29.5rem] left-0 z-10">
                <EmojiPicker open={open} theme="dark" onEmojiClick={handleEmoji} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-sy-500 flex flex-1 items-center">
              <div className="bg-secondary p-3 rounded-lg flex flex-1 items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
                <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." autoComplete="off" className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
                {loading ? <div className="loading loading-spinner loading-xs"></div> : <IoIosSend size={20} className="text-gray-500 hover:text-primary transition-all duration-300 cursor-pointer" />}
              </div>
            </form>
          </div>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <img src={selectedImage} alt="Selected" className=" object-cover" />
          <IoCloseCircleSharp size={22} className="absolute top-0 right-0 cursor-pointer" onClick={handleCloseModal} />
        </div>
      )}

      {newMessageNotif && <MessageNotification message={newMessageNotif} />}
    </>
  );
};

export default Messages;
