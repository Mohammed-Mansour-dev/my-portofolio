import React from 'react'
import TextSlider from './ui/TextSlider'

const Skills = () => {
  const skills = [
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Rest API",
    "ChatGPT",
    "Redux",
    "Javascript",
    "Git",
    "Postman",

    "Github",
    "PostgreSQL",
    "Express.js",
    "Strapi",
    "Prisma",
    "GraphQl",
    "Next.js",
    "React",
    "Tailwind",
    "CSS",
    "HTML",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Postman",

    "Rest API",
    "Redux",
    "Javascript",
    "Git",
    "ChatGPT",
    "Github",
    "PostgreSQL",
    "Express.js",
    "Strapi",
    "Prisma",
    "GraphQl",
    "Vercel",
    "Next.js",
    "Postman",
    "React",
    "ChatGPT",
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
    <div className='
    border-b border-[#464646]
    bg-linear-to-t via-[#0a0a0a] to-[#444343] from-[#0a0a0a] space-y-5 py-24 font-mono font-extrabold text-5xl ' >
      <TextSlider containerClasses="text-[#8d9292]   " directiona={-1} text={skillsPart2.join(' • ')} />
      <TextSlider containerClasses="text-[#8d9292]   " directiona={1} text={skillsPart1.join(' • ')} />
      <TextSlider containerClasses="text-[#8d9292]   " directiona={-1} text={skillsPart3.join(' • ')} />


    </div>
  );
}

export default Skills;
