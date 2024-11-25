import React, { PureComponent } from "react";
import { ArrowUp } from "lucide-react";
import "../styles/chatInput.css";

export default class ChatInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      rows: 1,
      isLoading: false
    };
  }

  handleInputChange = (e) => {
    const message = e.target.value;
    this.setState({ message });
    this.adjustTextareaHeight(e.target);
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (this.state.message.trim()) {
        this.handleSendMessage();
      }
    }
  };

  handleSendMessage = async () => {
    const { message, isLoading } = this.state;
    const { onSendMessage } = this.props;

    if (!message.trim() || isLoading) return;

    try {
      this.setState({ isLoading: true });
      
      if (onSendMessage) {
        await onSendMessage(message);
      }

      // Reset both the message and the textarea height
      this.setState({ message: "", rows: 1 }, () => {
        const textarea = document.querySelector('.chat-input');
        if (textarea) {
          textarea.style.height = 'auto';
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    const rows = Math.min(
      Math.max(Math.ceil(textarea.scrollHeight / 24), 1),
      5
    );
    this.setState({ rows });
  };

  render() {
    const { message, isLoading } = this.state;
    const hasContent = message.trim().length > 0;

    console.log(hasContent, isLoading);

    return (
      <div className={`chat-container ${hasContent ? "has-content" : ""}`}>
        <textarea
          className="chat-input"
          placeholder="Ask me anything..."
          value={message}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          rows={1}
          disabled={isLoading}
        />
        <div className="button-container">
          <button
            className="chat-button"
            onClick={this.handleSendMessage}
            disabled={!hasContent || isLoading}
          >
            <ArrowUp 
              size={24}
              style={{ color: hasContent && !isLoading ? "#ffffff" : "#6b6b6b" }}
            />
          </button>
        </div>
      </div>
    );
  }
}
