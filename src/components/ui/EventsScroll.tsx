"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { T } from "@/components/ui/T";

interface EventCard {
  readonly date: string;
  readonly highlight: boolean;
  readonly titleEn: string;
  readonly titleKn: string;
  readonly descriptionEn: string;
  readonly descriptionKn: string;
  readonly locationEn: string;
  readonly locationKn: string;
  readonly typeEn: string;
  readonly typeKn: string;
  readonly image: string;
}

const events: readonly EventCard[] = [
  {
    date: "JAN 15",
    highlight: false,
    titleEn: "Lakkundi Sankranti",
    titleKn: "ಲಕ್ಕುಂಡಿ ಸಂಕ್ರಾಂತಿ",
    descriptionEn: "Witness the celestial alignment and traditional rituals at the Brahma Jinalaya as the sun moves into Capricorn.",
    descriptionKn: "ಸೂರ್ಯನು ಮಕರ ರಾಶಿಗೆ ಪ್ರವೇಶಿಸುವಾಗ ಬ್ರಹ್ಮ ಜಿನಾಲಯದಲ್ಲಿ ಖಗೋಳ ಜೋಡಣೆ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಆಚರಣೆಗಳಿಗೆ ಸಾಕ್ಷಿಯಾಗಿರಿ.",
    locationEn: "Lakkundi Historic Complex",
    locationKn: "ಲಕ್ಕುಂಡಿ ಐತಿಹಾಸಿಕ ಸಂಕೀರ್ಣ",
    typeEn: "Tradition",
    typeKn: "ಸಂಪ್ರದಾಯ",
    image: "/lakkundi_stepwell_wide.png",
  },
  {
    date: "FEB 24",
    highlight: false,
    titleEn: "Trikuteshwara Mahashivaratri",
    titleKn: "ತ್ರಿಕೂಟೇಶ್ವರ ಮಹಾಶಿವರಾತ್ರಿ",
    descriptionEn: "Expect a divine midnight vigil at the 11th-century temple, featuring classical music and deep spiritual dialogues.",
    descriptionKn: "11ನೇ ಶತಮಾನದ ದೇವಾಲಯದಲ್ಲಿ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತ ಮತ್ತು ಆಳವಾದ ಆಧ್ಯಾತ್ಮಿಕ ಸಂವಾದಗಳನ್ನು ಒಳಗೊಂಡ ದೈವಿಕ ಮಧ್ಯರಾತ್ರಿ ಜಾಗರಣೆಯನ್ನು ನಿರೀಕ್ಷಿಸಿ.",
    locationEn: "Temple District",
    locationKn: "ದೇವಸ್ಥಾನದ ಪ್ರದೇಶ",
    typeEn: "Pilgrimage",
    typeKn: "ಯಾತ್ರೆ",
    image: "/trikuteshwara_temple_detail.png",
  },
  {
    date: "MAR 30",
    highlight: true,
    titleEn: "Veereshwara Jatra",
    titleKn: "ವೀರೇಶ್ವರ ಜಾತ್ರೆ",
    descriptionEn: "Annual grand procession celebrating Gadag's patron deity. A sea of community, traditional Dollu Kunitha, and vibrant markets.",
    descriptionKn: "ಗದಗಿನ ಗ್ರಾಮದೇವತೆಯ ವಾರ್ಷಿಕ ಭವ್ಯ ಮೆರವಣಿಗೆ. ಸಮುದಾಯದ ಸಾಗರ, ಸಾಂಪ್ರದಾಯಿಕ ಡೊಳ್ಳು ಕುಣಿತ ಮತ್ತು ರೋಮಾಂಚಕ ಮಾರುಕಟ್ಟೆಗಳು.",
    locationEn: "Gadag Fort Area",
    locationKn: "ಗದಗ ಕೋಟೆ ಪ್ರದೇಶ",
    typeEn: "Tradition",
    typeKn: "ಸಂಪ್ರದಾಯ",
    image: "/events_dollu.png",
  },
  {
    date: "APR 12",
    highlight: false,
    titleEn: "Ugadi Heritage Walk",
    titleKn: "ಯುಗಾದಿ ಪರಂಪರೆ ನಡಿಗೆ",
    descriptionEn: "A guided transition through the twin cities documenting the 'Gadag Style' of architecture during the Kannada New Year.",
    descriptionKn: "ಕನ್ನಡ ಹೊಸ ವರ್ಷದ ಸಂದರ್ಭದಲ್ಲಿ ಗದಗ ಶೈಲಿಯ ವಾಸ್ತುಶಿಲ್ಪವನ್ನು ದಾಖಲಿಸುವ ಅವಳಿ ನಗರಗಳ ಮಾರ್ಗದರ್ಶಿತ ನಡಿಗೆ.",
    locationEn: "Heritage Station District",
    locationKn: "ಪರಂಪರೆ ನಿಲ್ದಾಣ ಜಿಲ್ಲೆ",
    typeEn: "History",
    typeKn: "ಇತಿಹಾಸ",
    image: "/gadag_station.png",
  },
  {
    date: "MAY 05",
    highlight: false,
    titleEn: "Basava Jayanti Celebration",
    titleKn: "ಬಸವ ಜಯಂತಿ ಆಚರಣೆ",
    descriptionEn: "Commemorating the social philosopher Basavanna with scholarly discourses and community dining (Dasoha).",
    descriptionKn: "ಸಮಾಜ ಸುಧಾರಕ ಬಸವಣ್ಣನವರ ಸ್ಮರಣಾರ್ಥ ವಿದ್ವತ್ಪೂರ್ಣ ಪ್ರವಚನಗಳು ಮತ್ತು ದಾಸೋಹ.",
    locationEn: "Town Hall Plaza",
    locationKn: "ಟೌನ್ ಹಾಲ್ ಪ್ಲಾಜಾ",
    typeEn: "Society",
    typeKn: "ಸಮಾಜ",
    image: "/kasuti_embroidery.png",
  },
  {
    date: "JUN 21",
    highlight: false,
    titleEn: "Monsoon Solstice Zen",
    titleKn: "ಮಾನ್ಸೂನ್ ಸಂಕ್ರಾಂತಿ ಧ್ಯಾನ",
    descriptionEn: "A collective yoga and meditation session by the Malaprabha River as the first rains touch the dry plains.",
    descriptionKn: "ಒಣ ಬಯಲು ಪ್ರದೇಶಗಳನ್ನು ಮೊದಲ ಮಳೆ ಸ್ಪರ್ಶಿಸಿದಾಗ ಮಲಪ್ರಭಾ ನದಿಯ ದಡದಲ್ಲಿ ಸಾಮೂಹಿಕ ಯೋಗ ಮತ್ತು ಧ್ಯಾನದ ಅವಧಿ.",
    locationEn: "Malaprabha River Banks",
    locationKn: "ಮಲಪ್ರಭಾ ನದಿ ತೀರ",
    typeEn: "Wellness",
    typeKn: "ಕ್ಷೇಮ",
    image: "/magadi_bird_sanctuary_sunset.png",
  },
  {
    date: "JUL 18",
    highlight: false,
    titleEn: "Startup Gadag Meetup",
    titleKn: "ಸ್ಟಾರ್ಟ್ಅಪ್ ಗದಗ ಮೀಟಅಪ್",
    descriptionEn: "The quarterly innovation summit for local entrepreneurs, tech-heads, and the next-gen weavers of Betageri.",
    descriptionKn: "ಸ್ಥಳೀಯ ಉದ್ಯಮಿಗಳು, ತಂತ್ರಜ್ಞರು ಮತ್ತು ಬೆಟಗೇರಿಯ ಮುಂದಿನ ಪೀಳಿಗೆಯ ನೇಕಾರರಿಗಾಗಿ ತ್ರೈಮಾಸಿಕ ನಾವೀನ್ಯತೆ ಶೃಂಗಸಭೆ.",
    locationEn: "TEC Hub, College Road",
    locationKn: "ಟಿಇಸಿ ಹಬ್, ಕಾಲೇಜು ರಸ್ತೆ",
    typeEn: "Innovation",
    typeKn: "ನಾವೀನ್ಯತೆ",
    image: "/promote_heritage.png",
  },
  {
    date: "AUG 15",
    highlight: false,
    titleEn: "Independence Day Parade",
    titleKn: "ಸ್ವಾತಂತ್ರ್ಯ ದಿನಾಚರಣೆಯ ಪೆರೇಡ್",
    descriptionEn: "A grand civic display of patriotism and local school bands marching through the historic Station Road.",
    descriptionKn: "ಐತಿಹಾಸಿಕ ಸ್ಟೇಷನ್ ರಸ್ತೆಯಲ್ಲಿ ದೇಶಭಕ್ತಿಯ ಭವ್ಯ ನಾಗರಿಕ ಪ್ರದರ್ಶನ ಮತ್ತು ಸ್ಥಳೀಯ ಶಾಲಾ ಬ್ಯಾಂಡ್‌ಗಳ ಮೆರವಣಿಗೆ.",
    locationEn: "District Stadium",
    locationKn: "ಜಿಲ್ಲಾ ಕ್ರೀಡಾಂಗಣ",
    typeEn: "Civic",
    typeKn: "ನಾಗರಿಕ",
    image: "/gadag_heritage_hero.png",
  },
  {
    date: "SEP 07",
    highlight: true,
    titleEn: "Ganesha Chaturthi",
    titleKn: "ಗಣೇಶ ಚತುರ್ಥಿ",
    descriptionEn: "The city transforms into a gallery of clay art. Massive eco-friendly installations celebrating the remover of obstacles.",
    descriptionKn: "ನಗರವು ಮಣ್ಣಿನ ಕಲೆಯ ಗ್ಯಾಲರಿಯಾಗಿ ಬದಲಾಗುತ್ತದೆ. ವಿಘ್ನನಿವಾರಕನನ್ನು ಪೂಜಿಸುವ ಬೃಹತ್ ಪರಿಸರ ಸ್ನೇಹಿ ಪ್ರತಿಷ್ಠಾಪನೆಗಳು.",
    locationEn: "Citywide",
    locationKn: "ನಗರದಾದ್ಯಂತ",
    typeEn: "Tradition",
    typeKn: "ಸಂಪ್ರದಾಯ",
    image: "/doddabasappa_temple_star.png",
  },
  {
    date: "OCT 20",
    highlight: false,
    titleEn: "Dasara Cultural Fest",
    titleKn: "ದಸರಾ ಸಾಂಸ್ಕೃತಿಕ ಉತ್ಸವ",
    descriptionEn: "Ten days of music, dance, and theater showcasing the cultural richness of the Chalukyan heartland.",
    descriptionKn: "ಚಾಲುಕ್ಯರ ಹೃದಯಭಾಗದ ಸಾಂಸ್ಕೃತಿಕ ಶ್ರೀಮಂತಿಕೆಯನ್ನು ಪ್ರದರ್ಶಿಸುವ ಹತ್ತು ದಿನಗಳ ಸಂಗೀತ, ನೃತ್ಯ ಮತ್ತು ನಾಟಕಗಳು.",
    locationEn: "Kala Bhavan",
    locationKn: "ಕಲಾ ಭವನ",
    typeEn: "Culture",
    typeKn: "ಸಂಸ್ಕೃತಿ",
    image: "/lakkundi_temple_art.png",
  },
  {
    date: "NOV 01",
    highlight: true,
    titleEn: "Rajyotsava Gala",
    titleKn: "ರಾಜ್ಯೋತ್ಸವ ಸಂಭ್ರಮ",
    descriptionEn: "A high-energy celebration of Karnataka's foundation. Flag hoisting, Kannada folk sports, and massive community feasts.",
    descriptionKn: "ಕರ್ನಾಟಕ ಸ್ಥಾಪನೆಯ ಅದ್ದೂರಿ ಆಚರಣೆ. ಧ್ವಜಾರೋಹಣ, ಕನ್ನಡ ಜಾನಪದ ಕ್ರೀಡೆಗಳು ಮತ್ತು ಬೃಹತ್ ಸಮುದಾಯ ಭೋಜನ.",
    locationEn: "Municipal Circle",
    locationKn: "ಮುನ್ಸಿಪಲ್ ಸರ್ಕಲ್",
    typeEn: "Heritage",
    typeKn: "ಪರಂಪರೆ",
    image: "/betageri_handloom.png",
  },
  {
    date: "DEC 24",
    highlight: false,
    titleEn: "Winter Bazaar & Christmas",
    titleKn: "ವಿಂಟರ್ ಬಜಾರ್ ಮತ್ತು ಕ್ರಿಸ್ಮಸ್",
    descriptionEn: "Exploring the Victorian-era churches and local markets lit up for the winter festivities.",
    descriptionKn: "ಚಳಿಗಾಲದ ಹಬ್ಬಗಳಿಗಾಗಿ ಬೆಳಗಿದ ವಿಕ್ಟೋರಿಯನ್ ಯುಗದ ಚರ್ಚ್‌ಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಗಳ ಅನ್ವೇಷಣೆ.",
    locationEn: "Station Road Market",
    locationKn: "ಸ್ಟೇಷನ್ ರೋಡ್ ಮಾರ್ಕೆಟ್",
    typeEn: "Seasonal",
    typeKn: "ಕಾಲೋಚಿತ",
    image: "/about_heritage.png",
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
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function EventsList() {
  return (
    <section className="py-20 md:py-32 bg-background relative w-full overflow-hidden">
      
      {/* Cinematic Intro Banner */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mb-20 md:mb-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-16 lg:items-end justify-between border-b border-white/[0.06] pb-12"
        >
          <div className="lg:w-1/2">
            <motion.span custom={0} variants={appleBlurReveal} className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-6 block"><T en="03 / The Pulse" kn="೦೩ / ನಾಡಿಮಿಡಿತ" /></motion.span>
            <motion.h2 custom={1} variants={appleBlurReveal} className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white leading-none tracking-tighter mb-8 lg:mb-0">
              <T en={<>City <em className="text-gold italic font-display">Chronicles.</em></>} kn={<>ನಗರದ <em className="text-gold italic font-display">ಕಾಲನಿಧಿ.</em></>} />
            </motion.h2>
          </div>
          <div className="lg:w-1/2 flex justify-start lg:justify-end">
             <motion.p custom={2} variants={appleBlurReveal} className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 max-w-sm lg:text-right leading-loose">
                <T en="From ancient jatras to modern tech meetups, Gadag is a living, breathing tapestry of history in motion." kn="ಪ್ರಾಚೀನ ಜಾತ್ರೆಗಳಿಂದ ಆಧುನಿಕ ಟೆಕ್ ಮೀಟಅಪ್‌ಗಳವರೆಗೆ, ಗದಗು ಚಲನೆಯಲ್ಲಿರುವ ಇತಿಹಾಸದ ಜೀವಂತ ತಾರಸ್ಥಳ." />
             </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Vertical Interactive Index */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="border-t border-white/[0.06]">
          {events.map((event, idx) => (
             <motion.div
               key={idx}
               custom={idx + 3}
               variants={appleBlurReveal}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-50px" }}
               className="group relative border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-500 cursor-pointer"
             >
                 <div className="py-10 md:py-16 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 px-4 lg:px-8">
                   
                   {/* Col 1: Date & Image Concept */}
                   <div className="md:w-1/5 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-6">
                      <div className="relative">
                        <span className="font-display text-2xl md:text-4xl text-white/90 block">{event.date}</span>
                        {event.highlight && (
                          <span className="inline-block px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full font-mono text-[8.5px] uppercase tracking-[0.2em] text-gold mt-2">
                            <T en="Featured" kn="ವಿಶೇಷ" />
                          </span>
                        )}
                      </div>
                      
                      {/* Floating Thumbnail Reveal (Desktop) / Static (Mobile) */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/10 glass-card">
                        <motion.div
                          className="absolute inset-0 w-full h-full"
                          initial={{ filter: "grayscale(100%) brightness(0.8)", scale: 1 }}
                          whileHover={{ filter: "grayscale(0%) brightness(1)", scale: 1.1 }}
                          whileInView={{ filter: "grayscale(0%) brightness(1)", scale: 1.05 }}
                          viewport={{ once: false, margin: "-10%" }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Image 
                            src={event.image}
                            alt={event.titleEn}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                      </div>
                   </div>

                   {/* Col 2: Title & Desc */}
                    <div className="md:w-2/5 flex flex-col gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30"><T en={event.typeEn} kn={event.typeKn} /></span>
                      <h3 className="font-display text-4xl md:text-5xl font-light text-white group-hover:text-gold transition-colors duration-700 leading-tight">
                        <T en={event.titleEn} kn={event.titleKn} />
                      </h3>
                      {/* Mobile description */}
                      <p className="font-body text-sm text-white/50 leading-relaxed font-light mt-4 block lg:hidden">
                         <T en={event.descriptionEn} kn={event.descriptionKn} />
                      </p>
                   </div>

                   {/* Col 3: Description (Desktop) */}
                    <div className="md:w-1/5 hidden lg:block pr-8">
                      <p className="font-body text-xs text-white/50 leading-relaxed font-light line-clamp-3">
                         <T en={event.descriptionEn} kn={event.descriptionKn} />
                      </p>
                   </div>

                   {/* Col 4: Location & Action */}
                   <div className="md:w-1/5 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 mt-8 md:mt-0 lg:text-right">
                       <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60 flex items-center justify-start lg:justify-end gap-3 text-left lg:text-right">
                        <MapPin className="w-4 h-4 text-gold/60" /> 
                        <T en={event.locationEn} kn={event.locationKn} />
                      </span>
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center opacity-40 group-hover:bg-gold group-hover:border-gold group-hover:opacity-100 transition-all duration-500 mt-0 md:mt-6">
                         <ArrowUpRight className="w-5 h-5 text-white group-hover:text-background transition-colors" />
                      </div>
                   </div>

                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
