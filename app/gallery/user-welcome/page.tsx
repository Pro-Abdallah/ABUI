"use client";

import React, { useState, useRef, useEffect } from "react";
import ComponentCard from "@/components/gallery/ComponentCard";
import UserWelcomeCard from "@/components/features/UserWelcomeCard/UserWelcomeCard";
import { generateUserWelcomeCardCode } from "@/lib/codeTemplates";
import { ControlField } from "@/components/gallery/PreviewModal";
import { RefreshCw } from "lucide-react";

/* ─── Controls ────────────────────────────────────────────────────── */
const sharedControls: ControlField[] = [
  { name: "name",       label: "Full Name",          type: "text",    defaultValue: "Alex Johnson" },
  {
    name: "role", label: "User Role", type: "select", defaultValue: "engineer",
    options: [
      { label: "Student",  value: "student"  },
      { label: "Engineer", value: "engineer" },
      { label: "Designer", value: "designer" },
      { label: "Manager",  value: "manager"  },
      { label: "Admin",    value: "admin"    },
      { label: "Doctor",   value: "doctor"   },
    ],
  },
  { name: "department", label: "Department / Major", type: "text",    defaultValue: "Frontend Systems" },
  { name: "location",   label: "Location",           type: "text",    defaultValue: "San Francisco, CA" },
  {
    name: "theme", label: "Card Theme", type: "select", defaultValue: "gradient",
    options: [
      { label: "Gradient (role colour)", value: "gradient" },
      { label: "Glassmorphism",          value: "glass"    },
      { label: "Dark",                   value: "dark"     },
      { label: "Light",                  value: "light"    },
      { label: "Brand colour",           value: "brand"    },
    ],
  },
  {
    name: "layout", label: "Layout", type: "select", defaultValue: "horizontal",
    options: [
      { label: "Horizontal", value: "horizontal" },
      { label: "Vertical",   value: "vertical"   },
      { label: "Compact",    value: "compact"    },
    ],
  },
  { name: "primaryColor",   label: "Primary Colour",    type: "color",   defaultValue: "#3b82f6" },
  { name: "secondaryColor", label: "Secondary Colour",  type: "color",   defaultValue: "#8b5cf6" },
  { name: "borderRadius",   label: "Border Radius (px)",type: "slider",  defaultValue: 20, min: 0, max: 40, step: 2 },
  { name: "showShimmer",    label: "Entry Shimmer",      type: "boolean", defaultValue: true  },
  { name: "showParticles",  label: "Floating Particles", type: "boolean", defaultValue: true  },
];

