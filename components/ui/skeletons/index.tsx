"use client";

import React from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────
// Shared shimmer config
// ─────────────────────────────────────────────
const SHIMMER_TRANSITION = {
  repeat: Infinity,
  duration: 1.4,
  ease: "easeInOut" as const,
};

/** A single animated shimmer block — the base building block for every skeleton */
function ShimmerBlock({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-zinc-900/80 border border-zinc-800/50 ${className}`}
      style={style}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(239, 68, 68, 0.22) 50%, transparent 100%)",
          boxShadow: "0 0 24px 4px rgba(239, 68, 68, 0.15)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={SHIMMER_TRANSITION}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// 1. SkeletonCard
// ─────────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 flex flex-col gap-3 w-full shadow-lg shadow-black/60 hover:border-red-500/30 transition-colors">
      {/* Image placeholder */}
      <ShimmerBlock className="w-full h-40 rounded-lg" />
      {/* Title line */}
      <ShimmerBlock className="h-4 w-3/4 rounded-md" />
      {/* Sub-text line */}
      <ShimmerBlock className="h-3 w-full rounded-md" />
      {/* Price line */}
      <ShimmerBlock className="h-3 w-1/3 rounded-md" />
      {/* Button ghost */}
      <ShimmerBlock className="h-9 w-full rounded-lg mt-1" />
    </div>
  );
}

// ─────────────────────────────────────────────
// 2. SkeletonCardGrid
// ─────────────────────────────────────────────
export function SkeletonCardGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. SkeletonListItem
// ─────────────────────────────────────────────
export function SkeletonListItem() {
  return (
    <div className="flex items-center gap-3 py-3 px-4">
      {/* Avatar circle */}
      <ShimmerBlock className="w-10 h-10 rounded-full shrink-0" />
      {/* Two text lines */}
      <div className="flex-1 flex flex-col gap-2">
        <ShimmerBlock className="h-3.5 w-2/3 rounded-md" />
        <ShimmerBlock className="h-3 w-1/2 rounded-md" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. SkeletonList
// ─────────────────────────────────────────────
export function SkeletonList() {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden divide-y divide-zinc-800/60 w-full shadow-lg shadow-black/60">
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonListItem key={i} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// 5. SkeletonHero
// ─────────────────────────────────────────────
export function SkeletonHero() {
  return (
    <div className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-950 p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-black/80 relative overflow-hidden">
      {/* Ambient background red accent blur */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      {/* Left text block */}
      <div className="flex-1 flex flex-col gap-4 z-10 w-full">
        {/* Large heading ghost */}
        <ShimmerBlock className="h-10 w-4/5 rounded-xl" />
        {/* Sub-heading ghost */}
        <ShimmerBlock className="h-6 w-3/5 rounded-lg" />
        {/* Body text ghost */}
        <ShimmerBlock className="h-4 w-full rounded-md" />
        <ShimmerBlock className="h-4 w-5/6 rounded-md" />
        {/* CTA buttons */}
        <div className="flex gap-3 mt-2">
          <ShimmerBlock className="h-11 w-36 rounded-lg" />
          <ShimmerBlock className="h-11 w-32 rounded-lg" />
        </div>
      </div>
      {/* Side image placeholder */}
      <ShimmerBlock className="w-full md:w-80 h-56 rounded-2xl shrink-0 z-10" />
    </div>
  );
}

// ─────────────────────────────────────────────
// 6. SkeletonStatBar
// ─────────────────────────────────────────────
export function SkeletonStatBar() {
  return (
    <div className="w-full rounded-xl border border-zinc-800/80 bg-zinc-950 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-lg shadow-black/60">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          {/* Big number ghost */}
          <ShimmerBlock className="h-9 w-24 rounded-lg" />
          {/* Label ghost */}
          <ShimmerBlock className="h-3 w-20 rounded-md" />
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// 7. SkeletonPageLayout
// ─────────────────────────────────────────────
export function SkeletonPageLayout() {
  return (
    <div className="w-full rounded-xl border border-zinc-800/80 bg-zinc-950 overflow-hidden flex flex-col shadow-xl shadow-black/70" style={{ minHeight: 340 }}>
      {/* Top nav ghost */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-zinc-800 bg-zinc-900/90">
        <ShimmerBlock className="h-7 w-24 rounded-md" />
        <div className="flex gap-3 ml-auto">
          <ShimmerBlock className="h-7 w-16 rounded-md" />
          <ShimmerBlock className="h-7 w-16 rounded-md" />
          <ShimmerBlock className="h-7 w-7 rounded-full" />
        </div>
      </div>
      {/* Body row */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar ghost (desktop only) */}
        <div className="hidden md:flex w-52 border-r border-zinc-800 p-4 flex-col gap-3 bg-zinc-900/60">
          <ShimmerBlock className="h-8 w-full rounded-lg" />
          <ShimmerBlock className="h-7 w-5/6 rounded-lg" />
          <ShimmerBlock className="h-7 w-4/5 rounded-lg" />
          <ShimmerBlock className="h-7 w-full rounded-lg" />
          <ShimmerBlock className="h-7 w-3/4 rounded-lg" />
          <div className="mt-auto">
            <ShimmerBlock className="h-10 w-full rounded-xl" />
          </div>
        </div>
        {/* Main content ghost */}
        <div className="flex-1 p-6 flex flex-col gap-4 bg-zinc-950">
          <ShimmerBlock className="h-6 w-1/3 rounded-lg" />
          <div className="grid grid-cols-3 gap-4">
            <ShimmerBlock className="h-20 rounded-xl col-span-1" />
            <ShimmerBlock className="h-20 rounded-xl col-span-1" />
            <ShimmerBlock className="h-20 rounded-xl col-span-1" />
          </div>
          <ShimmerBlock className="h-32 w-full rounded-xl" />
          <ShimmerBlock className="h-4 w-2/3 rounded-md" />
          <ShimmerBlock className="h-4 w-1/2 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 8. SkeletonForm
// ─────────────────────────────────────────────
export function SkeletonForm() {
  return (
    <div className="w-full rounded-xl border border-zinc-800/80 bg-zinc-950 p-6 flex flex-col gap-5 max-w-md shadow-xl shadow-black/60">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          {/* Label ghost */}
          <ShimmerBlock className="h-3 w-24 rounded-md" />
          {/* Input field ghost */}
          <ShimmerBlock className="h-10 w-full rounded-lg" />
        </div>
      ))}
      {/* Submit button ghost */}
      <ShimmerBlock className="h-11 w-full rounded-lg mt-2" />
    </div>
  );
}
