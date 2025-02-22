import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Signup from "./components/signup";
import ChatComponent from "./components/chatComponent";
import "./config/firebaseConfig"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<ChatComponent />} />
    </Routes>
  );
}

export default App;
