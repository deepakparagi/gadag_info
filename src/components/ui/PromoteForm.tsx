import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useCallback, useRef, useEffect, type FormEvent, type ChangeEvent } from "react";
import { Send, CheckCircle2, Store, User, Phone, Mail, PenTool, Sparkles } from "lucide-react";
import { T } from "@/components/ui/T";
import gsap from "gsap";

interface FormField {
  readonly id: string;
  readonly label: string;
  readonly type: string;
  readonly placeholder: string;
  readonly colSpan: string;
  readonly icon: typeof Store;
}

const formFields: readonly FormField[] = [
  { id: "businessName", label: "Business Name", type: "text", placeholder: "e.g. Cloud Nine Café", colSpan: "lg:col-span-8", icon: Store },
  { id: "ownerName", label: "Owner Name", type: "text", placeholder: "e.g. Ravi Kumar", colSpan: "lg:col-span-4", icon: User },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", colSpan: "lg:col-span-5", icon: Phone },
  { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com", colSpan: "lg:col-span-7", icon: Mail },
  { id: "message", label: "Message / Brief", type: "textarea", placeholder: "Describe your business, offer, or campaign idea. Tell us about your brand's story and how you'd like to connect with the Gadag community...", colSpan: "lg:col-span-12", icon: PenTool },
];

const WHATSAPP_NUMBER = "919876543210";

interface FormState {
  [key: string]: string;
}

interface ErrorState {
  [key: string]: boolean;
}

/* ─── Magnetic Button Component ─── */
function MagneticButton({ children, onClick, className, style, type = "button" }: any) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      button.style.setProperty("--x", `${((clientX - left) / width) * 100}%`);
      button.style.setProperty("--y", `${((clientY - top) / height) * 100}%`);

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const onMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener("mousemove", onMouseMove);
    button.addEventListener("mouseleave", onMouseLeave);
    return () => {
      button.removeEventListener("mousemove", onMouseMove);
      button.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <button ref={buttonRef} type={type} onClick={onClick} className={className} style={style}>
      {children}
    </button>
  );
}

