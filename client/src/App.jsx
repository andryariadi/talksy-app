import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useAuthContext();
  return (
    <>
      <main className="p-4 flex items-center justify-center h-screen">
        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
        </Routes>
        <Toaster />
      </main>
    </>
  );
}

export default App;
