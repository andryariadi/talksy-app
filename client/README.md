# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<!-- Jika validasi Zod nya dilakukan di custom hook useLoginHookForm -->

<!-- Custom Hook -->

import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import \* as z from "zod";

const loginSchema = z.object({
username: z.string().min(1, "Username is required"),
password: z.string().min(6, "Password must be at least 6 characters long"),
});

const useLoginHookForm = () => {
const { setCurrentUser } = useAuthContext();

const loginForm = async ({ username, password }) => {
// Lakukan validasi dengan Zod menggunakan safeParse
const validationResult = loginSchema.safeParse({ username, password });

    console.log(validationResult, "<----diloginhook");

    if (!validationResult.success) {
      // Return error jika validasi gagal
      return { error: validationResult.error };
    }

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        username,
        password,
      });

      setCurrentUser(res.data);
      return { success: true }; // Return success jika berhasil
    } catch (error) {
      console.log(error);
      return { error: [{ message: "Login failed. Please try again." }] };
    }

};

return { loginForm };
};

export default useLoginHookForm;

<!-- Login Component -->

import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { LoaderBtn } from "../../components/Loading";
import { useForm } from "react-hook-form";
import useLoginHookForm from "../../hooks/useLoginHookForm";

const Login = () => {
const [isPassword, setIsPassword] = useState(false);

const { loginForm } = useLoginHookForm();

const {
register,
handleSubmit,
formState: { errors, isSubmitting },
setError, // Untuk menangani error dari hook
} = useForm();

const handleSubmitLogin = async (data) => {
const result = await loginForm(data);

    if (result?.error) {
      // Memastikan error dan errors ada sebelum menggunakan forEach
      if (result.error && result.error.errors) {
        result.error.errors.forEach((err) => {
          setError(err.path[0], { type: "manual", message: err.message });
        });
      } else {
        // Menangani kasus ketika struktur error tidak sesuai dengan yang diharapkan
        console.error("Unexpected error format:", result.error);
      }
    }

};

return (

<div className="bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 flex flex-col gap-4 p-8">
<h1 className="text-4xl font-bold text-center text-white">
Login <span className="text-primary">Talksy</span>
</h1>

      <form onSubmit={handleSubmit(handleSubmitLogin)} className="flex flex-col gap-4 text-neutral-100">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs">
            Username
          </label>
          <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
            <input type="text" placeholder="Username" {...register("username")} className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            <CiUser size={20} className="text-gray-500" />
          </div>
          {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs">
            Password
          </label>
          <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
            <input type={isPassword ? "text" : "password"} placeholder="Password" {...register("password")} className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            {isPassword ? (
              <IoIosEyeOff size={24} className="text-gray-500 cursor-pointer" onClick={() => setIsPassword(!isPassword)} />
            ) : (
              <IoIosEye size={24} className="text-gray-500 cursor-pointer" onClick={() => setIsPassword(!isPassword)} />
            )}
          </div>
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <Link to="/signup" className="text-xs hover:text-primary transition-all duration-300">
            Dont have an account?
          </Link>
          <button disabled={isSubmitting} className="bg-primary text-white text-xs p-3 rounded-lg ">
            {isSubmitting ? <LoaderBtn /> : "Login"}
          </button>
        </div>
      </form>
    </div>

);
};

export default Login;

// useAuthContext.js
import { useContext } from "react";
import { AuthContext } dari "./AuthContext";

export const useAuthContext = () => {
return useContext(AuthContext);
};

// AuthContext.js
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("authUser")) || null);

console.log(currentUser, "<----authcontextprovider");

return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>;
};
