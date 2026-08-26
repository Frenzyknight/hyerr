"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

type Step = {
  index: string;
  label: string;
  body: string;
};

const steps: Step[] = [
  {
    index: "01",
    label: "Apply",
    body: "Fill in a short form — licence, a few documents, and how many hours you want on the road. It takes about five minutes and costs nothing.",
  },
  {
    index: "02",
    label: "Onboard",
    body: "We verify your paperwork, hand over the car, and set up your charging network access. You leave knowing the vehicle and the app inside out.",
  },
  {
    index: "03",
    label: "Drive",
    body: "Take trips in a fully electric cab. No petrol bill, no engine service, and no repair invoice that wipes out a week of earnings.",
  },
  {
    index: "04",
    label: "Earn",
    body: "Payouts land on a fixed schedule with the breakdown on screen. You see the fare, the commission, and exactly what reaches your account.",
  },
  {
    index: "05",
    label: "Own",
    body: "Part of every trip is set aside against the vehicle. Keep driving, and the cab you have been renting quietly becomes the cab you own.",
  },
];

// Reveals fire when a row crosses the middle of the viewport, which is also
// where the travelling marker sits — so the line, the ring and the copy all
// arrive together.
const CENTRE_LINE = { once: true, margin: "-45% 0px -45% 0px" } as const;

export default function DriverJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const travel = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });

  const markerTop = useTransform(travel, [0, 1], ["0%", "100%"]);
  const markerOpacity = useTransform(travel, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative">
      {/* Untravelled route */}
      <div className="absolute bottom-0 left-4 top-0 w-0.5 -translate-x-1/2 rounded-full bg-lilac/25 md:left-1/2" />

      {/* Travelled route — fills as you scroll */}
      <motion.div
        style={{ scaleY: travel }}
        className="absolute bottom-0 left-4 top-0 w-0.5 origin-top -translate-x-1/2 rounded-full bg-grape md:left-1/2"
      />

      {/* Marker riding the route */}
      <motion.div
        style={{ top: markerTop, opacity: markerOpacity }}
        className="absolute left-4 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2"
      >
        <span className="block h-5 w-5 rounded-full border-[5px] border-grape bg-white shadow-[0_0_0_6px_rgba(57,32,108,0.10)]" />
      </motion.div>

      <ol className="flex flex-col">
        {steps.map((step, i) => {
          const onRight = i % 2 === 1;

          return (
            <li
              key={step.index}
              className="relative grid pl-14 md:grid-cols-2 md:gap-x-24 md:pl-0"
            >
              {/* Stop ring on the route */}
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={CENTRE_LINE}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-grape bg-white md:left-1/2"
              />

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={CENTRE_LINE}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`py-8 md:py-16 ${
                  onRight ? "md:col-start-2" : "md:col-start-1 md:text-right"
                }`}
              >
                <div className="rounded-3xl bg-mist p-8 md:p-10">
                  <span className="font-display text-sm tracking-[0.2em] text-grape">
                    {step.index}
                  </span>
                  <h3 className="mt-3 font-display font-normal text-[32px] leading-[1.05] text-[#18181B] sm:text-[40px]">
                    {step.label}
                  </h3>
                  <p
                    className={`mt-4 text-base leading-relaxed text-[#52525B] sm:text-lg ${
                      onRight ? "" : "md:ml-auto"
                    } max-w-md`}
                  >
                    {step.body}
                  </p>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
