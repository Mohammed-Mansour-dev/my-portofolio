"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AiPhilosophySection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered reveal for the left image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 50, filter: "grayscale(100%) blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "grayscale(100%) blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Scroll-triggered staggered reveal for text content
      const textElements = contentRef.current.children;
      gsap.fromTo(
        textElements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
    id="ai"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-neutral-950 text-white py-32 px-6 md:px-16 flex items-center justify-center overflow-hidden border-t border-white/10"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-white/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left Side: Portrait Container */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            ref={imageRef}
            className="relative w-full max-w-md aspect-4/5 rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group"
          >
            <img
              src="/images/mySelfie.webp"
              alt="Mohammed Mansour - Developer Portrait"
              className="w-full h-full object-cover filter grayscale brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-600 font-mono text-xs uppercase tracking-widest -z-10">
              [ Portrait / mySelfie.webp ]
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neutral-950/60 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-neutral-300">
              Philosophy // 01
            </div>
          </div>
          <span className="mt-4 text-xs font-mono tracking-widest text-neutral-500 uppercase">
            Human Intent + Machine Velocity
          </span>
        </div>

        {/* Right Side: Narrative Content */}
        <div ref={contentRef} className="lg:col-span-7 flex flex-col space-y-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white/60" />
            <span className="text-xs uppercase font-mono tracking-[0.2em] text-neutral-400">
              The AI Paradigm in Software Engineering
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight uppercase leading-[1.05] text-white">
            Accelerated Execution. <br />
            <span className="text-neutral-400 font-extralight italic">
              Uncompromised Craft.
            </span>
          </h2>

          {/* Core Philosophy Paragraph */}
          <p className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">
            Artificial intelligence hasn't replaced developers—it has elevated
            us. By integrating AI into the workflow, software planning moves
            from weeks to hours, and code generation happens at unprecedented
            speed.
          </p>

          {/* Feature Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-6 rounded-xl bg-white/2 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                Shift in Role
              </span>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                Developers no longer spend time writing repetitive boilerplate.
                Instead, we act as architects and reviewers—directing system
                design, ensuring quality, and auditing AI output.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/2 border border-white/10 backdrop-blur-sm">
              <span className="block text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                Velocity & Precision
              </span>
              <p className="text-sm text-neutral-300 font-light leading-relaxed">
                By pairing rapid planning and instant code synthesis with deep
                technical expertise, ideas translate into production-ready
                software faster than ever before.
              </p>
            </div>
          </div>

          {/* Closing Statement */}
          <blockquote className="border-l border-white/30 pl-6 my-4 italic text-neutral-400 text-sm md:text-base font-light leading-relaxed">
            "AI provides the speed to build instantly; human judgment provides
            the direction to build correctly."
          </blockquote>

          {/* Key Takeaway Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              Rapid Planning
            </span>
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              Automated Synthesis
            </span>
            <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              Architectural Oversight
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}