"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CapabilitiesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-title", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      gsap.from(".cap-item", {
        x: (i) => (i % 2 === 0 ? -50 : 50),
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.3
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    {
      num: "01",
      title: "Designing User Experiences",
      desc: "Turning ideas into intuitive journeys — from user research to wireframes, prototypes, and workflows that feel natural to navigate."
    },
    {
      num: "02",
      title: "Crafting Visual Interfaces",
      desc: "Designing responsive layouts, color systems, and typography that stay consistent yet engaging on every screen."
    },
    {
      num: "03",
      title: "Developing & Optimizing Interfaces",
      desc: "Bringing designs to life with clean, responsive code — built for speed, accessibility, and seamless interaction."
    },
    {
      num: "04",
      title: "Integrating with Back-End Systems",
      desc: "Connecting the UI with APIs and real-time data for smooth, dynamic functionality."
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="px-8 text-black [background:_linear-gradient(188deg,rgba(4,_15,_22,_1)_0%,_rgba(84,_98,_90,_1)_16%)] min-h-screen py-20"
  
    >
      <h2 className="section-title text-6xl font-bold mb-16">
        Core Capabilities <br /> and Services
      </h2>

      <div className="grid md:mx-32 grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
        {capabilities.map((cap, i) => (
          <div key={i} className="cap-item flex gap-6 max-w-96 md:ml-auto  items-start">
            <span className="text-2xl  ">{cap.num}</span>
            <div>
              <h3 className="text-2xl font-semibold mb-2">{cap.title}</h3>
              <p className="">{cap.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
