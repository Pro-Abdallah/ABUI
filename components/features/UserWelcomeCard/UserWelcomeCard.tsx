"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Cpu,
  Briefcase,
  Palette,
  ShieldCheck,
  Stethoscope,
  MapPin,
} from "lucide-react";
import styles from "./UserWelcomeCard.module.css";

/* ─── Types ──────────────────────────────────────────────────────────── */
export type UserRole =
  | "student"
  | "engineer"
  | "designer"
  | "manager"
  | "admin"
  | "doctor";

export type CardLayout = "horizontal" | "vertical" | "compact";
export type CardTheme  = "gradient" | "glass" | "dark" | "light" | "brand";

export interface UserWelcomeCardProps {
  /** User's display name */
  name?: string;
  /** User role — controls icon, badge label, and colour palette */
  role?: UserRole;
  /** Sub-label shown under the role badge */
  department?: string;
  /** Location string */
  location?: string;
  /** Custom greeting prefix — defaults to time-aware greeting */
  greeting?: string;
  /** Show the shimmer sweep animation on mount */
  showShimmer?: boolean;
  /** Show floating particle orbs */
  showParticles?: boolean;
  /** Card layout */
  layout?: CardLayout;
  /** Visual theme */
  theme?: CardTheme;
  /** Override the primary colour (hex) */
  primaryColor?: string;
  /** Override the secondary colour (hex) */
  secondaryColor?: string;
  /** Border radius in px */
  borderRadius?: number;
  /** Re-trigger the entry animation (increment to replay) */
  animationKey?: number;
}

/* ─── Role config ────────────────────────────────────────────────────── */
interface RoleCfg {
  label: string;
  Icon: React.ElementType;
  gradient: string;       // Tailwind gradient classes
  badgeBg: string;        // Tailwind bg for badge
  badgeText: string;      // Tailwind text colour for badge
  glowColor: string;      // CSS rgba for drop-glow
}

const ROLE_CFG: Record<UserRole, RoleCfg> = {
  student: {
    label: "Student",
    Icon: GraduationCap,
    gradient: "from-blue-600 via-blue-500 to-indigo-600",
    badgeBg: "bg-blue-500/20",
    badgeText: "text-blue-200",
    glowColor: "rgba(59,130,246,0.35)",
  },
  engineer: {
    label: "Engineer",
    Icon: Cpu,
    gradient: "from-violet-600 via-purple-500 to-fuchsia-600",
    badgeBg: "bg-violet-500/20",
    badgeText: "text-violet-200",
    glowColor: "rgba(139,92,246,0.35)",
  },
  designer: {
    label: "Designer",
    Icon: Palette,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    badgeBg: "bg-rose-500/20",
    badgeText: "text-rose-200",
    glowColor: "rgba(244,63,94,0.35)",
  },
  manager: {
    label: "Manager",
    Icon: Briefcase,
    gradient: "from-amber-500 via-orange-500 to-red-500",
    badgeBg: "bg-amber-500/20",
    badgeText: "text-amber-200",
    glowColor: "rgba(245,158,11,0.35)",
  },
  admin: {
    label: "Admin",
    Icon: ShieldCheck,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-200",
    glowColor: "rgba(16,185,129,0.35)",
  },
  doctor: {
    label: "Doctor",
    Icon: Stethoscope,
    gradient: "from-sky-500 via-cyan-500 to-teal-500",
    badgeBg: "bg-sky-500/20",
    badgeText: "text-sky-200",
    glowColor: "rgba(14,165,233,0.35)",
  },
};

/* ─── Theme config ───────────────────────────────────────────────────── */
interface ThemeCfg {
  card: string;
  name: string;
  sub: string;
}

