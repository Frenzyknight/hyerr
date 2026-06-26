"use client";

import Image from "next/image";
import Link from "next/link";
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

      <div className="hidden items-center gap-8 text-sm text-white/85 md:flex">
        <Link href="/" className="transition-colors hover:text-white">
          Home
        </Link>
        <Link href="/about" className="transition-colors hover:text-white">
          About
        </Link>
        <Link href="/sustainability" className="transition-colors hover:text-white">
          Sustainability
        </Link>
      </div>
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