/* ─── Replay wrapper ─────────────────────────────────────────────── */
function AnimatedPreview({ config, overrides = {} }: { config: Record<string, any>; overrides?: Record<string, any> }) {
  const merged = { ...config, ...overrides };

  // Only increment animationKey (re-triggers typewriter + entry motion)
  // when name/role actually change, or user clicks Replay.
  // All other prop changes (color, theme, borderRadius…) update live via CSS.
  const [replayKey, setReplayKey] = useState(0);
  const prevIdentity = useRef({ name: merged.name, role: merged.role });

  useEffect(() => {
    const prev = prevIdentity.current;
    if (prev.name !== merged.name || prev.role !== merged.role) {
      setReplayKey(k => k + 1);
      prevIdentity.current = { name: merged.name, role: merged.role };
    }
  }, [merged.name, merged.role]);

  return (
    <div className="w-full space-y-3">
      <UserWelcomeCard
        name={merged.name}
        role={merged.role}
        department={merged.department}
        location={merged.location}
        theme={merged.theme}
        layout={merged.layout}
        primaryColor={merged.primaryColor}
        secondaryColor={merged.secondaryColor}
        borderRadius={Number(merged.borderRadius ?? 20)}
        showShimmer={!!merged.showShimmer}
        showParticles={!!merged.showParticles}
        animationKey={replayKey}
      />
      <button
        onClick={() => setReplayKey(k => k + 1)}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
      >
        <RefreshCw size={12} />
        Replay animation
      </button>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */
export default function UserWelcomePage() {
  const [sandboxKey, setSandboxKey] = useState(0);

  return (
    <div className="space-y-10 select-none">

      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          User Welcome Card
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          A post-login welcome card that greets the user by name with a typewriter effect and
          displays their role (student, engineer, designer…) as an animated badge with department
          and location. Six roles · five themes · three layouts · full CSS animations.
        </p>
      </div>

      {/* Feature chips */}
      <div className="flex flex-wrap gap-2">
        {["Typewriter name","Role badge","Shimmer sweep","Floating particles","Spinning border ring","Avatar pulse","Time-aware greeting","Colour overrides","CSS Modules","TypeScript"].map(f => (
          <span key={f} className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
            {f}
          </span>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1 – Fully configurable */}
        <ComponentCard
          title="Gradient Welcome Card"
          description="Role-coloured gradient with shimmer sweep, typewriter name, animated role badge, floating particles, and department / location."
          tags={["gradient","typewriter","css-modules","typescript"]}
          controls={sharedControls}
          renderComponent={(config) => <AnimatedPreview config={config} />}
          generateCode={generateUserWelcomeCardCode}
        />

        {/* 2 – Dark */}
        <ComponentCard
          title="Dark Theme"
          description="Slate-900 background variant — same animations without the gradient. Perfect for dark-first dashboards."
          tags={["dark","clean","typescript"]}
          controls={[...sharedControls.slice(0,4), { ...sharedControls[4], defaultValue: "dark" }, ...sharedControls.slice(5)]}
          renderComponent={(config) => <AnimatedPreview config={config} overrides={{ theme: "dark" }} />}
          generateCode={(cfg) => generateUserWelcomeCardCode({ ...cfg, theme: "dark" })}
        />

        {/* 3 – Glass */}
        <ComponentCard
          title="Glassmorphism"
          description="Frosted-glass card over a dark gradient background. backdrop-blur-xl with white/10 fill."
          tags={["glass","backdrop-blur","typescript"]}
          controls={[...sharedControls.slice(0,4), { ...sharedControls[4], defaultValue: "glass" }, ...sharedControls.slice(5)]}
          renderComponent={(config) => (
            <div className="w-full rounded-2xl overflow-hidden p-1"
              style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#0f172a 100%)" }}>
              <AnimatedPreview config={config} overrides={{ theme: "glass" }} />
            </div>
          )}
          generateCode={(cfg) => generateUserWelcomeCardCode({ ...cfg, theme: "glass" })}
        />

        {/* 4 – Light */}
        <ComponentCard
          title="Light Theme"
          description="Clean white background with slate text. Role badge keeps its colour accent. Great for light-mode apps."
          tags={["light","minimal","typescript"]}
          controls={[...sharedControls.slice(0,4), { ...sharedControls[4], defaultValue: "light" }, ...sharedControls.slice(5)]}
          renderComponent={(config) => <AnimatedPreview config={config} overrides={{ theme: "light" }} />}
          generateCode={(cfg) => generateUserWelcomeCardCode({ ...cfg, theme: "light" })}
        />

        {/* 5 – Compact */}
        <ComponentCard
          title="Compact Layout"
          description="Single-row slim card for topbars or dashboard headers. Avatar + name + role badge only — no location."
          tags={["compact","slim","header","typescript"]}
          controls={[...sharedControls.slice(0,5), { ...sharedControls[5], defaultValue: "compact" }, ...sharedControls.slice(6)]}
          renderComponent={(config) => <AnimatedPreview config={config} overrides={{ layout: "compact" }} />}
          generateCode={(cfg) => generateUserWelcomeCardCode({ ...cfg, layout: "compact" })}
        />

        {/* 6 – Vertical */}
        <ComponentCard
          title="Vertical Centered"
          description="Avatar centered above the name and role — ideal for profile panels or sidebar headers."
          tags={["vertical","centered","profile","typescript"]}
          controls={[...sharedControls.slice(0,5), { ...sharedControls[5], defaultValue: "vertical" }, ...sharedControls.slice(6)]}
          renderComponent={(config) => <AnimatedPreview config={config} overrides={{ layout: "vertical" }} />}
          generateCode={(cfg) => generateUserWelcomeCardCode({ ...cfg, layout: "vertical" })}
        />
      </div>

      {/* All roles showcase */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-foreground mb-1">All Roles</h2>
        <p className="text-xs text-slate-400 mb-5">
          Each role gets its own gradient, icon, and badge colour — all driven by the{" "}
          <code className="font-mono text-rose-500 text-[11px]">role</code> prop.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {(
            [
              { role: "student",  name: "Maya Chen",     dept: "Computer Science" },
              { role: "engineer", name: "Alex Johnson",  dept: "Frontend Systems" },
              { role: "designer", name: "Sofia Reyes",   dept: "Product Design"   },
              { role: "manager",  name: "James Park",    dept: "Operations"       },
              { role: "admin",    name: "Taylor Green",  dept: "Platform Team"    },
              { role: "doctor",   name: "Dr. Avery Smith",dept: "Cardiology"      },
            ] as const
          ).map(({ role, name, dept }) => (
            <UserWelcomeCard
              key={role}
              name={name}
              role={role}
              department={dept}
              location="Remote"
              theme="gradient"
              layout="horizontal"
              showShimmer
              showParticles={false}
              borderRadius={16}
            />
          ))}
        </div>
      </div>

      {/* CSS explanation */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-foreground mb-1">CSS Animations</h2>
        <p className="text-xs text-slate-400 mb-5">
          Ships a <code className="font-mono text-rose-500 text-[11px]">UserWelcomeCard.module.css</code> file
          alongside the component. The code export includes both files.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "shimmer",    color: "bg-blue-500",    desc: "Single-pass light sweep across the card on mount." },
            { name: "ringPulse",  color: "bg-violet-500",  desc: "Avatar border expands and fades out like a sonar ping." },
            { name: "badgePop",   color: "bg-rose-500",    desc: "Role badge scales in with a spring overshoot." },
            { name: "floatUp",    color: "bg-emerald-500", desc: "5 particle orbs float upward — staggered, infinite." },
            { name: "borderSpin", color: "bg-amber-500",   desc: "Conic-gradient ring rotates using @property --angle." },
            { name: "caretBlink", color: "bg-sky-500",     desc: "Typewriter cursor blinks while the name is typing." },
          ].map(({ name, color, desc }) => (
            <div key={name} className="flex gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
              <div className={`w-2 rounded-full shrink-0 ${color} opacity-80`} />
              <div>
                <p className="text-xs font-bold text-foreground font-mono">{name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live sandbox */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-foreground">Live Sandbox</h2>
          <button
            onClick={() => setSandboxKey(k => k + 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-500 hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <RefreshCw size={13} />
            Replay all
          </button>
        </div>
        <p className="text-xs text-slate-400 mb-6">All four variants animating simultaneously.</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <UserWelcomeCard key={`a-${sandboxKey}`} animationKey={sandboxKey}
            name="Alex Johnson" role="engineer" department="Frontend Systems" location="San Francisco, CA"
            theme="gradient" layout="horizontal" showShimmer showParticles borderRadius={20} />

          <UserWelcomeCard key={`b-${sandboxKey}`} animationKey={sandboxKey}
            name="Maya Chen" role="student" department="Computer Science, MIT" location="Cambridge, MA"
            theme="dark" layout="horizontal" showShimmer showParticles={false} borderRadius={20} />

          <div className="rounded-2xl overflow-hidden p-1"
            style={{ background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 60%,#0f172a 100%)" }}>
            <UserWelcomeCard key={`c-${sandboxKey}`} animationKey={sandboxKey}
              name="Sofia Reyes" role="designer" department="Product Design" location="Barcelona, Spain"
              theme="glass" layout="horizontal" showShimmer showParticles borderRadius={16} />
          </div>

          <UserWelcomeCard key={`d-${sandboxKey}`} animationKey={sandboxKey}
            name="James Park" role="manager" department="Operations" location="Seoul, Korea"
            theme="light" layout="horizontal" showShimmer showParticles={false} borderRadius={20} />
        </div>
      </div>

    </div>
  );
}
