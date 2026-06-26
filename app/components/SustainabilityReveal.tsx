"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// The word is rendered twice in the exact same place: a purple layer that
// reads on the white background, and a white layer that sits on the forest
// inside a pill-shaped mask. As you scroll the pill grows from a small pill to
// fill the whole viewport, revealing the forest and turning the word white.
export default function SustainabilityReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // The pill starts hugging the centre of the word, then expands past the
  // viewport so the forest fills the screen.
  const pillWidth = useTransform(scrollYProgress, [0, 0.9], ["36vw", "180vw"]);
  const pillHeight = useTransform(scrollYProgress, [0, 0.9], ["34vh", "180vh"]);
  const pillRadius = useTransform(scrollYProgress, [0.65, 1], [9999, 0]);

  const wordClass =
    "select-none font-sans font-semibold tracking-tight text-[clamp(3rem,12vw,11rem)] leading-none";

  return (
    <section ref={containerRef} className="relative h-[160vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-white">
        {/* Section index marker */}
        <span className="absolute right-6 top-6 z-30 font-sans text-sm tracking-wide text-lilac sm:right-10 sm:top-10">
          02<span className="text-grape">/</span>
        </span>

        {/* Base layer — purple word on white */}
        <h2 className={`${wordClass} text-grape`}>Sustainability</h2>

        {/* Pill mask — grows to fill the screen */}
        <motion.div
          style={{
            width: pillWidth,
            height: pillHeight,
            borderRadius: pillRadius,
          }}
          className="absolute overflow-hidden"
        >
          {/* Viewport-sized inner: centred in the pill so it always lines up
              with the base word and the forest stays anchored to the screen. */}
          <div className="absolute left-1/2 top-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2">
            <img
              src="/forest.jpeg"
              alt="Aerial view of a dense green forest canopy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className={`${wordClass} text-white`}>Sustainability</h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
