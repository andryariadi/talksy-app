import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("authUser")) || null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("authUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [currentUser]);

  console.log(currentUser, "<----authcontextprovider");

  return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>;
};
