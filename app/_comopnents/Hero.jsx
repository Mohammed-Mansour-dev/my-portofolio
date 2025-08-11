'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import TextAnimation from './ui/TextAnimation';
import { SplitText } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const imageRef = useRef(null);
  const imageCoverRef = useRef(null);
  const cardRef = useRef(null);



  useEffect(() => {

	const name = new SplitText(".split", {
	 type: "chars, words",
	});

	const desc = new SplitText(".desc", {
	 type: "lines",
	});


  

gsap.from(name.chars, {
	 yPercent: 100,
	 duration: 1.8,
   opacity: 0,
	 ease: "expo.out",
	 stagger: 0.06,
	});
gsap.from(desc.lines, {
	 xPercent: -50,
	 duration: 1.8,
   opacity: 0,
	 ease: "expo.out",
	 stagger: 0.06,
	});

    // Scale image on scroll
    gsap.to(imageRef.current, {

      y: '15%',
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'center center',
        end: 'bottom top',
        scrub: true,
      },
    });


    gsap.to(imageCoverRef.current, {
      width: 0,
      ease: 'expo.inOut',
    })
    gsap.from(cardRef.current, {
      xPercent: 100,
      duration: 1.5,
      
      ease: 'power3.out',
    })

   




  }, []);

  return (
    <section className="flex  h-screen relative overflow-hidden flex-col md:flex-row">



      {/* Left Section */}
      <div className="w-full  bg-[#8e9294]  md:w-1/2 md:h-full relative">
        <div ref={imageCoverRef} className="bg-[#040f16] absolute top-0 bottom-0 z-10 h-full transition-all duration-1000 right-0 w-full "></div>
        <div ref={imageRef} className="w-full h-full relative overflow-hidden">
          <Image
            src="/ccc.jpg"
            alt="Creative background"
            fill
            className="object-cover brightness-[0.9] z-[1]"
          />

        </div>
      </div>

      {/* Right Section */}
      <div className="w-full h-1/2 md:w-1/2 md:h-full bg-[#040f16] flex justify-center items-center relative overflow-hidden ">
        <div className=" w-full h-full ">
          <div ref={cardRef} className=" text-2xl bg-[#54625a]/90 mt-32 w-fit ml-auto rounded-tl-2xl rounded-bl-2xl pl-7 py-3 pr-14 ">
            <h1 className='flex font-arimo flex-col' >
              <span className='flex wordsp items-center' >Fullstack
                <svg className='ml-1' width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.46967 17.4697C5.17678 17.7626 5.17678 18.2374 5.46967 18.5303C5.76256 18.8232 6.23744 18.8232 6.53033 18.5303L5.46967 17.4697ZM6.53033 18.5303L18.5303 6.53033L17.4697 5.46967L5.46967 17.4697L6.53033 18.5303Z" fill="#fff" />
                  <path d="M9 6H18V15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className='tracking-wider' >
                 Developer
              </span>
            </h1>
          </div>
          <div className='md:max-w-96 md:ml-20   mt-24' >
            <h1 className='text-6xl font-arimo split font-bold' >Hello ,I am Mohammed</h1>
            <p className='my-2 font-semibold font-comic text-lg desc  text-gray-400 ' >Full Stack Developer passionate about crafting clean, functional, and user-friendly web applications, and intuitive digital experiences.</p>
          </div>
        </div>
      </div>
    
    
      <TextAnimation text="Creative Developer • Interactive Design • Smooth UX •" className="font-arimo h-fit  bottom-0 flex w-full absolute mt-auto bg-transparent " />
 
    </section>
  );
}
