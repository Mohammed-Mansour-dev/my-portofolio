// // import React from 'react'

// // export default function Footer() {
// //   return (
// //     <div 
// //       className='relative border h-[400px]'
// //       style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
// //     >
// //       <div className='fixed  bottom-0 h-[400px] w-full'>
// //       <div className='bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between'>
// //          <div className='flex shrink-0 gap-20'>
// //             <div className='flex flex-col gap-2'>
// //                 <h3 className='mb-2 uppercase text-[#ffffff80]'>About</h3>
// //                 <p>Home</p>
// //                 <p>Projects</p>
// //                 <p>Our Mission</p>
// //                 <p>Contact Us</p>
// //             </div>
// //             <div className='flex flex-col gap-2'>
// //                 <h3 className='mb-2 uppercase text-[#ffffff80]'>Education</h3>
// //                 <p>News</p>
// //                 <p>Learn</p>
// //                 <p>Certification</p>
// //                 <p>Publications</p>
// //             </div>
// //         </div>
// //          <div className='flex justify-between items-end'>
// //             {/* <h1 className='text-[14vw] leading-[0.8] mt-10'>Sticky Footer</h1> */}
// //             <p>©copyright</p>
// //         </div>
// //     </div>
// //       </div>
// //     </div>
// //   )
// // }



// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Github, Twitter, Linkedin, Mail } from "lucide-react";

// // Register GSAP plugin
// gsap.registerPlugin(ScrollTrigger);

// export default function FuturisticFooter() {
//   const footerRef = useRef(null);
//   const glowRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".footer-item", {
//         y: 60,
//         opacity: 0,
//         stagger: 0.15,
//         duration: 1.2,
//         ease: "power4.out",
//         scrollTrigger: {
//           trigger: footerRef.current,
//           start: "top 85%",
//         },
//       });

//       gsap.to(glowRef.current, {
//         rotate: 360,
//         duration: 20,
//         repeat: -1,
//         ease: "linear",
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <footer
//       ref={footerRef}
//       className="relative overflow-hidden bg-black text-white"
//     >
//       {/* Animated Glow Background */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div
//           ref={glowRef}
//           className="h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 blur-[120px]"
//         />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
//         <div className="grid gap-16 md:grid-cols-3">
//           {/* Brand */}
//           <div className="footer-item space-y-4">
//             <h2 className="text-3xl font-bold tracking-tight">
//               <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
//                 Web Alchemy
//               </span>
//             </h2>
//             <p className="text-sm text-white/70 leading-relaxed">
//               Crafting immersive web experiences with Next.js, Tailwind,
//               GSAP and a touch of magic.
//             </p>
//           </div>

//           {/* Navigation */}
//           <div className="footer-item">
//             <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white/80">
//               Explore
//             </h3>
//             <ul className="space-y-3 text-sm">
//               {[
//                 "Home",
//                 "Projects",
//                 "Blog",
//                 "About",
//                 "Contact",
//               ].map((item) => (
//                 <li
//                   key={item}
//                   className="group relative w-fit cursor-pointer"
//                 >
//                   <span className="transition-colors group-hover:text-cyan-400">
//                     {item}
//                   </span>
//                   <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-400 transition-all group-hover:w-full" />
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Social */}
//           <div className="footer-item">
//             <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white/80">
//               Connect
//             </h3>
//             <div className="flex gap-4">
//               {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 backdrop-blur transition-all hover:border-cyan-400"
//                 >
//                   <Icon className="h-5 w-5 text-white/70 transition-colors group-hover:text-cyan-400" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//         {/* Bottom */}
//         <div className="footer-item flex flex-col items-center justify-between gap-4 text-xs text-white/50 md:flex-row">
//           <p>© {new Date().getFullYear()} Web Alchemy. All rights reserved.</p>
//           <p className="italic">Built with passion & motion ✨</p>
//         </div>
//       </div>
//     </footer>
//   );
// }






"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function FuturisticFooter() {
  const footerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });

      gsap.to(glowRef.current, {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#040f16] text-[#8d9292]"
    >
      {/* Animated Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={glowRef}
          className="h-[500px] w-[500px] rounded-full bg-gradient-to-r from-[#4c5953] via-[#8d9292] to-[#040f16] opacity-20 blur-[120px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 md:grid-cols-3  ">
          {/* Brand */}
          <div className="footer-item space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#8d9292] to-[#4c5953] bg-clip-text text-transparent">
                Mohammed Ahmed
              </span>
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              Crafting immersive web experiences with Next.js, Tailwind,
              GSAP and a touch of magic.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-item">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white/80">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Home",
                "Projects",
                "Blog",
                "About",
                "Contact",
              ].map((item) => (
                <li
                  key={item}
                  className="group relative w-fit cursor-pointer"
                >
                  <span className="transition-colors group-hover:text-[#4c5953]">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-400 transition-all group-hover:w-full" />
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer-item">
            <h3 className="mb-6 text-sm font-semibold uppercase tracking-widest text-white/80">
              Connect
            </h3>
            <div className="flex gap-4">


              {/* https://github.com/Mohammed-Mansour-dev */}
              {/* mohammed.develop@gmail.com */}
              {/* https://linkedin.com/in/mohammed-developer */}

              {/* updating social links */}

              {[
                { icon: Github, link: "https://github.com/Mohammed-Mansour-dev" },
                { icon: Mail, link: "mailto:mohammed.develop@gmail.com" },
                { icon: Linkedin, link: "https://linkedin.com/in/mohammed-developer" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 backdrop-blur transition-all hover:border-[#4c5953]"
                >
                  <item.icon className="h-5 w-5 text-white/70 transition-colors group-hover:text-[#4c5953]" />
                </a>
              ))}
              



            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Bottom */}
        <div className="footer-item flex flex-col items-center justify-between gap-4 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} Mohammed Ahmed. All rights reserved.</p>
          <p className="italic">Built with passion & motion ✨</p>
        </div>
      </div>
    </footer>
  );
}
