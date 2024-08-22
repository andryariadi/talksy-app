import { BiSearchAlt } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";

const Home = () => {
  return (
    <div className="bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 flex items-center gap-4 p-8 text-neutral-200">
      {/* Left */}
      <div className="bg-violt-500 flex flex-col gap-10">
        {/* Top */}
        <div>
          <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
            <input type="text" placeholder="Search..." className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
            <BiSearchAlt size={20} className="text-gray-500" />
          </div>
        </div>

        {/* Center */}
        <div className="andry bg-tal-500 flex flex-col gap-4 py-5 border-t-[1px] border-slate-500 border-opacity-50 max-h-96 overflow-y-scroll">
          {[...Array(10)].map((_, i) => (
            <div className="bg-ros-500 flex items-center gap-24 p-2 border-b-[1px] border-slate-500" key={i}>
              <div className="flex items-center gap-2">
                <img src="/noAvatar.png" alt="Avatar" className="w-10 h-10 rounded-full" />
                <span>Andry Ariadi</span>
              </div>
              <BsFillChatDotsFill size={20} className="text-gray-500" />
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div>
          <RiLogoutCircleLine size={20} className="hover:text-primary transition-all duration-300 cursor-pointer" />
        </div>
      </div>

      {/* Right */}
      <div className="bg-teal-500">Andry</div>
    </div>
  );
};

export default Home;
