"use client";

import { useState } from "react";

type Feature = {
  number: string;
  title: string;
  label: string;
  body: string;
  image: string;
  alt: string;
};

const features: Feature[] = [
  {
    number: "01",
    title: "EV-First, Cost-Efficient Fleet",
    label: "EV-First Fleet",
    body: "An all-electric fleet because the math simply works better. A fraction of the fuel cost of petrol cabs, far lower maintenance, and zero tailpipe emissions. Lower running costs mean higher driver take-home pay and fairer fares for riders.",
    image: "/ev-first.webp",
    alt: "A modern electric vehicle in a green, sustainable setting",
  },
  {
    number: "02",
    title: "Rent-to-Own for Drivers",
    label: "Rent-to-Own",
    body: "Every driver has a path to owning their vehicle. A portion of trip earnings is set aside toward ownership, so drivers move from operator to owner over time. The cab becomes an income-generating asset, not a debt trap.",
    image: "/rent-to-own.webp",
    alt: "A smiling HyerrFleet driver behind the wheel",
  },
  {
    number: "03",
    title: "Reliable Charging, Zero Downtime",
    label: "Reliable Charging",
    body: "Charging partnerships are built into the core of the model. Drivers get priority access and subsidised rates across a growing network, so they always know where and when to charge. No range anxiety, no lost earning hours.",
    image: "/charging-infra.webp",
    alt: "A row of EV charging stations at sunset",
  },
  {
    number: "04",
    title: "Built for Sustainability",
    label: "Sustainability",
    body: "Every ride avoids real carbon. An estimated 3 to 4 tonnes of CO₂ per vehicle each year versus a petrol equivalent. As we scale toward thousands of vehicles, that impact compounds across the city’s air and noise.",
    image: "/sustainability.webp",
    alt: "An electric car surrounded by greenery, symbolising sustainability",
  },
];

export default function FeatureAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex h-[460px] w-full flex-col gap-3 sm:h-[540px] md:flex-row">
      {features.map((feature, i) => {
        const isOpen = i === open;
        return (
          <button
            key={feature.number}
            type="button"
            onClick={() => setOpen(i)}
            aria-expanded={isOpen}
            className={`group relative overflow-hidden rounded-3xl text-left transition-all duration-500 ease-out ${
              isOpen ? "flex-5" : "flex-1"
            }`}
          >
            <img
              src={feature.image}
              alt={feature.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                isOpen ? "scale-100" : "scale-105 brightness-[0.55]"
              }`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

            {/* Number — always visible, top-left */}
            <span className="absolute left-5 top-5 font-display text-3xl text-white/90 sm:left-7 sm:top-7 sm:text-4xl">
              {feature.number}.
            </span>

            {/* Collapsed label — hidden once the panel opens */}
            <span
              className={`absolute bottom-6 left-5 right-3 font-display text-lg leading-tight text-white transition-opacity duration-300 sm:left-7 sm:text-xl ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              {feature.label}
            </span>

            {/* Expanded content — fades in with the panel */}
            <div
              className={`absolute inset-x-5 bottom-6 transition-all duration-500 ease-out sm:inset-x-9 sm:bottom-9 ${
                isOpen
                  ? "translate-y-0 opacity-100 delay-150"
                  : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              <h3 className="font-display text-3xl font-normal tracking-tight text-white sm:text-[36px]">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                {feature.body}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
