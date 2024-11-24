import React from "react";
import ChatInput from "./components/chatInput";
import CodeBlock from "./components/codeBlock";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="chat-window">
        <CodeBlock />
      </div>
      <div className="input-container">
        {/* <ChatInput /> */}
      </div>
    </div>
  );
}
