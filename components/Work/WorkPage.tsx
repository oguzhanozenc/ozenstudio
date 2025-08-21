"use client";
import { notFound } from "next/navigation";
import { worksData } from "@/data/worksData";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Params = { slug: string };

interface WorkMediaImage {
  type: "image";
  src: string;
  alt?: string;
}

interface WorkMediaVideo {
  type: "video";
  src: string;
}

type WorkMedia = WorkMediaImage | WorkMediaVideo;

export default function WorkPage({ params }: { params: Promise<Params> }) {
  type Work = {
    slug: string;
    title: string;
    summary: string;
    description: string;
    year?: string | number;
    role?: string[];
    stack?: string[];
    url?: string;
    coverImage?: string;
    media?: WorkMedia[];
  };

  const [work, setWork] = useState<Work | null>(null);
  const [prev, setPrev] = useState<Work | undefined>(undefined);
  const [next, setNext] = useState<Work | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWork = async () => {
      const { slug } = await params;
      const foundWork = worksData.find((p) => p.slug === slug);

      if (!foundWork) {
        notFound();
        return;
      }

      const currentIndex = worksData.findIndex((p) => p.slug === slug);
      const prevWork = worksData[currentIndex - 1];
      const nextWork = worksData[currentIndex + 1];

      setWork(foundWork);
      setPrev(prevWork);
      setNext(nextWork);
      setLoading(false);
    };

    loadWork();
  }, [params]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-neutral-500">Loading...</div>
      </div>
    );
  }

  if (!work) return notFound();

  return (
    <>
      {/* Floating Live Link */}
      {work.url && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Link
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-neutral-200 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm font-mono tracking-wide text-neutral-700">
              LIVE SITE
            </span>
            <motion.span
              className="text-neutral-500 group-hover:text-neutral-900 transition-colors"
              whileHover={{ x: 4, y: -4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ↗
            </motion.span>
          </Link>
        </motion.div>
      )}

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full min-h-screen py-24 px-6 md:px-12 lg:px-24 xl:px-32"
      >
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            href="/works"
            className="group inline-flex items-center gap-3 text-sm font-mono text-neutral-500 hover:text-neutral-900 transition-colors duration-300"
          >
            <motion.div
              className="w-6 h-[1px] bg-neutral-400 group-hover:bg-neutral-600 transition-colors"
              whileHover={{ scaleX: 1.2 }}
              transition={{ duration: 0.3 }}
            />
            <span className="tracking-wide">BACK TO WORKS</span>
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column - Meta */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
                  PROJECT
                </div>
                <div className="space-y-2">
                  {work.year && (
                    <div className="text-sm font-mono text-neutral-600">
                      {work.year}
                    </div>
                  )}
                  {Array.isArray(work.role) && work.role.length > 0 && (
                    <div className="text-sm text-neutral-600">
                      {work.role.join(" • ")}
                    </div>
                  )}
                </div>
              </div>

              {/* Tech Stack */}
              {Array.isArray(work.stack) && work.stack.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wide text-neutral-500">
                    STACK
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {work.stack.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-mono bg-neutral-100 text-neutral-600 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              {work.url && (
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wide text-neutral-500">
                    STATUS
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm font-mono text-neutral-600">
                      LIVE
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Title & Description */}
            <div className="lg:col-span-9 space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-light tracking-tight text-neutral-900 leading-tight">
                  {work.title}
                </h1>

                <p className="text-xl lg:text-2xl text-neutral-600 font-light leading-relaxed max-w-4xl">
                  {work.summary}
                </p>
              </div>

              {/* Quick Access */}
              {work.url && (
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-lg font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
                  >
                    <span className="border-b border-dotted border-neutral-300 hover:border-neutral-500 transition-colors font-editorial">
                      Visit live site
                    </span>
                    <span>↗</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Cover Image */}
        {work.coverImage && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={work.coverImage}
                alt={`${work.title} showcase`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.section>
        )}

        {/* Project Description */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 sticky top-8">
                ABOUT
              </div>
            </div>
            <div className="lg:col-span-9">
              <div className="prose prose-lg prose-neutral max-w-none">
                <p className="text-xl leading-relaxed text-neutral-700 font-light">
                  {work.description}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Media Gallery */}
        {(work.media?.length ?? 0) > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-3">
                <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 sticky top-8">
                  GALLERY
                </div>
              </div>
              <div className="lg:col-span-9">
                <div className="grid gap-8 md:grid-cols-2">
                  {(work.media as WorkMedia[] | undefined)?.map(
                    (item: WorkMedia, idx: number) =>
                      item.type === "image" ? (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 * idx }}
                          className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100"
                        >
                          <Image
                            src={item.src}
                            alt={item.alt || `Project detail ${idx + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                          />
                        </motion.div>
                      ) : (
                        <motion.video
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 * idx }}
                          src={item.src}
                          controls
                          className="rounded-xl w-full aspect-[4/3] object-cover"
                        />
                      )
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Project Navigation */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="pt-20 border-t border-neutral-200/60"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* Previous Project */}
            {prev ? (
              <Link
                href={`/works/${prev.slug}`}
                className="group flex items-center gap-4 text-neutral-600 hover:text-neutral-900 transition-colors duration-300"
              >
                <motion.div
                  className="w-8 h-[1px] bg-neutral-400 group-hover:bg-neutral-600 transition-colors"
                  whileHover={{ scaleX: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wide text-neutral-400">
                    PREVIOUS
                  </div>
                  <div className="text-lg font-light">{prev.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {/* Next Project */}
            {next ? (
              <Link
                href={`/works/${next.slug}`}
                className="group flex items-center gap-4 text-neutral-600 hover:text-neutral-900 transition-colors duration-300 md:flex-row-reverse md:text-right"
              >
                <motion.div
                  className="w-8 h-[1px] bg-neutral-400 group-hover:bg-neutral-600 transition-colors"
                  whileHover={{ scaleX: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase tracking-wide text-neutral-400">
                    NEXT
                  </div>
                  <div className="text-lg font-light">{next.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Back to all works */}
          <div className="text-center mt-16 pt-8 border-t border-neutral-200/60">
            <Link
              href="/works"
              className="group inline-flex items-center gap-3 text-lg font-light text-neutral-600 hover:text-neutral-900 transition-colors duration-300"
            >
              <span className="border-b border-dotted border-neutral-300 group-hover:border-neutral-500 transition-colors font-editorial">
                View all projects
              </span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ↗
              </motion.span>
            </Link>
          </div>
        </motion.section>
      </motion.article>
    </>
  );
}
