import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./components/chatInput";
import UserMessage from "./components/UserMessage";
import GPTReply from "./components/GPTReply";
import "./App.css";

const API_URL = "http://localhost:3001";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  const handleSendMessage = async (message) => {
    try {
      setIsLoading(true);
      // Add user message immediately
      setMessages(prev => [...prev, { type: 'user', content: message }]);

      // Send message to API
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      

      setMessages(prev => [...prev, { type: 'gpt', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'gpt', 
        content: 'Sorry, there was an error processing your request.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="messages-container">
        <div className="chat-window">
          {messages.map((msg, index) => (
            msg.type === 'user' ? (
              <UserMessage key={index} message={msg.content} />
            ) : (
              <GPTReply key={index} message={msg.content} />
            )
          ))}
          {isLoading && <div className="loading-indicator">Let me fetch it for you...</div>}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="input-container">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
      <footer>
        <p style={{fontFamily:"inherit"}}>AI powered by Groq can make mistakes</p>
      </footer>
    </div>
  );
}
