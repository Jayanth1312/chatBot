import React, { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Clipboard, Check } from "lucide-react";
import "../styles/codeBlock.css";

const languageMap = {
  js: "javascript",
  jsx: "javascript",
  javascript: "javascript",
  ts: "typescript",
  tsx: "typescript",
  typescript: "typescript",
  py: "python",
  python: "python",
  java: "java",
  cpp: "cpp",
  "c++": "cpp",
  c: "c",
  cs: "c#",
  csharp: "c#",
  "c#": "c#",
  html: "html",
  xml: "xml",
  css: "css",
  json: "json",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  markdown: "markdown",
  sql: "sql",
  mysql: "sql",
  postgresql: "sql",
  sh: "bash",
  bash: "bash",
  shell: "bash",
  zsh: "bash",
  sass: "scss",
  scss: "scss",
  go: "go",
  golang: "go",
  rust: "rust",
  scala: "scala",
  swift: "swift",
  r: "r",
  matlab: "matlab",
  pascal: "pascal",
  delphi: "delphi",
  haskell: "haskell",
  fsharp: "fsharp",
  fs: "fsharp",
  vb: "vbnet",
  vbnet: "vbnet",
  visualbasic: "vbnet",
  plaintext: "plaintext",
  text: "plaintext",
  txt: "plaintext",
  plain: "plaintext",
};

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState("15px");

  const getLanguage = (lang) => {
    if (!lang) return "plaintext";

    const cleanLang = lang.toLowerCase().trim().replace(/^\./, "");

    const mappedLanguage = languageMap[cleanLang];

    return mappedLanguage || cleanLang || "plaintext";
  };

  const displayLanguage = (lang) => {
    const detected = getLanguage(lang);
    return detected.charAt(0).toUpperCase() + detected.slice(1);
  };

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

  const detectedLanguage = getLanguage(language);

  return (
    <div className="main-code-block">
      <div className="code-block-header">
        <div className="code-block-language">
          <span>{displayLanguage(language)}</span>
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
        language={detectedLanguage}
        style={atomOneDark}
        customStyle={{
          backgroundColor: "#17171c",
          padding: "24px",
          fontSize: fontSize,
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
