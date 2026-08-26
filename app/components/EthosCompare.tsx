"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Contrast = {
  index: string;
  theme: string;
  old: string;
  hyerr: string;
};

const contrasts: Contrast[] = [
  {
    index: "01",
    theme: "Ownership",
    old: "The driver rents forever. After ten years behind the wheel, the car still belongs to someone else.",
    hyerr:
      "A slice of every fare goes toward the vehicle. Keep driving and the cab stops being rented and starts being owned.",
  },
  {
    index: "02",
    theme: "Economics",
    old: "A quarter of the fare goes to commission. Petrol takes most of what's left.",
    hyerr:
      "Lower commission, and electricity costs a fraction of petrol. The savings land in the driver's account, not the fuel pump's.",
  },
  {
    index: "03",
    theme: "The fleet",
    old: "Petrol and diesel, running twelve hours a day through a city already struggling to breathe.",
    hyerr:
      "Fully electric, with no hybrid fallback. Zero tailpipe on every trip, in one of India's most polluted cities.",
  },
  {
    index: "04",
    theme: "The relationship",
    old: "Drivers are supply. A number in a dispatch queue, on their own when something breaks.",
    hyerr:
      "Drivers are partners. Charging access, servicing, and a payout schedule they can actually plan a month around.",
  },
];

const LAST = contrasts.length - 1;

// Each contrast owns an equal slice of the pinned scroll. Panels cross-fade
// within their slice so the two columns always argue about the same thing.
function windowFor(i: number) {
  const size = 1 / contrasts.length;
  return { start: i * size, end: (i + 1) * size };
}

function useStagePresence(progress: MotionValue<number>, i: number) {
  const { start, end } = windowFor(i);
  const fade = 0.06;
  const isLast = i === LAST;

  const opacity = useTransform(
    progress,
    isLast
      ? [start, start + fade]
      : [start, start + fade, end - fade, end],
    isLast ? [0, 1] : [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    isLast
      ? [start, start + fade]
      : [start, start + fade, end - fade, end],
    isLast ? [28, 0] : [28, 0, 0, -28],
  );

  return { opacity, y };
}

function OldStage({
  contrast,
  i,
  progress,
}: {
  contrast: Contrast;
  i: number;
  progress: MotionValue<number>;
}) {
  const { opacity, y } = useStagePresence(progress, i);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <span className="font-display text-xs uppercase tracking-[0.32em] text-white/35">
        {contrast.index} — {contrast.theme}
      </span>
      <p className="mt-6 font-display font-normal text-[22px] leading-tight text-white/45 lg:text-[28px] xl:text-[32px]">
        {contrast.old}
      </p>
    </motion.div>
  );
}

function HyerrStage({
  contrast,
  i,
  progress,
}: {
  contrast: Contrast;
  i: number;
  progress: MotionValue<number>;
}) {
  const { opacity, y } = useStagePresence(progress, i);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <span className="font-display text-xs uppercase tracking-[0.32em] text-white/60">
        {contrast.index} — {contrast.theme}
      </span>
      <p className="mt-6 font-display font-normal text-[30px] leading-[1.14] text-white lg:text-[42px] xl:text-[52px]">
        {contrast.hyerr}
      </p>
    </motion.div>
  );
}

function ProgressDot({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const { start, end } = windowFor(i);
  const active = useTransform(progress, [start, start + 0.04], [0.25, 1]);
  const height = useTransform(progress, [start, start + 0.04, end], [8, 26, 26]);

  return (
    <motion.span
      style={{ opacity: active, height }}
      className="block w-0.75 rounded-full bg-white"
    />
  );
}

export default function EthosCompare() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
    The old way is squeezed as the argument builds. Panel content is given a
    fixed width that fits the *narrowest* state each panel reaches, so the
    columns never clip their own text and the copy never reflows mid-scroll.
  */
  const oldWidth = useTransform(scrollYProgress, [0, 1], ["50%", "34%"]);
  const hyerrWidth = useTransform(scrollYProgress, [0, 1], ["50%", "66%"]);
  const oldShift = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const oldDim = useTransform(scrollYProgress, [0.7, 1], [1, 0.4]);

  return (
    <>
      {/* ---------- Pinned split (desktop) ---------- */}
      <section ref={containerRef} className="relative hidden h-[420vh] w-full md:block">
        <div className="sticky top-0 flex h-screen w-full overflow-hidden">
          {/* The old way */}
          <motion.div
            style={{ width: oldWidth }}
            className="relative h-full shrink-0 overflow-hidden bg-[#0F0A24]"
          >
            <span className="absolute left-8 top-10 z-10 font-display text-xs uppercase tracking-[0.36em] text-white/30 lg:left-14">
              The old way
            </span>

            <motion.div
              style={{ x: oldShift, opacity: oldDim }}
              className="absolute inset-y-0 left-8 w-[26vw] lg:left-14"
            >
              {contrasts.map((contrast, i) => (
                <OldStage
                  key={contrast.index}
                  contrast={contrast}
                  i={i}
                  progress={scrollYProgress}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* The Hyerr way */}
          <motion.div
            style={{ width: hyerrWidth }}
            className="relative h-full shrink-0 overflow-hidden bg-grape"
          >
            <span className="absolute left-10 top-10 z-10 font-display text-xs uppercase tracking-[0.36em] text-white/70 lg:left-16">
              The Hyerr way
            </span>

            <div className="absolute inset-y-0 left-10 w-[42vw] pr-16 lg:left-16">
              {contrasts.map((contrast, i) => (
                <HyerrStage
                  key={contrast.index}
                  contrast={contrast}
                  i={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>

            {/* Progress rail */}
            <div className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2 lg:right-12">
              {contrasts.map((contrast, i) => (
                <ProgressDot key={contrast.index} i={i} progress={scrollYProgress} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Stacked cards (mobile) ---------- */}
      <section className="w-full bg-[#0F0A24] px-4 py-20 md:hidden">
        <div className="flex flex-col gap-5">
          {contrasts.map((contrast) => (
            <motion.article
              key={contrast.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-3xl"
            >
              <div className="border-b border-white/10 bg-white/4 px-6 py-7">
                <span className="font-display text-[11px] uppercase tracking-[0.3em] text-white/30">
                  The old way — {contrast.theme}
                </span>
                <p className="mt-3 font-display text-lg leading-snug text-white/45">
                  {contrast.old}
                </p>
              </div>
              <div className="bg-grape px-6 py-7">
                <span className="font-display text-[11px] uppercase tracking-[0.3em] text-white/60">
                  The Hyerr way
                </span>
                <p className="mt-3 font-display text-[22px] leading-snug text-white">
                  {contrast.hyerr}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
