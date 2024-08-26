import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useLoginHookForm = () => {
  const { setCurrentUser } = useAuthContext();

  const loginForm = async ({ username, password }) => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        username,
        password,
      });

      setCurrentUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { loginForm };
};

export default useLoginHookForm;
