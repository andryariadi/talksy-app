import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();

  const { setCurrentUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/singup", {
        fullName,
        username,
        password,
        confirmPassword,
        gender,
      });

      if (res.error) throw new Error(res.error);

      localStorage.setItem("authUser", JSON.stringify(res));

      setCurrentUser(res.data);

      toast.success("Account created successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      //   navigate("/login");

      console.log(res, "<---disignuphook");
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName) {
    toast.error("Please enter a fullName", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }
  if (fullName.length < 3 || fullName.length > 20) {
    toast.error("Fullname must be between 3 and 20 characters", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }

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

  if (username.length < 3 || username.length > 20) {
    toast.error("Username must be between 3 and 20 characters", {
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

  if (password.length < 3 || password.length > 20) {
    toast.error("Password must be between 3 and 20 characters", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }

  if (!confirmPassword) {
    toast.error("Please confirm your password", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    return false;
  }

  if (!gender) {
    toast.error("Please select a gender", {
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
