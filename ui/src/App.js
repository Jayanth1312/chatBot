import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import "./App.css";
import Login from './components/Login';
import Signup from './components/Signup';
import ChatInput from "./components/chatInput";
import UserMessage from "./components/UserMessage";
import GPTReply from "./components/GPTReply";
import MarqueeSuggestion from "./components/Marquee";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      content: message,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const botMessage = {
        type: "bot",
        content: data.response,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        type: "bot",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const ChatComponent = () => (
    <div className="App">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h1>What would you like to explore?</h1>
            <p>Here are some suggestions to get you started:</p>
            <div className="marquee-container">
              <MarqueeSuggestion />
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) =>
              msg.type === "user" ? (
                <UserMessage key={index} message={msg.content} />
              ) : (
                <GPTReply key={index} message={msg.content} />
              )
            )}
          </>
        )}
        <div className="chat-window">
          {isLoading && (
            <div className="loading-indicator">Let me fetch it for you...</div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="input-container">
        <ChatInput
          onSendMessage={handleSendMessage}
          value={inputValue}
          onChange={setInputValue}
          isLoading={isLoading}
        />
      </div>
      <footer>
        <p style={{ fontFamily: "inherit" }}>
          AI powered by Groq can make mistakes. Please use with caution.
        </p>
      </footer>
    </div>
  );

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
