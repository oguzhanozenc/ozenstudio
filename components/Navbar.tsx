"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

type NavLink = { href: string; label: string };

const LINKS: NavLink[] = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <nav
        className={clsx(
          "pointer-events-auto flex items-center gap-6 rounded-2xl px-4 py-2.5",
          "border backdrop-blur-md backdrop-saturate-150 transition-all duration-300",
          scrolled
            ? "bg-white/90 border-zinc-200 shadow-[0_4px_24px_rgba(0,0,0,.06)]"
            : "bg-white/70 border-white/40 shadow-none"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Home"
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={24}
            height={24}
            className="transition-transform duration-300 hover:-translate-y-0.5 will-change-transform"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-5 text-sm font-medium text-zinc-800 tracking-tight">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group relative block h-[1.1em] overflow-hidden leading-none"
              >
                <span className="block transition duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-[110%] group-hover:opacity-0">
                  {link.label}
                </span>
                <span className="absolute left-0 top-0 block translate-y-[110%] opacity-0 transition duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0 group-hover:opacity-100 text-black">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link
            href="#contact"
            className="group relative px-4 py-2 text-sm font-medium tracking-tight rounded-xl bg-neutral-900 text-white hover:bg-black transition-colors"
          >
            <span className="relative block h-[1.1em] overflow-hidden leading-none">
              <span className="block transition duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-[110%] group-hover:opacity-0">
                Contact Us
              </span>
              <span className="absolute top-0 left-0 block translate-y-[110%] opacity-0 transition duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0 group-hover:opacity-100 text-white">
                Let&apos;s Talk
              </span>
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
