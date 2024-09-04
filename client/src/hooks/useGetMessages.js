import { useEffect, useState } from "react";
import useConversationStore from "../libs/conversationStore";
import toast from "react-hot-toast";
import axios from "axios";

const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

const useGetMessages = () => {
  const [isLoading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversationStore();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/messages/${selectedConversation._id}`, {
          withCredentials: true,
        });

        if (res.error) throw new Error(res.error);

        setMessages(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error, {
          style: toastStyle,
        });
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, isLoading };
};

export default useGetMessages;
