import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

const useLoginHookForm = () => {
  const { setCurrentUser } = useAuthContext();

  const loginForm = async ({ username, password }) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(res, "<---diloginhook");

      if (res.error) throw new Error(res.error);

      localStorage.setItem("authUser", JSON.stringify(res));

      setCurrentUser(res.data.user);

      toast.success("Logged in successfully!", {
        style: toastStyle,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        style: toastStyle,
      });
    }
  };

  return { loginForm };
};

export default useLoginHookForm;
