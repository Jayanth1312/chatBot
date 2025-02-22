import React from 'react';
import '../styles/userMessage.css';

const UserMessage = ({ message }) => {
  return (
    <div className="user-message">
      <div className="message-content" style={{ fontFamily: "Inter, sans-serif"}}>
        {message}
      </div>
    </div>
  );
};

export default UserMessage;
