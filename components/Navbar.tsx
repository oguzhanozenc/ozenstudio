"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors ${
        isScrolled ? "bg-white/70 backdrop-blur border-b border-zinc-200" : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl font-semibold group"
        >
          <div className="relative overflow-hidden">
            <Image
              src="/logo.png"
              alt="Logo"
              width={24}
              height={24}
              className="transition-transform duration-500 ease-out group-hover:-translate-y-1 py-2"
            />
          </div>
          <span className="font-semibold tracking-tight leading-tight text-neutral-900 transition-[letter-spacing,opacity] duration-500 ease-out group-hover:tracking-wide group-hover:opacity-80">
            ozenstudio
          </span>
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#work" className="hover:underline">
            Work
          </a>
          <a href="#services" className="hover:underline">
            Services
          </a>
          <a href="#process" className="hover:underline">
            Process
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
