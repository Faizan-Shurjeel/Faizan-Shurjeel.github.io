import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * All scroll and entrance choreography for the site.
 *
 * The `js-anim` class on <html> (set in main.tsx) hides `.reveal` elements
 * before GSAP initialises. This hook immediately transfers that hidden state
 * onto inline styles and drops the class, so the CSS is only ever a
 * pre-initialisation guard and never the thing holding content invisible.
 */
export function useSiteAnimations(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const root = document.documentElement;

      if (reduced) {
        gsap.set(".reveal", { opacity: 1, y: 0 });
        root.classList.remove("js-anim");
        return;
      }

      // Hand the hidden state from the CSS class onto inline styles GSAP owns,
      // then drop the class in the same synchronous pass. After this point the
      // class is irrelevant, so a stalled timeline can never strand content at
      // opacity 0 — and removing it can never flash everything visible at once.
      gsap.set(".reveal", { opacity: 0, y: 26 });
      root.classList.remove("js-anim");

      // ── Hero entrance ────────────────────────────────
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.6 })
        .from(
          ".hero h1 .line > span",
          { yPercent: 110, duration: 1, stagger: 0.09 },
          "-=0.3",
        )
        .fromTo(
          ".hero-lede",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.55",
        )
        .fromTo(
          ".hero-actions > *",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.5",
        );

      // ── Scroll reveals ───────────────────────────────
      // One trigger per element; batching keeps listener count low.
      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power2.out",
            overwrite: true,
          }),
      });

      // ── Header hairline on scroll ────────────────────
      ScrollTrigger.create({
        start: "top -40",
        end: 99999,
        onToggle: (self) => {
          document
            .querySelector(".site-header")
            ?.setAttribute("data-scrolled", String(self.isActive));
        },
      });
    },
    { scope },
  );
}
