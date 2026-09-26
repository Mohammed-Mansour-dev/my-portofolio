import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
  Clock,
  Globe2,
  Mail,
  Send,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  MoveUpRight,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaWhatsapp } from 'react-icons/fa';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioFooter() {
  const footerRef = useRef(null);
  const titleRef = useRef(null);
  const contactRef = useRef(null);
  const lineRef = useRef(null);

  const [timeString, setTimeString] = useState('');
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  /*
  |--------------------------------------------------------------------------
  | LIVE CLOCK
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat([], {
        timeZone: 'Asia/Aden',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
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
      // Main title reveal
      const titleLines = titleRef.current?.querySelectorAll('.footer-line');

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
            ease: 'power4.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

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
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contactRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Horizontal line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: 'left',
          },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: lineRef.current,
              start: 'top 90%',
            },
          }
        );
      }

      // Floating elements
      gsap.to('.footer-orb', {
        y: -25,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
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
    const email = 'mohammed.develop@gmail.com';

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      console.error('Unable to copy email');
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FORM
  |--------------------------------------------------------------------------
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.email || !formState.message) return;

    setFormStatus('sending');

    setTimeout(() => {
      setFormStatus('success');

      setFormState({
        name: '',
        email: '',
        message: '',
      });

      setTimeout(() => {
        setFormStatus('idle');
      }, 4000);
    }, 1200);
  };

  /*
  |--------------------------------------------------------------------------
  | BACK TO TOP
  |--------------------------------------------------------------------------
  */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer
      ref={footerRef}
      className="
        relative
        overflow-hidden
        bg-[#0a0a0a]
        text-[#e5e5e5]
        border-t
        border-[#1c1c1c]
        selection:bg-cyan-400
        selection:text-black
      "
    >
      {/* -------------------------------------------------------------- */}
      {/* BACKGROUND                                                     */}
      {/* -------------------------------------------------------------- */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            bg-[radial-gradient(#fff_1px,transparent_1px)]
            [background-size:28px_28px]
          "
        />

        <div
          className="
            footer-orb
            absolute
            -right-40
            top-20
            w-125
            h-125
            rounded-full
            bg-cyan-500/[0.035]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -left-40
            bottom-0
            w-[450px]
            h-[450px]
            rounded-full
            bg-emerald-500/[0.025]
            blur-[120px]
          "
        />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* ============================================================ */}
        {/* 01 — TOP META                                                */}
        {/* ============================================================ */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            py-6
            border-b
            border-[#1c1c1c]
          "
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  rounded-full
                  bg-emerald-400
                  opacity-60
                  animate-ping
                "
              />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-base font-mono uppercase font-semibold tracking-[0.25em] text-[#9e9b9b]">
              Available for selected projects
            </span>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 02 — MAIN CTA                                                */}
        {/* ============================================================ */}

        <section
          ref={titleRef}
          className="
            grid
            lg:grid-cols-[1fr_320px]
            gap-12
            lg:gap-20
            py-24
            sm:py-32
            lg:py-40
          "
        >
          <div className="overflow-hidden">
            <p
              className="
                footer-line
                mb-8
                text-[10px]
                font-mono
                uppercase
                tracking-[0.3em]
                text-cyan-400
              "
            >
              06 / Start a conversation
            </p>

            <div className="overflow-hidden">
              <h2
                className="
                  footer-line
                  text-[clamp(3.5rem,10vw,9rem)]
                  leading-[0.82]
                  tracking-[-0.07em]
                  font-light
                  uppercase
                "
              >
                Let's
              </h2>
            </div>

            <div className="overflow-hidden">
              <h2
                className="
                  footer-line
                  text-[clamp(3.5rem,10vw,9rem)]
                  leading-[0.82]
                  tracking-[-0.07em]
                  font-light
                  uppercase
                  text-[#505050]
                "
              >
                build
              </h2>
            </div>

            <div className="overflow-hidden">
              <h2
                className="
                  footer-line
                  text-[clamp(3.5rem,10vw,9rem)]
                  leading-[0.82]
                  tracking-[-0.07em]
                  font-light
                  uppercase
                "
              >
                something
              </h2>
            </div>

            <div className="overflow-hidden">
              <h2
                className="
                  footer-line
                  text-[clamp(3.5rem,10vw,9rem)]
                  leading-[0.82]
                  tracking-[-0.07em]
                  font-light
                  uppercase
                  text-[#505050]
                "
              >
                memorable.
              </h2>
            </div>
          </div>

          {/* RIGHT SIDE INTRO */}
          <div className="flex flex-col justify-end">
            <div className="border-l border-[#252525] pl-6">
              <p className="text-sm leading-7 text-[#737373]">
                Websites, digital products and interactive experiences
                built with modern technology and a strong attention to
                visual detail.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-cyan-400" />

                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-300">
                  React / Next.js / GSAP
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 03 — CONTACT WORKSPACE                                       */}
        {/* ============================================================ */}

        <section
          ref={contactRef}
          className="
            grid
            lg:grid-cols-[0.8fr_1.2fr]
            border
            border-[#202020]
            bg-[#0d0d0d]
          "
        >
          {/* CONTACT INFO */}
          <div
            className="
              relative
              p-7
              sm:p-10
              lg:p-12
              border-b
              lg:border-b-0
              lg:border-r
              border-[#202020]
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                -right-20
                -top-20
                w-60
                h-60
                rounded-full
                bg-cyan-400/[0.035]
                blur-3xl
              "
            />

            <div className="relative z-10 h-full flex flex-col justify-between gap-16">

              <div>
                <span
                  className="
                    text-[10px]
                    font-mono
                    uppercase
                    tracking-[0.25em]
                    text-neutral-300
                  "
                >
                  Direct contact
                </span>

                <h3
                  className="
                    mt-5
                    text-2xl
                    sm:text-3xl
                    font-light
                    tracking-tight
                  "
                >
                  Have a project
                  <br />
                  in mind?
                </h3>
              </div>

              <div>
                {/* EMAIL */}
                <button
                  onClick={handleCopyEmail}
                  className="
                    group
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-4
                    py-5
                    border-y
                    border-[#202020]
                    text-left
                  "
                >
                  <div>
                    <span
                      className="
                        block
                        mb-2
                        text-[9px]
                        font-mono
                        uppercase
                        tracking-[0.2em]
                        text-neutral-300
                      "
                    >
                      Email
                    </span>

                    <span
                      className="
                        text-sm
                        font-mono
                        text-[#d0d0d0]
                        group-hover:text-white
                        transition-colors
                      "
                    >
                     mohammed.develop@gmail.com
                    </span>
                  </div>

                  <div
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      border
                      border-[#292929]
                      bg-[#111]
                      group-hover:border-cyan-400/50
                      transition-colors
                    "
                  >
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
          <div id='contact' className="p-7 sm:p-10 lg:p-12">

            {formStatus === 'success' ? (
              <div className="min-h-105 flex flex-col items-center justify-center text-center">

                <div
                  className="
                    w-16
                    h-16
                    rounded-full
                    border
                    border-emerald-400/30
                    bg-emerald-400/5
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                >
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
                        setFormState({
                          ...formState,
                          name: e.target.value,
                        })
                      }
                      placeholder="Your name"
                      className="
                        w-full
                        bg-transparent
                        border-b
                        border-[#292929]
                        focus:border-cyan-400
                        py-3
                        text-sm
                        text-white
                        placeholder-neutral-500
                        outline-none
                        transition-colors
                      "
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
                        setFormState({
                          ...formState,
                          email: e.target.value,
                        })
                      }
                      placeholder="you@company.com"
                      className="
                        w-full
                        bg-transparent
                        border-b
                        border-[#292929]
                        focus:border-cyan-400
                        py-3
                        text-sm
                        text-white
                        placeholder-neutral-500
                        outline-none
                        transition-colors
                      "
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
                      setFormState({
                        ...formState,
                        message: e.target.value,
                      })
                    }
                    placeholder="What are you building?"
                    className="
                      w-full
                      bg-transparent
                      border-b
                      border-[#292929]
                      focus:border-cyan-400
                      py-3
                      text-sm
                      text-white
                      placeholder-neutral-500
                      outline-none
                      resize-none
                      transition-colors
                    "
                  />
                </div>

                {/* SUBMIT */}
                <div className="mt-10 flex justify-end">
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-4
                      px-6
                      py-4
                      bg-[#e5e5e5]
                      text-black
                      text-[10px]
                      font-mono
                      uppercase
                      tracking-[0.2em]
                      hover:bg-cyan-400
                      transition-colors
                    "
                  >
                    <span>
                      {formStatus === 'sending'
                        ? 'Sending...'
                        : 'Send inquiry'}
                    </span>

                    <Send
                      className="
                        w-4
                        h-4
                        group-hover:translate-x-1
                        transition-transform
                      "
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 04 — NAVIGATION                                              */}
        {/* ============================================================ */}

        <section className="py-20">

          <div className="flex items-center gap-5 mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-300">
              Explore
            </span>

            <div
              ref={lineRef}
              className="h-px flex-1 bg-[#252525]"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#202020] border border-[#202020]">

            {[
              {
                number: '01',
                title: 'Home',
                href: '#hero',
              },
              {
                number: '02',
                title: 'Projects',
                href: '#projects',
              },
              {
                number: '03',
                title: 'About',
                href: '#about',
              },
              {
                number: '04',
                title: 'Contact',
                href: '#contact',
              },
            ].map((item) => (
              <a
                key={item.number}
                href={item.href}
                className="
                  group
                  relative
                  bg-[#0a0a0a]
                  p-6
                  sm:p-8
                  min-h-[130px]
                  flex
                  flex-col
                  justify-between
                  hover:bg-[#101010]
                  transition-colors
                "
              >
                <span className="text-[9px] font-mono text-[#3f3f3f]">
                  {item.number}
                </span>

                <div className="flex items-end justify-between">
                  <span
                    className="
                      text-lg
                      font-light
                      group-hover:translate-x-1
                      transition-transform
                    "
                  >
                    {item.title}
                  </span>

                  <ArrowUpRight
                    className="
                      w-4
                      h-4
                      text-neutral-300
                      group-hover:text-cyan-400
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                      transition-all
                    "
                  />
                </div>
              </a>
            ))}

          </div>
        </section>

        {/* ============================================================ */}
        {/* 05 — SOCIAL / STATUS                                        */}
        {/* ============================================================ */}

        <section
          className="
            grid
            md:grid-cols-2
            border-t
            border-[#202020]
          "
        >

          {/* SOCIAL */}
          <div className="py-8 md:pr-10 md:border-r border-[#202020]">

            <span className="block mb-5 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
              Network
            </span>

            <div className="flex flex-wrap gap-3">

              <a
                href="https://github.com/Mohammed-Mansour-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-[#252525]
                  px-4
                  py-3
                  text-[10px]
                  font-mono
                  uppercase
                  tracking-widest
                  text-[#737373]
                  hover:text-white
                  hover:border-neutral-300
                  transition-all
                "
              >
                <Github className="w-4 h-4" />
                GitHub
                <MoveUpRight className="w-3 h-3 text-neutral-300 group-hover:text-cyan-400" />
              </a>

              <a
                href="https://www.linkedin.com/in/mohammed-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-[#252525]
                  px-4
                  py-3
                  text-[10px]
                  font-mono
                  uppercase
                  tracking-widest
                  text-[#737373]
                  hover:text-white
                  hover:border-neutral-300
                  transition-all
                "
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
                <MoveUpRight className="w-3 h-3 text-neutral-300 group-hover:text-cyan-400" />
              </a>
              <a
                href="https://wa.me/967781747445"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-[#252525]
                  px-4
                  py-3
                  text-[10px]
                  font-mono
                  uppercase
                  tracking-widest
                  text-[#737373]
                  hover:text-white
                  hover:border-neutral-300
                  transition-all
                "
              >
                <FaWhatsapp className="w-4 h-4" />
                Whatsapp
                <MoveUpRight className="w-3 h-3 text-neutral-300 group-hover:text-cyan-400" />
              </a>

            </div>
          </div>

          {/* STATUS */}
          <div className="py-8 md:pl-10">

            <span className="block mb-5 text-[9px] font-mono uppercase tracking-[0.2em] text-neutral-300">
              Status
            </span>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />

                <span className="text-base font-mono text-[#737373]">
                Availabe For Hiring
                </span>
              </div>

            </div>
          </div>

        </section>

        {/* ============================================================ */}
        {/* 06 — FINAL BAR                                               */}
        {/* ============================================================ */}

        <div
          className="
            py-7
            border-t
            border-[#202020]
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-5
          "
        >

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
            <span className="text-base font-mono uppercase tracking-[0.18em] text-neutral-300">
              © 2026 Mohammed Mansour Dev
            </span>

            <span className="hidden sm:block text-[#292929]">
              /
            </span>

          <span className="text-base font-mono uppercase flex gap-1 items-center tracking-[0.18em] text-neutral-300">
    Designed & Developed By me
    <img src="../favicon.ico" alt="logo" className='size-7 animate-bounce rounded-full [animation-delay:0ms]' />
    <img src="../favicon.ico" alt="logo" className='size-7 animate-bounce rounded-full [animation-delay:150ms]' />
    <img src="../favicon.ico" alt="logo" className='size-7 animate-bounce rounded-full [animation-delay:300ms]' />
    <img src="../favicon.ico" alt="logo" className='size-7 animate-bounce rounded-full [animation-delay:450ms]' />
</span>
          </div>

          <button
            onClick={scrollToTop}
            className="
              group
              flex
              items-center
              gap-3
              text-base
              font-mono
              uppercase
              tracking-[0.2em]
              text-neutral-300
              hover:text-white
              transition-colors
            "
          >
            Back to top

            <span
              className="
                w-8
                h-8
                border
                border-[#292929]
                flex
                items-center
                justify-center
                group-hover:border-cyan-400/50
                transition-colors
              "
            >
              <ArrowUp
                className="
                  w-3.5
                  h-3.5
                  group-hover:-translate-y-1
                  transition-transform
                  text-cyan-400
                "
              />
            </span>
          </button>

        </div>

      </div>
    </footer>
  );
}
