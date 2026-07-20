"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface WelcomeScreenProps {
  name?: string;
  systemName?: string;
  nameColor?: string; // Hex or tailwind class style
  bgGradient?: string;
  delayBeforeOut?: number; // duration to hold (ms)
  animateDuration?: Doverride; // fade duration (seconds)
  skippable?: boolean;
  onComplete?: () => void;
}

type Doverride = number;

export default function WelcomeScreen({
  name = "Developer",
  systemName = "AB UI Kit",
  nameColor = "#ef4444", // Red-500
  bgGradient = "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
  delayBeforeOut = 1800,
  animateDuration = 0.8,
  skippable = true,
  onComplete,
}: WelcomeScreenProps) {
  const [visible, setVisible] = useState(true);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  useEffect(() => {
    // Check if user has already seen it in this session
    if (typeof window !== "undefined") {
      const splashSeen = sessionStorage.getItem("splashSeen");
      if (splashSeen) {
        setVisible(false);
        if (onComplete) onComplete();
      }
      setHasCheckedSession(true);
    }
  }, [onComplete]);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      handleComplete();
    }, delayBeforeOut);

    return () => clearTimeout(timer);
  }, [visible, delayBeforeOut]);

  const handleComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("splashSeen", "true");
    }
    setVisible(false);
    if (onComplete) onComplete();
  };

  if (!hasCheckedSession || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-9999 flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
        style={{ background: bgGradient }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: animateDuration, ease: "easeInOut" }}
        onClick={skippable ? handleComplete : undefined}
      >
        {/* Decorative background glow circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center">
          {/* Animated Greeting */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            Hello, <span style={{ color: nameColor }}>{name}</span>
          </motion.h1>

          {/* Divider Line */}
          <motion.div
            className="w-20 h-[2px] mb-4 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />

          {/* System Name */}
          <motion.p
            className="text-lg md:text-2xl font-light text-slate-400 tracking-wide"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            {systemName}
          </motion.p>
        </div>

        {/* Skippable hint */}
        {skippable && (
          <motion.div
            className="absolute bottom-8 text-sm text-slate-500 font-medium hover:text-slate-400 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.2, 0.6] }}
            transition={{
              delay: 1.0,
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Click anywhere to skip
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
