import React, { PureComponent } from "react";
import send from "../assets/arrow-up.svg";
import "../styles/chatInput.css";

export default class chatInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasContent: false,
    };
    this.textareaRef = React.createRef();
  }

  componentDidMount() {
    this.adjustTextareaHeight();
  }

  adjustTextareaHeight = () => {
    const textarea = this.textareaRef.current;
    if (textarea) {
      textarea.style.height = "inherit";
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 44), 200);
      textarea.style.height = `${newHeight}px`;

      const text = textarea.value.trim();
      const hasContent = text.length > 0;

      this.setState({
        hasContent: hasContent,
      });
    }
  };

  handleInput = (e) => {
    this.adjustTextareaHeight();
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }

    this.adjustTextareaHeight();
  };

  render() {
    const { hasContent } = this.state;

    return (
      <div className={`chat-container ${hasContent ? "has-content" : ""}`}>
        <textarea
          ref={this.textareaRef}
          placeholder="Hello - use '@' to mention a category"
          className="chat-input"
          onInput={this.handleInput}
          onKeyDown={this.handleKeyDown}
          rows={1}
        />
        <div className="button-container">
          <button className="chat-button">
            <img src={send} alt="send" />
          </button>
        </div>
      </div>
    );
  }
}
