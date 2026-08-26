"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type MotionValue } from "motion/react";
import { deckLink, primaryLinks } from "./navLinks";

type NavbarProps = {
  opacity?: MotionValue<number>;
  y?: MotionValue<string>;
  pinned?: boolean;
  /**
   * "overlay" — translucent bar that sits over the hero (default).
   * "solid"   — opaque bar for light pages where there's no hero behind it.
   */
  variant?: "overlay" | "solid";
};

const links = primaryLinks;
const DECK = deckLink;

export default function Navbar({
  opacity,
  y,
  pinned,
  variant = "overlay",
}: NavbarProps) {
  const isStatic = variant === "solid" || !opacity || !y;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const inner = (
    <>
      <nav className="mx-auto flex w-full max-w-360 items-center justify-between px-4 py-4 lg:px-6">
        <Link href="/" aria-label="Hyerr home" className="shrink-0">
          <Image
            src="/hyerr-logo-text-white.webp"
            alt="Hyerr"
            width={140}
            height={40}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 text-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`transition-colors hover:text-white ${
                pathname === link.href ? "text-white" : "text-white/70"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={DECK.href}
            aria-current={pathname === DECK.href ? "page" : undefined}
            className="rounded-full border border-white/30 px-4 py-1.5 text-white/85 transition-colors hover:bg-white hover:text-ink"
          >
            {DECK.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.25 md:hidden"
        >
          <span
            className={`h-px w-5 bg-white transition-transform duration-300 ${
              menuOpen ? "translate-y-0.75 rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-white transition-transform duration-300 ${
              menuOpen ? "-translate-y-0.75 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-ink md:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {[...links, DECK].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`border-b border-white/[0.07] py-3.5 font-display text-lg last:border-b-0 ${
                    pathname === link.href ? "text-white" : "text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  if (isStatic) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-ink">
        {inner}
      </header>
    );
  }

  return (
    <motion.header
      style={pinned ? { opacity: 1, y: "0%" } : { opacity, y }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/40 backdrop-blur-md"
    >
      {inner}
    </motion.header>
  );
}
