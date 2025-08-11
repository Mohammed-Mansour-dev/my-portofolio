'use client'
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export default function TextSlider({directiona,containerClasses ,text}) {
  const firstTexta = useRef(null);
  const secondTexta = useRef(null);
  const slidera = useRef(null);
  let xPercent = 0;
  let direction = 1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slidera.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        // end: window.innerHeight,
        onUpdate: (e) => direction = e.direction * directiona,
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstTexta.current, { xPercent });
    gsap.set(secondTexta.current, { xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.05 * direction;
  };

  return (
    <main className={` ${containerClasses} relative flex h-fit  overflow-hidden`}>
     
     
        <div ref={slidera} className="relative whitespace-nowrap">
          <p
            ref={firstTexta}
            className="relative   "
          >
            {text}
          </p>
          <p
            ref={secondTexta}
            className="absolute top-0 left-full    "
          >
            {text}
          </p>
        </div>
      
    </main>
  );
}
