"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import AboutSection from "@/components/ui/AboutSection";
import { TiltCard } from "@/components/ui/TiltCard";
import { T } from "@/components/ui/T";

/* ─── Animation variants ─── */
const blurUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* ─── Heritage timeline data ─── */
const TIMELINE = [
  {
    year: "10th Century",
    title: "The Chalukyan Dawn",
    titleKn: "ಚಾಲುಕ್ಯ ಉದಯ",
    text: "The Western Chalukya Empire establishes Gadag as one of its principal architectural centers. The emergence of the 'Gadag Style' begins to take shape in the soapstone of the Deccan Plateau.",
    textKn: "ಪಶ್ಚಿಮ ಚಾಲುಕ್ಯ ಸಾಮ್ರಾಜ್ಯವು ಗದಗನ್ನು ತನ್ನ ಪ್ರಮುಖ ವಾಸ್ತುಶಿಲ್ಪ ಕೇಂದ್ರವಾಗಿ ಸ್ಥಾಪಿಸುತ್ತದೆ. 'ಗದಗ ಶೈಲಿ'ಯ ಉದಯ ದಕ್ಕನ್ ಪ್ರಸ್ಥಭೂಮಿಯ ಬಳಪದ ಕಲ್ಲಿನಲ್ಲಿ ರೂಪುಗೊಳ್ಳತೊಡಗುತ್ತದೆ.",
  },
  {
    year: "1070 CE",
    title: "Trikuteshwara Temple Complex",
    titleKn: "ತ್ರಿಕೂಟೇಶ್ವರ ದೇವಾಲಯ ಸಂಕೀರ್ಣ",
    text: "One of the grandest temple complexes in Karnataka rises on the banks of the Malprabha. Its intricately carved pillars become the signature aesthetic of an entire era.",
    textKn: "ಕರ್ನಾಟಕದ ಅತ್ಯಂತ ಭವ್ಯ ದೇವಾಲಯ ಸಂಕೀರ್ಣಗಳಲ್ಲಿ ಒಂದು ಮಲಪ್ರಭಾ ನದಿ ತೀರದಲ್ಲಿ ಮೇಲೇಳುತ್ತದೆ. ಇದರ ಸೂಕ್ಷ್ಮವಾಗಿ ಕೆತ್ತಿದ ಕಂಬಗಳು ಒಂದು ಇಡೀ ಯುಗದ ಸಹಿ ಸೌಂದರ್ಯವಾಗುತ್ತವೆ.",
  },
  {
    year: "1150 CE",
    title: "Lakkundi — The Jewel Village",
    titleKn: "ಲಕ್ಕುಂಡಿ — ರತ್ನ ಗ್ರಾಮ",
    text: "With over 100 Jain and Shaiva temples and stepwells, Lakkundi emerges as the architectural jewel of the Chalukyan Empire.",
    textKn: "100ಕ್ಕೂ ಹೆಚ್ಚು ಜೈನ ಮತ್ತು ಶೈವ ದೇವಾಲಯಗಳು ಮತ್ತು ಕಲ್ಯಾಣಿಗಳೊಂದಿಗೆ, ಲಕ್ಕುಂಡಿ ಚಾಲುಕ್ಯ ಸಾಮ್ರಾಜ್ಯದ ವಾಸ್ತುಶಿಲ್ಪ ರತ್ನವಾಗಿ ಹೊರಹೊಮ್ಮುತ್ತದೆ.",
  },
  {
    year: "15th Century",
    title: "Kumaravyasa's Literary Epic",
    titleKn: "ಕುಮಾರವ್ಯಾಸರ ಸಾಹಿತ್ಯ ಮಹಾಕಾವ್ಯ",
    text: "The great Poet Kumaravyasa composes the Karnata Bharata Kathamanjari within the Veeranarayana Temple of Gadag.",
    textKn: "ಮಹಾನ್ ಕವಿ ಕುಮಾರವ್ಯಾಸರು ಗದಗಿನ ವೀರನಾರಾಯಣ ದೇವಾಲಯದಲ್ಲಿ ಕರ್ನಾಟ ಭಾರತ ಕಥಾಮಂಜರಿ ರಚಿಸುತ್ತಾರೆ.",
  },
  {
    year: "1857",
    title: "The Freedom Uprising",
    titleKn: "ಸ್ವಾತಂತ್ರ್ಯ ದಂಗೆ",
    text: "Bhaskar Rao Bhave of Nargund leads one of the first revolts against British rule in Karnataka.",
    textKn: "ನರಗುಂದದ ಭಾಸ್ಕರ ರಾವ್ ಭಾವೆ ಕರ್ನಾಟಕದಲ್ಲಿ ಬ್ರಿಟಿಷ್ ಆಳ್ವಿಕೆಯ ವಿರುದ್ಧ ಮೊದಲ ದಂಗೆಗಳಲ್ಲಿ ಒಂದನ್ನು ಮುನ್ನಡೆಸುತ್ತಾರೆ.",
  },
  {
    year: "1922",
    title: "Birth of a Musical Legend",
    titleKn: "ಸಂಗೀತ ದಂತಕಥೆಯ ಜನನ",
    text: "Bharat Ratna Pandit Bhimsen Joshi is born in Gadag, going on to become one of India's greatest exponents of Hindustani classical music.",
    textKn: "ಭಾರತ ರತ್ನ ಪಂಡಿತ ಭೀಮಸೇನ ಜೋಶಿ ಗದಗಿನಲ್ಲಿ ಜನಿಸುತ್ತಾರೆ, ಹಿಂದೂಸ್ತಾನಿ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತದ ಶ್ರೇಷ್ಠ ಪ್ರತಿಪಾದಕರಲ್ಲಿ ಒಬ್ಬರಾಗುತ್ತಾರೆ.",
  },
];

