"use client";

import { useState } from "react";

type Item = {
  title: string;
  body: string;
};

const items: Item[] = [
  {
    title: "A Drive, Not Just A Ride",
    body: "Hyerr is a journey-first, EV-powered mobility system designed for how drives should feel, for the people and the world they move through.",
  },
  {
    title: "Better For Everyone Involved",
    body: "Drivers, riders, and cities thrive when the system is designed around shared value, not trade-offs.",
  },
  {
    title: "Designed Calm",
    body: "Predictability, comfort, and thoughtful environments reduce the friction that often comes with urban movement.",
  },
  {
    title: "Electric By Design",
    body: "Quieter cabins. Smoother movement. Lower environmental impact. EVs create a fundamentally better journey for riders, drivers, and cities.",
  },
  {
    title: "The Car, Reimagined",
    body: "A cab is more than transportation. It's a space to think, connect, pause, or simply enjoy the ride.",
  },
];

export default function Accordion() {
  const [open, setOpen] = useState(items.length - 1);

  return (
    <div className="flex w-full flex-col">
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div
            key={item.title}
            className={`border border-lilac/45 bg-white ${
              i === items.length - 1 ? "rounded-3xl" : "rounded-t-3xl rounded-b-none"
            } ${i === 0 ? "" : "-mt-7"}`}
            style={{ zIndex: i }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-expanded={isOpen}
              className={`flex w-full items-center px-6 pt-7 text-left sm:px-8 sm:pt-8 ${
                isOpen || i === items.length - 1 ? "pb-7 sm:pb-8" : "pb-14 sm:pb-15"
              }`}
            >
              <span className="text-xl font-semibold tracking-tight text-[#18181B] sm:text-2xl md:text-[28px]">
                {item.title}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-6 text-base leading-relaxed text-[#52525B] sm:px-8 sm:text-xl md:text-2xl ${
                    i === items.length - 1 ? "pb-8 sm:pb-9" : "pb-13 sm:pb-14"
                  }`}
                >
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
