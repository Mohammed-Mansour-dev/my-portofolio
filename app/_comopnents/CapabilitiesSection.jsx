"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

 const capabilities = [
  {
    num: "01",
    title: "Building User-Focused Interfaces",
    desc: "Combining UX principles with responsive visual design to create intuitive, accessible, and consistent front-end experiences."
  },
  {
    num: "02",
    title: "Developing & Optimizing Interfaces",
    desc: "Bringing designs to life with clean, scalable code — optimized for performance, accessibility, and cross-browser compatibility."
  },
  {
    num: "03",
    title: "Collaborating & Growing with Teams",
    desc: "Working effectively in team environments, learning from peers, and continuously improving through shared knowledge and feedback."
  },
  {
    num: "04",
    title: "Integrating with Back-End Systems",
    desc: "Connecting front-end components with APIs and real-time data to deliver dynamic, seamless functionality."
  }
];



// export default function CapabilitiesSection() {
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".section-title", {
//         y: -30,
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out"
//       });

//       gsap.from(".cap-item", {
//         x: (i) => (i % 2 === 0 ? -50 : 50),
//         opacity: 0,
//         duration: 0.8,
//         ease: "power3.out",
//         stagger: 0.2,
//         delay: 0.3
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);




//   return (
//     <section
//       ref={sectionRef}
//       className="px-8 text-black [background:_linear-gradient(188deg,rgba(4,_15,_22,_1)_0%,_rgba(84,_98,_90,_1)_16%)] min-h-screen py-20"
  
//     >
//       <h2 className="section-title text-6xl font-bold mb-16">
//         Core Capabilities <br /> and Services
//       </h2>

//       <div className="grid md:mx-32 grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
//         {capabilities.map((cap, i) => (
//           <div key={i} className="cap-item flex gap-6 max-w-96 md:ml-auto  items-start">
//             <span className="text-2xl  ">{cap.num}</span>
//             <div>
//               <h3 className="text-2xl font-semibold mb-2">{cap.title}</h3>
//               <p className="">{cap.desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);


export default function CapabilitiesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the section title
      gsap.from(".section-title", {
        scale: 0.8, // Start slightly smaller
        rotate: 5, // Subtle 2D rotation
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Start when top of section is 80% into viewport
          toggleActions: "play none none none", // Play animation once when triggered
        },
      });

      // Animate capability items with stagger
      gsap.from(".cap-item", {
        scale: 0.9, // Start slightly smaller
        rotateX: (i) => (i % 2 === 0 ? 30 : -30), // Alternate 3D rotation for a flipping effect
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2, // Stagger items by 0.2s
        delay: 0.3, // Slight delay to follow title animation
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%", // Same trigger point as title
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP context
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-8 text-black [background:_linear-gradient(188deg,rgba(4,_15,_22,_1)_0%,_rgba(84,_98,_90,_1)_16%)] min-h-screen py-20"
    >
      <h2 className="section-title font-arimo text-6xl font-bold mb-16">
        Core Capabilities <br /> and Services
      </h2>

      <div className="grid md:mx-32 grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
        {capabilities.map((cap, i) => (
          <div key={i} className="cap-item flex gap-6 max-w-96 md:ml-auto items-start">
            <span className="text-2xl">{cap.num}</span>
            <div>
              <h3 className="text-2xl font-arimo  font-bold mb-2">{cap.title}</h3>
              <p className="font-comic font-semibold " >{cap.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}