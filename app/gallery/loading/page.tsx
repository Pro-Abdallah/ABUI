"use client";

import React from "react";
import ComponentCard from "@/components/gallery/ComponentCard";
import {
  SkeletonCard,
  SkeletonCardGrid,
  SkeletonListItem,
  SkeletonList,
  SkeletonHero,
  SkeletonStatBar,
  SkeletonPageLayout,
  SkeletonForm,
} from "@/components/ui/skeletons";
import { ControlField } from "@/components/gallery/PreviewModal";

// Shared empty controls — skeletons have no configurable props
const noControls: ControlField[] = [];

export default function LoadingPage() {
  return (
    <div className="space-y-8 select-none">
      {/* ── Page Header ─────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Loading States
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
          On-brand shimmer skeletons for every surface — powered by Framer
          Motion with a <strong className="text-red-500 font-bold">crimson red sweep highlight</strong> that mirrors the live
          component structure they replace on a sleek dark background.
        </p>
      </div>

      {/* ── Grid of skeleton variants ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. SkeletonCard */}
        <ComponentCard
          title="SkeletonCard"
          description="Single card shimmer placeholder: image block, two text lines, a price ghost, and a button ghost. Mirrors program / product cards."
          tags={["skeleton", "card", "loading"]}
          controls={noControls}
          renderComponent={() => (
            <div className="w-full max-w-xs mx-auto bg-zinc-950 p-3 rounded-xl">
              <SkeletonCard />
            </div>
          )}
          generateCode={() => `"use client";
import {
  SkeletonCard,
} from "@/components/ui/skeletons";

export default function Example() {
  return <SkeletonCard />;
}`}
        />

        {/* 2. SkeletonCardGrid */}
        <ComponentCard
          title="SkeletonCardGrid"
          description="Responsive 2-col mobile / 3-col desktop grid of six SkeletonCards. Drop-in replacement for product / programme listing grids."
          tags={["skeleton", "grid", "loading"]}
          controls={noControls}
          renderComponent={() => (
            <div className="w-full bg-zinc-950 p-3 rounded-xl">
              <SkeletonCardGrid />
            </div>
          )}
          generateCode={() => `"use client";
import {
  SkeletonCardGrid,
} from "@/components/ui/skeletons";

export default function Example() {
  return <SkeletonCardGrid />;
}`}
        />

        {/* 3. SkeletonListItem */}
        <ComponentCard
          title="SkeletonListItem"
          description="Horizontal row with an avatar circle and two text-line ghosts. Matches testimonial, coach-bio, and leaderboard row layouts."
          tags={["skeleton", "list", "avatar"]}
          controls={noControls}
          renderComponent={() => (
            <div className="w-full bg-zinc-950 rounded-xl border border-zinc-800/80 overflow-hidden">
              <SkeletonListItem />
            </div>
          )}
          generateCode={() => `"use client";
import {
  SkeletonListItem,
} from "@/components/ui/skeletons";

export default function Example() {
  return <SkeletonListItem />;
}`}
        />

        {/* 4. SkeletonList */}
        <ComponentCard
          title="SkeletonList"
          description="Stack of five SkeletonListItems separated by dividers — a full placeholder for coach rosters, testimonial feeds, and leaderboards."
          tags={["skeleton", "list", "loading"]}
          controls={noControls}
          renderComponent={() => (
            <div className="w-full bg-zinc-950 rounded-xl p-3">
              <SkeletonList />
            </div>
          )}
          generateCode={() => `"use client";
import {
  SkeletonList,
} from "@/components/ui/skeletons";

export default function Example() {
  return <SkeletonList />;
}`}
        />

        {/* 5. SkeletonHero */}
        <ComponentCard
          title="SkeletonHero"
          description="Full-width hero section ghost: large heading, sub-heading, two CTA button ghosts, and a side image placeholder — for above-the-fold sections."
          tags={["skeleton", "hero", "cta"]}
          controls={noControls}
          renderComponent={() => (
            <div className="w-full bg-zinc-950 rounded-xl p-3">
              <SkeletonHero />
            </div>
          )}
          generateCode={() => `"use client";
import {
  SkeletonHero,
} from "@/components/ui/skeletons";

export default function Example() {
  return <SkeletonHero />;
}`}
        />

        {/* 6. SkeletonStatBar */}
        <ComponentCard
          title="SkeletonStatBar"
          description="A row of four stat blocks — big-number ghost + label ghost — matching transformation-stats / KPI banner sections."
          tags={["skeleton", "stats", "kpi"]}
          controls={noControls}
          renderComponent={() => (
            <div className="w-full bg-zinc-950 rounded-xl p-3">
              <SkeletonStatBar />
            </div>
          )}
          generateCode={() => `"use client";
import {
  SkeletonStatBar,
} from "@/components/ui/skeletons";

export default function Example() {
  return <SkeletonStatBar />;
}`}
        />

        {/* 7. SkeletonPageLayout */}
        <ComponentCard
          title="SkeletonPageLayout"
          description="Full-viewport shell: top nav bar ghost, collapsible sidebar ghost (desktop), and main content grid ghost — for dashboard and admin-page transitions."
          tags={["skeleton", "layout", "dashboard"]}
          controls={noControls}
          renderComponent={() => (
            <div className="w-full bg-zinc-950 rounded-xl p-3">
              <SkeletonPageLayout />
            </div>
          )}
          generateCode={() => `"use client";
import {
  SkeletonPageLayout,
} from "@/components/ui/skeletons";

export default function Example() {
  return <SkeletonPageLayout />;
}`}
        />

        {/* 8. SkeletonForm */}
        <ComponentCard
          title="SkeletonForm"
          description="Four label + input field ghosts stacked vertically with a submit button ghost — for intake forms, checkout flows, and settings pages."
          tags={["skeleton", "form", "loading"]}
          controls={noControls}
          renderComponent={() => (
            <div className="w-full bg-zinc-950 rounded-xl p-3 flex justify-center">
              <SkeletonForm />
            </div>
          )}
          generateCode={() => `"use client";
import {
  SkeletonForm,
} from "@/components/ui/skeletons";

export default function Example() {
  return <SkeletonForm />;
}`}
        />

      </div>
    </div>
  );
}
