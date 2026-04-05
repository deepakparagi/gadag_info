import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "monogram" | "minimal";
  scale?: number;
}

/**
 * GADAG INFO. — Illustrative Brand Identity (v2026)
 * Integration of the community-sourced heritage illustration.
 */
export function Logo({ className, variant = "full", scale = 1 }: LogoProps) {
  const size = variant === "monogram" ? 48 : 56;
  const desktopSize = variant === "full" ? 64 : 60;

  return (
    <div 
      className={cn("flex items-center gap-4 select-none group", className)}
      style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}
    >
      <div className="relative flex items-center justify-center shrink-0">
        {/* Architectural Frame (Subtle) */}
        <div className="absolute inset-[-4px] rounded-full border border-gold/10 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out-expo" />
        
        {/* Main Illustrative Mark */}
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-white/10 glass-card p-0.5 group-hover:border-gold/30 transition-colors duration-700">
          <Image
            src="/logo.jpg"
            alt="Gadag Info Branding"
            fill
            className="object-cover rounded-full group-hover:scale-110 transition-transform duration-1000 ease-out-expo"
            priority
          />
        </div>

        {/* Ambient Refraction Glow */}
        <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      </div>

      {variant === "full" && (
        <div className="flex flex-col -mt-0.5">
          <span className="font-display text-[1.4rem] leading-none tracking-tight text-foreground font-light flex items-baseline">
            GADAG
            <span className="ml-1.5 font-mono text-[8px] uppercase tracking-[0.5em] text-foreground/20 self-end mb-[0.1rem]">
              INFO.
            </span>
          </span>
          <span className="font-mono text-[6px] uppercase tracking-[0.6em] text-gold/60 mt-1.5 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
            Heritage Archive
          </span>
        </div>
      )}
    </div>
  );
}

