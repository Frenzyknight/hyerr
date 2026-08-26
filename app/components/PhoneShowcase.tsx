"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

type Feature = {
  index: string;
  kicker: string;
  title: string;
  body: string;
};

const features: Feature[] = [
  {
    index: "01",
    kicker: "Dispatch",
    title: "Matching that knows the battery",
    body: "Before a trip is offered, we check state of charge against route length, traffic and the nearest available charger. A driver is never sent on a job the car cannot finish, which is the failure mode that puts most people off electric fleets.",
  },
  {
    index: "02",
    kicker: "Pricing",
    title: "A fare you can read",
    body: "Base, distance, time and platform fee are itemised on screen before the ride is confirmed — and the driver's share is shown alongside. Nobody has to reverse-engineer what happened to their money.",
  },
  {
    index: "03",
    kicker: "Charging",
    title: "Charging planned into the shift",
    body: "The app watches demand through the day and suggests top-ups in the quiet hours. Charging stops being lost income and becomes the part of the shift that was never earning much anyway.",
  },
  {
    index: "04",
    kicker: "Impact",
    title: "An emissions ledger, per trip",
    body: "Each completed ride logs the CO₂ it avoided against a petrol equivalent. Those entries roll straight into the annual sustainability report rather than being estimated after the fact.",
  },
];

/* ---------------- Phone chrome ---------------- */

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-140 w-68 shrink-0 rounded-[42px] bg-ink p-2.5 shadow-[0_40px_80px_-40px_rgba(30,18,79,0.6)]">
      <div className="relative h-full w-full overflow-hidden rounded-[33px] bg-[#FBFAFD]">
        <span className="absolute left-1/2 top-2.5 z-20 h-6 w-21.5 -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}

