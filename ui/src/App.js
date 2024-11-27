import { Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import Login from './components/Login';
import Signup from './components/Signup';
import ChatComponent from './components/chatComponent';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<ChatComponent />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
