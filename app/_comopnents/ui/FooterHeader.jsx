import gsap from "gsap";
import { Sparkles } from "lucide-react";
import React, { useEffect, useRef } from "react";

const FooterHeader = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    // Main title reveal
    const titleLines = titleRef.current?.querySelectorAll(".footer-line");

    if (titleLines?.length) {
      gsap.fromTo(
        titleLines,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, []);

  return (
    <div>
      {/* ============================================================ */}
      {/* 01 — TOP META                */}
      {/* ============================================================ */}

      <div className=" flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-6 border-b border-[#1c1c1c]">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            {" "}
            <span className=" absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping " />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>

          <span className="text-base font-mono uppercase font-semibold tracking-[0.25em] text-[#9e9b9b]">
            {" "}
            Available for selected projects
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 02 — MAIN CTA                */}
      {/* ============================================================ */}

      <section
        ref={titleRef}
        className=" grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 py-24 sm:py-32 lg:py-40 "
      >
        <div className="overflow-hidden">
          <p className=" footer-line mb-8 text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 ">
            {" "}
            06 / Start a conversation
          </p>

          <div className="overflow-hidden">
            {" "}
            <h2 className=" footer-line text-[clamp(3.5rem,10vw,9rem)] leading-[0.82] tracking-[-0.07em] font-light uppercase ">
              {" "}
              Let's{" "}
            </h2>
          </div>

          <div className="overflow-hidden">
            {" "}
            <h2 className=" footer-line text-[clamp(3.5rem,10vw,9rem)] leading-[0.82] tracking-[-0.07em] font-light uppercase text-[#505050] ">
              {" "}
              build{" "}
            </h2>
          </div>

          <div className="overflow-hidden">
            {" "}
            <h2 className=" footer-line text-[clamp(3.5rem,10vw,9rem)] leading-[0.82] tracking-[-0.07em] font-light uppercase ">
              {" "}
              something{" "}
            </h2>
          </div>

          <div className="overflow-hidden">
            {" "}
            <h2 className=" footer-line text-[clamp(3.5rem,10vw,9rem)] leading-[0.82] tracking-[-0.07em] font-light uppercase text-[#505050] ">
              {" "}
              memorable.{" "}
            </h2>
          </div>
        </div>

        {/* RIGHT SIDE INTRO */}
        <div className="flex flex-col justify-end">
          <div className="border-l border-[#252525] pl-6">
            {" "}
            <p className="text-sm leading-7 text-[#737373]">
              {" "}
              Websites, digital products and interactive experiences built with
              modern technology and a strong attention to visual detail.{" "}
            </p>
            <div className="mt-8 flex items-center gap-3">
              {" "}
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                {" "}
                React / Next.js / GSAP{" "}
              </span>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FooterHeader;
