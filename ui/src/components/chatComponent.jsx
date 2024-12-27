import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { LogOut, Mail, User, PanelLeft, CirclePlus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import "../styles/chatComponent.css";
import ChatInput from "./chatInput";
import UserMessage from "./userMessage";
import GPTReply from "./gptreply";
import MarqueeSuggestion from "./marquee";

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const messagesEndRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Ensure we have the latest user data including the photoURL
        setUser({
          ...currentUser,
          photoURL: currentUser.photoURL,
          displayName: currentUser.displayName,
          email: currentUser.email,
        });
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Add entry to browser history when entering chat mode
    if (isChatMode) {
      window.history.pushState({ isChatMode: true }, "");
    }

    // Handle browser back button and swipe
    const handlePopState = (event) => {
      if (isChatMode) {
        setIsChatMode(false);
        setMessages([]);
        setInputValue("");
        event.preventDefault();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isChatMode]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    setIsChatMode(true);
    const userMessage = {
      type: "user",
      content: message,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/chat", {
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
        content: data.message,
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 4) return "Happy late night";
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getInitial = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split("@")[0];
    return "";
  };

  const getUserInfo = () => {
    if (!user) return { displayText: "", isEmail: false };

    if (user.email && user.providerData[0]?.providerId !== "github.com") {
      return {
        displayText: user.email,
        isEmail: true,
      };
    }

    return {
      displayText: getUserDisplayName(),
      isEmail: false,
    };
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const createNewChat = () => {
    setMessages([]);
    setInputValue("");
    setIsLoading(false);
    setIsChatMode(false); // Reset to home page
  };

  return (
    <div className="chat-component">
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Sidebar content will go here */}
      </div>
      <div className={`main-content ${isOpen ? "shifted" : ""}`}>
        <div className="user-container">
          <div className="sidebar-container">
            <button className="sidebar-button" onClick={toggleSidebar}>
              <PanelLeft size={24} style={{ color: "#6b6b6b" }} />
            </button>
            <button className="new-chat-button" onClick={createNewChat}>
              <CirclePlus size={24} style={{ color: "#6b6b6b" }} />
            </button>
          </div>
          {user && (
            <div className="user-profile">
              <div className="profile-dropdown" ref={dropdownRef}>
                <div onClick={toggleDropdown}>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="profile-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        setUser((prev) => ({ ...prev, photoURL: null }));
                      }}
                    />
                  ) : (
                    <div className="profile-initial">
                      {getInitial(getUserDisplayName())}
                    </div>
                  )}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-content">
                    <div className="dropdown-item">
                      {getUserInfo().isEmail ? (
                        <Mail size={16} />
                      ) : (
                        <User size={16} />
                      )}
                      <span>{getUserInfo().displayText}</span>
                    </div>
                    <button
                      className="dropdown-item logout-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSignOut();
                      }}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="content-wrapper">
          <div className="messages-container">
            {!isChatMode ? (
              <div className="empty-state">
                <h1>
                  <FontAwesomeIcon icon={faBolt} size="sm" />{" "}
                  {user ? `${getGreeting()}, ${getUserDisplayName()}` : "Welcome"}
                </h1>
                <p>Here are some suggestions to get you started:</p>
                <div className="marquee-container">
                  <MarqueeSuggestion />
                </div>
              </div>
            ) : (
              <div className="messages">
                {messages.map((msg, index) =>
                  msg.type === "user" ? (
                    <UserMessage key={index} message={msg.content} />
                  ) : (
                    <GPTReply key={index} message={msg.content} />
                  )
                )}
                {isLoading && (
                  <div className="loading-indicator">Let me fetch it for you...</div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          <div className="input-container">
            <ChatInput
              onSendMessage={handleSendMessage}
              value={inputValue}
              onChange={setInputValue}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatComponent;
