import Messages from "../../components/Messages";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  return (
    <div className="bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 flex items-center text-neutral-200 h-[85%] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Messages */}
      <Messages />
    </div>
  );
};

export default Home;
