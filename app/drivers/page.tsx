import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import DriverJourney from "../components/DriverJourney";
import EarningsCalculator from "../components/EarningsCalculator";
import Footer from "../components/Footer";

// TODO: replace with the live driver onboarding Google Form link.
const DRIVER_FORM_URL = "https://forms.gle/REPLACE_WITH_YOUR_FORM_ID";

export const metadata: Metadata = {
  title: "Drive with Hyerr | Hyerr",
  description:
    "Drive a fully electric cab with no fuel bills, transparent payouts, and a share of every trip going toward owning the vehicle.",
};

export default function DriversPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <Navbar variant="solid" />

      {/* ---------- Intro ---------- */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-360 px-4 pt-16 md:pt-24 lg:px-6">
          <div className="grid items-start gap-x-10 gap-y-8 md:grid-cols-[1fr_1.9fr]">
            <h1 className="font-display font-normal text-[40px] leading-[1.05] text-[#18181B] sm:text-[52px] lg:text-[64px]">
              Drive
              <br />
              <span className="italic text-grape">toward owning</span>
            </h1>

            <p className="max-w-3xl text-[22px] leading-snug text-[#18181B] sm:text-[26px] lg:text-[32px]">
              You already know the hard part of this job: the fuel bill, the
              service bill, and the fact that after years of driving, the car
              still belongs to somebody else.
              <br />
              <br />
              Here is what changes when the cab is electric and the ownership is
              yours to earn.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Five stops on the journey ---------- */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-20 md:py-28 lg:px-6">
          <div className="mb-6 text-center md:mb-10">
            <h2 className="font-display font-normal text-[36px] leading-[1.05] text-[#18181B] sm:text-[48px] lg:text-[56px]">
              From first form
              <br />
              <span className="italic text-grape">to first key</span>
            </h2>
          </div>

          <DriverJourney />
        </div>
      </section>

      {/* ---------- Earnings calculator ---------- */}
      <section className="w-full bg-white px-4 py-20 md:py-28 lg:px-6">
        <div className="mx-auto w-full max-w-360">
          <div className="mb-12 max-w-3xl md:mb-16">
            <h2 className="font-display font-normal text-[36px] leading-[1.05] text-[#18181B] sm:text-[48px] lg:text-[60px]">
              Run your own
              <br />
              <span className="italic text-grape">numbers</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[20px] leading-snug text-[#18181B] sm:text-[24px]">
              Move the sliders to match the way you actually drive. The gap you
              see is the fuel bill and the commission you stop paying.
            </p>
          </div>

          <EarningsCalculator />
        </div>
      </section>

      {/* ---------- Onboarding CTA ---------- */}
      <section className="w-full bg-white px-4 pb-20 md:pb-28 lg:px-6">
        <div className="mx-auto w-full max-w-360">
          <div className="rounded-3xl bg-grape px-8 py-16 md:px-16 md:py-20">
            <span className="font-display text-xs uppercase tracking-[0.36em] text-white/60">
              Onboarding is open
            </span>

            <h2 className="mt-6 max-w-4xl font-display font-normal text-[36px] leading-[1.08] text-white sm:text-[48px] md:text-[60px]">
              Five minutes now.
              <br />
              <span className="italic">A car in your name later.</span>
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
              Tell us your licence details and the hours you want to drive. Our
              team reviews every application and gets back to you directly.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={DRIVER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 self-start rounded-full bg-white py-2 pl-6 pr-2 text-base text-ink shadow-sm transition-colors hover:bg-white/85"
              >
                Apply to drive
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6M13.5 4.5V12" />
                  </svg>
                </span>
              </a>

              <p className="text-sm text-white/55">
                Opens the onboarding form in a new tab.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
