"use client";

import { motion } from "framer-motion";
import { T } from "@/components/ui/T";

export function KineticMarquee({
  text,
  textEn,
  textKn,
  speed = 25,
}: {
  text?: string;
  textEn?: string;
  textKn?: string;
  speed?: number;
}) {
  const content = textEn && textKn ? <T en={textEn} kn={textKn} /> : text;

  // Render an array to ensure the content repeats enough to fill the screen
  const repetitions = Array.from({ length: 6 });

  return (
    <div className="relative flex overflow-hidden whitespace-nowrap bg-gold/5 border-y border-white/5 py-3 md:py-4 w-full mix-blend-screen hidden md:flex">
      {/* Container 1 */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex shrink-0 min-w-max pr-8 gap-8"
      >
        {repetitions.map((_, i) => (
          <div key={`col1-${i}`} className="font-mono text-[9px] md:text-xs uppercase tracking-[0.3em] font-light text-white/50 whitespace-nowrap">
            {content}
          </div>
        ))}
      </motion.div>
      
      {/* Container 2 (Perfectly identical, sits right next to Container 1) */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex shrink-0 min-w-max pr-8 gap-8"
      >
        {repetitions.map((_, i) => (
          <div key={`col2-${i}`} className="font-mono text-[9px] md:text-xs uppercase tracking-[0.3em] font-light text-white/50 whitespace-nowrap">
            {content}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
