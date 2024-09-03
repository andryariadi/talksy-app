import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext";

const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const { setCurrentUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const errorMessages = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

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

      localStorage.setItem("authUser", JSON.stringify(res.data.newUser));

      // setCurrentUser(res.data.newUser);

      toast.success("Account created successfully!", {
        style: toastStyle,
      });

      setErrors({});

      navigate("/login");

      console.log(res, "<---disignuphook");
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        style: toastStyle,
      });
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, errors };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  const errors = {};

  if (!fullName) {
    errors.fullName = "Please enter a full name!";
    toast.error(errors.fullName, { style: toastStyle });
    return errors;
  } else if (fullName.length < 4 || fullName.length > 20) {
    errors.fullName = "Full name must be between 4 and 20 characters!";
    toast.error(errors.fullName, { style: toastStyle });
    return errors;
  }

  if (!username) {
    errors.username = "Please enter a username!";
    toast.error(errors.username, { style: toastStyle });
    return errors;
  } else if (username.length < 4 || username.length > 20) {
    errors.username = "Username must be between 4 and 20 characters!";
    toast.error(errors.username, { style: toastStyle });
    return errors;
  }

  if (!password) {
    errors.password = "Please enter a password!";
    toast.error(errors.password, { style: toastStyle });
    return errors;
  } else if (password.length < 6 || password.length > 20) {
    errors.password = "Password must be between 6 and 20 characters!";
    toast.error(errors.password, { style: toastStyle });
    return errors;
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password!";
    toast.error(errors.confirmPassword, { style: toastStyle });
    return errors;
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match!";
    toast.error(errors.confirmPassword, { style: toastStyle });
    return errors;
  }

  if (!gender) {
    errors.gender = "Please select a gender!";
    toast.error(errors.gender, { style: toastStyle });
    return errors;
  }

  return errors;
}
