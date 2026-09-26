import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollTextColorReveal = ({
  text = "",
  scrollColor = "transparent",
  mainColor = "transparent",
  className = "",
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current.querySelectorAll(".letter");

    gsap.fromTo(
      letters,
      { color: scrollColor },
      {
        color: mainColor,
        stagger: 0.05,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top center",
          end: "center 30%",
          scrub: true,
          
        },
      }
    );
  }, []);

  const splitWords = text.split(" ").map((word, wordIndex) => (
    <span
      key={`word-${wordIndex}`}
      style={{ whiteSpace: "nowrap", display: "inline-block" }}
    >
      {[...word].map((char, i) => (
        <span
          key={`char-${wordIndex}-${i}`}
          className="letter"
          style={{ display: "inline-block" }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
      {/* Add space after word */}
      <span
        aria-hidden="true"
        style={{ display: "inline-block", width: "0.25em" }}
      >
        &nbsp;
      </span>
    </span>
  ));

  return (
    <p ref={textRef} className={className} style={{ overflowWrap: "break-word" }}>
      {splitWords}
    </p>
  );
};

export default ScrollTextColorReveal;
