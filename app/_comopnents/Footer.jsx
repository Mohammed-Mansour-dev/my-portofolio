import React, { useEffect, useRef, useState } from "react";
import { Copy, Check, Mail, Send, MapPin, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainFooter from "./ui/MainFooter";
import FooterHeader from "./ui/FooterHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioFooter() {
  const footerRef = useRef(null);
  const contactRef = useRef(null);

  const [timeString, setTimeString] = useState("");
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  /*
  |--------------------------------------------------------------------------
  | LIVE CLOCK
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat([], {
        timeZone: "Asia/Aden",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      setTimeString(`${formatter.format(new Date())} UTC+3`);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | GSAP
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Contact card
      if (contactRef.current) {
        gsap.fromTo(
          contactRef.current,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Floating elements
      gsap.to(".footer-orb", {
        y: -25,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | COPY EMAIL
  |--------------------------------------------------------------------------
  */

  const handleCopyEmail = async () => {
    const email = "mohammed.develop@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      console.error("Unable to copy email");
    }
  };

  /*
  | FORM
  */

  /*
  | FORM SUBMISSION VIA NODEMAILER API
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.email || !formState.message) return;

    setFormStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus("success");

        setFormState({
          name: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          setFormStatus("idle");
        }, 4000);
      } else {
        setFormStatus("idle");
        alert(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus("idle");
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <footer
      ref={footerRef}
      className=" relative overflow-hidden bg-[#0a0a0a] text-[#e5e5e5] border-t border-[#1c1c1c] selection:bg-cyan-400 selection:text-black
  "
    >
      {/* BACKGROUND                   */}

      <div className="absolute inset-0 pointer-events-none">
        <div className=" absolute  inset-0  opacity-[0.035]  bg-[radial-gradient(#fff_1px,transparent_1px)]  [background-size:28px_28px] " />

        <div className=" footer-orb absolute -right-40 top-20 w-125 h-125 rounded-full bg-cyan-500/[0.035] blur-[120px]   " />

        <div className=" absolute -left-40 bottom-0 w-md h-112 rounded-full bg-emerald-500/2.5 blur-[120px] " />
      </div>

      <div className="relative z-10 max-w-375 mx-auto px-6 sm:px-10 lg:px-16">
        <FooterHeader />

        {/* 03 — CONTACT WORKSPACE             */}

        <section
          ref={contactRef}
          className=" grid lg:grid-cols-[0.8fr_1.2fr] border border-[#202020] bg-[#0d0d0d] "
        >
          {/* CONTACT INFO */}
          <div
            className=" relative p-7 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#202020] overflow-hidden
    "
          >
            <div className=" absolute -right-20 -top-20 w-60 h-60 rounded-full bg-cyan-400/[0.035] blur-3xl " />

            <div className="relative z-10 h-full flex flex-col justify-between gap-16">
              <div>
                <span className="  text-[10px]  font-mono  uppercase  tracking-[0.25em]  text-neutral-300 ">
                  Direct contact
                </span>
                <h3 className="  mt-5  text-2xl  sm:text-3xl  font-light  tracking-tight ">
                  Have a project <br /> in mind?
                </h3>
              </div>
              <div>
                {/* EMAIL */}
                <button
                  onClick={handleCopyEmail}
                  className="  group  w-full  flex  items-center  justify-between  gap-4  py-5  border-y  border-[#202020]  text-left "
                >
                  <div>
                    <span className=" block mb-2 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300  ">
                      Email
                    </span>
                    <span className=" text-sm font-mono text-[#d0d0d0] group-hover:text-white transition-colors  ">
                      mohammed.develop@gmail.com
                    </span>
                  </div>
                  <div className="  w-10  h-10  flex  items-center  justify-center  border  border-[#292929]  bg-[#111]  group-hover:border-cyan-400/50  transition-colors  ">
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#666] group-hover:text-cyan-400" />
                    )}
                  </div>
                </button>
                {/* LOCATION */}
                <div className="flex items-center gap-4 mt-6">
                  <MapPin className="w-4 h-4 text-[#555]" />
                  <div>
                    <span className="block text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                      Based in
                    </span>
                    <span className="text-xs font-mono text-[#737373]">
                      Earth Planet / UTC+3
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div id="contact" className="p-7 sm:p-10 lg:p-12">
            {formStatus === "success" ? (
              <div className="min-h-105 flex flex-col items-center justify-center text-center">
                <div className="  w-16  h-16  rounded-full  border  border-emerald-400/30  bg-emerald-400/5  flex  items-center  justify-center  mb-6 ">
                  <Check className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                  Message received
                </p>
                <h3 className="mt-4 text-2xl font-light">
                  I'll get back to you.
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-300">
                    Project inquiry
                  </span>
                  <Mail className="w-4 h-4 text-neutral-300" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* NAME */}
                  <div>
                    <label className="block mb-3 text-base font-mono uppercase tracking-[0.2em] text-neutral-300">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="Your name"
                      className=" w-full bg-transparent border-b border-[#292929] focus:border-cyan-400 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors  "
                    />
                  </div>
                  {/* EMAIL */}
                  <div>
                    <label className="block mb-3 text-base font-mono uppercase tracking-[0.2em] text-neutral-300">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="you@company.com"
                      className=" w-full bg-transparent border-b border-[#292929] focus:border-cyan-400 py-3 text-sm text-white placeholder-neutral-500 outline-none transition-colors  "
                    />
                  </div>
                </div>
                {/* MESSAGE */}
                <div className="mt-10">
                  <label className="block mb-3 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                    Tell me about it
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="What are you building?"
                    className="  w-full  bg-transparent  border-b  border-[#292929]  focus:border-cyan-400  py-3  text-sm  text-white  placeholder-neutral-500  outline-none  resize-none  transition-colors  "
                  />
                </div>
                {/* SUBMIT */}
                <div className="mt-10 flex justify-end">
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="  group  inline-flex  items-center  gap-4  px-6  py-4  bg-[#e5e5e5]  text-black  text-[10px]  font-mono  uppercase  tracking-[0.2em]  hover:bg-cyan-400  transition-colors  "
                  >
                    <span>
                      {formStatus === "sending" ? "Sending..." : "Send inquiry"}
                    </span>
                    <Send className=" w-4 h-4 group-hover:translate-x-1 transition-transform  " />
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <MainFooter />
      </div>
    </footer>
  );
}
