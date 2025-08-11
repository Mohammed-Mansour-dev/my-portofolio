"use client";

import Image from "next/image";
import HeroSection from "./_comopnents/Hero";
import { useEffect } from "react";
import CapabilitiesSection from "./_comopnents/CapabilitiesSection";
import ScrollTextColorReveal from "./_comopnents/ui/TextScrollOpacity";
import Aboutme from "./_comopnents/Aboutme";
import TextAnimation from "./_comopnents/ui/TextAnimation";
import TextSlider from "./_comopnents/ui/TextSlider";
import Skills from "./_comopnents/Skills";

export default function Home() {


  useEffect(() => {
    (
      async () => {
        const LocomotiveScroll = (await import('locomotive-scroll')).default
        const locomotiveScroll = new LocomotiveScroll();

        // setTimeout( () => {
        //   setIsLoading(false);
        //   document.body.style.cursor = 'default'
        //   window.scrollTo(0,0);
        // }, 2000)
      }
    )()
  }, [])


  return (
    <div className="">
      <HeroSection />
      <CapabilitiesSection/>
    <Aboutme />
     
   <Skills />

<div className="h-screen bg-[#54625a] "></div>
    </div>
  );
}
