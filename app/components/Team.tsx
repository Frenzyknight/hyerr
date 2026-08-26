import Image, { type StaticImageData } from "next/image";
import gauravImage from "@/public/Gaurav.jpeg";
import darshanImage from "@/public/danish.jpeg";
import himanshuImage from "@/public/zerologic.jpeg";

type TeamMember = {
  name: string;
  role: string;
  image: StaticImageData;
};

const team: TeamMember[] = [
  {
    name: "Gaurav Ganju",
    role: "Technical Advisor",
    image: gauravImage,
  },
  {
    name: "Darshan",
    role: "Tech Team Lead",
    image: darshanImage,
  },
  {
    name: "Himanshu Singh",
    role: "Design Team Lead",
    image: himanshuImage,
  },
];

export default function Team() {
  return (
    <section className="w-full bg-mist">
      <div className="mx-auto w-full max-w-360 px-4 py-20 md:py-32 lg:px-6">
        <h2 className="font-display text-[36px] font-normal leading-[1.05] text-[#18181B] sm:text-[52px] lg:text-[64px]">
          Our <span className="italic text-grape">team</span>
        </h2>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {team.map((member) => (
            <article key={member.name}>
              <div className="relative aspect-3/4 overflow-hidden rounded-3xl bg-fog">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 text-[24px] leading-tight text-[#18181B] sm:mt-6 sm:text-[28px] md:text-[32px]">
                {member.name}
              </h3>
              <p className="mt-1 text-lg text-[#52525B]">{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
