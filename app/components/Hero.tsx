"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import Navbar from "./Navbar";
import { useIntroComplete } from "./IntroProvider";

export const HERO_VIDEO_SRC =
  "/Car_moving_through_traffic_1080p_202608132012_gwr_video_mvp.mp4";

// The first second of the footage is a static lead-in, so every loop restarts
// past it rather than at 0.
const LOOP_START = 1;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [navPinned, setNavPinned] = useState(false);

  // Once the intro curtain lifts, the hero's first-screen elements reveal in a
  // staggered sequence (footage settles in, then the scroll hint rises).
  const introComplete = useIntroComplete();

  // Seek past the lead-in on load and on every loop. `loop` is left off so the
  // `ended` event fires and we can restart from LOOP_START instead of 0.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const restart = () => {
      video.currentTime = LOOP_START;
      video.play().catch(() => {});
    };
    const onLoadedMetadata = () => {
      video.currentTime = LOOP_START;
    };

    if (video.readyState >= 1) onLoadedMetadata();
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", restart);
    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", restart);
    };
  }, []);

  // Progress through the tall scroll container: 0 at the top, 1 once the
  // headline has come together.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value so the words glide rather than snap.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
  });

  // The two halves of the headline fly in from opposite edges and meet in the
  // middle of the screen.
  const leftX = useTransform(smoothProgress, [0.05, 0.65], ["-100vw", "0vw"]);
  const rightX = useTransform(smoothProgress, [0.05, 0.65], ["100vw", "0vw"]);
  const wordsOpacity = useTransform(smoothProgress, [0.02, 0.15], [0, 1]);

  // The navbar starts sliding/fading in while the words are still travelling,
  // then latches in place so it stays sticky at the top for the rest of the page.
  const navY = useTransform(scrollYProgress, [0.35, 0.6], ["-110%", "0%"]);
  const navOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p >= 0.6) setNavPinned(true);
  });

  // The "scroll to experience" hint fades the moment scrolling begins.
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <>
      <Navbar opacity={navOpacity} y={navY} pinned={navPinned} />

      <section ref={containerRef} className="relative h-[240vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <motion.video
            ref={videoRef}
            src={HERO_VIDEO_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={
              introComplete
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.08 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Gradient for legibility of the indicator and headline */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/50" />

          {/* Headline halves converging on the centre */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
            <motion.h1
              style={{ opacity: wordsOpacity }}
              className="flex flex-wrap items-baseline justify-center gap-x-[0.25em] whitespace-nowrap font-display font-normal text-5xl text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            >
              <motion.span style={{ x: leftX }} className="inline-block">
                Far feels
              </motion.span>
              <motion.span style={{ x: rightX }} className="inline-block italic">
                closer
              </motion.span>
            </motion.h1>
          </div>

          {/* Scroll-to-experience indicator — rises in after the footage settles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
          >
          <motion.div
            style={{ opacity: indicatorOpacity }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/80">
              Scroll to experience
            </span>
            <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/60 p-1">
              <motion.span
                className="h-2 w-1 rounded-full bg-white/90"
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
