"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

// A single line of copy, broken into segments so individual phrases can be
// flagged for the brand-purple highlight while the rest reveals to white.
type Segment = { text: string; highlight?: boolean };
type Line = Segment[];

// The full paragraph block, expressed as lines of segments.
const lines: Line[] = [
  [
    { text: "HyerrFleet is an " },
    { text: "EV-first cab aggregator", highlight: true },
    { text: " for Ahmedabad and beyond. Every ride is " },
    { text: "cleaner", highlight: true },
    { text: ", every fare is " },
    { text: "fairer", highlight: true },
    { text: ", and every driver can " },
    { text: "own their vehicle", highlight: true },
    { text: "." },
  ],
  [
    { text: "Through our " },
    { text: "rent-to-own model", highlight: true },
    { text: ", drivers don’t just earn a living. They build one." },
  ],
  [
    { text: "It isn’t just a cab company. It’s a " },
    { text: "new way to move", highlight: true },
    { text: "." },
  ],
];

// Colours the words tween between as the scroll progress sweeps each word.
const DIM = "#544F6B";
const WHITE = "#F4F4F5";
const PURPLE = "#A78BFA";

// Flatten every word across all lines so each one can claim a slice of the
// overall scroll progress — earlier words light up first.
type FlatWord = { word: string; highlight: boolean; line: number; index: number };

function flattenWords(): FlatWord[] {
  const out: FlatWord[] = [];
  let index = 0;
  lines.forEach((line, lineIdx) => {
    line.forEach((seg) => {
      seg.text
        .split(/\s+/)
        .filter((w) => w.length > 0)
        .forEach((word) => {
          out.push({ word, highlight: !!seg.highlight, line: lineIdx, index });
          index += 1;
        });
    });
  });
  return out;
}

const words = flattenWords();
const totalWords = words.length;

function Word({
  word,
  highlight,
  index,
  progress,
}: {
  word: string;
  highlight: boolean;
  index: number;
  progress: MotionValue<number>;
}) {
  // Each word reveals over a window of scroll progress; the windows overlap a
  // little so the highlight sweeps as one continuous wave rather than ticking.
  const start = index / totalWords;
  const end = (index + 1.5) / totalWords;
  const color = useTransform(progress, [start, end], [DIM, highlight ? PURPLE : WHITE]);
  const opacity = useTransform(progress, [start, end], [0.35, 1]);

  return (
    <motion.span style={{ color, opacity }} className="transition-none">
      {word}{" "}
    </motion.span>
  );
}

export default function ScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Reveal as the paragraph travels up through the viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.55"],
  });

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-5xl">
      <p className="font-display font-normal text-[28px] leading-[1.32] tracking-tight sm:text-[40px] lg:text-[52px]">
        {words.map((w) => (
          <Word
            key={w.index}
            word={w.word}
            highlight={w.highlight}
            index={w.index}
            progress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
}
