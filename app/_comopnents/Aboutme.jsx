import React from 'react'
import ScrollTextColorReveal from './ui/TextScrollOpacity'

const Aboutme = () => {
  return (
       <div className="min-h-screen   p-24 relative bg-no-repeat bg-cover bg-[url('/ai-about-bg.webp')] ">
      
       <ScrollTextColorReveal
       mainColor='darkgray'
       scrollColor='#54625a'
        text="Combining expertise in UX/UI design and front-end
development, I craft adaptable websites that
seamlessly integrate motion, interaction, and design
to deliver compelling user experiences.
My work prioritizes simplicity and clarity, ensuring
every detail is thoughtfully designed and precisely implemented."
        className="md:max-w-[850px] font-arimo text-shadow-xs text-shadow-gray-800 ml-auto leading-snug text-4xl font-semibold "
      />

       <ScrollTextColorReveal
       mainColor='darkgray'
       scrollColor='#54625a'
        text="I’m Mohammed Mansour, a passionate full-stack Developer with 3 years of experience crafting responsive, visually engaging, and user-focused digital experiences. Over the years, I’ve worked with diverse clients and teams worldwide, delivering projects that balance creativity with functionality. Today, I focus on freelance collaborations and agency partnerships that value innovation, design, and attention to detail."
        className="md:max-w-[550px] tracking-wide font-comic  mt-16 ml-auto text-shadow-xs text-shadow-gray-800   text-xl font-medium leading-snug"
      />
      
      </div>
  )
}

export default Aboutme