"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { T } from "@/components/ui/T";

interface GalleryImage {
  readonly src: string;
  readonly alt: string;
}

const galleryImages: readonly GalleryImage[] = [
  {
    src: "/trikuteshwara_temple_detail.png",
    alt: "Trikuteshwara Temple — Chalukyan stone carvings",
  },
  {
    src: "/gadag_station.png",
    alt: "Heritage Station — Victorian-Indian hybrid architecture",
  },
  {
    src: "/lakkundi_stepwell_wide.png",
    alt: "Lakkundi Step Well — architectural symmetry",
  },
  {
    src: "/doddabasappa_temple_star.png",
    alt: "Doddabasappa Temple — 24-pointed star plan",
  },
  {
    src: "/events_dollu.png",
    alt: "Kasuti Embroidery — intricate geometric patterns",
  },
  {
    src: "/lakkundi_temple_art.png",
    alt: "Saraswati Temple — delicate stone reliefs",
  },
  {
    src: "/magadi_bird_sanctuary_sunset.png",
    alt: "Magadi Sanctuary — golden hour patterns",
  },
  {
    src: "/gadag_heritage_hero.png",
    alt: "The Pulse of Gadag — heritage storytelling",
  },
];

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

export default function GalleryMasonry() {
  return (
    <section className="py-20 md:py-32 bg-background relative z-10 w-full overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Unified Section Intro */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 md:mb-32 flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/[0.06] pb-12 gap-10"
        >
          <div className="lg:w-1/2">
            <motion.span custom={0} variants={appleBlurReveal} className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-6 block"><T en="04 / The Visual Archive" kn="೦೪ / ದೃಶ್ಯ ದಾಖಲೆ" /></motion.span>
            <motion.h1 custom={1} variants={appleBlurReveal} className="font-display text-6xl md:text-8xl font-light text-white leading-[0.85] tracking-tighter">
              <T en={<>Visualizing <em className="text-gold italic">history.</em></>} kn={<>ಇತಿಹಾಸದ <em className="text-gold italic">ದರ್ಶನ.</em></>} />
            </motion.h1>
          </div>
          <div className="lg:w-1/2 flex justify-start lg:justify-end">
            <motion.p custom={2} variants={appleBlurReveal} className="font-body text-sm text-white/50 leading-relaxed font-light max-w-md lg:text-right border-l lg:border-l-0 lg:border-r border-gold/30 pl-6 lg:pl-0 lg:pr-6">
              <T en='A curated collection documenting the "Gadag Style" of Chalukyan architecture, the fading art of Betageri looms, and the golden hour over the Malaprabha River. Here is our city, framed.' kn='ಚಾಲುಕ್ಯ ವಾಸ್ತುಶಿಲ್ಪದ "ಗದಗ ಶೈಲಿ", ಬೆಟಗೇರಿ ಮಗ್ಗಗಳ ಮರೆಯಾಗುತ್ತಿರುವ ಕಲೆ, ಮತ್ತು ಮಲಪ್ರಭಾ ನದಿಯ ಮೇಲಿನ ಸುವರ್ಣ ಗಳಿಗೆಯನ್ನು ದಾಖಲಿಸುವ ಸಂಗ್ರಹ. ಇದು ನಮ್ಮ ನಗರ, ಚೌಕಟ್ಟಿನಲ್ಲಿ.' />
            </motion.p>
          </div>
        </motion.div>

        {/* CSS Columns Masonry Grid */}
        <div className="columns-1 md:columns-2 xl:columns-3 gap-8 md:gap-12 space-y-16">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              custom={idx % 3 + 3}
              variants={appleBlurReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group break-inside-avoid flex flex-col gap-6 cursor-pointer relative"
            >
              <div className="relative w-full overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/[0.03]">
                {/* 
                  Instead of fixing heights explicitly, we allow standard image loading, 
                  but since these don't technically have dimensions, we provide an aesthetic varying aspect ratio block! 
                */}
                <div 
                  className="w-full relative" 
                  style={{ 
                    paddingBottom: idx % 2 === 0 ? '125%' : (idx % 3 === 0 ? '150%' : '100%') 
                  }}
                >
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ filter: "grayscale(100%) opacity(0.7)", scale: 1 }}
                    whileHover={{ filter: "grayscale(0%) opacity(1)", scale: 1.05 }}
                    whileInView={{ filter: "grayscale(0%) opacity(1)", scale: 1.02 }}
                    viewport={{ once: false, margin: "-15%" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      src={img.src}
                      alt="" /* Prevent alt text visual bleed */
                      fill
                      aria-hidden="true"
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </motion.div>
                  
                  {/* Subtle inner shadow overlay */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[2rem]" />
                  
                  {/* Hover grain texture (Reveal on scroll for mobile) */}
                  <motion.div 
                    className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E')] mix-blend-soft-light"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    whileInView={{ opacity: 0.05 }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
              </div>

              {/* Outside Typography Block (Eliminates overlap/clipping bugs) */}
              <div className="flex flex-col gap-3 px-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold/60">
                    <T en={`Gallery — ${idx + 1}`} kn={`ಗ್ಯಾಲರಿ — ${idx + 1}`} />
                  </span>
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-white/30 group-hover:text-gold transition-colors duration-500">
                    <T en="View Archive" kn="ದಾಖಲೆ ನೋಡಿ" />
                  </span>
                </div>
                <p className="font-display text-2xl md:text-3xl text-white/90 leading-tight group-hover:text-gold transition-colors duration-500">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-32" />
      </div>
    </section>
  );
}
