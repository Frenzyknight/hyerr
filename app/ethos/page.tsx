import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import EthosCompare from "../components/EthosCompare";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Our Ethos | Hyerr",
  description:
    "Most cab platforms optimise for the platform. Hyerr is built around the person driving the car — ownership, honest economics, and a fully electric fleet.",
};

export default function EthosPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <Navbar variant="solid" />

      {/* ---------- Intro ---------- */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-360 px-4 pt-16 pb-20 md:pt-24 md:pb-28 lg:px-6">
          <div className="grid items-start gap-x-10 gap-y-8 md:grid-cols-[1fr_1.9fr]">
            <h1 className="font-display font-normal text-[40px] leading-[1.05] text-[#18181B] sm:text-[52px] lg:text-[64px]">
              Our
              <br />
              <span className="italic text-grape">Ethos</span>
            </h1>

            <p className="max-w-3xl text-[22px] leading-snug text-[#18181B] sm:text-[26px] lg:text-[32px]">
              Every cab platform in India solves the same problem the same way:
              squeeze the fare, squeeze the driver, and leave the car in someone
              else&apos;s name.
              <br />
              <br />
              We started from the other end. Four questions, four different
              answers.
            </p>
          </div>

          <p className="mt-14 font-display text-xs uppercase tracking-[0.36em] text-lilac md:mt-20">
            Scroll to compare
          </p>
        </div>
      </section>

      {/* ---------- The old way vs the Hyerr way ---------- */}
      <EthosCompare />

      {/* ---------- Closing ---------- */}
      <section className="w-full bg-white px-4 py-20 md:py-28 lg:px-6">
        <div className="mx-auto w-full max-w-360">
          <div className="rounded-3xl bg-mist px-8 py-16 md:px-16 md:py-20">
            <h2 className="max-w-4xl font-display font-normal text-[36px] leading-[1.1] text-ink sm:text-[48px] md:text-[60px]">
              None of this works
              <br />
              <span className="italic text-grape">without the driver.</span>
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#52525B] sm:text-xl">
              Our ethos is only as real as what a driver takes home at the end of
              the month. So we published the maths.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/drivers"
                className="group inline-flex items-center gap-3 self-start rounded-full bg-white py-2 pl-6 pr-2 text-base text-ink shadow-sm transition-colors hover:bg-white/70"
              >
                See a driver&apos;s numbers
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-0.5">
                  <svg
                    width="18"
                    height="18"
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
              </Link>

              <Link
                href="/technology"
                className="self-start rounded-full border border-ink/20 px-6 py-3.5 text-base text-ink transition-colors hover:border-ink/40"
              >
                How the system works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
