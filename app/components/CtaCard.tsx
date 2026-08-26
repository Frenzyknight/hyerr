export default function CtaCard() {
  return (
    <section className="w-full bg-white px-4 py-12 md:py-16 lg:px-6">
      <div className="mx-auto w-full max-w-360">
        <div className="rounded-3xl bg-mist px-6 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20">
          <h2 className="font-display font-normal text-[30px] leading-[1.1] text-ink sm:text-[44px] md:text-[64px]">
            Your Next Step Toward
            <br />
            a Sustainable Future
            <br />
            Starts Here.
          </h2>

          <button
            type="button"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-base text-ink shadow-sm transition-colors hover:bg-white/80 md:mt-12"
          >
            Get Started
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
          </button>
        </div>
      </div>
    </section>
  );
}
