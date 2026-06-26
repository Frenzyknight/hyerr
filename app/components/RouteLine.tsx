"use client";

import { motion } from "motion/react";

// CENTERLINE: the path that runs down the middle of the route. It is rendered as
// a thick, round-capped stroke (recreating the original "Vector (1).svg" ribbon,
// with both ends rounded). The marker travels along this same path, and a
// coloured "progress" copy is revealed in sync to show how far it has gone.
const CENTERLINE =
  "M19.5 18.5L19.5 229.5Q19.5 278.5 68.5 278.5L237.3 278.5Q286.3 278.5 286.3 327.5L286.3 719";

// Stroke width matching the original ribbon thickness.
const LINE_WIDTH = 37.4;

// Shared timing so the line fill and the marker move together.
const TRAVEL = { duration: 3.2, ease: "easeInOut" } as const;

// End point of the centerline — the destination ring sits here.
const END = { x: 286.3, y: 719 };

// Both children are driven from a single parent trigger (below) so they always
// start at the same moment, regardless of each element's own bounding box.
const lineVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: TRAVEL },
};

const markerVariants = {
  hidden: { offsetDistance: "0%" },
  visible: { offsetDistance: "100%", transition: TRAVEL },
};

export default function RouteLine() {
  return (
    <div className="pointer-events-none absolute right-[12%] top-14 bottom-[-48px] z-10 hidden w-[200px] sm:w-[230px] md:block lg:w-[260px]">
      <motion.svg
        viewBox="0 0 305 719"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="h-full w-full overflow-visible"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Untraveled route (lilac — the bottom colour of the old gradient) */}
        <path
          d={CENTERLINE}
          fill="none"
          stroke="#745CAB"
          strokeWidth={LINE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Traveled route — revealed from the top as the marker advances
            (grape — the top colour of the old gradient) */}
        <motion.path
          d={CENTERLINE}
          fill="none"
          stroke="#39206C"
          strokeWidth={LINE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={lineVariants}
        />

        {/* Destination ring (hollow purple) the marker lands on */}
        <circle
          cx={END.x}
          cy={END.y}
          r={25}
          fill="none"
          stroke="#39206C"
          strokeWidth={19}
        />

        {/* Marker that travels the route and ends overlapping the ring above */}
        <motion.g
          style={{ offsetPath: `path('${CENTERLINE}')`, offsetRotate: "0deg" }}
          variants={markerVariants}
        >
          <circle
            r={24}
            fill="none"
            stroke="#F4F4F4"
            strokeWidth={18}
            opacity={0.85}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
