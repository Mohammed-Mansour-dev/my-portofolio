"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import HeroSection from "./_comopnents/Hero";
import AiPhilosophySection from "./_comopnents/AiPhilosophySection";
import Aboutme from "./_comopnents/Aboutme";
import Skills from "./_comopnents/Skills";
import ProjectsGallery from "./_comopnents/ProjectsGallery";
import Footer from "./_comopnents/Footer";
import HeaderMenu from "./_comopnents/ui/Header";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential curve
      orientation: "vertical",
      smoothWheel: true,
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger updates
    lenis.on("scroll", ScrollTrigger.update);

    // Tell GSAP ticker to use Lenis's requestAnimationFrame request loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Turn off GSAP's lag smoothing to prevent jumpy scroll animations
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <main className="relative selection:bg-[#333] selection:text-white">
      <HeaderMenu />
      <HeroSection />
      <AiPhilosophySection />
      <Aboutme />
      <Skills />
      <ProjectsGallery />
      <Footer />
    </main>
  );
}