import React from 'react'
import TextSlider from './ui/TextSlider'

const Skills = () => {
  const skills = [
    "Docker",
    "Figma",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Rest API",
    "Redux",
    "Javascript",
    "Git",
    "Github",
    "PostgreSQL",
    "Express.js",
    "Strapi",
    "Prisma",
    "GraphQl",
    "Vercel",
    "Next.js",
    "React",
    "Tailwind",
    "CSS",
    "HTML",
    "Figma",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Rest API",
    "Redux",
    "Javascript",
    "Git",
    "Github",
    "PostgreSQL",
    "Express.js",
    "Strapi",
    "Prisma",
    "GraphQl",
    "Vercel",
    "Next.js",
    "React",
    "Tailwind",
    "CSS",
    "HTML"
  ];

  // Split into 3 parts
  const partSize = Math.ceil(skills.length / 3);
  const skillsPart1 = skills.slice(0, partSize);
  const skillsPart2 = skills.slice(partSize, partSize * 2);
  const skillsPart3 = skills.slice(partSize * 2);

  return (
    <div className='bg-[#040f16] space-y-8 py-24 font-arimo font-extrabold text-5xl ' >
      <TextSlider containerClasses="text-[#8d9292]   " directiona={-1} text={skillsPart2.join(' • ')} />
      <TextSlider containerClasses="text-[#8d9292]   "  directiona={1} text={skillsPart1.join(' • ')} />
      <TextSlider containerClasses="text-[#8d9292]   " directiona={-1} text={skillsPart3.join(' • ')} />
    
    
    </div>
  );
}

export default Skills;
