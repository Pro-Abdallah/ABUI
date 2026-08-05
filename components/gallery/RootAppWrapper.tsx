"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/features/WelcomeScreen/WelcomeScreen";

export default function RootAppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Check if splash was already shown in this session
    const splashSeen = sessionStorage.getItem("splashSeen");
    if (splashSeen) {
      setShowSplash(false);
    }
    setIsMounted(true);

    // Dark Mode initialization
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-ag-theme-mode", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-ag-theme-mode", "light");
    }
  }, []);

  if (!isMounted) {
    // Return empty content with dark background to prevent layout flashes
    return <div className="min-h-screen bg-[#09090b]" />;
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <WelcomeScreen
            key="splash"
            name="Developer"
            systemName="AB UI Gallery"
            onComplete={() => setShowSplash(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        key="main-content"
        initial={showSplash ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen flex flex-col"
      >
        {children}
      </motion.div>
    </>
  );
}
