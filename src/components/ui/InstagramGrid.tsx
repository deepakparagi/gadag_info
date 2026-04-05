"use client";

import { motion } from "framer-motion";
import { mockInstagramPosts } from "@/data/instagram";
import { ArrowRight } from "lucide-react";
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

export default function InstagramGrid() {
  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.div
            custom={0}
            variants={appleBlurReveal}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8 backdrop-blur-md shadow-xl"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white"><T en="Live Feed" kn="ನೇರ ಫೀಡ್" /></span>
          </motion.div>
          
          <motion.h2 
            custom={1}
            variants={appleBlurReveal}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[0.9] tracking-tighter mb-6"
          >
            <T en={<>Gadag Info <br /><span className="text-gold italic">Archive</span></>} kn={<>ಗದಗ ಇನ್ಫೋ <br /><span className="text-gold italic">ದಾಖಲೆ</span></>} />
          </motion.h2>
          
          <motion.p 
            custom={2}
            variants={appleBlurReveal}
            className="font-body text-white/40 max-w-lg mx-auto font-light text-base md:text-lg leading-relaxed"
          >
            <T en="Real-time updates, stories, and heritage captures curated from our community." kn="ನಮ್ಮ ಸಮುದಾಯದಿಂದ ಸಂಗ್ರಹಿಸಿದ ನವೀಕರಣಗಳು, ಕಥೆಗಳು ಮತ್ತು ಪರಂಪರೆಯ ಚಿತ್ರಗಳು." />
          </motion.p>
        </motion.div>

        {/* Premium High-Gap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 w-full">
          {mockInstagramPosts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              custom={idx + 3}
              variants={appleBlurReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/[0.05] flex shadow-2xl transition-all duration-700 hover:border-gold/30"
            >
              <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ filter: "grayscale(100%) opacity(0.7)", scale: 1 }}
                whileHover={{ filter: "grayscale(0%) opacity(1)", scale: 1.08 }}
                whileInView={{ filter: "grayscale(0%) opacity(1)", scale: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={post.mediaUrl}
                  alt=""
                  fill
                  aria-hidden="true"
                  className="object-cover"
                />
              </motion.div>

              {/* Enhanced Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-70 z-10" />

              {/* View Glass Overlay on Hover */}
              <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/20 backdrop-blur-[2px]">
                <span className="px-10 py-4 rounded-full bg-white text-background font-mono text-[10px] uppercase tracking-[0.3em] font-bold shadow-[0_20px_40px_rgba(0,0,0,0.3)] transform scale-90 group-hover:scale-100 transition-transform duration-700">
                  <T en="View on Instagram" kn="ಇನ್ಸ್ಟಾಗ್ರಾಮ್‌ನಲ್ಲಿ ನೋಡಿ" />
                </span>
              </div>

              {/* Persistent Content (Improved visibility & focus on hover) */}
              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-12 z-20 transition-all duration-700 group-hover:-translate-y-2">
                <p className="font-body text-white text-sm md:text-base font-light line-clamp-2 leading-relaxed mb-5 drop-shadow-lg transition-colors duration-500 group-hover:text-white/100 text-white/80">
                  {post.caption}
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px w-8 bg-gold/30 transition-all duration-700 group-hover:w-12 group-hover:bg-gold" />
                  <p className="font-mono text-gold/60 text-[9px] uppercase tracking-[0.4em] group-hover:text-gold transition-colors duration-500">
                    {post.timestamp ? new Date(post.timestamp).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    }) : "The Archive"}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="mt-20"
        >
            <a href="https://instagram.com/gadag_info" target="_blank" className="group flex items-center gap-6 px-10 py-5 border border-white/10 rounded-full font-mono text-[10px] uppercase tracking-[0.4em] text-white hover:border-gold/40 hover:text-gold transition-all duration-500">
                <T en="Follow @gadag_info" kn="@gadag_info ಅನುಸರಿಸಿ" />
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
            </a>
        </motion.div>
      </div>
    </section>
  );
}
