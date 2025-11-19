"use client";

import HeroSection from "./_comopnents/Hero";
import { useEffect } from "react";
import CapabilitiesSection from "./_comopnents/CapabilitiesSection";
import Aboutme from "./_comopnents/Aboutme";
import Skills from "./_comopnents/Skills";
import ProjectsGallery from "./_comopnents/ProjectsGallery";

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
      <CapabilitiesSection />
      <Aboutme />

      <Skills />
<div className="bg-[#040f16]" >
      <div className="bg-gradient-to-r from-transparent via-[#8d9292]/50 to-transparent h-1 w-full"/>

</div>

<ProjectsGallery />
     


    </div>
  );
}
