import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  return (
    <div className="bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 flex flex-col gap-4 p-8">
      <h1 className="text-4xl font-bold text-center text-white">
        Sing Up <span className="text-primary">Talksy</span>
      </h1>

      <form action="" className="bg-ros-500 grid grid-cols-2 gap-4 text-neutral-100">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs">
            Fullname
          </label>
          <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
            <input type="text" placeholder="Fullname" className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            <CiUser size={20} className="text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs">
            Username
          </label>
          <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
            <input type="text" placeholder="Username" className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            <CiUser size={20} className="text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs">
            Password
          </label>
          <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
            <input type={isPassword ? "text" : "password"} placeholder="Password" className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
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
          <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
            <input type={isPasswordConfirm ? "text" : "password"} placeholder="Confirm Password" className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            {isPasswordConfirm ? (
              <IoIosEyeOff size={24} className="text-gray-500 cursor-pointer" onClick={() => setIsPasswordConfirm(!isPasswordConfirm)} />
            ) : (
              <IoIosEye size={24} className="text-gray-500 cursor-pointer" onClick={() => setIsPasswordConfirm(!isPasswordConfirm)} />
            )}
          </div>
        </div>

        <div className="col-span-2">
          <GenderCheckbox />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <span className="text-xs hover:text-primary transition-all duration-300 cursor-pointer">Already have an account?</span>
          <button className="bg-primary text-white text-xs p-3 rounded-lg ">Login</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
