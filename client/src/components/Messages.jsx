import { IoLogoWechat } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";

const Messages = () => {
  const open = true;
  return (
    <>
      {open ? (
        <div className="bg-tal-500 flex flex-col min-w-[30rem]">
          {/* Top */}
          <div className="bg-amber-500 flex items-center gap-2 px-8 py-3">
            <span>To :</span>
            <h1>Andry Ariadi</h1>
          </div>

          {/* Center */}
          <div className="bg-rose-500 flex flex-col flex-1">
            <div>Andry</div>
            <div>Andry</div>
          </div>

          {/* Bottom */}
          <form className="bg-sky-500">
            <div className="bg-secondary p-3 rounded-lg flex items-center gap-2 border border-secondary hover:border-primary transition-all duration-300">
              <input type="text" placeholder="Type a message..." className="bg-transparent outline-none text-xs placeholder:text-xs flex-1" />
              <IoIosSend size={20} className="text-gray-500" />
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-tal-500 flex flex-col items-center justify-center gap-2 p-10 min-w-[30rem]">
          <h1 className="text-3xl">Welcome Andry Ariadi</h1>
          <h2 className="text-xl">Select a chat to start messaging</h2>
          <IoLogoWechat size={70} className="text-gray-500" />
        </div>
      )}
    </>
  );
};

export default Messages;