/* ─── Character Reveal Component ─── */
function CharacterReveal({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <span ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.02,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

const stagger = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* ─── Decorative corner bracket ─── */
function CornerAccent({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const rotationMap = { tl: "rotate-0", tr: "rotate-90", bl: "-rotate-90", br: "rotate-180" };
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`absolute opacity-30 ${rotationMap[position]} ${
        position.includes("t") ? "top-3" : "bottom-3"
      } ${position.includes("l") ? "left-3" : "right-3"}`}
    >
      <path d="M1 7V1H7" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
    </svg>
  );
}

/* ─── Animated input field ─── */
function AnimatedField({
  field,
  index,
  value,
  error,
  onChange,
  onBlur,
  isFocused,
  onFocusChange,
}: {
  field: FormField;
  index: number;
  value: string;
  error: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isFocused: boolean;
  onFocusChange: (id: string, focused: boolean) => void;
}) {
  const baseClasses = `w-full bg-white/[0.03] border text-white font-body font-light text-base outline-none transition-all duration-700 ease-out-expo ${
    error
      ? "border-red-500/40 bg-red-500/[0.03]"
      : "border-white/10 focus:border-gold/40 focus:bg-white/[0.05]"
  }`;

  return (
    <motion.div
      custom={index + 3}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`relative group ${field.colSpan}`}
    >
      {/* 2026 Refraction Border */}
      <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Floating Glow on Focus */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute -inset-4 rounded-[3rem] pointer-events-none z-0"
            style={{
              background: "radial-gradient(circle at center, rgba(212,175,55,0.06) 0%, transparent 75%)",
              filter: "blur(20px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Label with technical mono character reveal */}
      <label
        htmlFor={field.id}
        className="flex items-center gap-3 mb-5 ml-1"
      >
        <field.icon className="w-3.5 h-3.5 text-gold/80 group-focus-within:text-gold transition-colors duration-500" strokeWidth={1.5} />
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/60 group-focus-within:text-gold transition-colors duration-500">
          <CharacterReveal text={field.label} delay={index * 0.1} />
        </span>
        {error && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-[7px] uppercase tracking-[0.2em] text-red-400/80 bg-red-400/10 px-2 py-0.5 rounded-full ml-auto mr-1"
          >
            Required
          </motion.span>
        )}
      </label>

      {/* Input with 1px structural hairlines */}
      <div className="relative">
        <CornerAccent position="tl" />
        <CornerAccent position="tr" />
        <CornerAccent position="bl" />
        <CornerAccent position="br" />

        {field.type === "textarea" ? (
          <textarea
            id={field.id}
            name={field.id}
            placeholder=""
            onChange={onChange}
            onBlur={(e) => {
              onBlur(e);
              onFocusChange(field.id, false);
            }}
            onFocus={() => onFocusChange(field.id, true)}
            rows={6}
            className={`${baseClasses} rounded-[2rem] px-10 py-8 resize-none`}
            style={{
              boxShadow: isFocused
                ? "0 30px 80px -15px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.05)"
                : "none",
            }}
          />
        ) : (
          <input
            id={field.id}
            name={field.id}
            type={field.type}
            placeholder=""
            onChange={onChange}
            onBlur={(e) => {
              onBlur(e);
              onFocusChange(field.id, false);
            }}
            onFocus={() => onFocusChange(field.id, true)}
            className={`${baseClasses} rounded-[2rem] px-10 py-8`}
            style={{
              boxShadow: isFocused
                ? "0 30px 80px -15px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.05)"
                : "none",
            }}
          />
        )}

        {/* Cinematic bottom accent */}
        <div className="absolute bottom-0 left-10 right-10 flex justify-center gap-2 opacity-40">
          <motion.div 
            className="w-2 h-[1px] bg-gold/50"
            animate={{ opacity: isFocused ? 1 : 0.3 }}
          />
          <motion.div 
            className="h-[1px] bg-gold/40 origin-left"
            initial={{ width: 0 }}
            animate={{ width: isFocused ? "100%" : 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          />
          <motion.div 
            className="w-2 h-[1px] bg-gold/50"
            animate={{ opacity: isFocused ? 1 : 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ═══ PROMOTE FORM ═══ */
export default function PromoteForm() {
  const [formData, setFormData] = useState<FormState>({});
  const [errors, setErrors] = useState<ErrorState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (value.trim()) {
        setErrors((prev) => ({ ...prev, [name]: false }));
      }
    },
    []
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, [name]: true }));
      }
    },
    []
  );

  const handleFocusChange = useCallback(
    (id: string, focused: boolean) => {
      setFocusedField(focused ? id : null);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const newErrors: ErrorState = {};
      let hasError = false;
      formFields.forEach((field) => {
        if (!formData[field.id]?.trim()) {
          newErrors[field.id] = true;
          hasError = true;
        }
      });

      if (hasError) {
        setErrors(newErrors);
        return;
      }

      const message = encodeURIComponent(
        `🏪 *New Promotion Request*\n\n` +
          `*Business:* ${formData.businessName}\n` +
          `*Owner:* ${formData.ownerName}\n` +
          `*Phone:* ${formData.phone}\n` +
          `*Email:* ${formData.email}\n` +
          `*Message:* ${formData.message}`
      );

      setIsSubmitted(true);

      setTimeout(() => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
      }, 800);
    },
    [formData]
  );

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* 2026 Noise Grain Overlay (SVG based) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-50">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 60%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 px-6">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 md:mb-24"
        >
          <motion.div custom={0} variants={stagger} className="flex items-center gap-4 mb-8">
            <span className="w-8 h-px bg-gold/30" />
            <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-gold/50">
              <T en="05 / Direct Channel" kn="೦೫ / ನೇರ ಮಾರ್ಗ" />
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <motion.h2
              custom={1}
              variants={stagger}
              className="lg:col-span-7 font-display text-[clamp(3rem,6vw,5.5rem)] font-light text-white leading-[0.88] tracking-tight"
            >
              <T en={<>Tell your{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>story.</em></>} kn={<>ನಿಮ್ಮ{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>ಕಥೆ ಹೇಳಿ.</em></>} />
            </motion.h2>
            <motion.p
              custom={2}
              variants={stagger}
              className="lg:col-span-5 font-body text-white/35 text-sm md:text-base font-light leading-relaxed border-l border-white/[0.06] pl-8"
            >
              <T en="Reach the heart of North Karnataka with a premium brand spotlight. Our 114K+ community is waiting to hear from you." kn="ಪ್ರೀಮಿಯಂ ಬ್ರಾಂಡ್ ಸ್ಪಾಟ್ಲೈಟ್‌ನೊಂದಿಗೆ ಉತ್ತರ ಕರ್ನಾಟಕದ ಹೃದಯವನ್ನು ತಲುಪಿ. ನಮ್ಮ 1.14 ಲಕ್ಷ+ ಸಮುದಾಯ ನಿಮ್ಮ ಬಗ್ಗೆ ಕೇಳಲು ಕಾಯುತ್ತಿದೆ." />
            </motion.p>
          </div>

          {/* Hairline */}
          <motion.div
            custom={2.5}
            variants={stagger}
            className="mt-12 w-full max-w-[200px] h-px bg-gradient-to-r from-gold/30 to-transparent"
          />
        </motion.div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto relative">
          <form
            onSubmit={handleSubmit}
            noValidate
            className={`transition-all duration-1000 ${
              isSubmitted ? "opacity-0 pointer-events-none scale-95" : "opacity-100"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
              {formFields.map((field, idx) => (
                <AnimatedField
                  key={field.id}
                  field={field}
                  index={idx}
                  value={formData[field.id] || ""}
                  error={!!errors[field.id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isFocused={focusedField === field.id}
                  onFocusChange={handleFocusChange}
                />
              ))}
            </div>

            {/* Submit area with Magnetic Physics */}
            <motion.div
              custom={9}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-20 md:mt-24 flex flex-col items-center"
            >
              <MagneticButton
                type="submit"
                className="group relative px-16 py-7 rounded-full font-mono text-[11px] uppercase tracking-[0.4em] font-bold overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #FFD700, #B8860B)",
                  color: "#000",
                }}
              >
                {/* Magnetic glare effect */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  style={{
                    background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.4) 0%, transparent 50%)",
                  }}
                />

                <span className="relative z-10 flex items-center justify-center gap-5">
                  <T en="Establish Partnership" kn="ಪಾಲುದಾರಿಕೆ ಸ್ಥಾಪಿಸಿ" />
                  <Send className="w-4 h-4 transition-transform duration-700 group-hover:translate-x-1.5 group-hover:-translate-y-1.5" strokeWidth={2.5} />
                </span>
              </MagneticButton>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1, duration: 2 }}
                className="flex items-center gap-4 mt-10"
              >
                <div className="w-12 h-px bg-white/10" />
                <p className="font-mono text-[8px] uppercase tracking-[0.6em] text-white/20 whitespace-nowrap">
                  <T en="Secure WhatsApp Link" kn="ಸುರಕ್ಷಿತ WhatsApp ಲಿಂಕ್" />
                </p>
                <div className="w-12 h-px bg-white/10" />
              </motion.div>
            </motion.div>
          </form>

          {/* ── Success state ── */}
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-24 h-24 rounded-full flex items-center justify-center mb-10 border border-gold/20"
                  style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.1), transparent)",
                  }}
                >
                  <CheckCircle2 className="w-10 h-10 text-gold" />
                </motion.div>
                <h3 className="font-display text-5xl md:text-6xl text-white mb-6 font-light">
                  <T en={<>Sent{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>Successfully.</em></>} kn={<>ಯಶಸ್ವಿಯಾಗಿ{" "}<em className="not-italic" style={{backgroundImage: "linear-gradient(90deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>ಕಳುಹಿಸಲಾಗಿದೆ.</em></>} />
                </h3>
                <p className="font-body text-base text-white/40 max-w-sm font-light leading-relaxed">
                  <T en="Redirecting to WhatsApp for brief authentication." kn="ಸಂಕ್ಷಿಪ್ತ ದೃಢೀಕರಣಕ್ಕಾಗಿ WhatsApp ಗೆ ಮರುನಿರ್ದೇಶಿಸಲಾಗುತ್ತಿದೆ." />
                </p>

                <div className="mt-12 w-48 h-px bg-white/[0.06] overflow-hidden rounded-full">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 0.8, ease: "linear" }}
                    className="w-full h-full"
                    style={{
                      background: "linear-gradient(90deg, #D4AF37, #F5D76E)",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
