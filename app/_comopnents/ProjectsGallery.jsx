"useuse client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsGallery } from "@/lib/data";

// SSR-safe layout effect hook
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LAYOUTS = ["left", "right", "left"];

/* ------------------------------------------------------------------ */
/*  MAIN COMPONEN           */
/* ------------------------------------------------------------------ */

export default function ProjectsGallery() {
  const sectionRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = useMemo(() => projectsGallery, []);
  const total = projects.length;

  const handleActivate = useCallback((i) => {
    if (activeRef.current !== i) {
      activeRef.current = i;
      setActiveIndex(i);
    }
  }, []);

  /* -------------------------------- */
  /*  Intro animatio    */
  /* -------------------------------- */
  const introRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const el = introRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const q = gsap.utils.selector(el);
      const words = q("[data-intro-word] > span");
      const meta = q("[data-intro-meta]");
      const rule = q("[data-intro-rule]");
      const line = q("[data-intro-line] path");
      const countEl = q("[data-intro-count]");

      if (reduce) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        gsap.set(meta, { y: 0, opacity: 1 });
        gsap.set(rule, { scaleX: 1 });
        gsap.set(countEl, { y: 0, opacity: 1 });
        line.forEach((p) => gsap.set(p, { strokeDashoffset: 0 }));
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });

      tl.from(words, { yPercent: 110, duration: 1.15, stagger: 0.08 })
        .from(
          line,
          {
            strokeDashoffset: (i, t) =>
              t.getTotalLength ? t.getTotalLength() : 600,
            duration: 1.4,
            ease: "power2.inOut",
          },
          "-=0.7",
        )
        .from(
          rule,
          { scaleX: 0, transformOrigin: "left center", duration: 0.9 },
          "-=1.0",
        )
        .from(
          meta,
          { y: 14, opacity: 0, duration: 0.7, stagger: 0.08 },
          "-=0.6",
        )
        .from(countEl, { y: 14, opacity: 0, duration: 0.6 }, "-=0.5");
    }, el);

    return () => ctx.revert();
  }, []);

  /* -------------------------------- */
  /*  SVG Spine Geometry Computations */
  /* -------------------------------- */
  const viewH = 1000;
  const pad = 90;
  const step = total > 1 ? (viewH - pad * 2) / (total - 1) : 0;
  const nodeYs = useMemo(
    () => Array.from({ length: total }).map((_, i) => pad + step * i),
    [step, total],
  );

  const spineD = useMemo(() => {
    const x = 60;
    const w = 12;
    let out = `M ${x} 0`;
    for (let i = 0; i < nodeYs.length; i++) {
      const y = nodeYs[i];
      const sign = i % 2 === 0 ? 1 : -1;
      out += ` C ${x + sign * w} ${y - 60}, ${x - sign * w} ${y + 60}, ${x} ${y}`;
    }
    out += ` L ${x} ${viewH}`;
    return out;
  }, [nodeYs]);

  /* -------------------------------- */
  /*  SVG Spine Scroll Animation     */
  /* -------------------------------- */
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const nodeRefs = useRef([]);

  useIsomorphicLayoutEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const section = sectionRef.current;
    if (!svg || !path || !section) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: reduce ? 0 : length,
      });

      if (reduce) return;

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 0.8,
        },
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  // Update SVG node indicator states
  useEffect(() => {
    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      const active = i === activeIndex;
      const circle = node.querySelector("[data-node]");
      const label = node.querySelector("[data-node-label]");

      if (circle) {
        gsap.to(circle, {
          attr: { r: active ? 5 : 3 },
          opacity: active ? 1 : 0.5,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (label) {
        gsap.to(label, {
          opacity: active ? 1 : 0.35,
          duration: 0.5,
          overwrite: "auto",
        });
      }
    });
  }, [activeIndex]);

  /* -------------------------------- */
  /*  Progress Rail Indicators        */
  /* -------------------------------- */
  const railItemsRef = useRef([]);

  useEffect(() => {
    railItemsRef.current.forEach((el, i) => {
      if (!el) return;
      const active = i === activeIndex;
      gsap.to(el, {
        opacity: active ? 1 : 0.32,
        x: active ? 0 : -4,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
      const dot = el.querySelector("[data-dot]");
      if (dot) {
        gsap.to(dot, {
          scale: active ? 1 : 0.6,
          backgroundColor: active ? "#e8e6e1" : "#4a4a4d",
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-heading"
      className="relative w-full overflow-clip bg-[#0a0a0a] text-[#e8e6e1]"
    >
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "min(20vw, 260px) 100%",
        }}
      />

      <div className="relative mx-auto w-full max-w-400 px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* INTRO BLOCK */}
        <div
          ref={introRef}
          className="relative flex min-h-[68vh] flex-col justify-end pb-16 pt-[22vh] sm:min-h-[72vh] lg:pb-24 lg:pt-[26vh]"
        >
          <div className="grid grid-cols-12 items-end gap-6">
            <div className="col-span-12 flex items-center gap-4 lg:col-span-4">
              {" "}
              <span className="h-px w-10 bg-[#3d3d40]" />{" "}
              <span className="text-[10px] uppercase tracking-[0.42em] text-[#7a7a7d]">
                {" "}
                Section 05 / Projects{" "}
              </span>
            </div>

            <div className="col-span-6 order-3 lg:order-2 lg:col-span-4 lg:text-center">
              {" "}
              <span
                data-intro-count
                className="block text-[10px] uppercase tracking-[0.42em] text-[#8a8a8d]"
              >
                {" "}
                01 — {String(total).padStart(2, "0")}{" "}
              </span>
            </div>

            <div className="col-span-6 order-4 flex items-center justify-end lg:order-3 lg:col-span-4">
              {" "}
              <span className="text-[10px] uppercase tracking-[0.42em] text-[#5c5c5f]">
                {" "}
                Curated selection{" "}
              </span>
            </div>
          </div>

          <h2
            id="projects-heading"
            className="mt-12 select-none leading-[0.82] lg:mt-16"
          >
            <span className="block overflow-hidden">
              {" "}
              <span
                data-intro-word
                className="block text-[clamp(3.4rem,13vw,11rem)] font-medium uppercase tracking-[-0.03em] text-[#efeee9]"
              >
                {" "}
                <span className="block will-change-transform">
                  Selected
                </span>{" "}
              </span>
            </span>
            <span className="relative block overflow-hidden">
              {" "}
              <span
                data-intro-word
                className="block text-[clamp(3.4rem,13vw,11rem)] font-medium uppercase tracking-[-0.03em] text-[#efeee9]"
              >
                {" "}
                <span className="block will-change-transform">Work</span>{" "}
              </span>{" "}
              <svg
                data-intro-line
                viewBox="0 0 800 6"
                preserveAspectRatio="none"
                className="mt-3 h-1.5 w-full max-w-180 text-[#6f6f72]"
                aria-hidden
              >
                {" "}
                <path
                  d="M0 3 H800"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  pathLength={1}
                />{" "}
              </svg>
            </span>
          </h2>

          <div className="mt-10 grid grid-cols-12 items-end gap-6 lg:mt-14">
            <p
              data-intro-meta
              className="col-span-12 max-w-xl text-sm leading-relaxed text-[#9a9a9d] lg:col-span-7"
            >
              {" "}
              A curated passage through recent work — platforms, organisations
              and experiments delivered with an emphasis on structure, restraint
              and long-term maintainability.
            </p>
            <span
              data-intro-rule
              className="col-span-12 block h-px w-full origin-left bg-[#2f2f31] lg:col-span-5"
            />
          </div>
        </div>

        {/* GALLERY BODY */}
        <div className="relative">
          {/* SVG Spine (Desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-30 -translate-x-1/2 lg:block"
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 120 ${viewH}`}
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              {" "}
              <path
                ref={pathRef}
                d={spineD}
                stroke="#6f6f72"
                strokeOpacity="0.55"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />{" "}
              {nodeYs.map((y, i) => (
                <g
                  key={`node-${i}`}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                >
                  {" "}
                  <circle
                    data-node
                    cx={60}
                    cy={y}
                    r={3}
                    fill="#0e0e0f"
                    stroke="#9a9a9d"
                    strokeWidth="1"
                    opacity={0.5}
                    vectorEffect="non-scaling-stroke"
                  />{" "}
                  <text
                    data-node-label
                    x={78}
                    y={y + 3}
                    fontSize="9"
                    letterSpacing="3"
                    fill="#8a8a8d"
                    opacity={0.35}
                  >
                    {" "}
                    {String(i + 1).padStart(2, "0")}{" "}
                  </text>{" "}
                </g>
              ))}
            </svg>
          </div>

          {/* Sticky Progress Rail (Desktop) */}
          <nav
            aria-label="Project progress"
            className="pointer-events-none sticky top-24 z-20 hidden w-fit backdrop-blur-sm lg:block"
          >
            <div className="flex flex-col gap-4">
              {" "}
              <span className="text-[10px] uppercase tracking-[0.42em] text-[#5c5c5f]">
                {" "}
                Selected Work{" "}
              </span>{" "}
              <ul className="flex flex-col gap-3">
                {" "}
                {projects.map((p, i) => {
                  const num = String(i + 1).padStart(2, "0");
                  return (
                    <li
                      key={p.slug || num}
                      ref={(el) => {
                        railItemsRef.current[i] = el;
                      }}
                      className="flex items-center gap-3 opacity-30"
                      aria-current={i === activeIndex ? "true" : undefined}
                    >
                      {" "}
                      <span
                        data-dot
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[#4a4a4d]"
                      />{" "}
                      <span className="tabular-nums text-[11px] tracking-[0.4em] text-[#c9c7c2]">
                        {" "}
                        {num}{" "}
                      </span>{" "}
                      <span className="sr-only">{p.name}</span>{" "}
                    </li>
                  );
                })}{" "}
              </ul>
            </div>
          </nav>

          {/* Project chapters */}
          <ul className="relative flex flex-col gap-[14vh] py-[10vh] sm:gap-[18vh] lg:gap-[22vh]">
            {projects.map((project, i) => (
              <li key={project.slug || i}>
                {" "}
                <ProjectChapter
                  project={project}
                  index={i}
                  total={total}
                  layout={LAYOUTS[i % LAYOUTS.length]}
                  onActivate={handleActivate}
                />{" "}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer rule */}
        <div className="relative pb-24 pt-8 lg:pb-32">
          <div className="h-px w-full bg-linear-to-r from-transparent via-[#3a3a3c] to-transparent" />
          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.4em] text-[#6a6a6d]">
            End of selection
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT CHAPTE          */
/* ------------------------------------------------------------------ */

function ProjectChapter({ project, index, total, layout, onActivate }) {
  const root = useRef(null);
  const imageCol = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    const imgCol = imageCol.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const q = gsap.utils.selector(el);

      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => onActivate(index),
        onEnterBack: () => onActivate(index),
      });

      if (reduce) return;

      if (imgCol) {
        gsap.fromTo(
          imgCol,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }

      const metaEls = q("[data-meta-item]");
      if (metaEls.length) {
        gsap.from(metaEls, {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: el,
            start: "top 72%",
            once: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [index, onActivate]);

  const imageFirst = layout === "left";

  return (
    <article
      ref={root}
      className="relative grid grid-cols-12 items-center gap-y-10 lg:gap-x-14 xl:gap-x-20"
      aria-label={project.name}
    >
      <div
        ref={imageCol}
        className={`col-span-12 lg:col-span-7 xl:col-span-7 ${
          imageFirst ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <ProjectImage
          project={project}
          index={index}
          priority={index === 0}
          align={imageFirst ? "left" : "right"}
        />
      </div>

      <div
        className={`col-span-12 lg:col-span-5 xl:col-span-5 ${
          imageFirst ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <ProjectMeta project={project} index={index} total={total} />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT IMAG            */
/* ------------------------------------------------------------------ */

function ProjectImage({ project, index, priority = false, align }) {
  const wrap = useRef(null);
  const frame = useRef(null);
  const inner = useRef(null);
  const overlay = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const wrapEl = wrap.current;
    const frameEl = frame.current;
    const innerEl = inner.current;
    const overlayEl = overlay.current;
    if (!wrapEl || !frameEl || !innerEl) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const onDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (reduce) {
        gsap.set(frameEl, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(innerEl, { yPercent: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapEl,
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "expo.out" },
      });

      tl.fromTo(
        frameEl,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25 },
      ).fromTo(
        innerEl,
        { yPercent: 9, scale: 1.08 },
        { yPercent: 0, scale: 1, duration: 1.4 },
        "<",
      );

      if (onDesktop) {
        const xTo = gsap.quickTo(innerEl, "x", {
          duration: 0.6,
          ease: "power3",
        });
        const yTo = gsap.quickTo(innerEl, "y", {
          duration: 0.6,
          ease: "power3",
        });
       
        const borderTo = gsap.quickTo(frameEl, "borderColor", {
          duration: 0.5,
        });

        const onMove = (e) => {
          if (e.pointerType !== "mouse") return;
          const rect = wrapEl.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          xTo(nx * 16);
          yTo(ny * 16);
        };
        const onEnter = () => {
          if (overlayEl) {
            gsap.to(overlayEl, { autoAlpha: 1, duration: 0.5 });
          }
          borderTo("#8a8a8d");
        };

        const onLeave = () => {
          if (overlayEl) {
            gsap.to(overlayEl, { autoAlpha: 0, duration: 0.5 });
          }
          borderTo("transparent");
        };

        wrapEl.addEventListener("pointermove", onMove);
        wrapEl.addEventListener("pointerenter", onEnter);
        wrapEl.addEventListener("pointerleave", onLeave);

        return () => {
          wrapEl.removeEventListener("pointermove", onMove);
          wrapEl.removeEventListener("pointerenter", onEnter);
          wrapEl.removeEventListener("pointerleave", onLeave);
        };
      }
    }, wrapEl);

    return () => ctx.revert();
  }, []);

  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`View project: ${project.name}`}
      className="group relative block focus:outline-none"
    >
      <div ref={wrap} className="relative" style={{ perspective: "1200px" }}>
        <div
          ref={frame}
          className="relative overflow-hidden border border-[#2a2a2c] bg-[#141415] transition-colors duration-500"
          style={{ willChange: "clip-path, border-color" }}
        >
          <div
            ref={inner}
            className="relative aspect-4/5 w-full sm:aspect-16/11 lg:aspect-4/5 xl:aspect-5/6"
            style={{ willChange: "transform" }}
          >
            <Image
              src={`/images/mouse-scale-gallery/${project.image}`}
              alt={`${project.name} — ${project.category}`}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 60vw"
              className="object-cover object-top filter grayscale brightness-50"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-3 border border-white/5"
            />

            <span
              className={`absolute top-4 z-10 text-[10px] uppercase tracking-[0.4em] text-white/70 ${align === "left" ? "left-4" : "right-4"}`}
            >
              {" "}
              {num}
            </span>

            <div
              ref={overlay}
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-end justify-between bg-linear-to-t from-black/55 via-black/10 to-transparent p-5 opacity-0"
            >
              {" "}
              <span className="text-[10px] uppercase tracking-[0.42em] text-white/90">
                {" "}
                View Project{" "}
              </span>{" "}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-white/90"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {" "}
                <path d="M7 17 17 7" /> <path d="M9 7h8v8" />{" "}
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-[#6b6b6e]">
          <span>WEB / {project.category}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT MET             */
/* ------------------------------------------------------------------ */

function ProjectMeta({ project, index, total }) {
  const num = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");
  const statusLabel =
    project.status === "real" ? "Real Project" : "Experimental";
  const words = project.name.split(" ");

  return (
    <div className="relative max-w-xl">
      <div
        data-meta-item
        className="flex items-center gap-4 text-[10px] uppercase tracking-[0.42em] text-[#7c7c7f]"
      >
        <span className="tabular-nums">{num}</span>
        <span className="h-px w-8 bg-[#3a3a3c]" />
        <span className="tabular-nums">{totalStr}</span>
      </div>

      <h3
        data-meta-item
        className="mt-6 text-[clamp(2rem,5vw,3.75rem)] font-medium uppercase leading-[0.95] tracking-[-0.02em] text-[#efeee9]"
      >
        {words.map((w, i) => (
          <span
            key={`${project.slug || index}-word-${i}`}
            className="mr-[0.28em] inline-block overflow-hidden align-top"
          >
            <span className="inline-block will-change-transform">{w}</span>
          </span>
        ))}
      </h3>

      <p
        data-meta-item
        className="mt-5 text-[11px] uppercase tracking-[0.4em] text-[#8b8b8e]"
      >
        {project.category}
      </p>

      <p
        data-meta-item
        className="mt-7 max-w-md text-[15px] leading-relaxed text-[#b6b4ae]"
      >
        {project.shortDescription}
      </p>

      <div
        data-meta-item
        className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.34em] text-[#83837f]"
      >
        {project.stack?.map((tech, i) => (
          <span
            key={`${project.slug || index}-tech-${tech}`}
            className="flex items-center gap-3"
          >
            <span>{tech}</span>
            {i < project.stack.length - 1 && (
              <span className="text-[#3a3a3c]">/</span>
            )}
          </span>
        ))}
      </div>

      <div data-meta-item className="mt-8 h-px w-full bg-[#262628]" />

      <div
        data-meta-item
        className="mt-6 flex flex-wrap items-center justify-between gap-4"
      >
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex cursor-pointer items-center gap-2 text-lg text-[#d8d6d1] transition-colors hover:text-white focus:outline-none focus-visible:underline"
          >
            <span className="size-2 bg-gray-400 border border-gray-500 animate-ping rounded-full"></span>
            <span>{project.website}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 animate-bounce translate-x-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              {" "}
              <path d="M7 17 17 7" /> <path d="M9 7h8v8" />
            </svg>
          </a>
        )}

        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-[#8b8b8e]">
          <span className="inline-block h-1 w-1 rounded-full bg-[#6e6e71]" />
          <span>{statusLabel}</span>
          <span className="text-[#3a3a3c]">·</span>
          <span className="tabular-nums">{project.year}</span>
        </div>
      </div>
    </div>
  );
}
