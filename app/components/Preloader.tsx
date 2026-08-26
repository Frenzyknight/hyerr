"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { HERO_VIDEO_SRC } from "./Hero";

// The heavy hero asset is the looping POV footage — we wait for it (plus a few
// key landing images) so the page is fully painted before the curtain lifts.
const EXTRA_IMAGES = [
  "/Section 2 - Some journeys take.svg",
  "/hyerr-logo-text-white.webp",
];

// The video dwarfs the images in size, so it carries most of the progress bar.
const VIDEO_WEIGHT = 8;
const VIDEO_MAX_WAIT = 6000; // ms — never block the reveal longer than this

const MIN_DURATION = 2200; // ms — the counter never finishes faster than this
const LOGO_HOLD = 1000; // ms — the logo lingers before the curtain lifts

type Phase = "counting" | "logo";

export default function Preloader({ onReveal }: { onReveal: () => void }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("counting");
  const [active, setActive] = useState(true);
  const revealed = useRef(false);

  // Preload every asset and drive the counter from real load progress, while
  // enforcing a minimum on-screen duration so it always feels deliberate.
  useEffect(() => {
    const total = EXTRA_IMAGES.length + VIDEO_WEIGHT;
    let loaded = 0;

    EXTRA_IMAGES.forEach((src) => {
      const img = new window.Image();
      const done = () => {
        loaded += 1;
      };
      img.onload = done;
      img.onerror = done;
      img.src = src;
    });

    // `canplaythrough` isn't guaranteed to fire on every browser/connection, so
    // a hard cap makes sure the curtain always lifts.
    let videoSettled = false;
    const videoDone = () => {
      if (videoSettled) return;
      videoSettled = true;
      loaded += VIDEO_WEIGHT;
    };
    const videoCap = setTimeout(videoDone, VIDEO_MAX_WAIT);

    const video = document.createElement("video");
    video.addEventListener("canplaythrough", videoDone, { once: true });
    video.addEventListener("error", videoDone, { once: true });
    video.preload = "auto";
    video.muted = true;
    video.src = HERO_VIDEO_SRC;

    const start = performance.now();
    let displayed = 0;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const loadFrac = loaded / total;
      const timeFrac = Math.min(elapsed / MIN_DURATION, 1);
      const target = Math.min(loadFrac, timeFrac) * 100;

      // Ease the displayed value toward the target for a smooth count-up.
      displayed += (target - displayed) * 0.1;
      const shown = Math.min(100, Math.round(displayed));
      setCount(shown);

      if (shown >= 100 && loadFrac >= 1 && elapsed >= MIN_DURATION) {
        setCount(100);
        setPhase("logo");
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(videoCap);
    };
  }, []);

  // Hold on the logo, then reveal the page and lift the curtain together.
  useEffect(() => {
    if (phase !== "logo") return;
    const t = setTimeout(() => {
      if (!revealed.current) {
        revealed.current = true;
        onReveal();
      }
      setActive(false);
    }, LOGO_HOLD);
    return () => clearTimeout(t);
  }, [phase, onReveal]);

  // Lock scrolling (pinned to the top) only while the curtain is up. The
  // component stays mounted after revealing, so we release the lock when
  // `active` flips rather than relying on unmount cleanup.
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-grape"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <AnimatePresence mode="wait">
            {phase === "counting" ? (
              <motion.div
                key="count"
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span className="font-display text-[22vw] leading-none font-light tabular-nums text-white sm:text-[16vw] lg:text-[180px]">
                  {count}
                </span>
                <div className="mt-8 h-px w-48 overflow-hidden bg-white/20 sm:w-64">
                  <motion.div
                    className="h-full bg-white"
                    style={{ width: `${count}%` }}
                  />
                </div>
                <span className="mt-6 text-[11px] uppercase tracking-[0.4em] text-white/50">
                  Far feels closer
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="logo"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/hyerr-logo-text-white.webp"
                  alt="Hyerr"
                  width={280}
                  height={80}
                  priority
                  className="h-12 w-auto sm:h-16"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
