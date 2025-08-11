"use client";

import Image from "next/image";
import HeroSection from "./_comopnents/Hero";
import { useEffect } from "react";
import TextAnimation from "./_comopnents/TextAnimation";
import CapabilitiesSection from "./_comopnents/CapabilitiesSection";

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
      {/* <TextAnimation      /> */}
      {/* <div className="h-screen  [background:_linear-gradient(18deg,_rgba(4,_15,_22,_1)_0%,_rgba(84,_98,_90,_1)_100%)]"></div> */}
      <div className="h-screen bg-[#8d9293] "></div>
      <div className="h-screen"></div>



    </div>
  );
}
