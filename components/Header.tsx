"use client";

import React from "react";
import AnimatedLogo from "./AnimatedLogo";
import "./Header.css";

type HeaderProps = {
  nav?: { label: string; href: string }[];
  children?: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header className="relative w-full h-screen overflow-hidden text-black">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-20 gradient-wrap" />

      {/* Hero */}
      <div className="relative z-10 flex items-center justify-center h-[100vh]">
        <AnimatedLogo />
      </div>

      {children}
    </header>
  );
}
