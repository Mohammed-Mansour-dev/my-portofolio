"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { EarthIcon } from 'lucide-react';

export default function PortfolioHero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const ctaRef = useRef(null);
  const navRef = useRef(null);
  const detailsRef = useRef(null);

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Live time updater for global timezone elegance (UTC / Local)
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline for stagger reveal
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
      )
        .fromTo(
          '.hero-tag',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.8'
        )
        .fromTo(
          titleRef.current.children,
          { y: 120, opacity: 0, skewY: 7 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.4, stagger: 0.15 },
          '-=0.6'
        )
        .fromTo(
          subTitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=1'
        )
        .fromTo(
          ctaRef.current.children,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, stagger: 0.1 },
          '-=0.8'
        )
        .fromTo(
          detailsRef.current.children,
          { opacity: 0 },
          { opacity: 1, duration: 1, stagger: 0.2 },
          '-=0.6'
        );

      // Subtle mouse parallax on hero inner container
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.parallax-content', {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id='hero'
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-neutral-950 text-white font-sans selection:bg-white selection:text-neutral-950"
    >
      {/* Background Video Layer mimicking cinematic B&W rain selfie */}
      <div className="absolute  inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute  inset-0 w-full h-full object-cover sm:object-fill filter grayscale contrast-125 brightness-75 "
        >
          {/* Replace src with your local or public file name */}
          <source src="/Herobg2026.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Cinematic Vignette & Atmospheric Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </div>



      {/* Main Hero Center Content */}
      <div className="relative  z-20 w-full h-full flex flex-col justify-end gap-5 sm:justify-between  px-6 md:px-16 pt-32 pb-12 max-w-8xl mx-auto">
        <div className=''>
          {/* Top Spacer / Sub-header tag */}
          <div className="hero-tag  pt-6">
            <span className="inline-block mb-3 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest text-neutral-300 backdrop-blur-md bg-white/5">
              Frontend Software Developer & UI Artisan
            </span>
          </div>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tighter uppercase leading-[0.9] text-white"
          >
            <span className="block overflow-hidden"><span className="block">Mohammed</span></span>
            <span className="block overflow-hidden text-neutral-400 font-extralight italic"><span className="block">Mansour</span></span>
          </h1>
        </div>

        {/* Center Editorial Typography with Parallax wrapper */}
        <div className="parallax-content  flex flex-col items-end  space-y-4 sm:my-auto">
          <div className='' >
            <p
              ref={subTitleRef}
              className="max-w-sm text-neutral-300 text-base md:text-lg font-light leading-relaxed pt-2"
            >
              Crafting immersive, high-performance web experiences with React, Next.js, Tailwind, and GSAP. Focused on uncompromising aesthetics and buttery-smooth interactions.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#work"
                className="group relative px-8 py-4 rounded-full bg-white text-neutral-950 font-medium text-sm tracking-wide overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95 shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Selected Work
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>

            </div>
          </div>
        </div>

        {/* Bottom Details Footer Bar */}
        <div
          ref={detailsRef}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-t border-white/10 pt-6 text-xs font-mono text-neutral-400 uppercase tracking-widest"
        >
          <div className="flex items-center gap-6">
            <div>
              <span className="block text-neutral-600">Location</span>
              <span className="text-white flex gap-1">Earth Planet <EarthIcon className='size-4' /></span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-neutral-600">Local Time</span>
              <span className="text-white">{currentTime || '12:00'} UTC+3</span>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="flex  items-center gap-3 sm:self-center md:self-end">
            <span className="text-neutral-400">Scroll to Discover</span>
            <div className="w-10 h-px bg-white/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-white animate-[shimmer_2s_infinite]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/Mohammed-Mansour-dev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/mohammed-developer/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://wa.me/967781747445" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Whatsapp</a>
          </div>
        </div>

      </div>

      {/* Custom Keyframe Inject for Shimmer Line */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}