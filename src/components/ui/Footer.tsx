"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { T } from "@/components/ui/T";
import { Logo } from "@/components/ui/Logo";


/* ─── Data ─── */
const NAV_LINKS = [
  { labelEn: "The Manifesto", labelKn: "ಮ್ಯಾನಿಫೆಸ್ಟೋ", subEn: "Our Story", subKn: "ನಮ್ಮ ಕಥೆ", href: "/about", num: "01" },
  { labelEn: "Archive Stories", labelKn: "ಆರ್ಕೈವ್ ಕಥೆಗಳು", subEn: "Cultural Deep Dives", subKn: "ಸಾಂಸ್ಕೃತಿಕ ನೋಟ", href: "/stories", num: "02" },
  { labelEn: "City Calendar", labelKn: "ಕಾರ್ಯಕ್ರಮಗಳು", subEn: "What's Happening", subKn: "ಮುಂಬರುವ ಸಮಾರಂಭಗಳು", href: "/events", num: "03" },
  { labelEn: "Visual Gallery", labelKn: "ಚಿತ್ರ-ಶಾಲೆ", subEn: "Gadag in Frames", subKn: "ಗದಗಿನ ಚಿತ್ರಗಳು", href: "/gallery", num: "04" },
  { labelEn: "Partner With Us", labelKn: "ಪಾಲುದಾರರಾಗಿ", subEn: "Reach 114K Voices", subKn: "೧.೧೪ ಲಕ್ಷ ಧ್ವನಿಗಳನ್ನು ತಲುಪಿ", href: "/promote", num: "05" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/gadag_info" },
  { label: "YouTube", href: "#" },
];

/* ─── Live Clock ─── */
function LiveClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <span
        suppressHydrationWarning
        className="font-mono text-[clamp(2rem,4vw,3.5rem)] text-white/85 tabular-nums tracking-tight leading-none font-light"
      >
        {time}
      </span>
      <span
        suppressHydrationWarning
        className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/20"
      >
        {date}
      </span>
    </div>
  );
}

/* ─── Magnetic Scroll-to-Top Orb ─── */
function MagneticOrb() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/10 hover:border-gold/30 flex items-center justify-center cursor-pointer transition-colors duration-700 group"
      aria-label="Scroll to top"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 40px rgba(212, 175, 55, 0.15)" }}
          />
        )}
      </AnimatePresence>

      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <path
          d="M8 13V3M8 3L3 8M8 3L13 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/30 group-hover:text-gold transition-colors duration-500"
        />
      </motion.svg>

      <svg
        className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        viewBox="0 0 100 100"
      >
        <defs>
          <path
            id="circlePath"
            d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          />
        </defs>
        <text
          fill="rgba(212,175,55,0.4)"
          fontSize="7"
          fontFamily="var(--font-mono)"
          letterSpacing="4"
        >
          <textPath href="#circlePath">
            BACK TO TOP • BACK TO TOP •
          </textPath>
        </text>
      </svg>
    </motion.button>
  );
}

