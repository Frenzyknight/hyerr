"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const TILT_SPRING = { stiffness: 170, damping: 20, mass: 0.6 } as const;

type PitchDeckCardProps = {
  href: string;
  /** File name suggested to the browser when downloading. */
  fileName?: string;
  meta?: string;
};

export default function PitchDeckCard({
  href,
  fileName = "Hyerr_Investor_Deck.pdf",
  meta = "PDF · 40 slides",
}: PitchDeckCardProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Pointer position within the card, normalised to 0–1 on each axis.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), TILT_SPRING);

  const contentX = useSpring(useTransform(px, [0, 1], [12, -12]), TILT_SPRING);
  const contentY = useSpring(useTransform(py, [0, 1], [8, -8]), TILT_SPRING);

  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(460px circle at ${glareX} ${glareY}, rgba(255,255,255,0.22), transparent 62%)`;

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function recentre() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="flex flex-col items-center">
      <div
        ref={frameRef}
        onPointerMove={handleMove}
        onPointerLeave={recentre}
        className="w-full max-w-4xl perspective-[1400px]"
      >
        <motion.div
          style={reduceMotion ? undefined : { rotateX, rotateY }}
          className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-grape shadow-[0_60px_120px_-50px_rgba(30,18,79,0.7)] sm:aspect-16/10"
        >
          {/* Depth wash */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(167,139,250,0.35),transparent_60%)]" />

          {/* Route motif, echoing the journey line on the home page */}
          <svg
            viewBox="0 0 400 260"
            className="absolute -bottom-6 -right-10 h-[78%] w-auto opacity-[0.16]"
            aria-hidden="true"
          >
            <path
              d="M20 12 L20 96 Q20 140 64 140 L216 140 Q260 140 260 184 L260 258"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="26"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Cover content */}
          <motion.div
            style={reduceMotion ? undefined : { x: contentX, y: contentY }}
            className="relative flex h-full w-full flex-col justify-between p-6 sm:p-12 md:p-16"
          >
            <div className="flex items-start justify-between gap-4 sm:gap-6">
              <Image
                src="/hyerr-logo-text-white.webp"
                alt="Hyerr"
                width={140}
                height={40}
                className="h-6 w-auto sm:h-7"
              />
              <span className="shrink-0 rounded-full border border-white/25 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white/70 sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.28em]">
                {meta}
              </span>
            </div>

            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div>
                <span className="font-display text-[10px] uppercase tracking-[0.36em] text-white/55 sm:text-xs">
                  Hyerr — 2026
                </span>
                <p className="mt-3 font-display font-normal text-[32px] leading-[1.02] text-white sm:mt-4 sm:text-[56px] md:text-[72px]">
                  Investor
                  <br />
                  <span className="italic">Deck</span>
                </p>
              </div>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/view inline-flex shrink-0 items-center gap-2 rounded-full bg-white py-1.5 pl-4 pr-1.5 text-sm text-ink transition-colors hover:bg-white/85 sm:gap-3 sm:py-2 sm:pl-6 sm:pr-2 sm:text-base"
              >
                View the deck
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover/view:-translate-y-0.5 group-hover/view:translate-x-0.5 sm:h-10 sm:w-10">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6M13.5 4.5V12" />
                  </svg>
                </span>
              </a>
            </div>
          </motion.div>

          {/* Cursor glare */}
          {!reduceMotion && (
            <motion.div
              style={{ backgroundImage: glare }}
              className="pointer-events-none absolute inset-0"
            />
          )}
        </motion.div>
      </div>

      {/* ---------- Actions ---------- */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href={href}
          download={fileName}
          className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3.5 text-base text-ink transition-colors hover:border-ink/45"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <polyline points="7 11 12 16 17 11" />
            <path d="M4 19h16" />
          </svg>
          Download PDF
        </a>
      </div>
    </div>
  );
}
