import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const presets = {
  "fade-up": { y: 64, opacity: 0 },
  "fade-down": { y: -36, opacity: 0 },
  "fade-left": { x: -72, opacity: 0 },
  "fade-right": { x: 72, opacity: 0 },
  "scale-up": { scale: 0.9, y: 48, opacity: 0 },
  "blur-up": { y: 56, opacity: 0, filter: "blur(14px)" },
  "tilt-up": { y: 72, opacity: 0, rotateX: 16, transformPerspective: 900 },
};

const resetState = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotateX: 0,
  filter: "blur(0px)",
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  start = "top 85%",
  immediate = false,
  as: Tag = "div",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const from = presets[variant] ?? presets["fade-up"];

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...resetState,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: el,
              start,
              once: true,
            },
      });
    }, ref);

    return () => ctx.revert();
  }, [variant, delay, duration, start, immediate]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export function ScrollRevealStagger({
  children,
  className = "",
  variant = "tilt-up",
  stagger = 0.12,
  delay = 0,
  duration = 0.85,
  start = "top 82%",
  childSelector = ":scope > *",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const from = presets[variant] ?? presets["tilt-up"];

    const ctx = gsap.context(() => {
      gsap.fromTo(childSelector, from, {
        ...resetState,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [variant, stagger, delay, duration, start, childSelector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
