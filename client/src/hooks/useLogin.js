import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = handleInputErrors({ username, password });
    if (!success) return;

    setLoading(true);

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

      console.log(res.data.error, "<----dilogincontext");

      if (res.error) throw new Error(res.error);

      localStorage.setItem("authUser", JSON.stringify(res));

      setCurrentUser(res);

      toast.success("Logged in successfully!", {
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

  return { login, loading };
};

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!username) {
    toast.error("Please enter a username", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }

  if (!password) {
    toast.error("Please enter a password", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }
  return true;
}
