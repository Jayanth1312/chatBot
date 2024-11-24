import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierCaveDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Clipboard, Check } from "lucide-react";
import { useState, useEffect } from "react";
import "../styles/codeBlock.css";

export default function CodeBlock() {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState("15px");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
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

      window.addEventListener('resize', updateFontSize);
      
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  const codeString = `# Define the numbers
number1 = 5
number2 = 7

# Add the numbers
sum = number1 + number2

# Print the result
print("The sum of", number1, "and", number2, "is:", sum)`;

  return (
    <div className="main-code-block">
      <div className="code-block-header">
        <div className="code-block-language">
          <span>Python</span>
        </div>
        <div className="code-block-copy">
          <button
            className="chat-button"
            onClick={handleCopy}
            disabled={!codeString}
          >
            {copied ? (
              <Check size={16} color="#4ade80" />
            ) : (
              <Clipboard size={16} />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language="python"
        style={atelierCaveDark}
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
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}
