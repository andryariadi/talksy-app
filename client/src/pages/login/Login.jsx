import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
// import useLogin from "../../hooks/useLogin";
import { LoaderBtn } from "../../components/Loading";
import { useForm } from "react-hook-form";
import useLoginHookForm from "../../hooks/useLoginHookForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validators/loginValidation";

const Login = () => {
  const [isPassword, setIsPassword] = useState(false);

  // USE REACT HOOK FORM
  const { loginForm } = useLoginHookForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmitLogin = async (data) => {
    console.log(data, "<-----dihookform");
    await loginForm(data);
  };

  console.log({ errors, isSubmitting }, "<----dihookform");

  //OLD AWAY
  // const { loading, login } = useLogin();

  // const [inputs, setInputs] = useState({
  //   username: "",
  //   password: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value, "<----difunctionchange");
  //   setInputs((prevUser) => ({
  //     ...prevUser,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await login(inputs);
  // };

  return (
    <div className="bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 flex flex-col gap-6 p-8">
      <h1 className="text-4xl font-bold text-center text-white">
        Login <span className="text-primary">Talksy</span>
      </h1>

      <form onSubmit={handleSubmit(handleSubmitLogin)} className="flex flex-col gap-5 text-neutral-100">
        <div className="flex flex-col gap-2 mb-2 relative">
          <label htmlFor="" className="text-xs">
            Username
          </label>
          <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
            <input type="text" placeholder="Username" {...register("username")} className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            <CiUser size={20} className="text-gray-500" />
          </div>
          {errors.username && <span className="text-rose-800 text-xs text-bold absolute -bottom-5">{errors.username.message}</span>}
        </div>

        <div className="flex flex-col gap-2 mb-2 relative">
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
          {errors.password && <span className="text-rose-800 text-xs text-bold absolute -bottom-5">{errors.password.message}</span>}
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
