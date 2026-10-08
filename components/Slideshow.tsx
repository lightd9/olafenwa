"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import type { ProjectImage } from "@/data/olafenwa";

const HINT = 56;
const SPRING = { type: "spring" as const, stiffness: 260, damping: 30 };
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

interface SlideshowProps {
  images: ProjectImage[];
  alt: string;
}

export function Slideshow({ images, alt }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [slideW, setSlideW] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const nudgeRef = useRef<ReturnType<typeof animate> | null>(null);
  const x = useMotionValue(0);
  const inView = useInView(viewportRef, { once: true, amount: 0.6 });

  const current = images[index];
  const tallest = images.reduce<ProjectImage | undefined>(
    (best, image) =>
      !best || image.height * best.width > best.height * image.width
        ? image
        : best,
    undefined,
  );

  useEffect(() => {
    const update = () => {
      const width = viewportRef.current?.clientWidth ?? 0;
      setSlideW(width > 0 ? width : 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    animate(x, -index * slideW, SPRING);
  }, [index, slideW, x]);

  useEffect(() => {
    if (!inView || images.length < 2 || index !== 0) return;
    const timeout = setTimeout(() => {
      nudgeRef.current = animate(x, [0, -HINT, 0], {
        duration: 1.6,
        times: [0, 0.4, 1],
        ease: ["easeOut", "backOut"],
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [inView, index, images.length, x]);

  if (!current || !tallest) return null;

  const height =
    slideW > 0 ? Math.round((slideW * tallest.height) / tallest.width) : null;

  const paginate = (dir: number) => {
    setIndex((index + dir + images.length) % images.length);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    let target = index;
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) {
      target = Math.min(index + 1, images.length - 1);
    } else if (
      info.offset.x > SWIPE_DISTANCE ||
      info.velocity.x > SWIPE_VELOCITY
    ) {
      target = Math.max(index - 1, 0);
    }
    animate(x, -target * slideW, SPRING);
    setIndex(target);
  };

  return (
    <div
      className="group relative w-full cursor-grab overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-card)] transition-[height] duration-300 active:cursor-grabbing"
      style={
        height !== null
          ? { height }
          : { aspectRatio: `${tallest.width} / ${tallest.height}` }
      }
      ref={viewportRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${alt} screenshots`}
    >
      <motion.div
        className="absolute inset-0"
        style={{ x }}
        drag="x"
        dragConstraints={{
          left: -Math.max(0, images.length - 1) * slideW,
          right: 0,
        }}
        dragElastic={0.12}
        dragMomentum={false}
        onDragStart={() => nudgeRef.current?.stop()}
        onDragEnd={handleDragEnd}
      >
        {images.map((image, i) => (
          <div
            key={image.src}
            className="absolute inset-y-0 flex w-full items-center overflow-hidden"
            style={{ left: `calc(${i} * 100%)` }}
          >
            <Image
              src={image.src}
              alt={`${alt} screenshot ${i + 1}`}
              width={image.width}
              height={image.height}
              className="h-auto w-full"
              loading={i < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </motion.div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous screenshot"
            className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-ink)] text-white opacity-60 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next screenshot"
            className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-ink)] text-white opacity-60 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                  i === index
                    ? "bg-[var(--color-accent)]"
                    : "bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
