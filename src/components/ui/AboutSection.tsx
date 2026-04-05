"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { T } from "@/components/ui/T";

const stats = [
  { value: "114K", label: "Community", labelKn: "ಸಮುದಾಯ", suffix: "+" },
  { value: "50M", label: "Reach", labelKn: "ವ್ಯಾಪ್ತಿ", suffix: "+" },
  { value: "1.2K", label: "Archive Stories", labelKn: "ದಾಖಲೆ ಕಥೆಗಳು", suffix: "" },
  { value: "24/7", label: "Pulse", labelKn: "ನಾಡಿಮಿಡಿತ", suffix: "" },
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

export default function AboutSection() {
  return (
    <section id="about" className="pt-16 pb-20 md:py-32 bg-background overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6"
          >
            <motion.span custom={0} variants={appleBlurReveal} className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-8 block"><T en="02 / The Manifesto" kn="೦೨ / ಘೋಷಣಾ ಪತ್ರ" /></motion.span>
            
            <motion.h2 custom={1} variants={appleBlurReveal} className="font-display text-4xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] md:leading-[0.85] tracking-tighter mb-8 md:mb-12">
              <T en={<>Documenting the heart of <br/><span className="text-gold italic font-display">North Karnataka.</span></>} kn={<>ಉತ್ತರ ಕರ್ನಾಟಕದ <br/><span className="text-gold italic font-display">ಹೃದಯದ ದಾಖಲೆ.</span></>} />
            </motion.h2>
            
            <div className="relative">
              <div className="font-body text-white/50 text-base md:text-lg lg:text-xl font-light leading-relaxed space-y-10 relative z-10 max-w-2xl border-l border-gold/30 pl-8">
                <motion.p custom={2} variants={appleBlurReveal}>
                  <T en="In a rapidly evolving digital landscape, preserving true local culture becomes an architectural feat. Gadag Info is not just a platform; it is the definitive archive of our twin cities' pulse, meticulously curated for the modern era." kn="ವೇಗವಾಗಿ ವಿಕಸಿಸುತ್ತಿರುವ ಡಿಜಿಟಲ್ ಭೂದೃಶ್ಯದಲ್ಲಿ, ನಿಜವಾದ ಸ್ಥಳೀಯ ಸಂಸ್ಕೃತಿಯನ್ನು ಸಂರಕ್ಷಿಸುವುದು ವಾಸ್ತುಶಿಲ್ಪದ ಸಾಧನೆಯಾಗುತ್ತದೆ. ಗದಗ ಇನ್ಫೋ ಕೇವಲ ವೇದಿಕೆ ಅಲ್ಲ; ಆಧುನಿಕ ಯುಗಕ್ಕಾಗಿ ಎಚ್ಚರಿಕೆಯಿಂದ ಸಂಗ್ರಹಿಸಿದ ನಮ್ಮ ಅವಳಿ ನಗರಗಳ ನಾಡಿಮಿಡಿತದ ನಿರ್ಣಾಯಕ ದಾಖಲೆ." />
                </motion.p>
                <motion.p custom={3} variants={appleBlurReveal}>
                  <T en="Our collective connects over 114,000 residents daily, serving as the bridge between ancient Chalukyan heritage and contemporary community dialogues. We don't just report; we document the legacy of Gadag." kn="ನಮ್ಮ ಸಮೂಹ ಪ್ರತಿದಿನ 1,14,000ಕ್ಕೂ ಹೆಚ್ಚು ನಿವಾಸಿಗಳನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ, ಪ್ರಾಚೀನ ಚಾಲುಕ್ಯ ಪರಂಪರೆ ಮತ್ತು ಸಮಕಾಲೀನ ಸಮುದಾಯ ಸಂವಾದಗಳ ನಡುವಿನ ಸೇತುವೆಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ನಾವು ಕೇವಲ ವರದಿ ಮಾಡುವುದಿಲ್ಲ; ಗದಗಿನ ಪರಂಪರೆಯನ್ನು ದಾಖಲಿಸುತ್ತೇವೆ." />
                </motion.p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-12 max-w-md">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  custom={i + 4}
                  variants={appleBlurReveal}
                >
                  <div className="font-display text-4xl md:text-5xl text-white mb-2">
                    {stat.value}<span className="text-gold">{stat.suffix}</span>
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30">
                    <T en={stat.label} kn={stat.labelKn} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
             <div className="relative aspect-[4/5] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-white/10 glass-card">
              <Image 
                src="/about_heritage.png"
                alt="Ancient Manuscript Archive"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            </div>

            {/* Floating Detail */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-8 left-[-2rem] z-20 w-48 h-48 rounded-3xl overflow-hidden border border-gold/20 glass-card p-6 hidden xl:flex flex-col justify-end bg-background/95 backdrop-blur-xl"
            >
              <div className="font-mono text-[8px] uppercase tracking-[0.4em] text-gold/60 mb-2"><T en="Heritage Detail" kn="ಪರಂಪರೆ ವಿವರ" /></div>
              <div className="font-display text-xl text-white leading-tight"><T en={<>Chalukyan <br/>Architecture</>} kn={<>ಚಾಲುಕ್ಯ <br/>ವಾಸ್ತುಶಿಲ್ಪ</>} /></div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
