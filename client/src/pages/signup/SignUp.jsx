import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { LoaderBtn } from "../../components/Loading";

const SignUp = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup, errors } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "<----difunctionchange");
    setInputs((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (gender) => {
    setInputs((prevUser) => ({
      ...prevUser,
      gender,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 flex flex-col gap-4 p-8">
      <h1 className="text-4xl font-bold text-center text-white">
        Sing Up <span className="text-primary">Talksy</span>
      </h1>

      <form onSubmit={handleSubmit} className="bg-ros-500 grid grid-cols-2 gap-4 text-neutral-100">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs">
            Fullname
          </label>
          <div className={`bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary ${errors.fullName ? "border-rose-800 hover:border-rose-800" : ""} hover:border-primary transition-all duration-300`}>
            <input type="text" placeholder="Fullname" name="fullName" value={inputs.fullName} onChange={handleChange} className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            <CiUser size={20} className="text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs">
            Username
          </label>
          <div className={`bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary ${errors.username ? "border-rose-800 hover:border-rose-800" : ""} hover:border-primary transition-all duration-300`}>
            <input type="text" placeholder="Username" name="username" value={inputs.username} onChange={handleChange} className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            <CiUser size={20} className="text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs">
            Password
          </label>
          <div className={`bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary ${errors.password ? "border-rose-800 hover:border-rose-800" : ""} hover:border-primary transition-all duration-300`}>
            <input type={isPassword ? "text" : "password"} placeholder="Password" name="password" value={inputs.password} onChange={handleChange} className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            {isPassword ? (
              <IoIosEyeOff size={24} className="text-gray-500 cursor-pointer" onClick={() => setIsPassword(!isPassword)} />
            ) : (
              <IoIosEye size={24} className="text-gray-500 cursor-pointer" onClick={() => setIsPassword(!isPassword)} />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs">
            Confirm Password
          </label>
          <div className={`bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary ${errors.confirmPassword ? "border-rose-800 hover:border-rose-800" : ""} hover:border-primary transition-all duration-300`}>
            <input
              type={isPasswordConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
              className="bg-transparent outline-none text-xs placeholder:text-xs flex-1"
            />
            {isPasswordConfirm ? (
              <IoIosEyeOff size={24} className="text-gray-500 cursor-pointer" onClick={() => setIsPasswordConfirm(!isPasswordConfirm)} />
            ) : (
              <IoIosEye size={24} className="text-gray-500 cursor-pointer" onClick={() => setIsPasswordConfirm(!isPasswordConfirm)} />
            )}
          </div>
        </div>

        <div className="col-span-2">
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} errors={errors} />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <Link to="/login" className="text-xs hover:text-primary transition-all duration-300">
            Already have an account?
          </Link>
          <button disabled={loading} className="bg-primary text-white text-xs p-3 rounded-lg ">
            {loading ? <LoaderBtn /> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
