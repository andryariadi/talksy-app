import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser) {
      const socket = io("http://localhost:8000");
      setSocket(socket);

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [currentUser, socket]);
  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
