import Image from "next/image";

export default function Footer() {
  return (
    <section className="relative w-full overflow-hidden bg-lilac">
      <Image
        src="/iPhone 17 - 2.svg"
        alt=""
        aria-hidden="true"
        width={1440}
        height={653}
        unoptimized
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col gap-16 px-4 py-24 md:py-32 lg:px-6">
        <div>
          <p className="text-[48px] text-[#FEFEFE]">We don&apos;t move people.</p>
          <p className="mt-4 font-display font-normal text-[64px] leading-tight text-[#FEFEFE]">
            We design how
            <br />
            <span className="italic">movement feels.</span>
          </p>
        </div>

        <Image
          src="/hyerr-logo-text-white.png"
          alt="Hyerr"
          width={140}
          height={40}
          className="w-40 h-auto"
        />
      </div>
    </section>
  );
}
