// pages/index.jsx  (or app/page.jsx if you’re using the /app router)
'use client'

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

export default function Home() {
    const firstText = useRef(null)
    const secondText = useRef(null)
    const slider = useRef(null)
    let xPercent = 0
    let direction = -1

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.25,
                start: 0,
                end: window.innerHeight,
                onUpdate: (e) => (direction = e.direction * -1),
            },
            x: '-500px',
        })
        requestAnimationFrame(animate)
    }, [])

    const animate = () => {
        if (xPercent < -100) {
            xPercent = 0
        } else if (xPercent > 0) {
            xPercent = -100
        }
        gsap.set(firstText.current, { xPercent })
        gsap.set(secondText.current, { xPercent })
        requestAnimationFrame(animate)
        xPercent += 0.1 * direction
    }

    return (
        <main data-scroll data-scroll-speed=".21" className="absolute bottom-0 flex w-full mt-auto bg-transparent  overflow-hidden">


            <div ref={slider} className="relative whitespace-nowrap">
                <p
                    ref={firstText}
                    className="relative m-0 text-white text-[70px] font-medium pr-[50px]"
                >
                    Creative Developer • Interactive Design • Smooth UX •
                </p>

                <p
                    ref={secondText}
                    className="absolute left-full top-0 m-0 text-white text-[70px] font-medium pr-[50px]"
                >
                    Creative Developer • Interactive Design • Smooth UX •
                </p>
            </div>

        </main>
    )
}