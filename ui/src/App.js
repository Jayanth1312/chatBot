import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./components/chatInput";
import UserMessage from "./components/UserMessage";
import GPTReply from "./components/GPTReply";
import { SquareTerminal, Bug, Gauge, PenLine, ScrollText, Lightbulb } from 'lucide-react'
import "./App.css";

const API_URL = "http://localhost:3001";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const suggestions = [
    { text: "Summarize text", icon: <ScrollText size={16} />, colorClass: "icon-blue" },
    { text: "Explain a concept", icon: <Lightbulb size={16} />, colorClass: "icon-yellow" },
    { text: "Write code", icon: <SquareTerminal size={16} />, colorClass: "icon-purple" },
    { text: "Debug an error", icon: <Bug size={16} />, colorClass: "icon-red" },
    { text: "Help me write", icon: <PenLine size={16} />, colorClass: "icon-green" },
    { text: "Optimize code", icon: <Gauge size={16} />, colorClass: "icon-orange" }
  ];

  return (
    <div className="App">
      <div className="messages-container">
        <div className="chat-window">
          {messages.length === 0 ? (
            <div className="empty-state">
              <h1>What would you like to explore?</h1>
              <p>AI powered by Groq</p>
              <div className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className={`suggestion-button ${suggestion.colorClass}`}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    {suggestion.icon}
                    <span>{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                msg.type === 'user' ? (
                  <UserMessage key={index} message={msg.content} />
                ) : (
                  <GPTReply key={index} message={msg.content} />
                )
              ))}
            </>
          )}
          {isLoading && <div className="loading-indicator">Let me fetch it for you...</div>}
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
        <p style={{fontFamily:"inherit"}}>AI powered by Groq can make mistakes. Please use with caution.</p>
      </footer>
    </div>
  );
}
