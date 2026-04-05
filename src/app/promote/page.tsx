"use client";

import PromoteForm from "@/components/ui/PromoteForm";
import Image from "next/image";
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

export default function PromotePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] flex flex-col justify-center overflow-hidden border-b border-white/[0.03]">
        <Image 
          src="/promote_heritage.png"
          alt=""
          fill
          className="object-cover opacity-30 grayscale"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto w-full pt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <motion.span 
              custom={0}
              variants={appleBlurReveal}
              className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold mb-8 block"
            >
              <T en="05 / The Partnership" kn="೦೫ / ಪಾಲುದಾರಿಕೆ" />
            </motion.span>
            
            <motion.h1 
              custom={1}
              variants={appleBlurReveal}
              className="font-display text-7xl md:text-9xl font-light text-white leading-[0.85] tracking-tighter mb-10"
            >
              <T en={<>Tell your story <br />to <em className="text-gold italic">114K+ voices.</em></>} kn={<>ನಿಮ್ಮ ಕಥೆಯನ್ನು <br /><em className="text-gold italic">೧.೧೪ ಲಕ್ಷ+ ಧ್ವನಿಗಳಿಗೆ ತಲುಪಿಸಿ.</em></>} />
            </motion.h1>
            
            <motion.p 
              custom={2}
              variants={appleBlurReveal}
              className="font-body text-white/50 text-lg md:text-xl lg:text-2xl font-light max-w-2xl leading-relaxed"
            >
              <T en="Whether you represent a heritage project, a local Betageri artisan, or a modern enterprise in Gadag, our platform offers unparalleled reach." kn="ನೀವು ಪಾರಂಪರಿಕ ಯೋಜನೆ, ಸ್ಥಳೀಯ ಬೆಟಗೇರಿ ಕುಶಲಕರ್ಮಿ, ಅಥವಾ ಗದಗದ ಆಧುನಿಕ ಉದ್ಯಮವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತಿರಲಿ, ನಮ್ಮ ವೇದಿಕೆಯು ಅಸಾಧಾರಣ ತಲುಪುವಿಕೆ ನೀಡುತ್ತದೆ." />
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <div className="py-24">
        <PromoteForm />
      </div>

      {/* Aesthetic Footer Detail for this page */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-12 md:p-20 rounded-[3rem] border border-white/[0.03] text-center bg-white/[0.01]"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/20 mb-12 block"><T en="Platform Reach" kn="ವೇದಿಕೆ ತಲುಪುವಿಕೆ" /></span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-white/40">
            <div>
              <div className="font-display text-4xl md:text-5xl text-white mb-2">50M</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.2em]"><T en="Monthly Impressions" kn="ಮಾಸಿಕ ನೋಟಗಳು" /></div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-white mb-2">92%</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.2em]"><T en="Local Engagement" kn="ಸ್ಥಳೀಯ ಸಂಪರ್ಕ" /></div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-white mb-2">12K</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.2em]"><T en="Archived Stories" kn="ಸಂಗ್ರಹಿತ ಕಥೆಗಳು" /></div>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-white mb-2">10+</div>
              <div className="font-mono text-[8px] uppercase tracking-[0.2em]"><T en="Global Partnerships" kn="ಜಾಗತಿಕ ಪಾಲುದಾರಿಕೆ" /></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
