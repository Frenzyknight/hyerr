import Image from "next/image";
import Accordion from "./components/Accordion";
import Carousel from "./components/Carousel";
import RouteLine from "./components/RouteLine";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex w-full flex-col">
      {/* ---------- Hero (scroll-scrubbed image sequence) ---------- */}
      <Hero />

      {/* ---------- Some journeys take ---------- */}
      <section className="relative z-20 w-full bg-ink">
        <Image
          src="/Section 2 - Some journeys take.svg"
          alt=""
          aria-hidden="true"
          width={1440}
          height={800}
          unoptimized
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 mx-auto flex min-h-[480px] w-full max-w-360 items-center px-4 py-16 md:min-h-[600px] md:py-20 lg:px-6">
          <div className="max-w-xl">
            <p className="font-display font-normal text-3xl leading-snug text-white sm:text-4xl lg:text-5xl">
              Some journeys <span className="italic">take</span>
              <br />
              <span className="text-lilac">23 minutes.</span>
            </p>
            <p className="mt-8 font-display font-normal text-3xl leading-snug text-white sm:text-4xl lg:text-5xl">
              Some journeys <span className="italic">give</span> you
              <br />
              <span className="text-lilac">23 minutes.</span>
            </p>

            <button
              type="button"
              className="mt-12 rounded-full border border-white/40 px-6 py-3 text-sm text-white/90 transition-colors hover:bg-white/10"
            >
              A little more predictability
            </button>
          </div>
        </div>

        {/* Route line + traveling marker — overlaps into the section below */}
        <RouteLine />
      </section>

      {/* ---------- Arrive Composed (carousel) ---------- */}
      <section className="relative z-10 w-full overflow-hidden bg-cloud py-42 md:py-42">
        <Carousel />
      </section>

      {/* ---------- Built Around The Journey (accordion) ---------- */}
      <section className="w-full bg-mist py-42 md:py-42">
        <div className="mx-auto grid w-full max-w-360 items-start gap-12 px-4 md:grid-cols-2 md:gap-16 lg:px-6">
          <div>
            <h2 className="font-display font-normal text-[56px] leading-[1.05] text-[#18181B]">
              Built Around
              <br />
              <span className="italic text-grape">The Journey</span>
            </h2>
            <p className="mt-6 max-w-xl text-[32px] leading-relaxed text-[#18181B]">
              Hyerr is a journey-first, EV-powered mobility system designed for
              how drives should feel for the people and the world they move
              through.
            </p>
          </div>
          <Accordion />
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <Footer />
    </main>
  );
}
