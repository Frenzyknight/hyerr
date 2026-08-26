import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PitchDeckCard from "../components/PitchDeckCard";
import Footer from "../components/Footer";

const PITCH_DECK_URL = "/Hyerr_Investor_Deck-2.pdf";

export const metadata: Metadata = {
  title: "Pitch Deck | Hyerr",
  description:
    "The Hyerr investor deck — India's EV driver-ownership mobility network, the market, the unit economics, and the seed plan to launch in Ahmedabad.",
};

export default function PitchDeckPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <Navbar variant="solid" />

      {/* ---------- Intro ---------- */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-360 px-4 pt-16 md:pt-24 lg:px-6">
          <div className="grid items-start gap-x-10 gap-y-8 md:grid-cols-[1fr_1.9fr]">
            <h1 className="font-display font-normal text-[40px] leading-[1.05] text-[#18181B] sm:text-[52px] lg:text-[64px]">
              Pitch
              <br />
              <span className="italic text-grape">Deck</span>
            </h1>

            <p className="max-w-3xl text-[22px] leading-snug text-[#18181B] sm:text-[26px] lg:text-[32px]">
              India&apos;s first EV driver-ownership mobility network — the
              market, the rent-to-own model, the unit economics, and the seed
              plan to launch an all-electric fleet in Ahmedabad.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- The deck ---------- */}
      <section className="w-full bg-white px-4 py-20 md:py-28 lg:px-6">
        <div className="mx-auto w-full max-w-360">
          <PitchDeckCard
            href={PITCH_DECK_URL}
            fileName="Hyerr_Investor_Deck.pdf"
            meta="PDF · 40 slides"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