function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "text-ink" : "text-white";
  return (
    <div className={`flex items-center justify-between px-6 pt-3.5 text-[11px] ${color}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1" aria-hidden="true">
        <span className="h-2.5 w-0.5 rounded-full bg-current opacity-40" />
        <span className="h-2.5 w-0.5 rounded-full bg-current opacity-60" />
        <span className="h-2.5 w-0.5 rounded-full bg-current opacity-80" />
        <span className="ml-1.5 h-2.5 w-5 rounded-[3px] border border-current opacity-70" />
      </span>
    </div>
  );
}

/* ---------------- Screens ---------------- */

function DispatchScreen() {
  return (
    <div className="flex h-full flex-col bg-grape">
      <StatusBar tone="light" />

      <div className="relative mt-4 flex-1 overflow-hidden">
        {/* Route sketch */}
        <svg viewBox="0 0 260 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <g stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="1">
            <path d="M0 70 H260 M0 150 H260 M0 230 H260 M70 0 V300 M170 0 V300" />
          </g>
          <path
            d="M52 248 C52 190, 120 190, 120 140 S196 92, 196 58"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.85"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1 8"
          />
          <circle cx="52" cy="248" r="7" fill="#FFFFFF" />
          <circle cx="196" cy="58" r="9" fill="none" stroke="#FFFFFF" strokeWidth="4" />
        </svg>

        <span className="absolute left-5 top-4 rounded-full bg-white/15 px-3 py-1.5 text-[11px] text-white backdrop-blur-sm">
          Battery 68%
        </span>
      </div>

      <div className="m-3 rounded-3xl bg-white p-5">
        <span className="font-display text-[11px] uppercase tracking-[0.22em] text-lilac">
          Trip assigned
        </span>
        <p className="mt-2 font-display text-[22px] leading-tight text-ink">
          Navrangpura → SG Highway
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 text-[12px]">
          <span className="text-[#52525B]">Ends with 21% to spare</span>
          <span className="text-grape">8.4 km</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[12px]">
          <span className="text-[#52525B]">Nearest charger</span>
          <span className="text-grape">1.2 km</span>
        </div>
      </div>
    </div>
  );
}

function FareScreen() {
  const rows = [
    { label: "Base fare", value: "₹60" },
    { label: "Distance · 8.4 km", value: "₹126" },
    { label: "Time · 22 min", value: "₹44" },
    { label: "Platform fee", value: "₹35" },
  ];

  return (
    <div className="flex h-full flex-col">
      <StatusBar />

      <div className="px-6 pt-10">
        <span className="font-display text-[11px] uppercase tracking-[0.22em] text-lilac">
          Before you confirm
        </span>
        <p className="mt-2 font-display text-[26px] leading-tight text-ink">
          Fare breakdown
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-3.5 px-6">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between text-[13px]">
            <span className="text-[#52525B]">{row.label}</span>
            <span className="text-ink">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="mx-6 mt-6 flex items-baseline justify-between border-t border-ink/10 pt-4">
        <span className="text-[13px] text-ink">Total</span>
        <span className="font-display text-[28px] leading-none text-grape">₹265</span>
      </div>

      <div className="mx-3 mt-auto mb-3 rounded-3xl bg-mist p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-[12px] text-[#52525B]">Driver receives</span>
          <span className="font-display text-[22px] text-grape">₹230</span>
        </div>
        <div className="mt-4 h-9 rounded-full bg-grape text-center text-[13px] leading-9 text-white">
          Confirm ride
        </div>
      </div>
    </div>
  );
}

function ChargingScreen() {
  // Relative demand through a driving day; the two dips are the charge windows.
  const demand = [38, 52, 74, 88, 62, 30, 26, 44, 70, 92, 78, 50];
  const chargeWindows = [5, 6];

  return (
    <div className="flex h-full flex-col">
      <StatusBar />

      <div className="px-6 pt-10">
        <span className="font-display text-[11px] uppercase tracking-[0.22em] text-lilac">
          Today
        </span>
        <p className="mt-2 font-display text-[26px] leading-tight text-ink">
          Charge when it&apos;s quiet
        </p>
      </div>

      <div className="mt-8 flex h-32 items-end gap-1.5 px-6">
        {demand.map((height, i) => (
          <span
            key={i}
            style={{ height: `${height}%` }}
            className={`flex-1 rounded-full ${
              chargeWindows.includes(i) ? "bg-grape" : "bg-lilac/25"
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex justify-between px-6 text-[10px] text-[#52525B]/70">
        <span>6 AM</span>
        <span>2 PM</span>
        <span>10 PM</span>
      </div>

      <div className="mx-3 mt-auto mb-3 rounded-3xl bg-mist p-5">
        <span className="font-display text-[11px] uppercase tracking-[0.22em] text-lilac">
          Suggested top-up
        </span>
        <p className="mt-2 font-display text-[20px] leading-tight text-ink">
          2:10 – 2:45 PM
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-[#52525B]">
          Lowest demand of the day. 35 minutes takes you to 80%.
        </p>
      </div>
    </div>
  );
}

function ImpactScreen() {
  const months = [
    { label: "M", value: 46 },
    { label: "J", value: 58 },
    { label: "J", value: 54 },
    { label: "A", value: 72 },
    { label: "S", value: 81 },
    { label: "O", value: 96 },
  ];

  return (
    <div className="flex h-full flex-col">
      <StatusBar />

      <div className="px-6 pt-10">
        <span className="font-display text-[11px] uppercase tracking-[0.22em] text-lilac">
          This month
        </span>
        <p className="mt-3 font-display text-[46px] leading-none text-grape">412 kg</p>
        <p className="mt-2 text-[13px] text-[#52525B]">CO₂ avoided vs a petrol cab</p>
      </div>

      <div className="mt-8 flex h-28 items-end gap-2.5 px-6">
        {months.map((month, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <span
              style={{ height: `${month.value}%` }}
              className={`w-full rounded-t-md ${
                i === months.length - 1 ? "bg-grape" : "bg-lilac/30"
              }`}
            />
            <span className="text-[10px] text-[#52525B]/70">{month.label}</span>
          </div>
        ))}
      </div>

      <div className="mx-3 mt-auto mb-3 rounded-3xl bg-mist p-5">
        <div className="flex items-baseline justify-between text-[12px]">
          <span className="text-[#52525B]">Trips logged</span>
          <span className="text-ink">1,284</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between text-[12px]">
          <span className="text-[#52525B]">Feeds into</span>
          <span className="text-grape">Annual impact report</span>
        </div>
      </div>
    </div>
  );
}

const screens = [DispatchScreen, FareScreen, ChargingScreen, ImpactScreen];

function Screen({ index }: { index: number }) {
  const Active = screens[index];
  return <Active />;
}

/* ---------------- Showcase ---------------- */

export default function PhoneShowcase() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* ---------- Sticky phone + scrolling copy (desktop) ---------- */}
      <div className="mx-auto hidden w-full max-w-360 px-4 lg:grid lg:grid-cols-2 lg:gap-20 lg:px-6">
        <div className="sticky top-0 flex h-screen items-center justify-center self-start">
          <PhoneFrame>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full"
              >
                <Screen index={active} />
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>
        </div>

        <div>
          {features.map((feature, i) => (
            <motion.div
              key={feature.index}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-50% 0px -50% 0px" }}
              className="flex min-h-screen flex-col justify-center"
            >
              <span className="font-display text-xs uppercase tracking-[0.32em] text-lilac">
                {feature.index} — {feature.kicker}
              </span>
              <h3 className="mt-6 font-display font-normal text-[40px] leading-[1.05] text-[#18181B] xl:text-[52px]">
                {feature.title}
              </h3>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#52525B] xl:text-xl">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------- Swipeable screens (mobile) ---------- */}
      <div className="lg:hidden">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-8">
          {features.map((feature, i) => (
            <div key={feature.index} className="w-68 shrink-0 snap-center">
              <PhoneFrame>
                <Screen index={i} />
              </PhoneFrame>

              <span className="mt-7 block font-display text-xs uppercase tracking-[0.3em] text-lilac">
                {feature.index} — {feature.kicker}
              </span>
              <h3 className="mt-3 font-display font-normal text-[26px] leading-tight text-[#18181B]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#52525B]">
                {feature.body}
              </p>
            </div>
          ))}
        </div>

        <p className="px-4 font-display text-xs uppercase tracking-[0.3em] text-lilac">
          Swipe to explore
        </p>
      </div>
    </>
  );
}
