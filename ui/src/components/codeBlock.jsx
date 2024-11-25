import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Clipboard, Check } from "lucide-react";
import "../styles/codeBlock.css";

const languageMap = {
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  py: "python",
  rb: "ruby",
  java: "java",
  cpp: "cpp",
  c: "c",
  cs: "csharp",
  php: "php",
  html: "xml",
  css: "css",
  json: "json",
  yaml: "yaml",
  md: "markdown",
  sql: "sql",
  sh: "bash",
  sass: "scss",
  scss: "scss",
  bash: "bash",
  plaintext: "plaintext",
  text: "plaintext",
  go: "go",
  rust: "rust",
  scala: "scala",
  swift: "swift",
  r: "r",
  matlab: "matlab",
  typescript: "typescript",
  pascal: "pascal",
  delphi: "delphi",
  haskell: "haskell",
  fsharp: "fsharp",
  vbnet: "vbnet",
  visualbasicnet: "vbnet",
};

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState("15px");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth <= 480) {
        setFontSize("12px");
      } else if (window.innerWidth <= 768) {
        setFontSize("14px");
      } else {
        setFontSize("15px");
      }
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);
    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  return (
    <div className="main-code-block">
      <div className="code-block-header">
        <div className="code-block-language">
          <span>{language}</span>
        </div>
        <div className="code-block-copy">
          <button className="chat-button" onClick={handleCopy} disabled={!code}>
            {copied ? (
              <Check size={16} color="#d4d4d4" />
            ) : (
              <Clipboard size={16} />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={atomOneDark}
        customStyle={{
          backgroundColor: "#17171c",
          padding: "24px",
          fontSize: fontSize,
          fontFamily:
            '"Geist Mono", "Menlo", "Monaco", "Courier New", monospace',
        }}
        wrapLongLines={true}
        showLineNumbers={true}
        lineNumberStyle={{
          minWidth: "2.5em",
          paddingRight: "1em",
          color: "#666",
          textAlign: "right",
          fontSize: fontSize,
        }}
        className="syntax-highlighter"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
