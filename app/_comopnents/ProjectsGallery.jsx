"use client";


import { mouseScaleGallery } from "@/lib/data";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function ProjectsGallery() {
  // Pair items: [0,1], [2,3], ...
  const pairs = [];
  for (let i = 0; i < mouseScaleGallery.length; i += 2) {
    console.log(i);
    pairs.push([mouseScaleGallery[i], mouseScaleGallery[i + 1]]);
  }

  const Double = ({ items, reversed }) => {
    const firstRef = useRef(null);
    const secondRef = useRef(null);

    let xPercent = reversed ? 100 : 0;
    let currentXPercent = reversed ? 100 : 0;
    const speed = 0.15;
    let rafId = null;

    const animate = () => {
      const delta = xPercent - currentXPercent;
      currentXPercent += delta * speed;

      const firstW = 66.66 - currentXPercent * 0.33;
      const secondW = 33.33 + currentXPercent * 0.33;

      if (firstRef.current) firstRef.current.style.width = `${firstW}%`;
      if (secondRef.current) secondRef.current.style.width = `${secondW}%`;

      if (Math.abs(xPercent - currentXPercent) < 0.1) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleMove = (e) => {
      if (window.innerWidth < 768) return; // Disable hover effect on mobile

      xPercent = (e.clientX / window.innerWidth) * 100;
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    // Reset to default sizes on mobile
    useEffect(() => {
      if (window.innerWidth < 768) {
        if (firstRef.current) firstRef.current.style.width = "100%";
        if (secondRef.current) secondRef.current.style.width = "100%";
      }
    }, []);

    return (
      <div
        onMouseMove={handleMove}
        className="flex flex-col md:min-h-[90vh] md:flex-row gap-5 md:gap-0 mt-[10vh] select-none transition-all duration-300"
      >
        {/* FIRST */}
        <div
          ref={firstRef}
          className="w-full md:transition-all md:duration-300 md:ease-out"
          style={{ width: reversed ? "33.33%" : "66.66%" }}
        >
          <div className="relative pb-[60%] w-full overflow-hidden">
            <Image
              src={`/images/mouse-scale-gallery/${items[0].src}`}
              alt="image"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-3 text-base">
            <h3 className="text-lg font-normal mb-1">{items[0].name}</h3>
            <p className="text-gray-400">{items[0].description}</p>
            <p className="text-gray-600">{items[0].year}</p>
          </div>
        </div>

        {/* SECOND */}
        <div
          ref={secondRef}
          className="w-full md:transition-all md:duration-300 md:ease-out"
          style={{ width: reversed ? "66.66%" : "33.33%" }}
        >
          <div className="relative pb-[60%] w-full overflow-hidden">
            <Image
              src={`/images/mouse-scale-gallery/${items[1].src}`}
              alt="image"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-3 text-base">
            <h3 className="text-lg font-normal mb-1">{items[1].name}</h3>
            <p className="text-gray-400">{items[1].description}</p>
            <p className="text-gray-600">{items[1].year}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="text-white  pt-25 pb-[10vh] bg-[#040f16]">
      <h1 className="text-[6vw] md:text-[3vw] max-w-[90%] md:max-w-[70%] leading-tight font-normal p-5">
      Chek out some of my <br/> recent projects
      </h1>

      <div>
        {pairs.map((pair, index) => (
          <Double key={index} items={pair} reversed={index % 2 === 0} />
        ))}
      </div>
    </main>
  );
}
