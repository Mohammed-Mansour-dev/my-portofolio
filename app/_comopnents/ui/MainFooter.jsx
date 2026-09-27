import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  ArrowUpRight,
  ArrowUp,
  Github,
  Linkedin,
  MoveUpRight,
} from "lucide-react";







const MainFooter = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    // Horizontal line
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "left",
        },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
          },
        },
      );
    }
  }, []);


  /*
  |--------------------------------------------------------------------------
  | BACK TO TOP
  |--------------------------------------------------------------------------
  */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };






  return (
    <div>
      {/* ============================================================ */}
      {/* 04 — NAVIGATION                */}
      {/* ============================================================ */}

      <section className="py-20">
        <div className="flex items-center gap-5 mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-300">
            {" "}
            Explore
          </span>

          <div ref={lineRef} className="h-px flex-1 bg-[#252525]" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#202020] border border-[#202020]">
          {[
            { number: "01", title: "Home", href: "#hero" },
            { number: "02", title: "Projects", href: "#projects" },
            { number: "03", title: "About", href: "#about" },
            { number: "04", title: "Contact", href: "#contact" },
          ].map((item) => (
            <a
              key={item.number}
              href={item.href}
              className=" group relative bg-[#0a0a0a] p-6 sm:p-8 min-h-[130px] flex flex-col justify-between hover:bg-[#101010] transition-colors "
            >
              {" "}
              <span className="text-[9px] font-mono text-[#3f3f3f]">
                {" "}
                {item.number}{" "}
              </span>
              <div className="flex items-end justify-between">
                {" "}
                <span className="  text-lg  font-light  group-hover:translate-x-1  transition-transform  ">
                  {" "}
                  {item.title}{" "}
                </span>{" "}
                <ArrowUpRight className="  w-4  h-4  text-neutral-300  group-hover:text-cyan-400  group-hover:translate-x-1  group-hover:-translate-y-1  transition-all  " />{" "}
              </div>{" "}
            </a>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 05 — SOCIAL / STATUS              */}
      {/* ============================================================ */}

      <section
        className="grid md:grid-cols-2 border-t border-[#202020]
    "
      >
        {/* SOCIAL */}
        <div className="py-8 md:pr-10 md:border-r border-[#202020]">
          <span className="block mb-5 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
            {" "}
            Network
          </span>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/Mohammed-Mansour-dev"
              target="_blank"
              rel="noopener noreferrer"
              className=" group inline-flex items-center gap-3 border border-[#252525] px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-[#737373] hover:text-white hover:border-neutral-300 transition-all "
            >
              {" "}
              <Github className="w-4 h-4" /> GitHub{" "}
              <MoveUpRight className="w-3 h-3 text-neutral-300 group-hover:text-cyan-400" />{" "}
            </a>
            <a
              href="https://www.linkedin.com/in/mohammed-developer/"
              target="_blank"
              rel="noopener noreferrer"
              className=" group inline-flex items-center gap-3 border border-[#252525] px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-[#737373] hover:text-white hover:border-neutral-300 transition-all "
            >
              {" "}
              <Linkedin className="w-4 h-4" /> LinkedIn{" "}
              <MoveUpRight className="w-3 h-3 text-neutral-300 group-hover:text-cyan-400" />{" "}
            </a>{" "}
            <a
              href="https://wa.me/967781747445"
              target="_blank"
              rel="noopener noreferrer"
              className=" group inline-flex items-center gap-3 border border-[#252525] px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-[#737373] hover:text-white hover:border-neutral-300 transition-all "
            >
              {" "}
              <FaWhatsapp className="w-4 h-4" /> Whatsapp{" "}
              <MoveUpRight className="w-3 h-3 text-neutral-300 group-hover:text-cyan-400" />{" "}
            </a>
          </div>
        </div>

        {/* STATUS */}
        <div className="py-8 md:pl-10">
          <span className="block mb-5 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
            {" "}
            Status
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {" "}
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-base font-mono text-[#737373]">
                {" "}
                Availabe For Hiring{" "}
              </span>{" "}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 06 — FINAL BAR                 */}
      {/* ============================================================ */}

      <div
        className=" py-7 border-t border-[#202020] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5
    "
      >
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
          <span className="text-base font-mono uppercase tracking-[0.18em] text-neutral-300">
            {" "}
            © 2026 Mohammed Mansour Dev
          </span>

          <span className="hidden sm:block text-[#292929]"> /</span>

          <span className="text-base font-mono uppercase flex gap-1 items-center tracking-[0.18em] text-neutral-300">
            {" "}
            Designed & Developed By me{" "}
            <img
              src="../favicon.ico"
              alt="logo"
              className="size-7 animate-bounce rounded-full [animation-delay:0ms]"
            />{" "}
            <img
              src="../favicon.ico"
              alt="logo"
              className="size-7 animate-bounce rounded-full [animation-delay:150ms]"
            />{" "}
            <img
              src="../favicon.ico"
              alt="logo"
              className="size-7 animate-bounce rounded-full [animation-delay:300ms]"
            />{" "}
            <img
              src="../favicon.ico"
              alt="logo"
              className="size-7 animate-bounce rounded-full [animation-delay:450ms]"
            />
          </span>
        </div>

        <button
          onClick={scrollToTop}
          className=" group flex items-center gap-3 text-base font-mono uppercase tracking-[0.2em] text-neutral-300 hover:text-white transition-colors
    "
        >
          Back to top
          <span className=" w-8 h-8 border border-[#292929] flex items-center justify-center group-hover:border-cyan-400/50 transition-colors ">
            {" "}
            <ArrowUp className=" w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform text-cyan-400 " />
          </span>
        </button>
      </div>
    </div>
  );
};

export default MainFooter;
