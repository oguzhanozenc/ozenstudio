import type { Metadata } from "next";
import AboutPageClient from "../../components/About/AboutPageClient";

export const metadata: Metadata = {
  title: "About – ozenstudio",
  description: "The philosophy behind ozenstudio and the meaning of özen.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