/* ─── Decorative SVG Corner Bracket ─── */
function CornerBracket({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M1 8V1H8"
        stroke="rgba(212,175,55,0.2)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   FOOTER — Main Component
   ═══════════════════════════════════════════ */
export default function Footer() {
  const wrapperRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });

  const ghostY = useTransform(scrollYProgress, [0, 1], ["8%", "0%"]);
  const ghostOpacity = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <footer
      ref={wrapperRef}
      className="relative w-full overflow-hidden bg-background"
    >
      {/* ── Atmospheric ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full opacity-[0.025]"
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full opacity-[0.015]"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,1) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Animated gold hairline top ── */}
      <motion.div
        style={{ scaleX: lineScale, transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gold/50 via-gold/20 to-transparent"
      />

      {/* ── Ghost mega typography ── */}
      <motion.div
        style={{ y: ghostY, opacity: ghostOpacity }}
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <div className="font-display font-light text-[35vw] leading-none tracking-[-0.05em] text-white whitespace-nowrap opacity-[0.02]">
          GADAG
        </div>
      </motion.div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 xl:px-24">

        {/* ── Section 1: CTA Headline with gold gradient ── */}
        <div ref={ctaRef} className="pt-28 md:pt-40 pb-20 md:pb-28">
          {/* Coordinates label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[9px] uppercase tracking-[0.45em] text-gold/50 mb-10 md:mb-14 flex items-center gap-4"
          >
            <span className="w-8 h-px bg-gold/30" />
            <T en="15.432° N, 75.642° E — Gadag, Karnataka" kn="15.432° N, 75.642° E — ಗದಗ, ಕರ್ನಾಟಕ" />
          </motion.p>

          <h2 className="font-display font-light leading-[0.88] tracking-[-0.03em] text-[clamp(2.5rem,6.5vw,7.5rem)]">
            {/* Line 1 */}
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 50 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <T
                en={<><span className="text-white/90">Where </span><span className="text-gold italic">ancient</span></>}
                kn={<><span className="text-white/90">ಎಲ್ಲಿ </span><span className="text-gold italic">ಪ್ರಾಚೀನತೆಯು</span></>}
              />
            </motion.span>

            {/* Line 2 */}
            <motion.span
              className="block mt-1 md:mt-2"
              initial={{ opacity: 0, y: 50 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.8) 0%, #D4AF37 35%, #F5D76E 65%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <T en="stone whispers" kn="ಬೆಟ್ಟದ ಪಿಸುಮಾತುಗಳು" />
            </motion.span>

            {/* Line 3 */}
            <motion.span
              className="block mt-1 md:mt-2 italic"
              initial={{ opacity: 0, y: 50 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #D4AF37 0%, #F5D76E 25%, #D4AF37 50%, #B8860B 75%, #D4AF37 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmerGold 4s ease-in-out infinite",
              }}
            >
              <T en="become eternal." kn="ಶಾಶ್ವತವಾಗುತ್ತದೆಯೋ." />
            </motion.span>
          </h2>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={ctaInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 md:mt-14 w-full max-w-[280px] h-px bg-gradient-to-r from-gold/40 to-transparent origin-left"
          />
        </div>

        {/* ── Decorative hairlines ── */}
        <div className="relative">
          <div className="w-full h-px bg-white/[0.05]" />
          <CornerBracket className="absolute -top-3 -left-3 rotate-0" />
          <CornerBracket className="absolute -top-3 -right-3 rotate-90" />
        </div>

        {/* ── Section 2: Creative Editorial Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-14 md:py-20">

          {/* Left Column: Nav Links */}
          <div className="lg:col-span-5 lg:pr-12 xl:pr-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-6 h-px bg-gold/30" />
              <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-gold/40">
                <T en="Navigate" kn="ನ್ಯಾವಿಗೇಟ್" />
              </span>
            </motion.div>

            <div className="flex flex-col">
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    className="group relative flex items-center justify-between py-4 md:py-5 border-b border-white/[0.04] hover:border-gold/20 transition-colors duration-500"
                  >
                    {/* Hover background sweep */}
                    <span className="absolute inset-0 bg-gold/[0.02] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

                    <div className="relative flex items-baseline gap-5">
                      <span className="font-mono text-[8px] text-white/10 tabular-nums tracking-wider">
                        {item.num}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[clamp(0.9rem,1.5vw,1.15rem)] font-display font-light text-white/50 group-hover:text-white transition-colors duration-500">
                          <T en={item.labelEn} kn={item.labelKn} />
                        </span>
                        <span className="font-mono text-[7px] uppercase tracking-[0.35em] text-white/12 group-hover:text-gold/40 transition-colors duration-500">
                          <T en={item.subEn} kn={item.subKn} />
                        </span>
                      </div>
                    </div>

                    <motion.div
                      className="relative"
                      whileHover={{ x: 4, y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-white/8 group-hover:text-gold transition-colors duration-400" />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Center Divider with ornamental details */}
          <div className="hidden lg:flex lg:col-span-2 items-stretch justify-center relative">
            <div className="w-px h-full bg-white/[0.04] relative">
              {/* Gold dot at center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/30" />
              {/* Crosshair lines */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-7 h-px bg-white/[0.06]" />
            </div>
          </div>

          {/* Right Column: Clock + Socials + Status */}
          <div className="lg:col-span-5 lg:pl-0 flex flex-col justify-between mt-10 lg:mt-0">
            {/* Clock */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-gold/30" />
                <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-gold/40">
                  <T en="Local Time — IST" kn="ಸ್ಥಳೀಯ ಸಮಯ — IST" />
                </span>
              </div>
              <LiveClock />
            </motion.div>

            {/* Social links with creative treatment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-14"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-gold/30" />
                <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-gold/40">
                  <T en="Follow the Archive" kn="ಆರ್ಕೈವ್ ಅನ್ನು ಅನುಸರಿಸಿ" />
                </span>
              </div>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social relative px-5 py-2.5 border border-white/[0.06] rounded-full font-mono text-[8px] uppercase tracking-[0.35em] text-white/30 hover:text-gold hover:border-gold/25 transition-all duration-500 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gold/[0.03] scale-x-0 group-hover/social:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                    <span className="relative z-10">{s.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Live status badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-14 flex items-center gap-4 px-4 py-3 border border-white/[0.04] rounded-full w-max"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500/70" />
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/20">
                <T en="Gadag, Karnataka — Online" kn="ಗದಗ, ಕರ್ನಾಟಕ — ಆನ್‌ಲೈನ್" />
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── Decorative hairlines ── */}
        <div className="relative">
          <div className="w-full h-px bg-white/[0.05]" />
          <CornerBracket className="absolute -bottom-3 -left-3 -rotate-90" />
          <CornerBracket className="absolute -bottom-3 -right-3 rotate-180" />
        </div>

        {/* ── Section 3: Bottom Bar ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-12 gap-8">
          {/* Credits & Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12"
          >
            <Logo variant="minimal" scale={0.8} />
            
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.45em] text-white/12">
                <T en={`© ${new Date().getFullYear()} Gadag Info — All rights reserved`} kn={`© ${new Date().getFullYear()} ಗದಗ ಇನ್ಫೋ — ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ`} />
              </p>
              <a
                href="https://deepakparagi.github.io/Deepak-Paragi-Portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/credit font-mono text-[8px] uppercase tracking-[0.35em] text-white/20 hover:text-gold transition-colors duration-500 flex items-center gap-2.5 w-max"
              >
                <span className="w-4 h-px bg-white/12 group-hover/credit:bg-gold/40 group-hover/credit:w-8 transition-all duration-500" />
                <T en="Designed & Built by Deepak Paragi" kn="ವಿನ್ಯಾಸ ಮತ್ತು ಅಭಿವೃದ್ಧಿ ದೀಪಕ್ ಪರಗಿ" />
                <ArrowUpRight className="w-3 h-3 opacity-30 group-hover/credit:opacity-90 group-hover/credit:translate-x-0.5 group-hover/credit:-translate-y-0.5 transition-all duration-400" />
              </a>
            </div>
          </motion.div>

          {/* Magnetic scroll-to-top orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticOrb />
          </motion.div>
        </div>
      </div>

      {/* ── Bottom atmosphere ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background/50 to-transparent pointer-events-none" />
    </footer>
  );
}
