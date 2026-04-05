"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { T } from "@/components/ui/T";

interface CultureCard {
  readonly titleEn: string;
  readonly titleKn: string;
  readonly descEn: string;
  readonly descKn: string;
  readonly image: string;
}

const cards: readonly CultureCard[] = [
  {
    titleEn: "Kappattagudda",
    titleKn: "ಕಪ್ಪತ್ತಗುಡ್ಡ",
    descEn: "The emerald sanctuary of North Karnataka, teeming with rare medicinal flora and sweeping visual rhythms.",
    descKn: "ಉತ್ತರ ಕರ್ನಾಟಕದ ಜೈವಿಕ ಅಭಯಾರಣ್ಯ, ಅಪರೂಪದ ಔಷಧೀಯ ಸಸ್ಯವರ್ಗ ಮತ್ತು ವಿಶಾಲವಾದ ನಿಸರ್ಗ ಸೌಂದರ್ಯದಿಂದ ಕೂಡಿದೆ.",
    image: "/kappattagudda_hills.png",
  },
  {
    titleEn: "Bhisma Kere",
    titleKn: "ಭೀಷ್ಮ ಕೆರೆ",
    descEn: "A massive, historic lake that acts as a tranquil, liquid mirror to the city's ancient structural soul.",
    descKn: "ನಗರದ ಪ್ರಾಚೀನ ಆತ್ಮಕ್ಕೆ ನೆಮ್ಮದಿಯ, ಪ್ರತಿಫಲಿಸುವ ಜಲ ಕನ್ನಡಿಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಬೃಹತ್, ಐತಿಹಾಸಿಕ ಕೆರೆ.",
    image: "/bhisma_kere_lake.png",
  },
  {
    titleEn: "Lord Basaveshwara",
    titleKn: "ಶ್ರೀ ಬಸವೇಶ್ವರ",
    descEn: "A profound monument to the 12th-century philosopher's principles of structural equality and devotion.",
    descKn: "೧೨ನೇ ಶತಮಾನದ ತತ್ವಜ್ಞಾನಿಯ ಸಮಾನತೆ ಮತ್ತು ಭಕ್ತಿಯ ತತ್ವಗಳಿಗೆ ಒಂದು ಆಳವಾದ, ಭವ್ಯವಾದ ಸ್ಮಾರಕ.",
    image: "/basaveshwara_statue_4k.png",
  },
] as const;

const appleBlurReveal = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 1.4,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function CultureGrid() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-background overflow-hidden">
      <div className="max-w-[1600px] mx-auto group">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-white/[0.06] pb-16"
        >
          <div className="max-w-3xl">
            <motion.span 
              custom={0} 
              variants={appleBlurReveal} 
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-8 block"
            >
              <T en="Curated Highlights" kn="ಆಯ್ದ ಮುಖ್ಯಾಂಶಗಳು" />
            </motion.span>
            <motion.h2 
              custom={1} 
              variants={appleBlurReveal} 
              className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.85] tracking-tighter"
            >
              <T en={<>The soul of <br /><span className="text-gold italic font-display">North Karnataka.</span></>} kn={<>ಉತ್ತರ ಕರ್ನಾಟಕದ <br /><span className="text-gold italic font-display">ಆತ್ಮ.</span></>} />
            </motion.h2>
          </div>
          
          <motion.div
            custom={2}
            variants={appleBlurReveal}
            className="md:max-w-md lg:text-right"
          >
            <p className="font-body text-base md:text-lg text-white/40 font-light leading-relaxed border-l md:border-l-0 md:border-r border-gold/30 pl-8 md:pl-0 md:pr-8">
              <T en="From the bustling markets of Betageri to the silent steps of ancient Lakkundi temples. A curated dialogue between history and the modern era." kn="ಬೆಟಗೇರಿಯ ಗಿಜಿಗುಡುವ ಮಾರುಕಟ್ಟೆಗಳಿಂದ ಪ್ರಾಚೀನ ಲಕ್ಕುಂಡಿ ದೇವಾಲಯಗಳ ಮೌನ ಮೆಟ್ಟಿಲುಗಳವರೆಗೆ. ಇತಿಹಾಸ ಮತ್ತು ಆಧುನಿಕ ಯುಗದ ನಡುವಿನ ಸಂವಾದ." />
            </p>
          </motion.div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {cards.map((card, idx) => (
            <motion.article
              key={idx}
              custom={idx + 3}
              variants={appleBlurReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="group relative flex flex-col gap-8"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ filter: "grayscale(100%) opacity(0.7)", scale: 1 }}
                  whileHover={{ filter: "grayscale(0%) opacity(1)", scale: 1.1 }}
                  whileInView={{ filter: "grayscale(0%) opacity(1)", scale: 1.05 }}
                  viewport={{ once: false, margin: "-15%" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={card.image}
                    alt={card.titleEn}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 pointer-events-none" />
              </div>

              {/* Content Below Image */}
              <div className="px-2">
                <h3 className="font-display text-3xl md:text-4xl font-light text-white mb-4 group-hover:text-gold transition-colors duration-700">
                  <T en={card.titleEn} kn={card.titleKn} />
                </h3>
                <p className="font-body text-base text-white/40 font-light leading-relaxed max-w-sm line-clamp-3">
                  <T en={card.descEn} kn={card.descKn} />
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Hairline separator */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-white/10 mt-32 origin-left" 
        />
      </div>
    </section>
  );
}
