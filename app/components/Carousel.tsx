"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import RotatingText, { type RotatingTextRef } from "./RotatingText";

type Slide = {
  title: string;
  emphasis: string;
  caption: string;
  image: string;
  alt: string;
};

const defaultSlides: Slide[] = [
  {
    title: "Arrive",
    emphasis: "Composed",
    caption: "For the meeting you've been preparing for.",
    image: "/create_this_exact_image_for_202606192008.webp",
    alt: "Passenger taking a call in the back of a car",
  },
  {
    title: "Arrive",
    emphasis: "Present",
    caption: "For the people who deserve your full attention.",
    image: "/create_this_exact_image_for_202606192008 (1).webp",
    alt: "Man stepping out of a car in the city",
  },
  {
    title: "Arrive",
    emphasis: "Relaxed",
    caption: "After a long day",
    image: "/create_this_exact_image_for_202606192008 (2).webp",
    alt: "Smiling passenger looking out of a car window",
  },
  {
    title: "Arrive",
    emphasis: "Ready",
    caption: "For whatever comes next",
    image: "/driver-family.webp",
    alt: "Family enjoying a ride together",
  },
];

type CarouselProps = {
  slides?: Slide[];
  /** Animate the static title line when it differs between slides. */
  animateTitle?: boolean;
};

export default function Carousel({
  slides = defaultSlides,
  animateTitle = false,
}: CarouselProps) {
  const [active, setActive] = useState(0);
  const rotatingRef = useRef<RotatingTextRef>(null);

  const slide = slides[active];

  return (
    <div className="mx-auto grid w-full max-w-360 items-start gap-10 px-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.25fr)] md:items-stretch md:gap-12 lg:px-6">
      <div className="order-2 flex h-full flex-col justify-between md:order-1">
        <div>
          <h2 className="font-display font-normal text-[56px] leading-[1.05] text-[#18181B]">
            {animateTitle ? (
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  className="inline-block"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={{ clipPath: "inset(0 100% 0 0)" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {slide.title}
                </motion.span>
              </AnimatePresence>
            ) : (
              slide.title
            )}
            <br />
            <RotatingText
              ref={rotatingRef}
              texts={slides.map((s) => s.emphasis)}
              auto
              loop
              rotationInterval={5000}
              onNext={(i) => setActive(i)}
              staggerFrom="last"
              staggerDuration={0.025}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              mainClassName="inline-flex italic text-grape leading-[1.05]"
              splitLevelClassName="overflow-hidden pb-3 pr-2"
            />
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              className="mt-6 max-w-md text-[32px] leading-snug text-[#18181B]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              exit={{ clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {slide.caption}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-2.5 md:mt-0">
          {slides.map((s, i) => (
            <button
              key={s.emphasis}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => rotatingRef.current?.jumpTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-lilac" : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="order-1 md:order-2">
        <div className="relative aspect-4/3 w-full min-h-[280px] overflow-hidden rounded-3xl bg-fog shadow-[0_30px_60px_-30px_rgba(30,18,79,0.35)] sm:min-h-[340px] md:aspect-5/4 md:min-h-[400px] lg:min-h-[480px]">
          {slides.map((s, i) => (
            <img
              key={s.emphasis}
              src={s.image}
              alt={s.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
