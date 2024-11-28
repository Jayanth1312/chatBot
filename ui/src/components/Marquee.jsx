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
  Soup,
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
  ChefHat,
  Volleyball,
  Leaf,
  Cog,
  Sprout,
  Pizza,
  Utensils,
  Syringe,
  ChevronsLeftRightEllipsis,
  Dumbbell,
  Plane,
  Tornado,
  Orbit,
  Guitar,
  Languages,
  Presentation,
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
          { text: "How to make perfect pasta al dente?", icon: <ChefHat size={16} /> },
          { text: "What are the basic rules of volleyball?", icon: <Volleyball size={16} /> },
          { text: "Explain how photosynthesis works", icon: <Leaf size={16} /> },
          { text: "How to start learning Python?", icon: <Code size={16} /> },
          { text: "Best exercises for core strength?", icon: <Heart size={16} /> },
          { text: "How does a car engine work?", icon: <Cog size={16} /> },
          { text: "Tips for indoor plant care?", icon: <Sprout size={16} /> },
          { text: "Basic guitar chords for beginners?", icon: <Guitar size={16} /> },
          { text: "How to make homemade pizza dough?", icon: <Pizza size={16} /> },
          { text: "What causes northern lights?", icon: <Star size={16} /> },
          { text: "Tips for better smartphone photos?", icon: <Camera size={16} /> },
          { text: "How to start meditation?", icon: <Brain size={16} /> },
        ],
        shuffleArray([...colorClasses])
      ),
    []
  );

  const secondRowSuggestions = useMemo(
    () =>
      createSuggestions(
        [
          { text: "What makes a great curry?", icon: <Utensils size={16} /> },
          { text: "How do vaccines work?", icon: <Syringe size={16} /> },
          { text: "Basic HTML/CSS for beginners?", icon: <ChevronsLeftRightEllipsis size={16} /> },
          { text: "Best books for learning chess?", icon: <BookOpen size={16} /> },
          { text: "How to brew pour-over coffee?", icon: <Coffee size={16} /> },
          { text: "Why do planes fly?", icon: <Plane size={16} /> },
          { text: "Hidden gems in Paris?", icon: <Map size={16} /> },
          { text: "Benefits of morning exercise?", icon: <Dumbbell size={16} /> },
          { text: "How do hurricanes form?", icon: <Tornado size={16} /> },
          { text: "Closest planet to Earth?", icon: <Orbit size={16} /> },
          { text: "Tips for creative writing?", icon: <PenLine size={16} /> },
          { text: "How to read music notes?", icon: <Music size={16} /> },
        ],
        shuffleArray([...colorClasses])
      ),
    []
  );

  const thirdRowSuggestions = useMemo(
    () =>
      createSuggestions(
        [
          { text: "How to analyze stock charts?", icon: <ChartArea size={16} /> },
          { text: "Best apps for learning languages?", icon: <Languages size={16} /> },
          { text: "How to make sushi at home?", icon: <Soup size={16} /> },
          { text: "Basic rules of tennis?", icon: <Gamepad size={16} /> },
          { text: "Tips for landscape photography?", icon: <Camera size={16} /> },
          { text: "How does blockchain work?", icon: <Link size={16} /> },
          { text: "What is quantum computing?", icon: <Cpu size={16} /> },
          { text: "Tips for password security?", icon: <Shield size={16} /> },
          { text: "Basic color theory explained?", icon: <Palette size={16} /> },
          { text: "How to edit videos on phone?", icon: <Film size={16} /> },
          { text: "Tips for personal budgeting?", icon: <DollarSign size={16} /> },
          { text: "How to give better presentations?", icon: <Presentation size={16} /> },
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
