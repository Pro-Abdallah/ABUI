"use client";

import React, { useState } from "react";
import WelcomeScreen from "@/components/features/WelcomeScreen/WelcomeScreen";
import ComponentCard from "@/components/gallery/ComponentCard";
import { generateWelcomeScreenCode } from "@/lib/codeTemplates";
import { Play, Sparkles } from "lucide-react";
import { ControlField } from "@/components/gallery/PreviewModal";

export default function WelcomeScreenPage() {
  const [triggerSplash, setTriggerSplash] = useState(false);
  const [splashConfig, setSplashConfig] = useState<Record<string, any>>({
    name: "Alex",
    systemName: "AB UI Dev Center",
    nameColor: "#ef4444",
    delayBeforeOut: 2000,
    animateDuration: 0.8,
    skippable: true,
  });

  const controls: ControlField[] = [
    {
      name: "name",
      label: "Name to Greet",
      type: "text",
      defaultValue: "Alex",
    },
    {
      name: "systemName",
      label: "System/App Name",
      type: "text",
      defaultValue: "AB UI Dev Center",
    },
    {
      name: "nameColor",
      label: "Name Red Color Picker",
      type: "color",
      defaultValue: "#ef4444",
    },
    {
      name: "delayBeforeOut",
      label: "Hold Delay (ms)",
      type: "slider",
      defaultValue: 2000,
      min: 500,
      max: 5000,
      step: 100,
    },
    {
      name: "animateDuration",
      label: "Transition Duration (s)",
      type: "slider",
      defaultValue: 0.8,
      min: 0.2,
      max: 3,
      step: 0.1,
    },
    {
      name: "skippable",
      label: "Skippable by Clicking",
      type: "boolean",
      defaultValue: true,
    },
  ];

  const handleTestSplash = (config: Record<string, any>) => {
    setSplashConfig(config);
    // Temporarily clear sessionStorage to force the splash to appear
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("splashSeen");
    }
    setTriggerSplash(true);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Dynamic welcome screen trigger */}
      {triggerSplash && (
        <div className="fixed inset-0 z-9999">
          <WelcomeScreen
            name={splashConfig.name}
            systemName={splashConfig.systemName}
            nameColor={splashConfig.nameColor}
            delayBeforeOut={splashConfig.delayBeforeOut}
            animateDuration={splashConfig.animateDuration}
            skippable={splashConfig.skippable}
            onComplete={() => setTriggerSplash(false)}
          />
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Welcome & Splash Screens
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          An elegant entrance splash overlay powered by <strong>Framer Motion</strong>. Animates a customized greeting, transitions seamlessly to the root website layout, and ensures the animation only fires on initial load via session persistence.
        </p>
      </div>

      {/* Configuration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ComponentCard
          title="Framer Motion Splash Screen"
          description="Interactive overlay. Adjust duration, color highlights, delays, and triggers. Generates copyable JSX component."
          tags={["framer-motion", "overlay", "splash"]}
          controls={controls}
          renderComponent={(config) => (
            <button
              onClick={() => handleTestSplash(config)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Play size={15} fill="white" />
              <span>Preview Fullscreen Splash</span>
            </button>
          )}
          generateCode={generateWelcomeScreenCode}
        />

        {/* Info card detailing implementation specs */}
        <div className="flex flex-col justify-between border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-900/60 shadow-sm">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Sparkles size={14} className="text-blue-500" />
              Splash Integration Specifications
            </h4>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc list-inside leading-relaxed">
              <li>Uses <code className="font-mono text-rose-500">sessionStorage</code> to prevent re-triggering on route changes.</li>
              <li>Includes an optional skippable click listener.</li>
              <li>Uses <code className="font-mono text-rose-500">AnimatePresence</code> to handle DOM exit transitions.</li>
              <li>Configurable typography sizes and color parameters.</li>
            </ul>
          </div>
          <button
            onClick={() => handleTestSplash(splashConfig)}
            className="w-full flex items-center justify-center gap-2 py-3 mt-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-foreground font-semibold text-xs transition-all cursor-pointer"
          >
            Reset Session & Test Default Splash
          </button>
        </div>
      </div>
    </div>
  );
}
