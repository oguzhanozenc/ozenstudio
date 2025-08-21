"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type NavLink = { href: string; label: string };

const LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      {/* On mobile we force a vw width (80–90%). Adjust w-[88vw] as needed. */}
      <nav
        ref={navRef}
        className={clsx(
          "relative rounded-2xl transition-shadow duration-500 ease-out pointer-events-auto",
          "backdrop-blur-lg backdrop-saturate-200",
          scrolled
            ? "shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            : "shadow-[0_8px_32px_rgba(0,0,0,0.06)]",
          // Width behavior
          "w-[88vw] max-w-[680px] md:w-auto md:max-w-none",
          // Height/stacking behavior on mobile
          "overflow-hidden"
        )}
        style={{
          background: scrolled
            ? "rgba(255, 255, 255, 0.25)"
            : "rgba(255, 255, 255, 0.15)",
          border: `1px solid ${
            scrolled ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.2)"
          }`,
        }}
      >
        {/* Glass highlight */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 30%, rgba(255, 255, 255, 0.1) 100%)",
            opacity: scrolled ? 0.8 : 0.6,
          }}
        />
        {/* Inner glass depth */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.05)",
          }}
        />

        {/* CONTENT WRAP — the same container expands vertically on mobile */}
        <div className="relative z-10">
          {/* TOP BAR (logo + links/cta + hamburger) */}
          <div className="flex items-center justify-between gap-6 px-4 py-2.5">
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

            {/* Links (desktop only) */}
            <ul className="hidden md:flex items-center gap-5 text-sm font-medium text-zinc-900 tracking-tight">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group relative block h-[1.1em] overflow-hidden leading-none"
                  >
                    <span className="block transition duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-[110%] group-hover:opacity-0">
                      {link.label}
                    </span>
                    <span className="absolute left-0 top-0 block translate-y-[110%] opacity-0 transition duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0 group-hover:opacity-100 text-zinc-900">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right side: CTA (desktop) / Hamburger (mobile) */}
            <div className="flex items-center">
              {/* CTA – desktop only */}
              <div className="hidden md:flex">
                <Link
                  href="/contact"
                  className="group relative px-4 py-2 text-sm font-medium tracking-tight rounded-xl overflow-hidden transition-all duration-300"
                  style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(10px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)",
                    }}
                  />
                  <span className="relative block h-[1.1em] overflow-hidden leading-none text-white z-10">
                    <span className="block transition duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-[110%] group-hover:opacity-0">
                      Contact Us
                    </span>
                    <span className="absolute top-0 left-0 block translate-y-[110%] opacity-0 transition duration-[600ms] ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:translate-y-0 group-hover:opacity-100 text-white">
                      Let&apos;s Talk
                    </span>
                  </span>
                </Link>
              </div>

              {/* Hamburger – mobile only */}
              <button
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-stack"
                className="md:hidden ml-2 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200"
                onClick={() => setMenuOpen((v) => !v)}
                style={{
                  background: menuOpen
                    ? "rgba(255, 255, 255, 0.1)"
                    : "transparent",
                }}
              >
                <svg
                  className="h-5 w-5 text-zinc-900"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE STACK (inside the same glassy container) */}
          <div
            id="mobile-stack"
            className={clsx(
              "md:hidden px-4 transition-[max-height,opacity,transform] duration-300 ease-out",
              menuOpen
                ? "max-h-[420px] opacity-100 translate-y-0 pb-3"
                : "max-h-0 opacity-0 -translate-y-1 pb-0 overflow-hidden"
            )}
          >
            <ul className="flex flex-col text-sm font-medium tracking-tight text-zinc-900">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block py-3 px-2 rounded-lg transition-colors duration-200 hover:bg-white/10"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/contact"
                  className="block rounded-xl px-4 py-3 text-center text-white transition-all duration-200 overflow-hidden relative"
                  style={{
                    background: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.05] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                  <span className="relative z-10">Let&apos;s Talk</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
