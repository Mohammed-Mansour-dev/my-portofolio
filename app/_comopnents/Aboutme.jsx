import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap/all'

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


const Aboutme = () => {
  const containera = useRef(null)
  const parallaxImage2 = useRef(null)


  useEffect(() => {
    // 2️⃣ Second section parallax
    gsap.fromTo(
      parallaxImage2.current,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containera.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    )
  }, []
  )

  return (
    <div id="about" ref={containera} className="h-screen  p-4   md:px-24 relative overflow-hidden  ">

      <div className='fixed w-full h-[120vh] left-0 -top-[13vh] -z-10' >
        <Image
          ref={parallaxImage2}
          src={"/images/about-me.webp"}
          fill
          alt='/background image'
          className=' object-cover w-full  h-full filter grayscale  brightness-50 '
        />
      </div>


   <div className='p-2 h-fit w-fit ml-auto backdrop-brightness-50 sm:h-full'>
      <ScrollTextColorReveal
        mainColor='lightgray'
        scrollColor='#646464'
        text="Combining expertise in UX/UI design and front-end
development, I craft adaptable websites that
seamlessly integrate motion, interaction, and design
to deliver compelling user experiences.
My work prioritizes simplicity and clarity, ensuring
every detail is thoughtfully designed and precisely implemented."
        className="md:max-w-212  font-mono text-shadow-sm text-shadow-gray-800 ml-auto leading-snug text-xl md:text-4xl font-semibold "
      />

      <ScrollTextColorReveal
        mainColor='lightgray'
        scrollColor='#646464'
        text="I’m Mohammed Mansour, a passionate full-stack Developer with 3 years of experience crafting responsive, visually engaging, and user-focused digital experiences. Today, I focus on freelance collaborations and agency partnerships that value innovation, design, and attention to detail."
        className="md:max-w-137 tracking-wide  mt-5  md:mt-16  ml-auto text-shadow-sm text-shadow-gray-800 text-base  md:text-xl font-medium leading-snug"
      />
   </div>

    </div>
  )
}

export default Aboutme