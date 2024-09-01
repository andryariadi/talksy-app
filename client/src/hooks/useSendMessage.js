import { useState } from "react";
import toast from "react-hot-toast";
import useConversationStore from "../libs/conversationStore";
import axios from "axios";

const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversationStore();

  const sendMessage = async ({ message, imgUrl }) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/messages/send/${selectedConversation._id}`,
        {
          message,
          image: imgUrl,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res.data, "<----dimessagehook");

      if (res.error) throw new Error(res.error);

      setMessages([...messages, res.data.newMessage]);

      toast.success("Message sent successfully!", {
        style: toastStyle,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        style: toastStyle,
      });
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
