type Founder = {
  number: string;
  name: string;
  role: string;
  body: string;
  image: string;
  alt: string;
};

const founders: Founder[] = [
  {
    number: "01",
    name: "Ayush Gupta",
    role: "Founder & CEO",
    body: "Ayush is the driving force behind HyerrFleet’s vision. An entrepreneur at heart, he identified a gap that most overlooked: that the real problem in India’s cab economy isn’t just pollution, it’s the economic trap drivers are stuck in. He built HyerrFleet from the ground up to solve both simultaneously. Ayush leads the company’s strategy, fundraising, and product direction, with a relentless focus on making EV mobility accessible, scalable, and driver-first.",
    image: "/ayush.webp",
    alt: "Ayush Gupta, Founder & CEO of HyerrFleet",
  },
  {
    number: "02",
    name: "Mukesh Bohra",
    role: "Co-Founder & Strategic Partner",
    body: "Mukesh brings deep, hands-on expertise in fleet operations to HyerrFleet. His understanding of how fleets actually run, from the logistics and driver relationships to the ground-level challenges, gives HyerrFleet an operational edge that most startups lack from day one. Mukesh oversees fleet strategy and partnerships, ensuring that what HyerrFleet promises on paper actually delivers on the road.",
    image: "/mukesh.webp",
    alt: "Mukesh Bohra, Co-Founder & Strategic Partner of HyerrFleet",
  },
];

export default function Founders() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-12 px-4 py-20 md:gap-24 md:py-32 lg:px-6">
        <h2 className="text-center font-display font-normal text-[40px] leading-[1.05] text-[#18181B] sm:text-[52px] lg:text-[64px]">
          Meet the <span className="italic text-grape">Founders</span>
        </h2>

        <div className="flex flex-col gap-16 md:gap-28">
          {founders.map((founder, i) => {
            const imageFirst = i % 2 === 1;
            return (
              <div
                key={founder.number}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                {/* Image */}
                <div
                  className={`relative aspect-square w-full overflow-hidden rounded-3xl bg-mist ${
                    imageFirst ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <img
                    src={founder.image}
                    alt={founder.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>

                {/* Copy */}
                <div
                  className={`flex items-start gap-4 sm:gap-6 md:gap-8 ${
                    imageFirst ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <span className="font-display text-4xl leading-none text-grape/30 sm:text-5xl md:text-6xl">
                    {founder.number}
                  </span>
                  <div>
                    <h3 className="font-display font-normal text-[28px] leading-tight text-[#18181B] sm:text-[32px] md:text-[40px]">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-base italic text-lilac sm:text-lg md:text-xl">
                      {founder.role}
                    </p>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-[#52525B] sm:mt-5 sm:text-lg">
                      {founder.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
