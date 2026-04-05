"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { T } from "@/components/ui/T";

interface FeedCard {
  readonly image: string;
  readonly tag: string;
  readonly caption: string;
  readonly captionKn: string;
}

const feedCards: readonly FeedCard[] = [
  {
    image: "/trikuteshwara_temple_detail.png",
    tag: "Heritage",
    caption: "The silent geometry of Trikuteshwara. A masterpiece of Chalukyan stonecraft.",
    captionKn: "ತ್ರಿಕೂಟೇಶ್ವರದ ಮೌನ ರೇಖಾಗಣಿತ. ಚಾಲುಕ್ಯ ಶಿಲಾಕಲೆಯ ಮಹಾನ್ ಕಲಾಕೃತಿ.",
  },
  {
    image: "/gadag_station.png",
    tag: "Architecture",
    caption: "Gadag Junction — where Victorian grandeur meets local soul.",
    captionKn: "ಗದಗ ಜಂಕ್ಷನ್ — ವಿಕ್ಟೋರಿಯನ್ ಭವ್ಯತೆ ಸ್ಥಳೀಯ ಆತ್ಮವನ್ನು ಭೇಟಿಯಾಗುವ ಸ್ಥಳ.",
  },
  {
    image: "/kasuti_embroidery.png",
    tag: "Culture",
    caption: "The mathematical precision of Kasuti. Every stitch tells a story.",
    captionKn: "ಕಸೂತಿಯ ಗಣಿತ ನಿಖರತೆ. ಪ್ರತಿ ಹೊಲಿಗೆ ಒಂದು ಕಥೆ ಹೇಳುತ್ತದೆ.",
  },
  {
    image: "/lakkundi_temple_art.png",
    tag: "History",
    caption: "Reliefs that breathe. Lakkundi is a living museum of Indian art.",
    captionKn: "ಉಸಿರಾಡುವ ಶಿಲ್ಪಗಳು. ಲಕ್ಕುಂಡಿ ಭಾರತೀಯ ಕಲೆಯ ಜೀವಂತ ವಸ್ತುಸಂಗ್ರಹಾಲಯ.",
  },
  {
    image: "/magadi_bird_sanctuary_sunset.png",
    tag: "Nature",
    caption: "Sunset at Magadi. A sanctuary for both soul and migratory wanderers.",
    captionKn: "ಮಗದಿಯಲ್ಲಿ ಸೂರ್ಯಾಸ್ತ. ಆತ್ಮ ಮತ್ತು ವಲಸೆ ಪಕ್ಷಿಗಳ ಅಭಯಾರಣ್ಯ.",
  },
  {
    image: "/betageri_handloom.png",
    tag: "Heritage",
    caption: "Echoes of the loom. The fading art of Betageri's master weavers.",
    captionKn: "ಮಗ್ಗದ ಪ್ರತಿಧ್ವನಿ. ಬೆಟಗೇರಿಯ ಮಹಾ ನೇಕಾರರ ಮರೆಯಾಗುತ್ತಿರುವ ಕಲೆ.",
  },
] as const;

export default function FeedGrid() {
  return (
    <section className="py-20 md:py-32 bg-background relative z-10 w-full overflow-hidden border-t border-white/[0.03]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-4 block"><T en="02 / The Feed" kn="೦೨ / ಫೀಡ್" /></span>
            <h2 className="font-display text-5xl md:text-7xl font-light text-white leading-none tracking-tighter">
              <T en={<>Fresh <em className="text-gold not-italic">Stories.</em></>} kn={<>ಹೊಸ <em className="text-gold not-italic">ಕಥೆಗಳು.</em></>} />
            </h2>
          </div>
          <p className="font-body text-sm text-white/40 max-w-[200px] lg:text-right">
            <T en="Curated dispatches from the heart of the twin cities." kn="ಅವಳಿ ನಗರಗಳ ಹೃದಯದಿಂದ ಸಂಗ್ರಹಿಸಿದ ವರದಿಗಳು." />
          </p>
        </motion.div>

        {/* Disciplined Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
          {feedCards.map((card, idx) => (
            <motion.a
              key={idx}
              href="https://instagram.com/gadag_info"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 1.2,
                delay: (idx % 3) * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col cursor-pointer overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] shadow-2xl transition-all duration-700 hover:border-gold/20"
            >
              {/* Image Container with Fixed Aspect Ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  initial={{ filter: "grayscale(100%) opacity(0.7)", scale: 1 }}
                  whileHover={{ filter: "grayscale(0%) opacity(1)", scale: 1.05 }}
                  whileInView={{
                    filter: "grayscale(0%) opacity(1)",
                    scale: 1,
                  }}
                  viewport={{ once: false, margin: "-10%" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    aria-hidden="true"
                    className="object-cover"
                    loading="lazy"
                  />
                </motion.div>

                {/* Permanent Gradient Overlay for Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />

                {/* View Button Overlay (Appears on Hover) */}
                <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 transition-all duration-700 group-hover:opacity-100">
                  <span className="rounded-full bg-white px-8 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-background shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-700">
                    <T en="View Post" kn="ಪೋಸ್ಟ್ ನೋಡಿ" />
                  </span>
                </div>

                {/* Content Inside Card (Always visible, focused on hover) */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-10 transition-transform duration-700 group-hover:-translate-y-2">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-px w-8 bg-gold/40 transition-all duration-700 group-hover:w-12 group-hover:bg-gold" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-gold/80">
                      {card.tag}
                    </span>
                  </div>
                  <p className="font-display text-2xl leading-tight text-white/90 transition-colors duration-500 group-hover:text-white drop-shadow-md">
                    <T en={card.caption} kn={card.captionKn} />
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>


      </div>
    </section>
  );
}
