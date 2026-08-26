import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import PhoneShowcase from "../components/PhoneShowcase";
import SystemDiagram from "../components/SystemDiagram";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Technology | Hyerr",
  description:
    "Battery-aware dispatch, itemised fares, charging planned into the shift, and an emissions ledger recorded on every trip.",
};

export default function TechnologyPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <Navbar variant="solid" />

      {/* ---------- Intro ---------- */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-360 px-4 pt-16 pb-16 md:pt-24 md:pb-24 lg:px-6">
          <div className="grid items-start gap-x-10 gap-y-8 md:grid-cols-[1fr_1.9fr]">
            <h1 className="font-display font-normal text-[40px] leading-[1.05] text-[#18181B] sm:text-[52px] lg:text-[64px]">
              The
              <br />
              <span className="italic text-grape">Technology</span>
            </h1>

            <p className="max-w-3xl text-[22px] leading-snug text-[#18181B] sm:text-[26px] lg:text-[32px]">
              An electric fleet fails on the boring details: a car sent on a trip
              it cannot finish, a charger that turns out to be occupied, a payout
              nobody can explain.
              <br />
              <br />
              So those are the details we built the software around.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Product walkthrough ---------- */}
      <section className="w-full bg-white pb-20 md:pb-28">
        <PhoneShowcase />
      </section>

      {/* ---------- Architecture ---------- */}
      <SystemDiagram />

      <Footer />
    </main>
  );
}