const THEME_CFG: Record<CardTheme, ThemeCfg> = {
  gradient: {
    card: "text-white",
    name: "text-white",
    sub:  "text-white/70",
  },
  glass: {
    card: "text-white bg-white/10 backdrop-blur-xl border border-white/20",
    name: "text-white",
    sub:  "text-white/65",
  },
  dark: {
    card: "bg-slate-900 border border-slate-800 text-white",
    name: "text-white",
    sub:  "text-slate-400",
  },
  light: {
    card: "bg-white border border-slate-200 text-slate-900",
    name: "text-slate-900",
    sub:  "text-slate-500",
  },
  brand: {
    card: "border text-white",
    name: "text-white",
    sub:  "text-white/70",
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────── */
function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* 5 fixed particle positions so SSR/CSR match (no Math.random on render) */
const PARTICLES = [
  { top: "20%", left: "10%", size: 6,  dur: "2.2s", delay: "0s"    },
  { top: "60%", left: "80%", size: 8,  dur: "2.8s", delay: "0.4s"  },
  { top: "75%", left: "20%", size: 5,  dur: "2.0s", delay: "0.8s"  },
  { top: "15%", left: "70%", size: 7,  dur: "3.1s", delay: "0.2s"  },
  { top: "50%", left: "50%", size: 4,  dur: "2.5s", delay: "1.1s"  },
];

/* ─── Component ──────────────────────────────────────────────────────── */
export default function UserWelcomeCard({
  name            = "Alex Johnson",
  role            = "engineer",
  department      = "Frontend Systems",
  location        = "San Francisco, CA",
  greeting,
  showShimmer     = true,
  showParticles   = true,
  layout          = "horizontal",
  theme           = "gradient",
  primaryColor,
  secondaryColor,
  borderRadius    = 20,
  animationKey    = 0,
}: UserWelcomeCardProps) {
  const roleCfg  = ROLE_CFG[role]  ?? ROLE_CFG.engineer;
  const themeCfg = THEME_CFG[theme] ?? THEME_CFG.gradient;
  const RoleIcon = roleCfg.Icon;

  const greetingText = greeting ?? getTimeGreeting();

  /* typewriter for the name */
  const [displayName, setDisplayName] = useState("");
  const [nameDone, setNameDone]       = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDisplayName("");
    setNameDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setDisplayName(name.slice(0, i));
      if (i < name.length) {
        timerRef.current = setTimeout(tick, 48);
      } else {
        setNameDone(true);
      }
    };
    timerRef.current = setTimeout(tick, 520);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [name, animationKey]);

  /* ── Resolve background style inline (no Tailwind gradient classes)
     so colours transition live without re-mounting the motion.div ── */
  const isGradientTheme = theme === "gradient" || theme === "brand";

  /* For gradient/brand: build the CSS gradient from either custom colours
     or the role's fixed colour stops (extracted as CSS values)            */
  const roleGradientMap: Record<UserRole, [string, string]> = {
    student:  ["#2563eb", "#4338ca"],
    engineer: ["#7c3aed", "#c026d3"],
    designer: ["#f43f5e", "#d946ef"],
    manager:  ["#f59e0b", "#ef4444"],
    admin:    ["#10b981", "#0891b2"],
    doctor:   ["#0ea5e9", "#14b8a6"],
  };
  const [stop1, stop2] = roleGradientMap[role] ?? roleGradientMap.engineer;

  const backgroundValue = isGradientTheme
    ? (primaryColor && secondaryColor
        ? `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
        : `linear-gradient(135deg, ${stop1} 0%, ${stop2} 100%)`)
    : undefined;

  const cardBgStyle: React.CSSProperties = {
    background:   backgroundValue,
    borderRadius: borderRadius,
    transition:   "background 0.3s ease, border-radius 0.25s ease, box-shadow 0.3s ease",
  };

  /* Static bg classes for non-gradient themes (no re-mount risk) */
  const staticBgClass =
    theme === "dark"  ? "bg-slate-900 border border-slate-800" :
    theme === "light" ? "bg-white border border-slate-200" :
    theme === "glass" ? "bg-white/10 backdrop-blur-xl border border-white/20" :
    ""; /* gradient / brand — handled by inline style */

  const isVertical = layout === "vertical";
  const isCompact  = layout === "compact";

  return (
    <motion.div
      key={animationKey}
      className={`relative overflow-hidden select-none ${staticBgClass} ${themeCfg.card} ${isCompact ? "p-4" : "p-6"}`}
      style={{
        ...cardBgStyle,
        boxShadow: isGradientTheme
          ? `0 20px 60px -12px ${roleCfg.glowColor}, 0 8px 24px -8px rgba(0,0,0,0.3)`
          : undefined,
      }}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Shimmer sweep */}
      {showShimmer && (
        <div key={`shimmer-${animationKey}`} className={`${styles.shimmer} absolute inset-0 pointer-events-none`} style={{ borderRadius }} />
      )}

      {/* Spinning border ring (gradient / brand only) */}
      {isGradientTheme && (
        <div
          className={`absolute inset-0 pointer-events-none rounded-[inherit] ${styles.borderSpin}`}
          style={{ borderRadius }}
        />
      )}

      {/* Floating particles */}
      {showParticles && (isGradientTheme || theme === "glass") && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius }}>
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-white/25 ${styles.particle}`}
              style={{
                top: p.top, left: p.left,
                width: p.size, height: p.size,
                ["--dur" as string]: p.dur,
                ["--delay" as string]: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Main layout ─────────────────────────────── */}
      <div className={`relative z-10 flex ${isVertical ? "flex-col items-center text-center gap-4" : isCompact ? "flex-row items-center gap-4" : "flex-row items-start gap-5"}`}>

        {/* Avatar */}
        <motion.div
          className={`relative shrink-0 ${styles.avatarPulse}`}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1,   opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.45, type: "spring", stiffness: 260, damping: 18 }}
        >
          <div className={`${isCompact ? "w-12 h-12" : isVertical ? "w-20 h-20" : "w-16 h-16"} rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center shadow-lg`}>
            <span className={`font-extrabold text-white ${isCompact ? "text-base" : isVertical ? "text-2xl" : "text-xl"}`}>
              {name.split(" ").map(w => w[0]).slice(0, 2).join("")}
            </span>
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white/50 shadow-sm" />
        </motion.div>

        {/* Text block */}
        <div className={`flex-1 min-w-0 ${isVertical ? "flex flex-col items-center" : ""}`}>

          {/* Greeting */}
          <motion.p
            className={`text-[11px] font-semibold uppercase tracking-widest mb-0.5 ${themeCfg.sub}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0  }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            {greetingText}
          </motion.p>

          {/* Name with typewriter */}
          <div className={`font-extrabold leading-tight tracking-tight ${isCompact ? "text-lg" : isVertical ? "text-2xl" : "text-2xl"} ${themeCfg.name}`}>
            <span>{displayName}</span>
            {!nameDone && <span className={styles.caret} />}
          </div>

          {/* Role badge + department */}
          <div className={`flex items-center gap-2 mt-2 ${isVertical ? "justify-center flex-wrap" : "flex-wrap"}`}>
            <motion.div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${roleCfg.badgeBg} ${roleCfg.badgeText} ${styles.badgePop}`}
              style={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <RoleIcon size={12} />
              <span>{roleCfg.label}</span>
            </motion.div>

            {department && (
              <motion.span
                className={`text-[11px] font-medium ${themeCfg.sub}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
              >
                · {department}
              </motion.span>
            )}
          </div>

          {/* Location */}
          {location && !isCompact && (
            <motion.div
              className={`flex items-center gap-1 mt-2 text-[11px] ${themeCfg.sub} ${isVertical ? "justify-center" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <MapPin size={11} />
              <span>{location}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
