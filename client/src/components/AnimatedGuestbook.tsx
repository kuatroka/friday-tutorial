import React, { useState, useEffect } from "react";
import "./AnimatedGuestbook.css";

const AnimatedGuestbook: React.FC = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Guestbook";
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
      }, 300); // moderate typing speed

      return () => clearTimeout(timeoutId);
    } else if (!isComplete) {
      setIsComplete(true);
    }
  }, [displayedText, fullText, isComplete]);

  return (
    <div className="animated-guestbook">
      <span>{displayedText}</span>
      <span className="blinking-cursor">|</span>
    </div>
  );
};

export default AnimatedGuestbook;
