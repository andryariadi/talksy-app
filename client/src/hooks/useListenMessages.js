import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversationStore from "../libs/conversationStore";
import notificationSound from "../assets/sound/notification.mp3";

const useListenMessages = (setNewMessage) => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversationStore();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
      setNewMessage(newMessage);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages, setNewMessage]);
};

export default useListenMessages;
