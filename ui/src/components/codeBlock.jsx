import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Clipboard, Check } from "lucide-react";
import { useState } from "react";
import "../styles/codeBlock.css";

export default function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeString = `# Define the numbers
number1 = 5
number2 = 7

# Add the numbers
sum = number1 + number2

# Print the result
print("The sum of", number1, "and", number2, "is:", sum)
`;

  return (
    <div className="main-code-block">
      <div className="code-block-header">
        <div className="code-block-language">
                  <span>python</span>
        </div>
        <div className="code-block-copy">
          <button onClick={handleCopy}>
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
        style={atomOneDark}
        customStyle={{
          backgroundColor: "#23272d",
          padding: "24px",
          fontSize: "14px",
        }}
        wrapLongLines={true}
        showLineNumbers={true}
        lineNumberStyle={{
          minWidth: "2.5em",
          paddingRight: "1em",
          color: "#666",
          textAlign: "right",
        }}
        className="code-block"
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}