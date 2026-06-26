import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import ScrollReveal from "../components/ScrollReveal";
import FeatureAccordion from "../components/FeatureAccordion";
import Founders from "../components/Founders";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About | HyerrFleet",
  description:
    "India's cab industry runs on petrol. We're changing that with a journey-first, EV-powered mobility system.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <Navbar variant="solid" />

      <div className="mx-auto flex w-full max-w-360 flex-col px-4 py-16 md:py-24 lg:px-6">
        {/* ---------- Heading + description ---------- */}
        <div className="grid items-start gap-x-10 gap-y-8 md:grid-cols-[1fr_1.9fr]">
          <h1 className="font-display font-normal text-[40px] leading-[1.05] text-[#18181B] sm:text-[48px] lg:text-[56px]">
            About
            <br />
            <span className="italic text-grape">HyerrFleet</span>
          </h1>

          <p className="max-w-3xl text-[22px] leading-snug text-[#18181B] sm:text-[26px] lg:text-[32px]">
            India&apos;s cab industry runs on petrol. Drivers pay high fuel
            costs, earn thin margins, and never own the vehicle they drive.
            Riders pay more than they should. And the environment pays the
            heaviest price of all.
            <br />
            <br />
            We&apos;re changing that.
          </p>
        </div>

        {/* ---------- Talk to Us ---------- */}
        <div className="mt-12 md:mt-16">
          <button
            type="button"
            className="group inline-flex items-center gap-4 rounded-2xl border border-grape px-9 py-5 text-xl text-grape transition-colors hover:bg-grape/5 sm:text-2xl"
          >
            Talk to Us
            <svg
              width="22"
              height="22"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <path
                d="M4.5 13.5L13.5 4.5M13.5 4.5H6M13.5 4.5V12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/*
          ---------- Split image ----------
          A single image (about-us-hero.webp) rendered as two windows onto the
          same picture. Each window holds an <img> sized to the full row and
          anchored to the row's edges, so both reveal the same scaled image with
          a thin gap between them — one continuous photo split into two boxes.
        */}
        <div className="relative mt-12 h-[360px] w-full sm:h-[480px] lg:h-[600px]">
          {/* Left box — shorter, bottom-aligned, shows the left portion */}
          <div className="absolute bottom-0 left-0 h-[62%] w-[31%] overflow-hidden rounded-3xl">
            <img
              src="/about-us-hero.webp"
              alt="The HyerrFleet team collaborating"
              className="absolute bottom-0 left-0 h-[161.29%] w-[322.58%] max-w-none object-cover"
            />
          </div>

          {/* Right box — full height, shows the right portion */}
          <div className="absolute bottom-0 right-0 h-full w-[65%] overflow-hidden rounded-3xl">
            <img
              src="/about-us-hero.webp"
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-full w-[153.85%] max-w-none object-cover"
            />
          </div>
        </div>
      </div>

      {/* ---------- Manifesto (scroll-revealed copy) ---------- */}
      <section className="w-full bg-[#0F0A24]">
        <div className="mx-auto flex w-full max-w-360 flex-col px-4 py-28 md:py-40 lg:px-6">
          <ScrollReveal />
        </div>
      </section>

      {/* ---------- How it works (image accordion) ---------- */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-360 flex-col gap-10 px-4 py-24 md:py-32 lg:px-6">
          <div>
            <h2 className="font-display font-normal text-[40px] leading-[1.05] text-[#18181B] sm:text-[52px]">
              A new model
              <br />
              <span className="italic text-grape">for mobility</span>
            </h2>
            <p className="mt-6 max-w-xl text-[32px] leading-relaxed text-[#52525B]">
              Four ideas working together: cleaner rides, fairer fares, and a
              real path to ownership for every driver.
            </p>
          </div>
          <FeatureAccordion />
        </div>
      </section>

      {/* ---------- Meet the Founders ---------- */}
      <Founders />

      {/* ---------- Footer ---------- */}
      <Footer />
    </main>
  );
}
