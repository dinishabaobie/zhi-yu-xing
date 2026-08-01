"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

function heroEntrance() {
  if (!document.querySelector(".hero-copy")) {
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    ".hero-copy .hero-kicker",
    { autoAlpha: 0, y: 16 },
    { autoAlpha: 1, y: 0, duration: 0.5 },
    0,
  )
    .fromTo(
      ".hero-quote > span",
      { autoAlpha: 0, y: 28, filter: "blur(6px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7, stagger: 0.11 },
      0.1,
    )
    .fromTo(
      ".hero-quote-detail > span",
      { autoAlpha: 0, y: 20, filter: "blur(4px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.09 },
      0.45,
    )
    .fromTo(
      ".hero-actions",
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.5 },
      0.78,
    )
    .fromTo(
      ".hero-visual",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: "power1.out" },
      0.18,
    )
    .fromTo(
      ".hero-image",
      { clipPath: "inset(0% 100% 0% 0%)", scale: 1.06, filter: "blur(8px)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power2.inOut",
      },
      0.24,
    )
    .fromTo(
      ".hero-visual figcaption",
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.45 },
      1.05,
    );
}

function collectionEntrance() {
  if (!document.querySelector(".collection-hero")) {
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.fromTo(
    ".collection-title > *",
    { autoAlpha: 0, y: 22 },
    { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 },
    0,
  ).fromTo(
    ".collection-intro > *",
    { autoAlpha: 0, y: 22 },
    { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.12 },
    0.28,
  );
}

function scrollReveals() {
  const reveals = gsap.utils.toArray<HTMLElement>(".reveal");
  if (!reveals.length) {
    return;
  }

  gsap.set(reveals, { autoAlpha: 0, y: 34 });

  ScrollTrigger.batch(reveals, {
    start: "top 86%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        overwrite: true,
      }),
  });
}

function imageParallax() {
  gsap.utils.toArray<HTMLElement>(".parallax-media").forEach((media) => {
    gsap.fromTo(
      media,
      { yPercent: -4.5, scale: 1.12 },
      {
        yPercent: 4.5,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: media.parentElement ?? media,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });
}

function ledgerEntrance() {
  const ledger = document.querySelector(".hotspot-preview-ledger");
  if (!ledger) {
    return;
  }

  const claims = ledger.querySelectorAll(":scope > span");
  const verdicts = ledger.querySelectorAll(":scope > strong");
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ledger, start: "top 82%", once: true },
  });

  claims.forEach((claim, index) => {
    tl.fromTo(
      claim,
      { autoAlpha: 0, x: -14 },
      { autoAlpha: 1, x: 0, duration: 0.45, ease: "power2.out" },
      index * 0.16,
    );

    const verdict = verdicts[index];
    if (verdict) {
      tl.fromTo(
        verdict,
        { autoAlpha: 0, scale: 1.2, transformOrigin: "right center" },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" },
        index * 0.16 + 0.1,
      );
    }
  });
}

function headerAutoHide() {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) {
    return;
  }

  const hideTween = gsap.to(header, {
    yPercent: -100,
    duration: 0.35,
    ease: "power3.out",
    paused: true,
  });

  ScrollTrigger.create({
    start: 140,
    end: "max",
    onUpdate(self) {
      const headerBusy =
        header.contains(document.activeElement) ||
        header.querySelector("details[open]");
      if (self.direction === 1 && !headerBusy) {
        hideTween.play();
      } else if (self.direction === -1) {
        hideTween.reverse();
      }
    },
    onLeaveBack: () => hideTween.reverse(),
  });

  const onFocusIn = () => hideTween.reverse();
  header.addEventListener("focusin", onFocusIn);
  return () => header.removeEventListener("focusin", onFocusIn);
}

function smoothAnchors() {
  const onClick = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const link = (event.target as Element | null)?.closest?.("a");
    if (
      !link ||
      !link.hash ||
      link.classList.contains("skip-link") ||
      link.origin !== window.location.origin ||
      link.pathname !== window.location.pathname
    ) {
      return;
    }

    let target: Element | null = null;
    try {
      target = document.querySelector(link.hash);
    } catch {
      return;
    }
    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height",
        ),
      ) || 70;

    gsap.to(window, {
      scrollTo: { y: target, offsetY: headerHeight + 24 },
      duration: 0.8,
      ease: "power2.inOut",
      overwrite: "auto",
    });
    window.history.pushState(null, "", link.hash);
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}

export function SiteMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      document.documentElement.classList.add("gsap-live");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        heroEntrance();
        collectionEntrance();
        scrollReveals();
        imageParallax();
        ledgerEntrance();
        const cleanups = [headerAutoHide(), smoothAnchors()].filter(
          (cleanup): cleanup is () => void => typeof cleanup === "function",
        );
        return () => cleanups.forEach((cleanup) => cleanup());
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
