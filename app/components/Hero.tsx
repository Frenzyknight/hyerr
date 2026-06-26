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

// Scroll-scrubbed image sequence (frames extracted from the POV drive footage).
const FRAME_COUNT = 237;
const framePath = (i: number) =>
  `/frame_${String(i).padStart(4, "0")}.webp`;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);
  const [navPinned, setNavPinned] = useState(false);

  // Once the intro curtain lifts, the hero's first-screen elements reveal in a
  // staggered sequence (footage settles in, then the scroll hint rises).
  const introComplete = useIntroComplete();

  // Progress through the tall scroll container: 0 at the top, 1 once the
  // sticky sequence has been "played" all the way through.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the raw scroll value so scrubbing the frames feels fluid.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
  });

  // The sequence finishes scrubbing a little before the end of the scroll, so
  // the headline can rise into view right as the footage settles.
  const VIDEO_END = 0.78;

  // Preload every frame and paint the first one onto the canvas.
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      images.push(img);
    }
    framesRef.current = images;

    const first = images[0];
    if (first.complete) {
      drawFrame(0);
    } else {
      first.onload = () => drawFrame(0);
    }

    // Repaint the current frame when the canvas is resized.
    const onResize = () => {
      const index = currentFrameRef.current;
      currentFrameRef.current = -1;
      drawFrame(index < 0 ? 0 : index);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Draw a frame onto the canvas, covering it like object-cover.
  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    if (index === currentFrameRef.current) return;
    currentFrameRef.current = index;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }

    const scale = Math.max((cw * dpr) / img.naturalWidth, (ch * dpr) / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const dx = (cw * dpr - dw) / 2;
    const dy = (ch * dpr - dh) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  // Drive the frame index from the scroll position.
  useMotionValueEvent(smoothProgress, "change", (p) => {
    const progress = Math.min(Math.max(p, 0), 1) / VIDEO_END;
    const index = Math.min(
      FRAME_COUNT - 1,
      Math.round(Math.min(progress, 1) * (FRAME_COUNT - 1))
    );
    drawFrame(index);
  });

  // The navbar starts sliding/fading in while the video is still playing, then
  // latches in place so it stays sticky at the top for the rest of the page.
  const navY = useTransform(scrollYProgress, [0.35, 0.6], ["-110%", "0%"]);
  const navOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p >= 0.6) setNavPinned(true);
  });

  // The "scroll to experience" hint fades the moment scrolling begins.
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // The hero headline rises from below the screen as the video settles and
  // stays in place — no fade, it's simply clipped while off-screen.
  const textY = useTransform(scrollYProgress, [0.62, 0.92], ["80vh", "0vh"]);

  return (
    <>
      <Navbar opacity={navOpacity} y={navY} pinned={navPinned} />

      <section ref={containerRef} className="relative h-[240vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={
              introComplete
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.08 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Gradient for legibility of the indicator and rising headline */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/50" />

          {/* Headline rising from below the screen */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
            <motion.h1
              style={{ y: textY }}
              className="font-display font-normal text-5xl text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            >
              Far feels <span className="italic">closer</span>
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
