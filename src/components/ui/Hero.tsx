"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { KineticMarquee } from "./KineticMarquee";
import { useRef } from "react";
import Image from "next/image";
import { T } from "@/components/ui/T";

const appleBlurReveal = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.4,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const magnetSpring = {
  hover: {
    scale: 1.05,
    filter: "brightness(1.1)",
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  tap: {
    scale: 0.96,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-24 pb-16 lg:pt-32 lg:pb-32"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.03)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 lg:h-64 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24 grid lg:grid-cols-12 gap-10 lg:gap-24 items-center">
        {/* === Left: Content === */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="flex flex-col items-start text-left lg:col-span-12 xl:col-span-7"
        >
          <motion.div
            custom={0}
            variants={appleBlurReveal}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 flex items-center gap-4">
              <span className="w-8 h-px bg-gold/30" />
              <T en="01 / The Soul of North Karnataka" kn="೦೧ / ಉತ್ತರ ಕರ್ನಾಟಕದ ಆತ್ಮ" />
            </span>
          </motion.div>

          {/* Staggered Editorial Typography */}
          <h1 className="font-display text-[clamp(2.75rem,10vw,9rem)] md:text-[clamp(3.5rem,8vw,9rem)] font-light leading-[0.9] md:leading-[0.85] tracking-tighter text-white mb-8 md:mb-12">
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="block"
            >
              <T en="The Soul of" kn="ಉತ್ತರ" />
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
              className="block mt-4"
            >
              <T en="North" kn="ಕರ್ನಾಟಕದ" />
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.5,
              }}
              className="block text-gold italic font-display mt-4 pl-4 md:pl-12"
            >
              <T en="Karnataka." kn="ಆತ್ಮ." />
            </motion.span>
          </h1>

          <div className="relative mb-16 max-w-xl">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.8,
              }}
              className="absolute left-0 top-0 bottom-0 w-px bg-gold/30 origin-top"
            />
            <motion.p
              custom={3}
              variants={appleBlurReveal}
              initial="hidden"
              animate="visible"
              className="font-body text-white/50 text-lg md:text-xl lg:text-2xl font-light leading-relaxed pl-10"
            >
              <T 
                en="A premium documentation of Gadag's historical heartbeat. Millennia of Chalukyan architecture, woven into the fabric of the modern era." 
                kn="ಗದಗಿನ ಐತಿಹಾಸಿಕ ಹೃದಯಬಡಿತದ ದಸ್ತಾವೇಜು. ಆಧುನಿಕ ಯುಗದ ಒಡಲಿನಲ್ಲಿ ಹಾಸುಹೊಕ್ಕಾಗಿರುವ ಚಾಲುಕ್ಯರ ವಾಸ್ತುಶಿಲ್ಪಗಳು ಮತ್ತು ಸಹಸ್ರಮಾನದ ಇತಿಹಾಸ." 
              />
            </motion.p>
          </div>

          <motion.div
            custom={4}
            variants={appleBlurReveal}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Link
                href="/stories"
                className="flex h-16 items-center justify-center rounded-full bg-gold px-12 shadow-2xl shadow-gold/20 transition-shadow duration-500 hover:shadow-gold/40"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-background">
                  <T en="Explore Stories" kn="ಕಥೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ" />
                </span>
              </Link>
            </motion.div>

            <Link
              href="/about"
              className="group flex h-16 items-center gap-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 transition-colors duration-500 hover:text-white"
            >
              <span className="h-px w-12 bg-gold/20 transition-all duration-700 ease-out-expo group-hover:w-20 group-hover:bg-gold" />
              <T en="Manifesto" kn="ಮ್ಯಾನಿಫೆಸ್ಟೋ" />
            </Link>
          </motion.div>

        </motion.div>

        {/* === Right: Image Composition === */}
        <motion.div
          initial={{ opacity: 0, x: 60, filter: "blur(20px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="relative aspect-[4/5] lg:col-span-12 xl:col-span-5 w-full max-w-xl mx-auto lg:ml-auto"
        >
          {/* Main Hero Image */}
          <motion.div
            style={{ y: imgY, scale: imgScale }}
            className="relative w-full h-full rounded-[2rem] lg:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl group/image"
          >
            <Image
              src="/trikuteshwara_temple_detail.png"
              alt=""
              fill
              className="object-cover opacity-80 grayscale group-hover/image:grayscale-0 group-hover/image:opacity-100 transition-all duration-[2.5s] ease-out-expo scale-110 group-hover/image:scale-100"
              priority
              aria-hidden="true"
            />
            {/* Deep Vignette */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent opacity-90" />
          </motion.div>

          {/* Repositioned & Refined Fragment Card */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-2 sm:-left-6 lg:-left-20 w-48 sm:w-56 lg:w-72 h-32 sm:h-40 lg:h-48 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden border border-white/10 z-20 shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] lg:shadow-[-20px_20px_50px_rgba(0,0,0,0.5)] bg-background/40 backdrop-blur-3xl p-1 block"
          >
            <div className="relative w-full h-full rounded-[1.3rem] lg:rounded-[1.8rem] overflow-hidden flex items-center">
              <Image
                src="/lakkundi_stepwell_wide.png"
                alt=""
                fill
                className="object-cover opacity-60 transition-all duration-1000 grayscale hover:grayscale-0"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
              <div className="relative z-10 pl-4 lg:pl-8">
                <div className="font-mono text-[7px] lg:text-[8px] uppercase tracking-[0.4em] text-white/40 mb-1 lg:mb-2">
                  <T en="Fragment" kn="ಅವಶೇಷ" />
                </div>
                <div className="font-display text-lg lg:text-xl text-gold/80 italic font-light">
                  <T en={<>Lakkundi <br />Stepwell</>} kn={<>ಲಕ್ಕುಂಡಿ <br />ಕಲ್ಯಾಣಿ</>} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* === Bottom Marquee === */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <KineticMarquee textEn="GADAG CITY • 114K STRONG • HERITAGE • CULTURE • COMMUNITY •" textKn="ಗದಗ ನಗರ • ೧.೧೪ ಲಕ್ಷ ಜನಬಲ • ಪಾರಂಪರಿಕ • ಸಂಸ್ಕೃತಿ • ಸಮುದಾಯ •" />
      </div>
    </section>
  );
}
