import React, { useEffect, useRef } from 'react'
import ScrollTextColorReveal from './ui/TextScrollOpacity'
import Image from 'next/image'
import gsap from 'gsap/all'

const Aboutme = () => {


  const containera = useRef(null)
  const parallaxImage2 = useRef(null)



  useEffect(() => {
    // 2️⃣ Second section parallax
    gsap.fromTo(
      parallaxImage2.current,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containera.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    )
  }, []
  )






  return (
    <div ref={containera} className="h-screen  p-4  md:py-24 md:px-24 relative overflow-hidden  ">

      <div className='fixed w-full h-[120vh] left-0 -top-[13vh] -z-10' >
        <Image
        ref={parallaxImage2}
          src={"/ai-about-bg.webp"}
          fill
          alt='/background image'
          className=' object-cover w-full h-full  '
        />
      </div>


      <ScrollTextColorReveal
        mainColor='darkgray'
        scrollColor='#54625a'
        text="Combining expertise in UX/UI design and front-end
development, I craft adaptable websites that
seamlessly integrate motion, interaction, and design
to deliver compelling user experiences.
My work prioritizes simplicity and clarity, ensuring
every detail is thoughtfully designed and precisely implemented."
        className="md:max-w-[850px]  font-arimo text-shadow-xs text-shadow-gray-800 ml-auto leading-snug text-xl md:text-4xl font-semibold "
      />

      <ScrollTextColorReveal
        mainColor='darkgray'
        scrollColor='#54625a'
        text="I’m Mohammed Mansour, a passionate full-stack Developer with 3 years of experience crafting responsive, visually engaging, and user-focused digital experiences. Today, I focus on freelance collaborations and agency partnerships that value innovation, design, and attention to detail."
        className="md:max-w-[550px] tracking-wide font-comic mt-5  md:mt-16  ml-auto text-shadow-xs text-shadow-gray-800 text-base  md:text-xl font-medium leading-snug"
      />

    </div>
  )
}

export default Aboutme