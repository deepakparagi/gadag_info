"use client";

import { motion } from "framer-motion";
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
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function BentoExperience() {
  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-background overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12"
        >
          <div className="max-w-4xl">
            <motion.span custom={0} variants={appleBlurReveal} className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-6 block">
              <T en="04 / Tapestry of Gadag" kn="೦೪ / ಗದಗಿನ ಹೆಣಿಗೆ" />
            </motion.span>
            <motion.h2 custom={1} variants={appleBlurReveal} className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[0.9] tracking-tighter">
              <T en={<>A legacy carved in <br/><span className="text-gold italic font-display">stone, thread, and song.</span></>} kn={<>ಕಲ್ಲು, ದಾರ ಮತ್ತು ಹಾಡಿನಲ್ಲಿ <br/><span className="text-gold italic font-display">ಕೆತ್ತಿದ ಪರಂಪರೆ.</span></>} />
            </motion.h2>
          </div>
          <motion.div custom={2} variants={appleBlurReveal} className="max-w-md border-l border-gold/30 pl-8">
            <p className="font-body text-base md:text-lg text-white/40 font-light leading-relaxed">
              <T en="Gadag transcends its monuments. It is a living, breathing district woven together by ancient craft, distinct wildlife, and legendary Hindustani classical music." kn="ಗದಗು ಅದರ ಸ್ಮಾರಕಗಳನ್ನು ಮೀರಿ ನಿಂತಿದೆ. ಇದು ಪ್ರಾಚೀನ ಕರಕುಶಲತೆ, ವಿಶಿಷ್ಟ ವನ್ಯಜೀವಿಗಳು ಮತ್ತು ಪೌರಾಣಿಕ ಹಿಂದೂಸ್ತಾನಿ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತದಿಂದ ಒಟ್ಟಿಗೆ ಹೆಣೆದ ಜೀವಂತ ಜಿಲ್ಲೆ." />
            </p>
          </motion.div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:gap-8 h-auto md:h-[800px]">
          
          {/* Main Tall Card (Left) */}
          <motion.div 
            custom={3} variants={appleBlurReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 relative rounded-[2.5rem] overflow-hidden border border-white/10 group aspect-square md:aspect-auto"
          >
            <Image src="/doddabasappa_temple_star.png" alt="Doddabasappa Temple" fill className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-3 block"><T en="Architecture" kn="ವಾಸ್ತುಶಿಲ್ಪ" /></span>
              <h3 className="font-display text-3xl text-white mb-2"><T en="The Star of Dambal" kn="ಡಂಬಳದ ನಕ್ಷತ್ರ" /></h3>
              <p className="font-body text-sm text-white/50 line-clamp-2"><T en="The Doddabasappa Temple features a uniquely complex 24-pointed star floor plan, a pinnacle of structural geometry." kn="ದೊಡ್ಡಬಸಪ್ಪ ದೇವಾಲಯವು ವಿಶಿಷ್ಟವಾದ 24-ಪಾಯಿಂಟೆಡ್ ನಕ್ಷತ್ರ ನೆಲಮಹಡಿಯನ್ನು ಹೊಂದಿದೆ, ಇದು ರಚನಾತ್ಮಕ ರೇಖಾಗಣಿತದ ಪರಾಕಾಷ್ಠೆ." /></p>
            </div>
          </motion.div>

          {/* Wide Card (Top Right) */}
          <motion.div 
            custom={4} variants={appleBlurReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-2 md:row-span-1 relative rounded-[2.5rem] overflow-hidden border border-white/10 group aspect-[2/1] md:aspect-auto"
          >
            <Image src="/magadi_bird_sanctuary_sunset.png" alt="Magadi Bird Sanctuary" fill className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-70 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 block"><T en="Sanctuary" kn="ಅಭಯಾರಣ್ಯ" /></span>
              <h3 className="font-display text-2xl text-white"><T en="Magadi Waters" kn="ಮಾಗಡಿ ಕೆರೆ" /></h3>
            </div>
          </motion.div>

          {/* Small Card 1 (Bottom Mid) */}
          <motion.div 
            custom={5} variants={appleBlurReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-1 md:row-span-1 relative rounded-[2.5rem] overflow-hidden border border-white/10 group aspect-square md:aspect-auto"
          >
            <Image src="/betageri_handloom.png" alt="Betageri Handloom" fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-8 left-8">
               <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold mb-2 block"><T en="Craft" kn="ಕುಶಲಕರ್ಮ" /></span>
               <h3 className="font-display text-xl text-white"><T en="Betageri Looms" kn="ಬೆಟಗೇರಿ ಮಗ್ಗ" /></h3>
            </div>
          </motion.div>

           {/* Small Card 2 (Bottom Right) */}
           <motion.div 
            custom={6} variants={appleBlurReveal} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-1 md:row-span-1 relative rounded-[2.5rem] overflow-hidden border border-gold/10 bg-gold/5 group aspect-square md:aspect-auto flex flex-col justify-end p-8"
          >
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 block"><T en="Legacy" kn="ಪರಂಪರೆ" /></span>
            <h3 className="font-display text-2xl text-gold mb-4"><T en="Hindustani Roots" kn="ಹಿಂದೂಸ್ತಾನಿ ಬೇರುಗಳು" /></h3>
            <p className="font-body text-xs text-white/50 leading-relaxed"><T en="The cradle of legendary voices like Bharat Ratna Pt. Bhimsen Joshi and Pt. Puttaraj Gawai." kn="ಭಾರತ ರತ್ನ ಪಂ. ಭೀಮಸೇನ್ ಜೋಶಿ ಮತ್ತು ಪಂ. ಪುಟ್ಟರಾಜ ಗವಾಯಿ ಅವರಂತಹ ಪೌರಾಣಿಕ ಧ್ವನಿಗಳ ತೊಟ್ಟಿಲು." /></p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
