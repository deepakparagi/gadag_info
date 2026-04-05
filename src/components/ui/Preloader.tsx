"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

/* ─── Heritage timeline fragments ─── */
const FRAGMENTS = [
  { year: "1070", text: "CHALUKYA DYNASTY" },
  { year: "1150", text: "TRIKUTESHWARA RISES" },
  { year: "1430", text: "KUMARAVYASA WRITES" },
  { year: "1857", text: "FREEDOM ECHOES" },
  { year: "1922", text: "BHIMSEN JOSHI" },
  { year: "2026", text: "ARCHIVE ONLINE" },
];

import { Logo } from "@/components/ui/Logo";


/* ─── 3D Orbiting Ring ─── */
function OrbitRing({
  radius,
  rotateX,
  rotateY,
  duration,
  delay,
  strokeColor,
  strokeWidth,
  dashArray,
  progress,
}: {
  radius: number;
  rotateX: number;
  rotateY: number;
  duration: number;
  delay: number;
  strokeColor: string;
  strokeWidth: number;
  dashArray?: string;
  progress: number;
}) {
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: "800px",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={{ rotateX: [rotateX, rotateX + 360], rotateY: [rotateY, rotateY + 360] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          width={radius * 2 + 20}
          height={radius * 2 + 20}
          viewBox={`0 0 ${radius * 2 + 20} ${radius * 2 + 20}`}
          fill="none"
          style={{ filter: `drop-shadow(0 0 ${strokeWidth * 3}px ${strokeColor})` }}
        >
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray || `${circumference}`}
            strokeDashoffset={dashArray ? 0 : dashOffset}
            strokeLinecap="round"
            fill="none"
            opacity={0.8}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─── 3D Rotating Sacred Geometry (Octahedron wireframe) ─── */
function SacredGeometry({ progress }: { progress: number }) {
  const size = 60;
  const scale = 0.5 + (progress / 100) * 0.5;

  // Octahedron vertices (top, bottom, 4 equatorial)
  const vertices = useMemo(() => [
    { x: 0, y: -size, z: 0 },       // top
    { x: 0, y: size, z: 0 },        // bottom
    { x: size, y: 0, z: 0 },        // right
    { x: -size, y: 0, z: 0 },       // left
    { x: 0, y: 0, z: size },        // front
    { x: 0, y: 0, z: -size },       // back
  ], [size]);

  // Edges connecting vertices
  const edges = useMemo(() => [
    [0, 2], [0, 3], [0, 4], [0, 5], // top to equator
    [1, 2], [1, 3], [1, 4], [1, 5], // bottom to equator
    [2, 4], [4, 3], [3, 5], [5, 2], // equatorial ring
  ], []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      style={{ perspective: "600px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 720],
          rotateZ: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          transformStyle: "preserve-3d",
          width: size * 2,
          height: size * 2,
          position: "relative",
          transform: `scale(${scale})`,
        }}
      >
        {/* Render edges as lines using CSS positioning */}
        <svg
          width={size * 3}
          height={size * 3}
          viewBox={`${-size * 1.5} ${-size * 1.5} ${size * 3} ${size * 3}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.4))" }}
        >
          {edges.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={vertices[a].x}
              y1={vertices[a].y}
              x2={vertices[b].x}
              y2={vertices[b].y}
              stroke="rgba(212,175,55,0.5)"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.08 }}
            />
          ))}
          {/* Vertex dots */}
          {vertices.map((v, i) => (
            <motion.circle
              key={`v-${i}`}
              cx={v.x}
              cy={v.y}
              r="2"
              fill="#D4AF37"
              initial={{ opacity: 0, r: 0 }}
              animate={{ opacity: 0.8, r: 2 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─── Floating 3D particles ─── */
function Particle3D({ index }: { index: number }) {
  const angle = (index / 30) * Math.PI * 2;
  const radius = 120 + Math.random() * 80;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const z = (Math.random() - 0.5) * 200;
  const particleSize = 1 + Math.random() * 2;
  const duration = 4 + Math.random() * 6;
  const delay = Math.random() * 3;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: particleSize,
        height: particleSize,
        background:
          particleSize > 2
            ? "radial-gradient(circle, #F5D76E, #D4AF37)"
            : "rgba(212,175,55,0.6)",
        left: "50%",
        top: "50%",
        boxShadow: particleSize > 2 ? "0 0 6px rgba(212,175,55,0.4)" : "none",
      }}
      initial={{
        x,
        y,
        z,
        opacity: 0,
      }}
      animate={{
        x: [x, x + (Math.random() - 0.5) * 60],
        y: [y, y - 40 - Math.random() * 80],
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Brand letter with 3D flip reveal ─── */
function BrandLetter({
  char,
  index,
  isGold,
  revealed,
}: {
  char: string;
  index: number;
  isGold: boolean;
  revealed: boolean;
}) {
  return (
    <motion.span
      className="inline-block font-display leading-none"
      style={{
        perspective: "500px",
        transformStyle: "preserve-3d",
        color: isGold ? "#D4AF37" : "rgba(255,255,255,0.9)",
        willChange: "transform, opacity",
        textShadow: isGold
          ? "0 0 30px rgba(212,175,55,0.3)"
          : "0 0 20px rgba(255,255,255,0.05)",
      }}
      initial={{
        rotateX: -90,
        opacity: 0,
        y: 60,
        filter: "blur(12px)",
      }}
      animate={
        revealed
          ? {
              rotateX: 0,
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 1.4,
        delay: 0.6 + index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════
   PRELOADER — Cinematic 3D Experience
   ═══════════════════════════════════════════ */
export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fragmentIndex, setFragmentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    const revealTimer = setTimeout(() => setRevealed(true), 400);

    const duration = 3400;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Cinematic easing
      const ease =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      setProgress(Math.floor(ease * 100));

      const nextIdx = Math.min(
        Math.floor(ease * FRAGMENTS.length),
        FRAGMENTS.length - 1
      );
      setFragmentIndex(nextIdx);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setLoading(false), 900);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      clearTimeout(revealTimer);
      if (typeof window !== "undefined") {
        document.body.style.overflow = "auto";
      }
    };
  }, []);

  const brandText = "GADAG";
  const goldIndices = new Set([1, 3]); // 'A' and 'A' are gold

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: {
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-background"
        >
          {/* ── Atmospheric base ── */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Central gold glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.06, scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,1) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            {/* Secondary ambient glow */}
            <motion.div
              className="absolute top-[30%] left-[30%] w-[300px] h-[300px] rounded-full"
              animate={{
                opacity: [0.02, 0.04, 0.02],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle, rgba(245,215,110,1) 0%, transparent 60%)",
                filter: "blur(80px)",
              }}
            />
          </div>

          {/* Noise overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-soft-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />

          {/* ── 3D Floating Particles ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ perspective: "600px", transformStyle: "preserve-3d" }}
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <Particle3D key={i} index={i} />
            ))}
          </div>

          {/* ── Top HUD ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-6 md:top-10 left-6 md:left-12 right-6 md:right-12 flex justify-between items-start"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.5em] text-white/20 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/80 animate-pulse" />
                Heritage Archive
              </span>
              <span className="font-mono text-[6px] md:text-[7px] uppercase tracking-[0.4em] text-white/10">
                v2026 — Initialization
              </span>
            </div>
            <div className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-white/15 text-right flex flex-col gap-1">
              <span>15.432° N</span>
              <span className="text-gold/40">75.641° E</span>
            </div>
          </motion.div>

          {/* ═══ CENTER 3D COMPOSITION ═══ */}
          <div
            className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
            style={{ perspective: "800px", transformStyle: "preserve-3d" }}
          >
            {/* 3D Orbiting Rings at different tilts */}
            <OrbitRing
              radius={130}
              rotateX={70}
              rotateY={0}
              duration={12}
              delay={0.2}
              strokeColor="rgba(212,175,55,0.25)"
              strokeWidth={0.5}
              dashArray="4 8"
              progress={progress}
            />
            <OrbitRing
              radius={110}
              rotateX={30}
              rotateY={60}
              duration={18}
              delay={0.4}
              strokeColor="rgba(212,175,55,0.35)"
              strokeWidth={0.8}
              progress={progress}
            />
            <OrbitRing
              radius={90}
              rotateX={-45}
              rotateY={120}
              duration={15}
              delay={0.6}
              strokeColor="rgba(245,215,110,0.3)"
              strokeWidth={0.6}
              dashArray="2 6"
              progress={progress}
            />
            <OrbitRing
              radius={70}
              rotateX={60}
              rotateY={-30}
              duration={10}
              delay={0.8}
              strokeColor="rgba(212,175,55,0.4)"
              strokeWidth={1}
              progress={progress}
            />

            {/* Sacred Geometry (Octahedron) at center */}
            <SacredGeometry progress={progress} />

            {/* Center content — Progress & glyph */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              {/* Gold progress number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateX: -45 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
                style={{ perspective: "400px" }}
              >
                <span
                  className="font-display text-6xl md:text-8xl font-light tabular-nums leading-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #D4AF37 0%, #F5D76E 30%, #D4AF37 60%, #B8860B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 20px rgba(212,175,55,0.2))",
                  }}
                >
                  {progress}
                </span>

                {/* Decorative crosshairs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-gold/15" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-3 bg-gold/15" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-3 bg-gold/15" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-3 bg-gold/15" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Brand Typography — 3D flip reveal ── */}
          <div className="absolute bottom-[28%] md:bottom-[25%] left-0 right-0 flex flex-col items-center gap-6">
            {/* GADAG letters */}
            <motion.div
              className="flex items-center justify-center scale-[1.5] md:scale-[2.4] group"
              initial={{ rotateX: -45, opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={revealed ? { rotateX: 0, opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 2.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
              <Logo variant="monogram" />
              {/* Specialized Preloader Glow for Image Asset */}
              <div className="absolute inset-0 bg-gold/10 blur-[40px] rounded-full -z-10 animate-pulse" />
            </motion.div>

            {/* Heritage data stream */}
            <div className="h-12 flex flex-col items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={fragmentIndex}
                  initial={{ y: 25, opacity: 0, rotateX: -30, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                  exit={{ y: -25, opacity: 0, rotateX: 30, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-1"
                  style={{ perspective: "400px" }}
                >
                  <span
                    className="font-display text-xl md:text-2xl font-light italic"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #D4AF37, #F5D76E, #D4AF37)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {FRAGMENTS[fragmentIndex]?.year ?? ""}
                  </span>
                  <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-[0.5em] text-white/20">
                    {FRAGMENTS[fragmentIndex]?.text ?? ""}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom progress system ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-8 md:bottom-12 left-6 md:left-12 right-6 md:right-12"
          >
            {/* Hairline progress */}
            <div className="h-px w-full bg-white/[0.04] relative overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #B8860B, #D4AF37, #F5D76E, #D4AF37, #B8860B)",
                  backgroundSize: "200% 100%",
                  animation: "shimmerGold 2s ease-in-out infinite",
                  boxShadow:
                    "0 0 15px rgba(212,175,55,0.4), 0 0 30px rgba(212,175,55,0.15)",
                }}
                transition={{ type: "tween", ease: "linear", duration: 0.05 }}
              />
            </div>

            {/* Bottom label */}
            <div className="mt-5 flex justify-between items-center">
              <span className="font-mono text-[6px] md:text-[7px] uppercase tracking-[0.6em] text-white/10">
                Synchronizing Heritage
              </span>
              <span className="font-mono text-[6px] md:text-[7px] uppercase tracking-[0.6em] text-white/10">
                Soul of North Karnataka
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
