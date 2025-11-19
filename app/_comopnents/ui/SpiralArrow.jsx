'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CurvedArrowSpiralSection() {
  const sectionRef = useRef(null);
  const whitePathRef = useRef(null);
  const redPathRef = useRef(null);
  const arrowHeadRef = useRef(null);

  useEffect(() => {
    const whitePath = whitePathRef.current;
    const redPath = redPathRef.current;
    const arrowHead = arrowHeadRef.current;

    if (!whitePath || !redPath) return;

    const length = whitePath.getTotalLength();

    // initial white stroke
    gsap.set(whitePath, { strokeDasharray: length, strokeDashoffset: 0, stroke: 'transparent', opacity: 1 });
    // red stroke hidden initially
    gsap.set(redPath, { strokeDasharray: length, strokeDashoffset: length, stroke: '#919497', opacity: 1 });

    // draw red path on scroll
    gsap.to(redPath, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: '40% bottom',
        end: '70% center',
        scrub: 1,
      },
    });

  

    // arrowhead fade in
    gsap.to(arrowHead, {
      opacity: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: '60% bottom',
        end: '80% center',
        scrub: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  // smooth curved arrow spiral (8-like) path
  const curvedArrowPath =
    'M 300,100 C 200,200 400,300 300,400 ' + // top loop
    'C 200,500 400,600 300,700';              // bottom loop / downward arrow flow

  return (
    <>
      <section ref={sectionRef} className="relative  bg-[#040f16] text-white px-5 md:px-12 ">
        {/* LEFT Title */}
        <h1 className="text-7xl font-pre text-[#919497] md:text-8xl  font- leading-tight ">

        Cooked 
        <br />
         With Precision
        </h1>

        {/* SPIRAL ARROW SVG */}
        <div className="w-full   flex justify-center items-center ">
          <svg  width="500" height="500" viewBox="0 0 600 800" className="mx-auto -rotate-45 -mt-32   ">
            {/* white base path */}
            <path
              ref={whitePathRef}
              d={curvedArrowPath}
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            {/* red reveal path */}
            <path
              ref={redPathRef}
              d={curvedArrowPath}
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            {/* arrowhead */}
            <polygon
              ref={arrowHeadRef}
              points="290,670 330,710 270,730"
              fill="#919497"
              opacity="0"
            />

{/* <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg> */}


            
          </svg>
        </div>

     
      </section>

    </>
  );
}
