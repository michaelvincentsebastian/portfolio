"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  isActive: boolean;
  sectionKey: string;
}

export function SectionWrapper({
  children,
  isActive,
  sectionKey,
}: SectionWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.section
          key={sectionKey}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex w-full flex-col items-center px-4 py-20 pb-28 md:min-h-screen md:py-16 md:pl-28 md:pr-8 lg:pl-32 lg:pr-16"
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
