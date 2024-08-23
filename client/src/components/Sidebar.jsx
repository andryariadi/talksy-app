import { BiSearchAlt } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="bg-violt-500 flex flex-col gap-10 border-e-[1px] border-slate-500 border-opacity-50 p-8">
      {/* Top */}
      <form action="">
        <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
          <input type="text" placeholder="Search..." className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
          <BiSearchAlt size={20} className="text-gray-500" />
        </div>
      </form>

      {/* Center */}
      <div className="scrollbar-hide bg-tal-500 flex flex-col gap-4 py-5 border-t-[1px] border-slate-500 border-opacity-50 max-h-96 overflow-y-scroll">
        {[...Array(10)].map((_, i) => (
          <div className="bg-ros-500 flex items-center gap-24 p-2 border-b-[1px] border-slate-500 hover:border-primary transition-all duration-300" key={i}>
            <div className="flex items-center gap-2">
              <img src="/noAvatar.png" alt="Avatar" className="w-12 h-w-12 rounded-full border-[1px] border-slate-500 border-opacity-50 p-1" />
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
  );
};

export default Sidebar;
