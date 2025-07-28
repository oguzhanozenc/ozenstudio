"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

type Props = {
  open: boolean;
  onClose: () => void;
  items: { href: string; label: string }[];
};

export function MobileDropdown({ open, onClose, items }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
          className={clsx(
            "absolute right-0 top-12 w-[90vw] max-w-sm rounded-3xl z-50",
            "border border-white/30 dark:border-zinc-700/60",
            "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl shadow-2xl",
            "text-sm font-medium tracking-tight text-zinc-800 dark:text-zinc-100",
            "overflow-hidden"
          )}
        >
          <ul className="flex flex-col px-5 py-6 gap-4">
            {items.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="block py-1.5 transition hover:text-black dark:hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={onClose}
                className="block rounded-xl bg-neutral-900 px-4 py-2 text-center text-white transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-white/80"
              >
                Let&apos;s Talk
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
