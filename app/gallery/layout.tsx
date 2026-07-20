"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/gallery/Sidebar";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode state
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const handleToggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-ag-theme-mode", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-ag-theme-mode", "light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-background text-foreground">
      {/* Sidebar container */}
      <Sidebar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

      {/* Main Workspace content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