/* ─── Image Section Component ─── */
function ImageBreak({
  src,
  alt,
  label,
  caption,
  aspect = "16/9",
}: {
  src: string;
  alt: string;
  label: string;
  caption: string;
  aspect?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden rounded-[2rem] border border-white/[0.06] group"
      style={{ aspectRatio: aspect }}
    >
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-[2s]"
        />
      </motion.div>
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent z-10" />
      {/* Caption */}
      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 z-20">
        <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold/60 mb-2">
          {label}
        </p>
        <p className="text-white/70 font-body font-light text-sm md:text-base max-w-xl leading-relaxed">
          {caption}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══ ABOUT PAGE ═══ */
export default function AboutPage() {
  return (
    <>
      <div className="pt-32 pb-20 min-h-screen bg-background">

        {/* ══ HERO SECTION ══ */}
        <section className="relative px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Title */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-5 pt-8"
            >
              <motion.span
                custom={0}
                variants={blurUp}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-8 block flex items-center gap-4"
              >
                <span className="w-8 h-px bg-gold/30" />
                <T en="About Gadag" kn="ಗದಗದ ಬಗ್ಗೆ" />
              </motion.span>
              <motion.h1
                custom={1}
                variants={blurUp}
                className="font-display text-[clamp(3rem,6vw,5.5rem)] font-light text-white leading-[0.88] tracking-tight mb-8"
              >
                <T en={<>An open-air museum<br />of{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(135deg, #D4AF37, #F5D76E, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>empires.</em></>} kn={<>ಚಕ್ರಾಧಿಪತ್ಯಗಳ<br />{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(135deg, #D4AF37, #F5D76E, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>ಬಯಲು ವಸ್ತುಸಂಗ್ರಹಾಲಯ.</em></>} />
              </motion.h1>
              <motion.div
                custom={2}
                variants={blurUp}
                className="w-16 h-px bg-gold/30"
              />
            </motion.div>

            {/* Divider */}
            <div className="lg:col-span-1 border-l border-white/[0.06] hidden lg:block h-[300px]" />

            {/* Right: Long-form intro */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-6 font-body text-white/45 font-light leading-relaxed text-sm md:text-base space-y-8"
            >
              <motion.p custom={2} variants={blurUp} className="text-xl md:text-2xl font-display text-white/80 leading-snug">
                <T en={<>Gadag is the beating heart of North Karnataka — an architectural epicenter where the Western Chalukya Empire explicitly defined the{" "}<span className="italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>&quot;Gadag Style&quot;</span>{" "}of temple architecture between the 10th and 12th centuries.</>} kn={<>ಗದಗು ಉತ್ತರ ಕರ್ನಾಟಕದ ಹೃದಯಬಡಿತ — ಪಶ್ಚಿಮ ಚಾಲುಕ್ಯ ಸಾಮ್ರಾಜ್ಯವು 10 ಮತ್ತು 12ನೇ ಶತಮಾನಗಳ ನಡುವೆ{" "}<span className="italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>&quot;ಗದಗ ಶೈಲಿ&quot;</span>{" "}ಎಂಬ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ನಿರ್ಧರಿಸಿದ ವಾಸ್ತುಶಿಲ್ಪದ ಕೇಂದ್ರ.</>} />
              </motion.p>
              <motion.p custom={3} variants={blurUp}>
                <T en="Carved from Dharwad district in 1997, Gadag stands not just as an administrative unit but as a living temple complex spread across 4,656 square kilometers of black cotton soil, rolling granite hills, and sunflower fields. It is home to approximately 10.65 lakh people who carry forward a heritage that predates most modern civilizations." kn="1997ರಲ್ಲಿ ಧಾರವಾಡ ಜಿಲ್ಲೆಯಿಂದ ಬೇರ್ಪಟ್ಟ ಗದಗು ಕೇವಲ ಆಡಳಿತ ಘಟಕವಲ್ಲ — 4,656 ಚದರ ಕಿಲೋಮೀಟರ್ ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು, ಗ್ರಾನೈಟ್ ಬೆಟ್ಟಗಳು ಮತ್ತು ಸೂರ್ಯಕಾಂತಿ ಹೊಲಗಳಲ್ಲಿ ಹರಡಿರುವ ಜೀವಂತ ದೇವಾಲಯ ಸಂಕೀರ್ಣ. ಸುಮಾರು 10.65 ಲಕ್ಷ ಜನರ ನೆಲೆಯಾದ ಇದು ಬಹುತೇಕ ಆಧುನಿಕ ನಾಗರಿಕತೆಗಳಿಗಿಂತ ಹಿಂದಿನ ಪರಂಪರೆಯನ್ನು ಮುಂದುವರಿಸುತ್ತಿದೆ." />
              </motion.p>
              <motion.p custom={4} variants={blurUp}>
                <T en={<>This soil has birthed literary masterpieces — most notably, the great Kannada poet Kumaravyasa composed the <em className="text-white/60">Karnata Bharata Kathamanjari</em> in the hallowed halls of the Veeranarayana Temple. It is a land that sang songs of freedom, echoing the 1857 revolt led by Bhaskar Rao Bhave of Nargund against British rule.</>} kn={<>ಈ ನೆಲ ಸಾಹಿತ್ಯ ಮೇರುಕೃತಿಗಳನ್ನು ಹುಟ್ಟುಹಾಕಿದೆ — ವಿಶೇಷವಾಗಿ, ಮಹಾನ್ ಕನ್ನಡ ಕವಿ ಕುಮಾರವ್ಯಾಸರು ವೀರನಾರಾಯಣ ದೇವಾಲಯದ ಪವಿತ್ರ ಸಭಾಂಗಣದಲ್ಲಿ <em className="text-white/60">ಕರ್ನಾಟ ಭಾರತ ಕಥಾಮಂಜರಿ</em> ರಚಿಸಿದರು. ಬ್ರಿಟಿಷ್ ಆಳ್ವಿಕೆಯ ವಿರುದ್ಧ ನರಗುಂದದ ಭಾಸ್ಕರ ರಾವ್ ಭಾವೆ ನೇತೃತ್ವದ 1857ರ ದಂಗೆಯ ಪ್ರತಿಧ್ವನಿ ಹೊಂದಿರುವ ಸ್ವಾತಂತ್ರ್ಯ ಗೀತೆಗಳ ನಾಡಿದು.</>} />
              </motion.p>

              {/* Stats cards */}
              <motion.div custom={5} variants={blurUp} className="grid grid-cols-2 gap-6 my-10">
                <div className="border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold/[0.02]" />
                  <div className="relative">
                    <h3 className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/50 mb-3"><T en="Religious Harmony" kn="ಧಾರ್ಮಿಕ ಸಾಮರಸ್ಯ" /></h3>
                    <p className="text-xs text-white/35 leading-relaxed"><T en="In a rare testament to coexistence, the Veeranarayana Temple, Trikuteshwara Temple, and the Jumma Masjid share a common administrative trust." kn="ಸಹಬಾಳ್ವೆಯ ಅಪರೂಪದ ಸಾಕ್ಷಿಯಾಗಿ, ವೀರನಾರಾಯಣ ದೇವಾಲಯ, ತ್ರಿಕೂಟೇಶ್ವರ ದೇವಾಲಯ ಮತ್ತು ಜುಮ್ಮಾ ಮಸೀದಿ ಒಂದೇ ಆಡಳಿತ ಟ್ರಸ್ಟ್ ಹಂಚಿಕೊಂಡಿವೆ." /></p>
                  </div>
                </div>
                <div className="border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold/[0.02]" />
                  <div className="relative">
                    <h3 className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/50 mb-3"><T en="Musical Genesis" kn="ಸಂಗೀತ ಉಗಮ" /></h3>
                    <p className="text-xs text-white/35 leading-relaxed"><T en="The Veereshwara Punyashrama continues to be a sanctuary for Hindustani classical music, nurturing legends like Bharat Ratna Pandit Bhimsen Joshi." kn="ವೀರೇಶ್ವರ ಪುಣ್ಯಾಶ್ರಮವು ಹಿಂದೂಸ್ತಾನಿ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತದ ಆಶ್ರಯವಾಗಿ ಮುಂದುವರಿದಿದೆ, ಭಾರತ ರತ್ನ ಪಂಡಿತ ಭೀಮಸೇನ ಜೋಶಿಯವರಂತಹ ದಂತಕಥೆಗಳನ್ನು ಪೋಷಿಸಿದೆ." /></p>
                  </div>
                </div>
              </motion.div>

              <motion.p custom={6} variants={blurUp}>
                <T en="Economically vibrant, Gadag balances its agrarian roots in the black soils with the intricate threads of Betageri's handlooms and the delicate artistry of local Kasuti embroidery. We are Gadag Info, and we are here to document every stone, every song, and every story of this incredible city." kn="ಆರ್ಥಿಕವಾಗಿ ಚೈತನ್ಯಶೀಲ, ಗದಗು ಕಪ್ಪು ಮಣ್ಣಿನ ಕೃಷಿ ಬೇರುಗಳನ್ನು ಬೆಟಗೇರಿಯ ಕೈಮಗ್ಗಗಳ ಸೂಕ್ಷ್ಮ ನೂಲುಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಕಸೂತಿ ಕಸೂತಿಯ ಸೂಕ್ಷ್ಮ ಕಲಾತ್ಮಕತೆಯೊಂದಿಗೆ ಸಮತೋಲನಗೊಳಿಸುತ್ತದೆ. ನಾವು ಗದಗ ಇನ್ಫೋ, ಈ ಅದ್ಭುತ ನಗರದ ಪ್ರತಿಯೊಂದು ಕಲ್ಲು, ಪ್ರತಿಯೊಂದು ಹಾಡು ಮತ್ತು ಪ್ರತಿಯೊಂದು ಕಥೆಯನ್ನು ದಾಖಲಿಸಲು ನಾವಿಲ್ಲಿದ್ದೇವೆ." />
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ══ FULL-WIDTH IMAGE: Temple Corridor ══ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <ImageBreak
            src="/chalukyan_corridor.png"
            alt="Ancient Chalukyan temple corridor with shafts of golden light"
            label="The Gadag Style"
            caption="The intricate soapstone carvings of the Trikuteshwara and Doddabasappa temples defined an entire architectural era that heavily influenced the subsequent Hoysala and Vijayanagara empires."
          />
        </section>

        {/* ══ ARCHITECTURE SECTION ══ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
          >
            <motion.div custom={0} variants={blurUp} className="lg:col-span-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold/50 mb-6 block flex items-center gap-4">
                <span className="w-8 h-px bg-gold/30" />
                <T en="Architecture" kn="ವಾಸ್ತುಶಿಲ್ಪ" />
              </span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-[0.88] tracking-tight mb-6">
                <T en={<>Temples carved{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E, #B8860B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>in eternity</em></>} kn={<>ಶಾಶ್ವತತೆಯಲ್ಲಿ{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E, #B8860B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>ಕೆತ್ತಿದ ದೇವಾಲಯಗಳು</em></>} />
              </h2>
              <div className="w-12 h-px bg-gold/30 mb-10" />
            </motion.div>

            <motion.div custom={1} variants={blurUp} className="lg:col-span-7 font-body text-white/40 font-light leading-relaxed text-sm md:text-base space-y-6">
              <p>
                <T en={<>The architectural heritage of Gadag district is unparalleled in the Indian subcontinent. The Western Chalukya artisans developed a distinct style characterized by ornate stepped superstructures (<em className="text-white/55">vimana</em>), intricately lathe-turned pillars, and detailed narrative panels carved into soapstone with extraordinary precision.</>} kn={<>ಗದಗ ಜಿಲ್ಲೆಯ ವಾಸ್ತುಶಿಲ್ಪ ಪರಂಪರೆ ಭಾರತೀಯ ಉಪಖಂಡದಲ್ಲಿ ಅಸಮಾನ. ಪಶ್ಚಿಮ ಚಾಲುಕ್ಯ ಶಿಲ್ಪಿಗಳು ಅಲಂಕೃತ ಮೆಟ್ಟಿಲು ಮೇಲ್ರಚನೆಗಳು (<em className="text-white/55">ವಿಮಾನ</em>), ಸೂಕ್ಷ್ಮ ಲೇಥ್-ತಿರುಗಿಸಿದ ಕಂಬಗಳು ಮತ್ತು ಅಸಾಧಾರಣ ನಿಖರತೆಯಿಂದ ಬಳಪದ ಕಲ್ಲಿನಲ್ಲಿ ಕೆತ್ತಿದ ಕಥಾ ಫಲಕಗಳಿಂದ ವಿಶಿಷ್ಟ ಶೈಲಿಯನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಿದರು.</>} />
              </p>
              <p>
                <T en={<>The <strong className="text-white/55 font-normal">Trikuteshwara Temple</strong> — dedicated to Shiva, Vishnu, and Surya — remains the crown jewel. Its mandapa pillars feature over 90 distinct carving patterns, and the Saraswati Temple within the complex is considered the finest example of Chalukyan decorative art, with ceiling panels depicting mythological scenes in mesmerizing detail.</>} kn={<><strong className="text-white/55 font-normal">ತ್ರಿಕೂಟೇಶ್ವರ ದೇವಾಲಯ</strong> — ಶಿವ, ವಿಷ್ಣು ಮತ್ತು ಸೂರ್ಯನಿಗೆ ಸಮರ್ಪಿತ — ಕಿರೀಟ ರತ್ನವಾಗಿ ಉಳಿದಿದೆ. ಇದರ ಮಂಡಪ ಕಂಬಗಳಲ್ಲಿ 90ಕ್ಕೂ ಹೆಚ್ಚು ವಿಭಿನ್ನ ಕೆತ್ತನೆ ಮಾದರಿಗಳಿವೆ, ಮತ್ತು ಸಂಕೀರ್ಣದೊಳಗಿನ ಸರಸ್ವತಿ ದೇವಾಲಯವು ಚಾಲುಕ್ಯ ಅಲಂಕಾರಿಕ ಕಲೆಯ ಅತ್ಯುತ್ತಮ ಉದಾಹರಣೆ ಎಂದು ಪರಿಗಣಿಸಲಾಗಿದೆ.</>} />
              </p>
              <p>
                <T en={<>Nearby, the <strong className="text-white/55 font-normal">Doddabasappa Temple</strong> features a unique star-shaped plan and a 24-pointed stellar platform — a geometric sophistication that would later inspire the Hoysala temple architecture of Belur and Halebidu. Each pillar tells a story, each frieze captures an emotion, and each cornice reflects a civilization at the peak of its creative power.</>} kn={<>ಸಮೀಪದಲ್ಲಿ, <strong className="text-white/55 font-normal">ದೊಡ್ಡಬಸಪ್ಪ ದೇವಾಲಯ</strong>ವು ವಿಶಿಷ್ಟ ನಕ್ಷತ್ರಾಕಾರದ ಯೋಜನೆ ಮತ್ತು 24-ಬಿಂದು ನಕ್ಷತ್ರ ವೇದಿಕೆಯನ್ನು ಹೊಂದಿದೆ — ಬೇಲೂರು ಮತ್ತು ಹಳೆಬೀಡಿನ ಹೊಯ್ಸಳ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪಕ್ಕೆ ಸ್ಫೂರ್ತಿ ನೀಡಿದ ರೇಖಾಗಣಿತ ಪರಿಣತಿ. ಪ್ರತಿ ಕಂಬ ಒಂದು ಕಥೆ ಹೇಳುತ್ತದೆ, ಪ್ರತಿ ಶಿಲ್ಪ ಒಂದು ಭಾವನೆ ಸೆರೆಹಿಡಿಯುತ್ತದೆ.</>} />
              </p>
              <p>
                <T en={<>Just 12 kilometers away, <strong className="text-white/55 font-normal">Lakkundi</strong> stands as an open-air museum of over 100 temples and 50 inscriptions. Its stepwells (<em className="text-white/55">kalyani</em>) are marvels of hydraulic engineering wrapped in ornamental beauty — the Musukina Kalyani and Chatura Mukha Basadi remain objects of scholarly fascination worldwide.</>} kn={<>ಕೇವಲ 12 ಕಿಲೋಮೀಟರ್ ದೂರದಲ್ಲಿ, <strong className="text-white/55 font-normal">ಲಕ್ಕುಂಡಿ</strong> 100ಕ್ಕೂ ಹೆಚ್ಚು ದೇವಾಲಯಗಳು ಮತ್ತು 50 ಶಾಸನಗಳ ಬಯಲು ವಸ್ತುಸಂಗ್ರಹಾಲಯವಾಗಿ ನಿಂತಿದೆ. ಇದರ ಕಲ್ಯಾಣಿಗಳು (<em className="text-white/55">ಮೆಟ್ಟಿಲು ಬಾವಿಗಳು</em>) ಅಲಂಕಾರಿಕ ಸೌಂದರ್ಯದಲ್ಲಿ ಸುತ್ತಿದ ಜಲ ಎಂಜಿನಿಯರಿಂಗ್ ಅದ್ಭುತಗಳು.</>} />
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ══ DUAL IMAGE LAYOUT ══ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ImageBreak
              src="/lakkundi_kalyani.png"
              alt="Lakkundi stepwell at dawn with mist rising from water"
              label="Lakkundi Kalyani"
              caption="Ancient stepwells of ornamental hydraulic engineering — the finest in medieval India."
              aspect="4/5"
            />
            <ImageBreak
              src="/gadag_aerial_view.png"
              alt="Aerial view of Gadag temple complex surrounded by farmlands"
              label="Gadag Aerial"
              caption="The sacred geography of Gadag — temples rising from sunflower fields."
              aspect="4/5"
            />
          </div>
        </section>

        {/* ══ CULTURE & CRAFT SECTION ══ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
          >
            <motion.div custom={0} variants={blurUp} className="lg:col-span-5 lg:order-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold/50 mb-6 block flex items-center gap-4">
                <span className="w-8 h-px bg-gold/30" />
                <T en="Culture & Craft" kn="ಸಂಸ್ಕೃತಿ ಮತ್ತು ಕಲೆ" />
              </span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-[0.88] tracking-tight mb-6">
                <T en={<>Threads of{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>living tradition</em></>} kn={<>ಜೀವಂತ ಪರಂಪರೆಯ{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>ನೂಲುಗಳು</em></>} />
              </h2>
              <div className="w-12 h-px bg-gold/30 mb-10" />
            </motion.div>

            <motion.div custom={1} variants={blurUp} className="lg:col-span-7 lg:order-1 font-body text-white/40 font-light leading-relaxed text-sm md:text-base space-y-6">
              <p>
                <T en={<>Beyond its stone monuments, Gadag is a living tapestry of craft traditions that have survived without interruption for centuries. The twin city of <strong className="text-white/55 font-normal">Betageri</strong> is the handloom capital of North Karnataka, where thousands of weaving families produce cotton and silk sarees on traditional pit looms passed down through generations.</>} kn={<>ಕಲ್ಲಿನ ಸ್ಮಾರಕಗಳ ಆಚೆಗೆ, ಗದಗು ಶತಮಾನಗಳಿಂದ ಅಡೆತಡೆಯಿಲ್ಲದೆ ಉಳಿದಿರುವ ಕರಕುಶಲ ಪರಂಪರೆಗಳ ಜೀವಂತ ತಾರಸ್ಥಳ. ಅವಳಿ ನಗರ <strong className="text-white/55 font-normal">ಬೆಟಗೇರಿ</strong> ಉತ್ತರ ಕರ್ನಾಟಕದ ಕೈಮಗ್ಗ ರಾಜಧಾನಿ, ಸಾವಿರಾರು ನೇಕಾರ ಕುಟುಂಬಗಳು ಪೀಳಿಗೆಯಿಂದ ಪೀಳಿಗೆಗೆ ಬಂದ ಸಾಂಪ್ರದಾಯಿಕ ಮಗ್ಗಗಳಲ್ಲಿ ಹತ್ತಿ ಮತ್ತು ರೇಷ್ಮೆ ಸೀರೆಗಳನ್ನು ನೇಯುತ್ತಾರೆ.</>} />
              </p>
              <p>
                <T en={<><strong className="text-white/55 font-normal">Kasuti embroidery</strong> — Karnataka&apos;s answer to Kashmir&apos;s Sozni — is practiced here with painstaking precision. Using only a single needle and thread, artisans create geometric temple motifs, peacock forms, and chariot designs on dark fabric. Each piece takes weeks to complete, and the craft has earned a Geographical Indication (GI) tag recognizing its irreplaceable cultural value.</>} kn={<><strong className="text-white/55 font-normal">ಕಸೂತಿ ಕಸಿದ</strong> — ಕಾಶ್ಮೀರದ ಸೋಜ್ನಿಗೆ ಕರ್ನಾಟಕದ ಉತ್ತರ — ಇಲ್ಲಿ ಅತ್ಯಂತ ನಿಖರತೆಯಿಂದ ಅಭ್ಯಾಸಿಸಲಾಗುತ್ತದೆ. ಒಂದೇ ಸೂಜಿ ಮತ್ತು ದಾರದಿಂದ, ಕುಶಲಕರ್ಮಿಗಳು ರೇಖಾಗಣಿತ ದೇವಾಲಯ ವಿನ್ಯಾಸಗಳು, ನವಿಲು ರೂಪಗಳು ಮತ್ತು ರಥ ವಿನ್ಯಾಸಗಳನ್ನು ರಚಿಸುತ್ತಾರೆ. ಈ ಕಲೆಗೆ ಭೌಗೋಳಿಕ ಸೂಚನೆ (GI) ಟ್ಯಾಗ್ ದೊರೆತಿದೆ.</>} />
              </p>
              <p>
                <T en={<>The <strong className="text-white/55 font-normal">Veereshwara Punyashrama</strong>, established in the 15th century, continues to nurture Hindustani classical music. It was here that the young Bhimsen Joshi first encountered the raga traditions that would make him one of India&apos;s most revered vocalists.</>} kn={<>15ನೇ ಶತಮಾನದಲ್ಲಿ ಸ್ಥಾಪಿತವಾದ <strong className="text-white/55 font-normal">ವೀರೇಶ್ವರ ಪುಣ್ಯಾಶ್ರಮ</strong>ವು ಹಿಂದೂಸ್ತಾನಿ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತವನ್ನು ಪೋಷಿಸುವುದನ್ನು ಮುಂದುವರಿಸಿದೆ. ಯುವ ಭೀಮಸೇನ ಜೋಶಿ ಮೊದಲ ಬಾರಿಗೆ ರಾಗ ಪರಂಪರೆಗಳನ್ನು ಇಲ್ಲಿ ಕಂಡುಕೊಂಡರು.</>} />
              </p>
              <p>
                <T en={<>Gadag&apos;s culinary heritage is equally rich — from the fiery <em className="text-white/55">jolada rotti</em> (sorghum flatbread) served with <em className="text-white/55">ennegai</em> (stuffed brinjal) to the sweet <em className="text-white/55">karadantu</em> that has been the district&apos;s signature confection for over 200 years.</>} kn={<>ಗದಗಿನ ಪಾಕ ಪರಂಪರೆ ಸಹ ಅಷ್ಟೇ ಶ್ರೀಮಂತ — ಉರಿಯುವ <em className="text-white/55">ಜೋಳದ ರೊಟ್ಟಿ</em> ಜೊತೆ <em className="text-white/55">ಎಣ್ಣೆಗಾಯಿ</em> (ತುಂಬಿದ ಬದನೆಕಾಯಿ) ಯಿಂದ 200 ವರ್ಷಗಳ ಹಿಂದಿನಿಂದ ಜಿಲ್ಲೆಯ ಸಹಿ ಸಿಹಿ ಆಗಿರುವ <em className="text-white/55">ಕರದಂಟು</em>ವರೆಗೆ.</>} />
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ══ KASUTI IMAGE ══ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <ImageBreak
            src="/kasuti_detail.png"
            alt="Close-up of intricate Kasuti embroidery with gold and crimson thread"
            label="Kasuti Embroidery"
            caption="Karnataka's answer to fine needlework — geometric temple motifs stitched with a single needle, each piece taking weeks of painstaking precision."
          />
        </section>

        {/* ══ MUSIC IMAGE ══ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <ImageBreak
            src="/bhimsen_joshi_music.png"
            alt="Traditional Indian classical music performance hall"
            label="The Musical Legacy"
            caption="From the Veereshwara Punyashrama to the world stage — Gadag's Hindustani classical tradition produced Bharat Ratna Pandit Bhimsen Joshi."
          />
        </section>

        {/* ═══════════════════════════════════════
           ══ KAPPATAGUDDA SECTION ══ 
           ═══════════════════════════════════════ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <ImageBreak
            src="/kappatagudda_hills.png"
            alt="Panoramic view of Kappatagudda Hills covered in lush green forest at golden hour"
            label="The Green Lung of North Karnataka"
            caption="Kappatagudda — a 65,000-acre sanctuary where the Western Ghats whisper their southernmost secrets to the Deccan Plateau."
          />
        </section>

        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
          >
            <motion.div custom={0} variants={blurUp} className="lg:col-span-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold/50 mb-6 block flex items-center gap-4">
                <span className="w-8 h-px bg-gold/30" />
                <T en="Natural Heritage" kn="ನೈಸರ್ಗಿಕ ಪರಂಪರೆ" />
              </span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-[0.88] tracking-tight mb-6">
                Kappatagudda{" "}
                <em
                  className="not-italic block mt-2"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E, #B8860B)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  The Golden Treasure
                </em>
              </h2>
              <div className="w-12 h-px bg-gold/30 mb-10" />

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="border border-white/[0.06] rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold/[0.02]" />
                  <div className="relative">
                    <div className="font-display text-2xl text-gold/70 mb-1">65K</div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/30">
                      Acres of Forest
                    </p>
                  </div>
                </div>
                <div className="border border-white/[0.06] rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold/[0.02]" />
                  <div className="relative">
                    <div className="font-display text-2xl text-gold/70 mb-1">200+</div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/30">
                      Bird Species
                    </p>
                  </div>
                </div>
                <div className="border border-white/[0.06] rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold/[0.02]" />
                  <div className="relative">
                    <div className="font-display text-2xl text-gold/70 mb-1">795m</div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/30">
                      Peak Altitude
                    </p>
                  </div>
                </div>
                <div className="border border-white/[0.06] rounded-xl p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold/[0.02]" />
                  <div className="relative">
                    <div className="font-display text-2xl text-gold/70 mb-1">40+</div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/30">
                      Medicinal Herbs
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div custom={1} variants={blurUp} className="lg:col-span-7 font-body text-white/40 font-light leading-relaxed text-sm md:text-base space-y-6">
              <p className="text-xl md:text-2xl font-display text-white/80 leading-snug">
                <T en={<>Rising majestically from the Deccan Plateau, <strong className="text-white/90 font-normal">Kappatagudda</strong> — meaning &quot;Black Hills&quot; in Kannada — is a sprawling hill range that serves as the{" "}<span className="italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>green lung</span>{" "}of an otherwise semi-arid North Karnataka.</>} kn={<>ದಕ್ಕನ್ ಪ್ರಸ್ಥಭೂಮಿಯಿಂದ ಭವ್ಯವಾಗಿ ಎದ್ದಿರುವ <strong className="text-white/90 font-normal">ಕಪ್ಪತಗುಡ್ಡ</strong> — ಕನ್ನಡದಲ್ಲಿ &quot;ಕಪ್ಪು ಬೆಟ್ಟಗಳು&quot; ಎಂದರ್ಥ — ಅರೆ-ಶುಷ್ಕ ಉತ್ತರ ಕರ್ನಾಟಕದ{" "}<span className="italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>ಹಸಿರು ಶ್ವಾಸಕೋಶ</span>{" "}ವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ವಿಸ್ತಾರ ಬೆಟ್ಟ ಶ್ರೇಣಿ.</>} />
              </p>
              <p>
                <T en="Spread across approximately 65,000 acres of deciduous forest and grasslands, the Kappatagudda Wildlife Sanctuary is a crucial biodiversity hotspot. Its dense canopy shelters panthers, hyenas, sloth bears, wild boars, Indian porcupines, and a rich population of deer. The range is home to over 200 species of birds, making it a paradise for ornithologists and nature photographers." kn="ಸುಮಾರು 65,000 ಎಕರೆ ಎಲೆ ಉದುರುವ ಕಾಡು ಮತ್ತು ಹುಲ್ಲುಗಾವಲುಗಳಲ್ಲಿ ಹರಡಿರುವ ಕಪ್ಪತಗುಡ್ಡ ವನ್ಯಜೀವಿ ಅಭಯಾರಣ್ಯ ನಿರ್ಣಾಯಕ ಜೀವವೈವಿಧ್ಯ ತಾಣ. ಇದರ ದಟ್ಟ ಮೇಲಂದಾಜಿ ಚಿರತೆಗಳು, ಕಡವೆಗಳು, ಕರಡಿಗಳು, ಕಾಡು ಹಂದಿಗಳಿಗೆ ಆಶ್ರಯವಿದೆ. 200ಕ್ಕೂ ಹೆಚ್ಚು ಪಕ್ಷಿ ಪ್ರಭೇದಗಳಿಗೆ ನೆಲೆಯಾಗಿದೆ." />
              </p>
              <p>
                <T en="The hills are dotted with ancient ruins and sacred sites. The Kappatagudda Hilltop Shrine dedicated to Lord Mahalingeshwara draws thousands of pilgrims each year. The trek to the summit — rising to 795 meters — rewards visitors with a 360-degree panorama of the landscape." kn="ಬೆಟ್ಟಗಳಲ್ಲಿ ಪ್ರಾಚೀನ ಅವಶೇಷಗಳು ಮತ್ತು ಪವಿತ್ರ ಸ್ಥಳಗಳು ಹರಡಿಕೊಂಡಿವೆ. ಮಹಾಲಿಂಗೇಶ್ವರ ದೇವರಿಗೆ ಸಮರ್ಪಿತ ಕಪ್ಪತಗುಡ್ಡ ಬೆಟ್ಟದ ಮೇಲಿನ ದೇಗುಲ ಪ್ರತಿ ವರ್ಷ ಸಾವಿರಾರು ಯಾತ್ರಿಕರನ್ನು ಸೆಳೆಯುತ್ತದೆ. 795 ಮೀಟರ್ ಎತ್ತರದ ಶಿಖರಕ್ಕೆ ಚಾರಣ 360-ಡಿಗ್ರಿ ಭೂದೃಶ್ಯದ ಮನೋಹರ ನೋಟ ನೀಡುತ್ತದೆ." />
              </p>
              <p>
                <T en={<>Beyond its ecological significance, Kappatagudda has been identified as a treasure trove of <strong className="text-white/55 font-normal">mineral wealth</strong> — the hills contain significant deposits of gold, copper, and iron ore. This geological richness has earned it the moniker &quot;Golden Treasure of North Karnataka.&quot;</>} kn={<>ಪರಿಸರ ಮಹತ್ವದ ಆಚೆಗೆ, ಕಪ್ಪತಗುಡ್ಡ <strong className="text-white/55 font-normal">ಖನಿಜ ಸಂಪತ್ತಿನ</strong> ನಿಕ್ಷೇಪ — ಬೆಟ್ಟಗಳಲ್ಲಿ ಚಿನ್ನ, ತಾಮ್ರ ಮತ್ತು ಕಬ್ಬಿಣದ ಅದಿರಿನ ಗಮನಾರ್ಹ ನಿಕ್ಷೇಪಗಳಿವೆ. ಈ ಭೂವೈಜ್ಞಾನಿಕ ಶ್ರೀಮಂತಿಕೆ ಇದಕ್ಕೆ &quot;ಉತ್ತರ ಕರ್ನಾಟಕದ ಸುವರ್ಣ ನಿಧಿ&quot; ಎಂಬ ಹೆಸರು ತಂದಿದೆ.</>} />
              </p>
              <p>
                <T en="The region's medicinal plant diversity is equally remarkable. Over 40 species of traditional medicinal herbs grow in these hills. Kappatagudda stands as living proof that Gadag's wealth extends far beyond stone temples — it resides in the very soil, the forests, and the rivers that define this extraordinary landscape." kn="ಈ ಪ್ರದೇಶದ ಔಷಧೀಯ ಸಸ್ಯ ವೈವಿಧ್ಯ ಅಷ್ಟೇ ಗಮನಾರ್ಹ. 40ಕ್ಕೂ ಹೆಚ್ಚು ಸಾಂಪ್ರದಾಯಿಕ ಔಷಧೀಯ ಗಿಡಮೂಲಿಕೆಗಳು ಈ ಬೆಟ್ಟಗಳಲ್ಲಿ ಬೆಳೆಯುತ್ತವೆ. ಗದಗಿನ ಸಂಪತ್ತು ಕಲ್ಲಿನ ದೇವಾಲಯಗಳ ಆಚೆಗೂ ವಿಸ್ತರಿಸಿದೆ ಎಂಬುದಕ್ಕೆ ಕಪ್ಪತಗುಡ್ಡ ಜೀವಂತ ಸಾಕ್ಷಿ." />
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════
           ══ GADAG ZOO SECTION ══ 
           ═══════════════════════════════════════ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <ImageBreak
            src="/gadag_zoo.png"
            alt="Gadag Mini Zoo with lush gardens, pathways, and native animals"
            label="Gadag Zoo"
            caption="A cherished family sanctuary where native wildlife and manicured gardens create a pocket of green serenity in the heart of the city."
          />
        </section>

        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
          >
            <motion.div custom={0} variants={blurUp} className="lg:col-span-5 lg:order-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold/50 mb-6 block flex items-center gap-4">
                <span className="w-8 h-px bg-gold/30" />
                <T en="Urban Nature" kn="ನಗರ ಪ್ರಕೃತಿ" />
              </span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-[0.88] tracking-tight mb-6">
                Gadag Zoo{" "}
                <em
                  className="not-italic block mt-2"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  City&apos;s Green Heart
                </em>
              </h2>
              <div className="w-12 h-px bg-gold/30 mb-10" />
            </motion.div>

            <motion.div custom={1} variants={blurUp} className="lg:col-span-7 lg:order-1 font-body text-white/40 font-light leading-relaxed text-sm md:text-base space-y-6">
              <p>
                <T en={<>Nestled within the city limits, the <strong className="text-white/55 font-normal">Gadag Mini Zoo</strong> (also known as the Gadag Biological Park) is one of North Karnataka&apos;s most beloved family destinations. Established to provide urban residents a direct connection to the region&apos;s native fauna, the zoo has grown into a carefully managed sanctuary.</>} kn={<>ನಗರದ ಮಿತಿಯೊಳಗೆ ನೆಲೆಸಿರುವ <strong className="text-white/55 font-normal">ಗದಗ ಮಿನಿ ಮೃಗಾಲಯ</strong> (ಗದಗ ಜೈವಿಕ ಉದ್ಯಾನ ಎಂದೂ ಕರೆಯಲಾಗುತ್ತದೆ) ಉತ್ತರ ಕರ್ನಾಟಕದ ಅತ್ಯಂತ ಪ್ರೀತಿಯ ಕುಟುಂಬ ತಾಣಗಳಲ್ಲಿ ಒಂದು. ನಗರವಾಸಿಗಳಿಗೆ ಸ್ಥಳೀಯ ಪ್ರಾಣಿಗಳೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ ಒದಗಿಸಲು ಸ್ಥಾಪಿತವಾದ ಈ ಮೃಗಾಲಯ ಪ್ರಾಣಿ ಕಲ್ಯಾಣ ಮತ್ತು ಸಂರಕ್ಷಣೆ ಶಿಕ್ಷಣಕ್ಕೆ ಆದ್ಯತೆ ನೀಡುವ ಅಭಯಾರಣ್ಯವಾಗಿ ಬೆಳೆದಿದೆ.</>} />
              </p>
              <p>
                <T en="The zoo houses a diverse collection of native species, including Indian peafowl, spotted deer, blackbuck, Bonnet macaques, porcupines, and a variety of reptiles. Its aviary section is particularly notable, featuring both migratory and resident bird species representative of the Kappatagudda ecosystem." kn="ಮೃಗಾಲಯವು ಭಾರತೀಯ ನವಿಲು, ಚುಕ್ಕಿ ಜಿಂಕೆ, ಕೃಷ್ಣಮೃಗ, ಬಾನೆಟ್ ಮಕಾಕ್, ಮುಳ್ಳುಹಂದಿ ಮತ್ತು ವಿವಿಧ ಸರೀಸೃಪಗಳ ವೈವಿಧ್ಯಮಯ ಸಂಗ್ರಹವನ್ನು ಹೊಂದಿದೆ. ಇದರ ಪಕ್ಷಿಗೃಹ ವಿಭಾಗ ವಿಶೇಷವಾಗಿ ಗಮನಾರ್ಹ, ಕಪ್ಪತಗುಡ್ಡ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯ ವಲಸೆ ಮತ್ತು ನಿವಾಸಿ ಪಕ್ಷಿ ಪ್ರಭೇದಗಳನ್ನು ಒಳಗೊಂಡಿದೆ." />
              </p>
              <p>
                <T en="What sets the Gadag Zoo apart is its integration of botanical gardens alongside animal enclosures. Mature banyan trees, flowering gulmohar, and medicinal herb gardens create a green retreat within the city." kn="ಗದಗ ಮೃಗಾಲಯವನ್ನು ವಿಶಿಷ್ಟಗೊಳಿಸುವುದು ಪ್ರಾಣಿ ಆವರಣಗಳ ಜೊತೆಗೆ ಸಸ್ಯೋದ್ಯಾನಗಳ ಸಮ್ಮಿಲನ. ಪ್ರಬುದ್ಧ ಆಲದ ಮರಗಳು, ಹೂಬಿಡುವ ಗುಲ್ಮೊಹರ್ ಮತ್ತು ಔಷಧೀಯ ಗಿಡಮೂಲಿಕೆ ಉದ್ಯಾನಗಳು ನಗರದೊಳಗೆ ಹಸಿರು ವಿಶ್ರಾಂತಿ ತಾಣವನ್ನು ಸೃಷ್ಟಿಸುತ್ತವೆ." />
              </p>
              <p>
                <T en="The zoo actively collaborates with the Karnataka Forest Department and local schools to run awareness programs about the region's biodiversity. It serves as a living classroom nurturing the next generation of conservationists." kn="ಮೃಗಾಲಯವು ಕರ್ನಾಟಕ ಅರಣ್ಯ ಇಲಾಖೆ ಮತ್ತು ಸ್ಥಳೀಯ ಶಾಲೆಗಳೊಂದಿಗೆ ಸಹಯೋಗಿಸಿ ಪ್ರದೇಶದ ಜೀವವೈವಿಧ್ಯದ ಬಗ್ಗೆ ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ನಡೆಸುತ್ತದೆ. ಮುಂದಿನ ಪೀಳಿಗೆಯ ಸಂರಕ್ಷಣಾಕಾರರನ್ನು ಪೋಷಿಸುವ ಜೀವಂತ ತರಗತಿ ಕೋಣೆಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ." />
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ══ TIMELINE SECTION ══ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto mb-20 md:mb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16"
          >
            <motion.span
              custom={0}
              variants={blurUp}
              className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold/50 mb-6 block flex items-center gap-4"
            >
              <span className="w-8 h-px bg-gold/30" />
              <T en="Through The Ages" kn="ಯುಗಗಳ ಮೂಲಕ" />
            </motion.span>
            <motion.h2
              custom={1}
              variants={blurUp}
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-[0.88] tracking-tight"
            >
              A timeline of{" "}
              <em
                className="not-italic"
                style={{
                  backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                magnificence
              </em>
            </motion.h2>
          </motion.div>

          {/* Timeline entries */}
          <div className="relative">
            {/* Vertical gold line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gold/10" />

            <div className="flex flex-col gap-12 md:gap-16">
              {TIMELINE.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-16 md:pl-20"
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-[19px] md:left-[27px] top-2 w-2.5 h-2.5 rounded-full border border-gold/40 bg-background" />

                  <div className="font-display text-2xl md:text-3xl text-gold/60 italic font-light mb-2">
                    {entry.year}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-white/80 font-light mb-3">
                    <T en={entry.title} kn={entry.titleKn} />
                  </h3>
                  <p className="font-body text-white/35 font-light text-sm md:text-base leading-relaxed max-w-2xl">
                    <T en={entry.text} kn={entry.textKn} />
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ORIGINAL ABOUT SECTION WITH STATS ══ */}
        <AboutSection />

        {/* ══ OUR MISSION SECTION ══ */}
        <section className="px-6 md:px-12 lg:px-24 max-w-[1440px] mx-auto py-20 md:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              custom={0}
              variants={blurUp}
              className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold/50 mb-8 block"
            >
              <T en="Our Mission" kn="ನಮ್ಮ ಉದ್ದೇಶ" />
            </motion.span>
            <motion.h2
              custom={1}
              variants={blurUp}
              className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-white leading-[0.92] tracking-tight mb-10"
            >
              <T en={<>To preserve, document, and celebrate every{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>stone, song, and story</em>{" "}of Gadag.</>} kn={<>ಗದಗಿನ ಪ್ರತಿಯೊಂದು{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>ಕಲ್ಲು, ಹಾಡು ಮತ್ತು ಕಥೆ</em>ಯನ್ನು ಸಂರಕ್ಷಿಸಲು, ದಾಖಲಿಸಲು ಮತ್ತು ಆಚರಿಸಲು.</>} />
            </motion.h2>
            <motion.p
              custom={2}
              variants={blurUp}
              className="font-body text-white/35 font-light text-base md:text-lg leading-relaxed mb-12"
            >
              <T en="Gadag Info connects over 114,000 residents daily, bridging the gap between ancient heritage and contemporary community. We are not just a platform — we are the definitive digital archive of North Karnataka's cultural pulse, meticulously curated for the modern era." kn="ಗದಗ ಇನ್ಫೋ ಪ್ರತಿದಿನ 1,14,000ಕ್ಕೂ ಹೆಚ್ಚು ನಿವಾಸಿಗಳನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ, ಪ್ರಾಚೀನ ಪರಂಪರೆ ಮತ್ತು ಸಮಕಾಲೀನ ಸಮುದಾಯದ ನಡುವಿನ ಅಂತರವನ್ನು ಸೇತುವೆ ಮಾಡುತ್ತದೆ. ನಾವು ಕೇವಲ ವೇದಿಕೆ ಅಲ್ಲ — ಆಧುನಿಕ ಯುಗಕ್ಕಾಗಿ ಎಚ್ಚರಿಕೆಯಿಂದ ಸಂಗ್ರಹಿಸಿದ ಉತ್ತರ ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ನಾಡಿಮಿಡಿತದ ನಿರ್ಣಾಯಕ ಡಿಜಿಟಲ್ ದಾಖಲೆಯಾಗಿದ್ದೇವೆ." />
            </motion.p>
            <motion.div custom={3} variants={blurUp} className="flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
