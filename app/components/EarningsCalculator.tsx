"use client";

import { useEffect, useState } from "react";
import { useMotionValueEvent, useSpring } from "motion/react";

/*
  Illustrative unit economics for a cab working Ahmedabad routes. These are
  planning assumptions, not a quote — every figure shown to a driver is framed
  as an estimate in the copy below the widget.
*/
const GROSS_PER_HOUR = 320;

const PETROL_CAB = {
  commission: 0.25,
  energyPerHour: 95, // petrol at roughly 22 km/h average city speed
  upkeepPerHour: 18, // servicing, oil, wear
};

const HYERR_EV = {
  commission: 0.15,
  energyPerHour: 26, // charging at partner-station rates
  upkeepPerHour: 7, // no engine, far fewer moving parts
  ownershipPerHour: 35, // set aside against the vehicle
};

const WEEKS_PER_MONTH = 4.33;

const petrolNetPerHour =
  GROSS_PER_HOUR * (1 - PETROL_CAB.commission) -
  PETROL_CAB.energyPerHour -
  PETROL_CAB.upkeepPerHour;

const hyerrNetPerHour =
  GROSS_PER_HOUR * (1 - HYERR_EV.commission) -
  HYERR_EV.energyPerHour -
  HYERR_EV.upkeepPerHour -
  HYERR_EV.ownershipPerHour;

// Indian digit grouping, written out so server and client always agree.
function formatINR(value: number) {
  const digits = Math.round(value).toString();
  if (digits.length <= 3) return digits;
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3);
  return `${rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${last3}`;
}

function AnimatedRupees({ value, className }: { value: number; className?: string }) {
  const spring = useSpring(value, { stiffness: 130, damping: 26, restDelta: 1 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useMotionValueEvent(spring, "change", (latest) => setDisplay(latest));

  return (
    <span className={className}>
      <span className="opacity-60">₹</span>
      {formatINR(display)}
    </span>
  );
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  readout,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  readout: string;
  onChange: (next: number) => void;
}) {
  const filled = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-base text-[#52525B]">
          {label}
        </label>
        <span className="font-display text-[28px] leading-none text-grape">{readout}</span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          background: `linear-gradient(to right, var(--color-grape) ${filled}%, rgba(116,92,171,0.22) ${filled}%)`,
        }}
        className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-grape/40 focus-visible:ring-offset-4 focus-visible:ring-offset-mist [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-grape [&::-moz-range-track]:bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-grape [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(30,18,79,0.35)]"
      />

      <div className="mt-2 flex justify-between text-xs text-[#52525B]/70">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default function EarningsCalculator() {
  const [hoursPerDay, setHoursPerDay] = useState(9);
  const [daysPerWeek, setDaysPerWeek] = useState(6);

  const monthlyHours = hoursPerDay * daysPerWeek * WEEKS_PER_MONTH;
  const petrolMonthly = petrolNetPerHour * monthlyHours;
  const hyerrMonthly = hyerrNetPerHour * monthlyHours;
  const ownershipMonthly = HYERR_EV.ownershipPerHour * monthlyHours;

  return (
    <div className="rounded-3xl bg-mist p-8 md:p-12 lg:p-16">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* ---------- Inputs ---------- */}
        <div className="flex flex-col gap-12">
          <Slider
            id="hours-per-day"
            label="Hours on the road each day"
            value={hoursPerDay}
            min={6}
            max={14}
            readout={`${hoursPerDay} hrs`}
            onChange={setHoursPerDay}
          />

          <Slider
            id="days-per-week"
            label="Days you drive each week"
            value={daysPerWeek}
            min={4}
            max={7}
            readout={`${daysPerWeek} days`}
            onChange={setDaysPerWeek}
          />

          <p className="text-sm leading-relaxed text-[#52525B]">
            That works out to roughly{" "}
            <span className="text-grape">{Math.round(monthlyHours)} hours</span> a
            month behind the wheel.
          </p>
        </div>

        {/* ---------- Outputs ---------- */}
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-white/60 p-7 md:p-8">
              <span className="font-display text-xs uppercase tracking-[0.28em] text-[#52525B]">
                Petrol cab
              </span>
              <AnimatedRupees
                value={petrolMonthly}
                className="mt-10 font-display text-[38px] leading-none text-[#52525B] sm:text-[44px]"
              />
              <span className="mt-3 text-sm text-[#52525B]/80">
                Take-home per month
              </span>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-grape p-7 md:p-8">
              <span className="font-display text-xs uppercase tracking-[0.28em] text-white/70">
                Hyerr EV
              </span>
              <AnimatedRupees
                value={hyerrMonthly}
                className="mt-10 font-display text-[38px] leading-none text-white sm:text-[44px]"
              />
              <span className="mt-3 text-sm text-white/75">
                Take-home per month
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-grape/25 bg-white/60 p-7 md:p-8">
            <p className="font-display text-[26px] leading-tight text-ink sm:text-[32px]">
              <AnimatedRupees value={hyerrMonthly - petrolMonthly} className="text-grape" />{" "}
              more in hand each month
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#52525B]">
              And a further{" "}
              <AnimatedRupees value={ownershipMonthly} className="text-ink" /> set
              aside against the car, so the vehicle moves toward being yours while
              you drive it.
            </p>
          </div>

          <p className="text-xs leading-relaxed text-[#52525B]/80">
            Illustrative estimate based on typical Ahmedabad operating costs at
            roughly ₹{GROSS_PER_HOUR} gross fare per hour. Real earnings move with
            demand, route mix, charging rates and how much you drive.
          </p>
        </div>
      </div>
    </div>
  );
}
