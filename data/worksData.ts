// lib/projectsData.ts

export type Work = {
  slug: string;
  title: string;
  client?: string;
  year: number;
  role: string[];
  summary: string;
  coverImage: string;
  stack?: string[];
  media?: { type: "image" | "video"; src: string; alt?: string }[];
  description: string;
  url?: string;
};

export const worksData: Work[] = [
  {
    slug: "baran-ulusoy-portfolio-website",
    title: "Artist Portfolio Website",
    client: "Baran Ulusoy",
    year: 2025,
    role: ["Design", "Development"],
    summary:
      "Expressive portfolio site and visual identity for a satirical sculptor.",
    coverImage: "/baran-ulusoy.png",
    stack: ["Next.js", "Tailwind CSS", "Contentful"],
    media: [
      {
        type: "image",
        src: "/baran-ulusoy.png",
        alt: "Baran Ulusoy portfolio",
      },
      {
        type: "image",
        src: "/baran-ulusoy-2.png",
        alt: "Baran Ulusoy portfolio",
      },
      {
        type: "image",
        src: "/baran-ulusoy-3.png",
        alt: "Baran Ulusoy portfolio",
      },
      {
        type: "image",
        src: "/baran-ulusoy-4.png",
        alt: "Baran Ulusoy portfolio",
      },
      {
        type: "image",
        src: "/baran-ulusoy-5.png",
        alt: "Baran Ulusoy portfolio",
      },
    ],
    description: `The client needed a gallery-like presence with editorial typography, scroll-based reveals, and projection-style visuals. I handled everything from layout to ambient effects.`,
    url: "https://baranulusoy.com/",
  },
  {
    slug: "cyber-security-business-website",
    title: "Cyber Security Business Company Website",
    client: "Offbeat Security",
    year: 2023,
    role: ["Design", "Development"],
    summary:
      "Single-page site for a blockchain startup. Features animated modals, scroll-based transitions, and an editor-friendly blog system with branded visuals and subscription integration.",
    coverImage: "/offbeat-featuredImg.png",
    stack: ["React", "Framer Motion", "Headless CMS"],
    media: [
      {
        type: "image",
        src: "/offbeat-1.png",
        alt: "Offbeat Security",
      },
      {
        type: "image",
        src: "/offbeat-2.png",
        alt: "Offbeat Security",
      },
      {
        type: "image",
        src: "/offbeat-3.png",
        alt: "Offbeat Security",
      },
      {
        type: "image",
        src: "/offbeat-4.png",
        alt: "Offbeat Security",
      },
      {
        type: "image",
        src: "/offbeat-5.png",
        alt: "Offbeat Security",
      },
      {
        type: "image",
        src: "/offbeat-6.png",
        alt: "Offbeat Security",
      },
      {
        type: "image",
        src: "/offbeat-7.png",
        alt: "Offbeat Security",
      },
      {
        type: "image",
        src: "/offbeat-8.png",
        alt: "Offbeat Security",
      },
    ],
    description:
      "Single-page site for a blockchain startup. Features animated modals, scroll-based transitions, and an editor-friendly blog system with branded visuals and subscription integration.",
    url: "https://offbeatsecurity.xyz/",
  },
];
