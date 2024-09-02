import useGetConversation from "../hooks/useGetConversation";

export const MessageNotification = ({ message }) => {
  const { conversations } = useGetConversation();

  const senderUser = conversations.find((c) => c._id === message.senderId);
  const shakeClass = message.shouldShake ? "shake" : "";

  console.log(senderUser, "<---messageNotification");

  return (
    <div className={`${shakeClass} fixed top-0 right-0 bg-primary text-white p-3 rounded-lg shadow-lg`}>
      <div className="flex items-center gap-2">
        <img src={senderUser?.profilePicture} alt="Profile" className="w-8 h-8 rounded-full" />
        <div>
          <span className="font-bold text-base text-secondary">{senderUser?.username || senderUser?.fullName}</span>
          <p className="text-sm">{message.message}</p>
        </div>
      </div>
    </div>
  );
};
