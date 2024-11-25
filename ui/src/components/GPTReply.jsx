import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import CodeBlock from "./codeBlock";
import "../styles/GPTReply.css";

const GPTReply = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const components = {
    p: ({ children }) => {
      return <p className="markdown-paragraph">{children}</p>;
    },
    code: ({ node, inline, className, children }) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "text";
      const codeContent = String(children).replace(/\n$/, "");

      // Return simple inline code for inline snippets
      if (inline) {
        return <code className="inline-code">{codeContent}</code>;
      }

      // Only use CodeBlock component for multiline code blocks
      return <CodeBlock code={codeContent} language={language} />;
    },
  };

  return (
    <div className="gpt-reply">
      <div className="gpt-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
      </div>
      <div className="reply-content">
        <ReactMarkdown components={components} className="markdown-content">
          {message}
        </ReactMarkdown>
        <button
          className={`copy-button ${copied ? "copied" : ""}`}
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check size={16} color="#737373" /> Copied!
            </>
          ) : (
            <>
              <Copy size={16} color="#737373" /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default GPTReply;