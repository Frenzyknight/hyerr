import Image from "next/image";
import Link from "next/link";
import { footerColumns } from "./navLinks";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-lilac">
      <Image
        src="/iPhone 17 - 2.svg"
        alt=""
        aria-hidden="true"
        width={1440}
        height={653}
        unoptimized
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col gap-12 px-4 py-16 md:gap-16 md:py-24 lg:px-6 lg:py-32">
        {/* ---------- Tagline ---------- */}
        <div>
          <p className="text-[26px] leading-tight text-[#FEFEFE] sm:text-[36px] lg:text-[48px]">
            We don&apos;t move people.
          </p>
          <p className="mt-3 font-display font-normal text-[34px] leading-tight text-[#FEFEFE] sm:mt-4 sm:text-[48px] lg:text-[64px]">
            We design how
            <br />
            <span className="italic">movement feels.</span>
          </p>
        </div>

        {/* ---------- Navigation ---------- */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/20 pt-10 sm:gap-x-10 md:grid-cols-4 md:pt-12"
        >
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h2 className="font-display text-[11px] uppercase tracking-[0.28em] text-white/60">
                {column.heading}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-white/85 transition-colors hover:text-white sm:text-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1 md:col-start-4">
            <h2 className="font-display text-[11px] uppercase tracking-[0.28em] text-white/60">
              Based in
            </h2>
            <p className="mt-5 text-base text-white/85 sm:text-lg">
              Ahmedabad, Gujarat
              <br />
              India
            </p>
          </div>
        </nav>

        {/* ---------- Sign-off ---------- */}
        <div className="flex flex-col gap-6 border-t border-white/20 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <Image
            src="/hyerr-logo-text-white.webp"
            alt="Hyerr"
            width={140}
            height={40}
            className="h-7 w-auto self-start sm:h-9"
          />
          <p className="text-xs text-white/60 sm:text-sm">
            © {new Date().getFullYear()} Hyerr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
