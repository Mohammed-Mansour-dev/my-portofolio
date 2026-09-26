"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const links = [
    { title: "Home", href: "#hero" },
    { title: "Projects", href: "#projects" },
    { title: "Expertise", href: "#about" },
    { title: "Ai", href: "#ai" },
    { title: "Contact", href: "#contact" },
];

const footerLinks = [
    { title: "Email", href: "mailto:mohammed.develop@gmail.com" },
    { title: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-developer/" },
    { title: "Github", href: "https://github.com/Mohammed-Mansour-dev" },
    { title: "Whatsapp", href: "https://wa.me/967781747445" },
];

// Matches framer-motion's ease: [0.76, 0, 0.24, 1]
const EASE_OUT = "power4.out";
const EASE_IN_OUT = "power4.inOut";

function getOpenWidth() {
    if (typeof window === "undefined") return 480;
    return Math.min(window.innerWidth - 48, 480);
}

export default function HeaderMenu() {
    const [isActive, setIsActive] = useState(false);

    const menuRef = useRef(null);
    const contentRef = useRef(null);
    const navRefs = useRef([]);
    const footerRefs = useRef([]);
    const toggleTrackRef = useRef(null);
    const timelineRef = useRef(null);

    navRefs.current = [];
    footerRefs.current = [];

    const addNavRef = (el) => {
        if (el && !navRefs.current.includes(el)) navRefs.current.push(el);
    };
    const addFooterRef = (el) => {
        if (el && !footerRefs.current.includes(el)) footerRefs.current.push(el);
    };

    // Close on Escape key for accessibility
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isActive) {
                setIsActive(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isActive]);

    // Drive the whole open/close sequence with a single GSAP timeline
    useEffect(() => {
        const ctx = gsap.context(() => {
            timelineRef.current?.kill();

            if (isActive) {
                // make content interactive/visible immediately, animate its children in
                gsap.set(contentRef.current, { autoAlpha: 1, pointerEvents: "auto" });

                const tl = gsap.timeline();
                timelineRef.current = tl;

                tl.to(
                    menuRef.current,
                    {
                        width: getOpenWidth(),
                        height: 620,
                        top: -20,
                        right: -20,
                        duration: 0.75,
                        ease: EASE_IN_OUT,
                    },
                    0
                )
                    .to(
                        toggleTrackRef.current,
                        { top: "-100%", duration: 0.5, ease: EASE_IN_OUT },
                        0
                    )
                    .fromTo(
                        navRefs.current,
                        { autoAlpha: 0, rotateX: 90, y: 80, x: -20, transformPerspective: 120, transformOrigin: "bottom" },
                        {
                            autoAlpha: 1,
                            rotateX: 0,
                            y: 0,
                            x: 0,
                            duration: 0.65,
                            stagger: 0.1,
                            ease: EASE_OUT,
                        },
                        0.5
                    )
                    .fromTo(
                        footerRefs.current,
                        { autoAlpha: 0, y: 20 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: EASE_OUT,
                        },
                        0.75
                    );
            } else {
                const tl = gsap.timeline({
                    onComplete: () => {
                        gsap.set(contentRef.current, { autoAlpha: 0, pointerEvents: "none" });
                    },
                });
                timelineRef.current = tl;

                tl.to([...navRefs.current, ...footerRefs.current], {
                    autoAlpha: 0,
                    duration: 0.5,
                    ease: "power2.inOut",
                }, 0)
                    .to(
                        menuRef.current,
                        {
                            width: 100,
                            height: 40,
                            top: 0,
                            right: 0,
                            duration: 0.75,
                            ease: EASE_IN_OUT,
                        },
                        0.35
                    )
                    .to(
                        toggleTrackRef.current,
                        { top: "0%", duration: 0.5, ease: EASE_IN_OUT },
                        0.35
                    );
            }
        }, menuRef);

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    // Recalculate open width on resize while the menu is open
    useEffect(() => {
        if (!isActive) return;
        const handleResize = () => {
            gsap.to(menuRef.current, { width: getOpenWidth(), duration: 0.3, ease: "power2.out" });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isActive]);

    return (
        <>
            {/* Mobile background blur overlay */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-xs transition-opacity duration-300 md:hidden z-40 ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsActive(false)}
                aria-hidden="true"
            />

            <header className="fixed right-6 top-6 sm:right-12 sm:top-12 z-50">
                <div
                    ref={menuRef}
                    className="relative bg-[#989898] rounded-[25px] shadow-2xl overflow-hidden"
                    style={{ width: 100, height: 40, top: 0, right: 0 }}
                >
                    <div
                        ref={contentRef}
                        className="flex flex-col justify-between h-full p-8 sm:p-12 box-border select-none"
                        style={{ opacity: 0, visibility: "hidden", pointerEvents: "none" }}
                    >
                        {/* Navigation Links Body */}
                        <nav className="flex flex-col gap-2.5 mt-8" aria-label="Main Navigation">
                            {links.map((link, i) => (
                                <div key={`b_${i}`} ref={addNavRef} className="w-fit">
                                    <a
                                        href={link.href}
                                        className="text-black text-3xl sm:text-5xl font-medium tracking-tight no-underline hover:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-black rounded-xs"
                                    >
                                        {link.title}
                                    </a>
                                </div>
                            ))}
                        </nav>

                        {/* Footer Social Links */}
                        <div className="grid grid-cols-2 gap-y-2 pt-6 border-t border-black/10">
                            {footerLinks.map((link, i) => (
                                <a
                                    ref={addFooterRef}
                                    key={`f_${i}`}
                                    href={link.href}
                                    className="text-xs sm:text-sm font-medium text-neutral-800 hover:underline w-fit focus-visible:outline-2 focus-visible:outline-black rounded-xs"
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Toggle Button */}
                    <div className="absolute top-0 right-0 w-[100px] h-[40px] cursor-pointer rounded-[25px] overflow-hidden z-30">
                        <div ref={toggleTrackRef} className="relative w-full h-full" style={{ top: 0 }}>
                            {/* Menu Button State */}
                            <div
                                className="w-full h-full bg-[#989898] flex items-center justify-center"
                                onClick={() => setIsActive(!isActive)}
                                role="button"
                                tabIndex={0}
                                aria-label="Open Menu"
                                aria-expanded={isActive}
                                onKeyDown={(e) => e.key === "Enter" && setIsActive(!isActive)}
                            >
                                <PerspectiveText label="Menu" />
                            </div>

                            {/* Close Button State */}
                            <div
                                className="w-full h-full bg-black flex items-center justify-center"
                                onClick={() => setIsActive(!isActive)}
                                role="button"
                                tabIndex={0}
                                aria-label="Close Menu"
                                aria-expanded={isActive}
                                onKeyDown={(e) => e.key === "Enter" && setIsActive(!isActive)}
                            >
                                <PerspectiveText label="Close" isClose />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

function PerspectiveText({ label, isClose = false }) {
    return (
        <div className="flex flex-col justify-center items-center h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] hover:[transform:rotateX(90deg)] group">
            <p className={`m-0 uppercase text-xs font-semibold tracking-wider transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none ${isClose ? "text-gray-300" : "text-black"} group-hover:-translate-y-full group-hover:opacity-0`}>
                {label}
            </p>
            <p className={`m-0 uppercase text-xs font-semibold tracking-wider transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none absolute [transform-origin:bottom_center] [transform:rotateX(-90deg)_translateY(9px)] opacity-0 ${isClose ? "text-black bg-[#989898]" : "text-white"} group-hover:opacity-100`}>
                {label}
            </p>
        </div>
    );
}