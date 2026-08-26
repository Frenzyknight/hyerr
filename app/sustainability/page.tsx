import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SustainabilityReveal from "../components/SustainabilityReveal";
import Carousel from "../components/Carousel";
import CtaCard from "../components/CtaCard";

const sustainabilitySlides = [
  {
    title: "Always",
    emphasis: "Electric",
    caption: "100% EV fleet — maintained forever, no hybrid fallback.",
    image: "/fleet.webp",
    alt: "A row of electric cabs charging at a depot",
  },
  {
    title: "Measured &",
    emphasis: "Reported",
    caption:
      "Annual sustainability impact report — published once we hit operational scale.",
    image: "/report.webp",
    alt: "Team reviewing a printed sustainability report",
  },
  {
    title: "Powered by",
    emphasis: "Sunlight",
    caption: "Solar-assisted charging exploration at partner stations.",
    image: "/solar-charging.webp",
    alt: "EVs charging beneath a solar-panel canopy",
  },
  {
    title: "Offset &",
    emphasis: "Credited",
    caption: "Carbon credit programme — as the fleet qualifies.",
    image: "/carbon-credit.webp",
    alt: "A hand exchanging money for a seedling in a pot",
  },
  {
    title: "Cleaner",
    emphasis: "Air",
    caption:
      "Ahmedabad is one of India's most polluted cities. High-utilisation EV cabs on busy routes create outsized impact.",
    image: "/pollution.webp",
    alt: "Dense traffic on a busy Ahmedabad road",
  },
];

export const metadata: Metadata = {
  title: "Sustainability | Hyerr",
  description:
    "Hyerr exists to make clean mobility accessible, measurable, and community-powered. Sustainability only works if everyone can take part.",
};

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <Navbar variant="solid" />

      {/* ---------- Intro: heading + description ---------- */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-360 px-4 pt-16 md:pt-24 lg:px-6">
          <div className="md:ml-auto md:max-w-3xl md:text-right">
            <h1 className="font-display font-normal text-[40px] leading-[1.05] text-[#18181B] sm:text-[52px] lg:text-[64px]">
              Sustainable
              <br />
              <span className="italic text-grape">by design</span>
            </h1>
            <p className="ml-auto mt-6 max-w-2xl text-[22px] leading-snug text-[#18181B] sm:text-[26px] lg:text-[32px]">
              Hyerr exists to make clean mobility accessible, measurable, and
              community-powered. Because sustainability only works if everyone
              can take part.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Diagonal image composition ---------- */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-360 px-4 py-14 md:py-24 lg:px-6">
          {/* Mobile: simple stack. Desktop: offset diagonal layout. */}
          <div className="flex flex-col gap-10 lg:relative lg:block lg:h-[680px]">
            {/* Left image + quote */}
            <figure className="lg:absolute lg:left-0 lg:top-0 lg:w-[42%]">
              <div className="aspect-4/3 w-full overflow-hidden rounded-3xl bg-mist">
                <img
                  src="/woman-over-car.webp"
                  alt="A traveller resting on the roof of a car beneath wind turbines"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-6 max-w-md">
                <p className="font-display text-xl italic leading-snug text-[#18181B] sm:text-2xl">
                  “We believe clean energy isn&apos;t just technology — it&apos;s
                  a movement toward a better world.”
                </p>
                <p className="mt-3 text-sm text-[#52525B] sm:text-base">
                  Ayush Gupta — Founder &amp; CEO, Hyerr
                </p>
              </figcaption>
            </figure>

            {/* Right image — offset lower to create the diagonal */}
            <figure className="lg:absolute lg:right-0 lg:top-[160px] lg:w-[50%]">
              <div className="aspect-4/3 w-full overflow-hidden rounded-3xl bg-mist">
                <img
                  src="/solar-panel.webp"
                  alt="Rows of solar panels in green farmland at golden hour"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- Scroll-reveal: pill expands to fill the screen ---------- */}
      <SustainabilityReveal />

      {/* ---------- Zero Tailpipe — impact bento grid ---------- */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto w-full max-w-360 px-4 lg:px-6">
          {/* Heading + description */}
          <div className="max-w-3xl">
            <h2 className="font-display font-normal text-[40px] leading-[1.05] text-[#18181B] sm:text-[52px] lg:text-[64px]">
              Zero Tailpipe.
              <br />
              <span className="italic text-grape">Always.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[18px] leading-snug text-[#18181B] sm:mt-6 sm:text-[24px] lg:text-[28px]">
              100% EV fleet. No petrol. No diesel. No exceptions. One EV cab
              running daily eliminates approximately 3–4 tonnes of CO₂ per year
              compared to a petrol cab.
            </p>
          </div>

          {/* Bento cards — three equal squares */}
          <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3">
            {/* Highlight card — purple with white accents */}
            <div className="relative flex aspect-square flex-col rounded-3xl bg-grape p-8 md:p-10">
              <p className="font-display text-[44px] leading-[1.05] text-white sm:text-[56px]">
                ~350T
              </p>
              <p className="mt-4 max-w-56 text-sm leading-relaxed text-white/80 sm:text-base">
                CO₂ saved at 100 EVs / yr
              </p>
              <span className="absolute bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-white text-grape md:bottom-10 md:right-10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>

            {/* Supporting card */}
            <div className="flex aspect-square flex-col justify-end rounded-3xl bg-mist p-8 md:p-10">
              <p className="font-display text-[44px] leading-[1.05] text-grape sm:text-[56px]">
                ~1,750T
              </p>
              <p className="mt-4 max-w-56 text-sm leading-relaxed text-[#52525B] sm:text-base">
                CO₂ saved at 500 EVs / yr
              </p>
            </div>

            {/* Supporting card */}
            <div className="flex aspect-square flex-col justify-end rounded-3xl bg-mist p-8 md:p-10">
              <p className="font-display text-[44px] leading-[1.05] text-grape sm:text-[56px]">
                ~7,000T
              </p>
              <p className="mt-4 max-w-56 text-sm leading-relaxed text-[#52525B] sm:text-base">
                CO₂ saved at 2,000 EVs / yr
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Our commitments (carousel) ---------- */}
      <section className="relative z-10 w-full overflow-hidden bg-cloud py-20 md:py-32 lg:py-42">
        <Carousel slides={sustainabilitySlides} animateTitle />
      </section>

      {/* ---------- CTA ---------- */}
      <CtaCard />

      {/* ---------- Footer ---------- */}
      <Footer />
    </main>
  );
}
