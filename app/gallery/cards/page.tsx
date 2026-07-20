"use client";

import React from "react";
import ComponentCard from "@/components/gallery/ComponentCard";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import { ControlField } from "@/components/gallery/PreviewModal";

export default function CardsPage() {
  const infoCardControls: ControlField[] = [
    {
      name: "cardTitle",
      label: "Card Title",
      type: "text",
      defaultValue: "Enterprise Security Built Right",
    },
    {
      name: "description",
      label: "Description Text",
      type: "text",
      defaultValue: "Protect assets globally with automatic threat shields and low latency access tunnels.",
    },
    {
      name: "buttonText",
      label: "CTA Button Text",
      type: "text",
      defaultValue: "Start Securing Today",
    },
    {
      name: "glowEffect",
      label: "Enable Ambient Glow",
      type: "boolean",
      defaultValue: true,
    },
  ];

  const priceCardControls: ControlField[] = [
    {
      name: "planName",
      label: "Plan Name",
      type: "text",
      defaultValue: "Professional",
    },
    {
      name: "price",
      label: "Monthly Price ($)",
      type: "number",
      defaultValue: 49,
    },
    {
      name: "featured",
      label: "Highlight Plan (Featured)",
      type: "boolean",
      defaultValue: true,
    },
  ];

  return (
    <div className="space-y-8 select-none">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Content & Product Cards
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Premium structural cards to present content, highlight analytics, or market pricing packages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Marketing Info Card */}
        <ComponentCard
          title="Ambient Marketing Card"
          description="Interactive marketing display card with conditional ambient borders, CTA button actions, and typography layouts."
          tags={["card", "marketing", "content"]}
          controls={infoCardControls}
          renderComponent={(config) => (
            <div
              className={`relative rounded-xl border p-5 bg-white dark:bg-slate-900 overflow-hidden shadow-sm flex flex-col justify-between h-[210px] ${
                config.glowEffect
                  ? "border-blue-500/50 shadow-blue-500/5 dark:shadow-blue-500/2"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            >
              {config.glowEffect && (
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
              )}
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-500 flex items-center gap-1">
                  <Sparkles size={11} />
                  New Module
                </span>
                <h4 className="text-sm font-bold text-foreground mt-1.5 leading-tight">
                  {config.cardTitle || "Enterprise Security Built Right"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-3">
                  {config.description ||
                    "Protect assets globally with automatic threat shields and low latency access tunnels."}
                </p>
              </div>
              <button className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-500 hover:text-blue-600 transition-colors mt-4 self-start cursor-pointer">
                <span>{config.buttonText || "Start Securing Today"}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}
          generateCode={(config) => `export default function MarketingCard() {
  return (
    <div className="relative rounded-xl border border-blue-500/50 p-6 bg-white dark:bg-slate-900 shadow-md">
      <h4 className="text-lg font-bold text-foreground">${config.cardTitle}</h4>
      <p className="text-sm text-slate-500 mt-2">${config.description}</p>
      <button className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:underline mt-4">
        <span>${config.buttonText}</span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}`}
        />

        {/* 2. SaaS Pricing Card */}
        <ComponentCard
          title="SaaS Tier Pricing Card"
          description="Pricing cards highlighting custom plans, recurring pricing, and checked feature options."
          tags={["pricing", "saas", "highlight"]}
          controls={priceCardControls}
          renderComponent={(config) => (
            <div
              className={`rounded-xl border p-5 bg-white dark:bg-slate-900 flex flex-col justify-between h-[210px] select-none ${
                config.featured
                  ? "border-blue-500 ring-2 ring-blue-500/10 shadow-md"
                  : "border-slate-200 dark:border-slate-800 shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {config.planName || "Professional"}
                  </span>
                  {config.featured && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-2xl font-extrabold text-foreground">${config.price ?? 49}</span>
                  <span className="text-[10px] font-semibold text-slate-500">/ month</span>
                </div>
                <ul className="space-y-1.5 mt-4 text-[10px] text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-1.5">
                    <Check size={11} className="text-blue-500 shrink-0" />
                    <span>Unlimited components export</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check size={11} className="text-blue-500 shrink-0" />
                    <span>Next.js 16 setup compliance</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          generateCode={(config) => `import { Check } from "lucide-react";

export default function PricingCard() {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900">
      <h3 className="text-sm font-bold text-slate-400 uppercase">${config.planName}</h3>
      <div className="text-3xl font-extrabold text-foreground mt-2">$${config.price} <span className="text-xs text-slate-500">/mo</span></div>
      <ul className="mt-4 space-y-2 text-sm text-slate-500">
        <li className="flex items-center gap-2"><Check size={16} className="text-blue-500" /> Unlimited components</li>
      </ul>
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}
