import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

const useGetConversation = () => {
  const [isLoading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8000/api/users", {
          withCredentials: true,
        });

        console.log(res.data, "<----dihookconversation");

        setConversations(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error, {
          style: toastStyle,
        });
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { setConversations, conversations, isLoading };
};

export default useGetConversation;
