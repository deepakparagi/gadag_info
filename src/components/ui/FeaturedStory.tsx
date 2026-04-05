"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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

export function FeaturedStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section 
      ref={containerRef}
      className="pt-16 pb-20 md:py-32 bg-background overflow-hidden relative"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center relative z-10">
        
        {/* Text Container: Narrow Editorial Column */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-[35%] xl:w-[30%] z-20 order-2 lg:order-1 lg:-mr-16 xl:-mr-24 mt-8 lg:mt-0"
        >
          <div className="bg-background/40 backdrop-blur-3xl p-6 lg:p-10 xl:p-12 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-[2rem] lg:rounded-[3rem] relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(212,175,55,0.08)_0%,transparent_50%)] pointer-events-none group-hover:opacity-15 transition-opacity duration-1000" />
            
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="w-8 h-px bg-gold/30" />
              <motion.span custom={0} variants={appleBlurReveal} className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 block"><T en="03 / The Manifesto" kn="೦೩ / ಮ್ಯಾನಿಫೆಸ್ಟೋ" /></motion.span>
            </div>
            
            <motion.h2 custom={1} variants={appleBlurReveal} className="font-display text-4xl xl:text-[4rem] mb-6 lg:mb-8 leading-[0.9] md:leading-[0.85] tracking-tighter text-white">
              <T en={<>Where history <br/><span className="text-gold italic font-display">sleeps under stone.</span></>} kn={<>ಎಲ್ಲಿ ಇತಿಹಾಸವು <br/><span className="text-gold italic font-display">ಕಲ್ಲಿನಡಿ ನಿದ್ರಿಸುತ್ತದೆಯೋ.</span></>} />
            </motion.h2>
            
            <div className="font-body text-base lg:text-lg text-white/40 font-light leading-relaxed space-y-4 xl:space-y-6 mb-8 lg:mb-10 relative">
              <div className="absolute left-[-1.5rem] lg:left-[-2rem] top-0 bottom-0 w-px bg-gold/20" />
              <motion.p custom={2} variants={appleBlurReveal}>
                <T en={<>Gadag is a living tapestry woven by the <strong>Western Chalukya Empire</strong>. Here, intricate soapstone carvings breathe life into myth, and the Trikuteshwara Temple stands as a silent sentinel over centuries.</>} kn={<>ಗದಗು <strong>ಪಶ್ಚಿಮ ಚಾಲುಕ್ಯ ಸಾಮ್ರಾಜ್ಯ</strong>ದಿಂದ ನೇಯ್ದ ಜೀವಂತ ತಾರಸ್ಥಳ. ಸೂಕ್ಷ್ಮ ಕಲ್ಲಿನ ಕೆತ್ತನೆಗಳು ಪುರಾಣಕ್ಕೆ ಜೀವ ತುಂಬುತ್ತವೆ, ಮತ್ತು ತ್ರಿಕೂಟೇಶ್ವರ ದೇವಾಲಯವು ಶತಮಾನಗಳ ಮೂಕ ಕಾವಲುಗಾರನಾಗಿ ನಿಂತಿದೆ.</>} />
              </motion.p>
              <motion.p custom={3} variants={appleBlurReveal}>
                <T en={<>Beyond architectural majesty, Gadag resonates as the cradle of Kannada literature—where the monumental poet Kumaravyasa composed the <em>Karnata Bharata Kathamanjari</em>.</>} kn={<>ವಾಸ್ತುಶಿಲ್ಪದ ವೈಭವವನ್ನು ಮೀರಿ, ಗದಗು ಕನ್ನಡ ಸಾಹಿತ್ಯದ ತೊಟ್ಟಿಲಾಗಿ ಮೋಳುತ್ತದೆ—ಮಹಾನ್ ಕವಿ ಕುಮಾರವ್ಯಾಸರು <em>ಕರ್ನಾಟ ಭಾರತ ಕಥಾಮಂಜರಿ</em> ರಚಿಸಿದ ಸ್ಥಳವಿದು.</>} />
              </motion.p>
            </div>
            
            <motion.a 
              custom={4}
              variants={appleBlurReveal}
              href="/about" 
              className="group/btn inline-flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-gold transition-colors duration-500"
            >
              <T en="Explore History" kn="ಇತಿಹಾಸವನ್ನು ಅನ್ವೇಷಿಸಿ" />
              <span className="block w-12 h-px bg-gold/20 group-hover/btn:w-20 group-hover/btn:bg-gold transition-all duration-700 ease-out-expo" />
            </motion.a>
          </div>
        </motion.div>

        {/* Right: Massive Parallax Image with Premium Composition */}
        <div className="w-full lg:w-[70%] xl:w-[75%] h-[400px] lg:h-[600px] xl:h-[700px] relative overflow-hidden rounded-[2rem] lg:rounded-[3rem] order-1 lg:order-2 border border-white/[0.05] shadow-2xl">
          <div className="absolute inset-0 z-10 bg-gradient-to-l from-background/10 via-transparent to-background/80" />
          <motion.div 
            style={{ y: imgY, scale: imgScale }}
            className="absolute inset-0 w-full h-[140%] -top-[20%]"
          >
            <Image 
              src="/lakkundi_stepwell_wide.png" 
              alt="Historical texture of Gadag"
              fill
              className="object-cover opacity-70 grayscale hover:grayscale-0 transition-all duration-[3s] ease-out-expo"
              priority
            />
          </motion.div>
          
          <div className="absolute bottom-12 right-12 z-20 pointer-events-none">
             <div className="font-mono text-[8px] uppercase tracking-[0.5em] text-white/20 rotate-90 origin-bottom-right"><T en="Cinematic Heritage" kn="ಚಲನಚಿತ್ರ ಪರಂಪರೆ" /></div>
          </div>

          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E')] mix-blend-soft-light" />
        </div>
      </div>

    </section>
  );
}
