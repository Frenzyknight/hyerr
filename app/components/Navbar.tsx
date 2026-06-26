"use client";

import Image from "next/image";
import { motion, type MotionValue } from "motion/react";

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

export default function Navbar({
  opacity,
  y,
  pinned,
  variant = "overlay",
}: NavbarProps) {
  const isStatic = variant === "solid" || !opacity || !y;

  const inner = (
    <nav className="mx-auto flex w-full max-w-360 items-center justify-between px-4 py-4 lg:px-6">
      <a href="/" aria-label="Hyerr home" className="shrink-0">
        <Image
          src="/hyerr-logo-text-white.png"
          alt="Hyerr"
          width={140}
          height={40}
          priority
          className="h-7 w-auto"
        />
      </a>

      <div className="hidden items-center gap-8 text-sm text-white/85 md:flex">
        <a href="/" className="transition-colors hover:text-white">
          Journeys
        </a>
        <a href="/" className="transition-colors hover:text-white">
          Experience
        </a>
        <a href="/about" className="transition-colors hover:text-white">
          About
        </a>
        <a href="/sustainability" className="transition-colors hover:text-white">
          Sustainability
        </a>
      </div>

      <button
        type="button"
        className="rounded-full bg-white/95 px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-white"
      >
        Get early access
      </button>
    </nav>
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
