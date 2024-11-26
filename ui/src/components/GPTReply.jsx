import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeteor } from "@fortawesome/free-solid-svg-icons";
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
      const codeContent = String(children).replace(/\n$/, "");

      // Handle inline code
      if (inline) {
        return <code className="inline-code">{codeContent}</code>;
      }

      // For code blocks, first check if it's a single line without language
      if (!className && !codeContent.includes("\n")) {
        return <code className="inline-code">{codeContent}</code>;
      }

      // Extract language from className or detect it
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : detectLanguage(codeContent);

      return (
        <div className="code-block-wrapper">
          <CodeBlock code={codeContent} language={language} />
        </div>
      );
    },
  };

  const detectLanguage = (code) => {
    if (code.includes('<?php')) return 'php';
    if (/<\/?[a-z][\s\S]*>/i.test(code)) return 'html';
    if (/import\s+.*\s+from/.test(code)) return 'javascript';
    if (/def\s+\w+\s*\(|import\s+\w+|print\s*\(/.test(code)) return 'python';
    if (/\b(const|let)\s+\w+\s*=/.test(code)) return 'javascript';
    if (/\bfunction\s+\w+\s*\(.*\)\s*{/.test(code)) return 'javascript';
    if (/public\s+class\s+\w+/.test(code)) return 'java';
    if (/^#include\s+<\w+\.h>/.test(code)) return 'cpp';
    if (/^using\s+System;/.test(code)) return 'c#';
    if (/^<\?xml/.test(code)) return 'xml';
    if (/^@import/.test(code)) return 'scss';
    if (/^package\s+main/.test(code)) return 'go';
    if (/^fn\s+main/.test(code)) return 'rust';
    if (/^object\s+\w+/.test(code)) return 'scala';
    if (/^import\s+Foundation/.test(code)) return 'swift';
    if (/^library\(.*\)/.test(code)) return 'r';
    if (/^function\s+\w+/.test(code)) return 'matlab';
    if (/^program\s+\w+;/.test(code)) return 'pascal';
    if (/^unit\s+\w+;/.test(code)) return 'delphi';
    if (/^module\s+\w+/.test(code)) return 'haskell';
    if (/^open\s+System/.test(code)) return 'fsharp';
    if (/^Imports\s+System/.test(code)) return 'vbnet';
    return 'plaintext';
  };

  return (
    <div className="gpt-reply">
      <div className="gpt-icon">
        <FontAwesomeIcon icon={faMeteor} size="xl" />
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
