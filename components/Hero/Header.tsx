"use client";

import React from "react";
import "@/components/Hero/Header.css";
import HeroSection from "@/components/Hero/HeroSection";

type HeaderProps = {
  nav?: { label: string; href: string }[];
  children?: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header className="relative w-full min-h-[100svh] overflow-hidden text-black">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-20" />

      {/* Hero */}
      <HeroSection />

      {children}
    </header>
  );
}
