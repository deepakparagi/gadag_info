"use client";

import FeedGrid from "@/components/ui/FeedGrid";
import { KineticMarquee } from "@/components/ui/KineticMarquee";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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

export default function StoriesPage() {
  return (
    <div className="bg-background min-h-screen">
      <div className="pt-32 pb-20">
        
        {/* Spotlight Featured Post */}
        <section className="px-6 md:px-12 lg:px-24 mb-20 md:mb-40 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* Left Image Spotlight */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-12 xl:col-span-8 group relative"
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02]">
                <Image
                  src="/magadi_bird_sanctuary_sunset.png"
                  alt=""
                  fill
                  aria-hidden="true"
                  className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s] scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              </div>
              
              {/* Feature Content (Stacked natively for mobile focus) */}
              <div className="mt-10 md:mt-16 max-w-3xl">
                <motion.span 
                  custom={0}
                  variants={appleBlurReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-8 block"
                >
                  <T en="02 / Culture Spotlight" kn="೦೨ / ಸಂಸ್ಕೃತಿ ಸ್ಪಾಟ್ಲೈಟ್" />
                </motion.span>
                
                <motion.h1 
                  custom={1}
                  variants={appleBlurReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.85] tracking-tighter mb-10"
                >
                  <T en={<>Threads of <br /><em className="text-gold italic">Gold.</em></>} kn={<>ಚಿನ್ನದ <br /><em className="text-gold italic">ನೂಲುಗಳು.</em></>} />
                </motion.h1>
                
                <motion.p 
                  custom={2}
                  variants={appleBlurReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="font-body text-white/50 text-base md:text-lg lg:text-xl leading-relaxed font-light mb-12 max-w-2xl border-l border-gold/30 pl-8"
                >
                  <T en="Beyond the ancient stone temples, the twin cities of Gadag-Betageri resonate with the clack of handlooms. A legacy interlacing history and daily life into every fold of Gadag Cotton." kn="ಪ್ರಾಚೀನ ಕಲ್ಲಿನ ದೇವಾಲಯಗಳ ಆಚೆಗೆ, ಗದಗ-ಬೆಟಗೇರಿ ಅವಳಿ ನಗರಗಳು ಕೈಮಗ್ಗಗಳ ಸದ್ದಿನಿಂದ ಪ್ರತಿಧ್ವನಿಸುತ್ತವೆ. ಗದಗ ಹತ್ತಿಯ ಪ್ರತಿ ಮಡಿಕೆಯಲ್ಲಿ ಇತಿಹಾಸ ಮತ್ತು ದೈನಂದಿನ ಬದುಕನ್ನು ಹೆಣೆಯುವ ಪರಂಪರೆ." />
                </motion.p>
                
                <motion.div
                  custom={3}
                  variants={appleBlurReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <a href="#" className="group inline-flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white">
                    <T en="Read Feature" kn="ಲೇಖನ ಓದಿ" />
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-700 ease-out-expo">
                      <ArrowRight className="w-5 h-5 text-white group-hover:text-background" />
                    </div>
                  </a>
                </motion.div>
              </div>
            </motion.div>

            {/* Side Trending (Stacked on mobile, side on desktop xl) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="lg:col-span-12 xl:col-span-4 flex flex-col justify-start pt-12 lg:pt-0"
            >
              <div className="space-y-16 lg:space-y-20 xl:pl-12 xl:border-l xl:border-white/5">
                {[
                  {
                    num: "01",
                    title: "The 1857 Echoes of Bhaskar Rao Bhave",
                    titleKn: "1857ರ ಭಾಸ್ಕರ ರಾವ್ ಭಾವೆ ಪ್ರತಿಧ್ವನಿಗಳು",
                    desc: "Revisiting the fiercely fought battles in Nargund.",
                    descKn: "ನರಗುಂದದ ತೀವ್ರ ಹೋರಾಟಗಳನ್ನು ಮರುಪರಿಶೀಲನೆ."
                  },
                  {
                    num: "02",
                    title: "Winter Visitors at Magadi Sanctuary",
                    titleKn: "ಮಗದಿ ಅಭಯಾರಣ್ಯದ ಚಳಿಗಾಲದ ಅತಿಥಿಗಳು",
                    desc: "Migratory journeys spanning continents.",
                    descKn: "ಖಂಡಗಳನ್ನು ದಾಟುವ ವಲಸೆ ಪ್ರಯಾಣಗಳು."
                  },
                  {
                    num: "03",
                    title: "The Geometry of Doddabasappa Temple",
                    titleKn: "ದೊಡ್ಡಬಸಪ್ಪ ದೇವಾಲಯದ ರೇಖಾಗಣಿತ",
                    desc: "Star-shaped precision of the 12th century.",
                    descKn: "12ನೇ ಶತಮಾನದ ನಕ್ಷತ್ರಾಕಾರದ ನಿಖರತೆ."
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="group cursor-pointer"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <span className="font-mono text-[9px] text-gold/40 uppercase tracking-[0.4em] mb-4 block group-hover:text-gold transition-colors">
                      <T en={`Trending / ${item.num}`} kn={`ಟ್ರೆಂಡಿಂಗ್ / ${item.num}`} />
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl text-white/90 group-hover:text-white transition-colors mb-4 leading-tight">
                      <T en={item.title} kn={item.titleKn} />
                    </h3>
                    <p className="font-body text-xs text-white/40 group-hover:text-white/60 transition-colors line-clamp-2 font-light leading-relaxed">
                      <T en={item.desc} kn={item.descKn} />
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <KineticMarquee text="THE GADAG ARCHIVE • STORIES UNEARTHED • COMMUNITY SHOUTOUTS •" />

        <div className="mt-40">
          <FeedGrid />
        </div>
      </div>
    </div>
  );
}
