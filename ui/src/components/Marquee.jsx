import React, { useMemo } from "react";
import "../styles/Marquee.css";
import {
  SquareTerminal,
  Bug,
  Gauge,
  PenLine,
  ScrollText,
  Lightbulb,
  Brain,
  Calculator,
  Globe,
  Music,
  Camera,
  Database,
  Code,
  BookOpen,
  Coffee,
  Rocket,
  Heart,
  Map,
  Cloud,
  Star,
  ChartArea,
  Shield,
  Smartphone,
  Gamepad,
  Layout,
  Settings,
  Link,
  Cpu,
  Zap,
  FileText,
  Headphones,
  Palette,
  Film,
  DollarSign,
  Users,
} from "lucide-react";

const handleSuggestionClick = (text) => {
  console.log("Suggestion clicked:", text);
};

const colorClasses = [
  "icon-blue",
  "icon-yellow",
  "icon-green",
  "icon-orange",
  "icon-purple",
  "icon-pink",
  "icon-cyan",
  "icon-indigo",
  "icon-teal",
  "icon-red",
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const createSuggestions = (suggestions, colors) => {
  return suggestions.map((suggestion, index) => ({
    ...suggestion,
    colorClass: colors[index % colors.length],
  }));
};

const MarqueeContent = ({ suggestions }) => (
  <>
    {[...suggestions, ...suggestions].map((suggestion, index) => (
      <div
        key={index}
        className={`marquee-suggestion ${suggestion.colorClass}`}
        onClick={() => handleSuggestionClick(suggestion.text)}
      >
        {suggestion.icon}
        <span>{suggestion.text}</span>
      </div>
    ))}
  </>
);

export default function MarqueeSuggestion() {
  const allSuggestions = useMemo(
    () =>
      createSuggestions(
        [
          { text: "Summarize text", icon: <ScrollText size={16} /> },
          { text: "Explain a concept", icon: <Lightbulb size={16} /> },
          { text: "Help me write", icon: <PenLine size={16} /> },
          { text: "Optimize code", icon: <Gauge size={16} /> },
          { text: "Write code", icon: <SquareTerminal size={16} /> },
          { text: "How does AI work?", icon: <Brain size={16} /> },
          { text: "Solve math problems", icon: <Calculator size={16} /> },
          { text: "Translate languages", icon: <Globe size={16} /> },
          { text: "Music theory basics", icon: <Music size={16} /> },
          { text: "Debug an error", icon: <Bug size={16} /> },
          { text: "Data visualization", icon: <ChartArea size={16} /> },
          { text: "Learn machine learning", icon: <Zap size={16} /> },
        ],
        shuffleArray([...colorClasses])
      ),
    []
  );

  const secondRowSuggestions = useMemo(
    () =>
      createSuggestions(
        [
          { text: "Photography tips", icon: <Camera size={16} /> },
          { text: "Database design", icon: <Database size={16} /> },
          { text: "Learn algorithms", icon: <Code size={16} /> },
          { text: "Book recommendations", icon: <BookOpen size={16} /> },
          { text: "Coffee brewing guide", icon: <Coffee size={16} /> },
          { text: "Space exploration", icon: <Rocket size={16} /> },
          { text: "Travel planning", icon: <Map size={16} /> },
          { text: "Health and wellness", icon: <Heart size={16} /> },
          { text: "Weather patterns", icon: <Cloud size={16} /> },
          { text: "Astronomy basics", icon: <Star size={16} /> },
          { text: "Content writing", icon: <FileText size={16} /> },
          { text: "Audio production", icon: <Headphones size={16} /> },
        ],
        shuffleArray([...colorClasses])
      ),
    []
  );

  const thirdRowSuggestions = useMemo(
    () =>
      createSuggestions(
        [
          { text: "Data analysis", icon: <ChartArea size={16} /> },
          { text: "Mobile app development", icon: <Smartphone size={16} /> },
          { text: "System administration", icon: <Settings size={16} /> },
          { text: "Game development", icon: <Gamepad size={16} /> },
          { text: "Web design", icon: <Layout size={16} /> },
          { text: "Networking", icon: <Link size={16} /> },
          { text: "Computer hardware", icon: <Cpu size={16} /> },
          { text: "Cybersecurity", icon: <Shield size={16} /> },
          { text: "Graphic design", icon: <Palette size={16} /> },
          { text: "Video editing", icon: <Film size={16} /> },
          { text: "Financial planning", icon: <DollarSign size={16} /> },
          { text: "Team management", icon: <Users size={16} /> },
        ],
        shuffleArray([...colorClasses])
      ),
    []
  );

  return (
    <div>
      <div className="marquee-content left">
        <MarqueeContent suggestions={allSuggestions} />
      </div>
      <div className="marquee-content left">
        <MarqueeContent suggestions={secondRowSuggestions} />
      </div>
      <div className="marquee-content left">
        <MarqueeContent suggestions={thirdRowSuggestions} />
      </div>
    </div>
  );
}
