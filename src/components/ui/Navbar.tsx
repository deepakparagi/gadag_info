"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sun, Moon, Globe, Menu, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { T } from "@/components/ui/T";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/about", labelEn: "ABOUT", labelKn: "ನಮ್ಮ ಬಗ್ಗೆ" },
  { href: "/stories", labelEn: "STORIES", labelKn: "ಕಥೆಗಳು" },
  { href: "/events", labelEn: "EVENTS", labelKn: "ಕಾರ್ಯಕ್ರಮಗಳು" },
  { href: "/gallery", labelEn: "GALLERY", labelKn: "ಚಿತ್ರ-ಶಾಲೆ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"EN" | "KN">("EN");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "EN" ? "KN" : "EN";
      document.documentElement.setAttribute("data-lang", next);
      return next;
    });
  }, []);

  useEffect(() => {
    const htmlLang = document.documentElement.getAttribute("data-lang");
    if (htmlLang === "KN") {
      setLang("KN");
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl border-b"
            : "border-b border-transparent"
        }`}
        style={{
          backgroundColor: scrolled ? "var(--nav-bg-scroll)" : "transparent",
          borderColor: scrolled ? "var(--nav-border)" : "transparent",
          boxShadow: scrolled ? "var(--nav-shadow)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-[4.5rem] md:h-24 flex items-center justify-between">
          <Link
            href="/"
            className="group relative z-[110] shrink-0"
          >
            <Logo variant="minimal" scale={0.9} className="md:scale-100" />
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted hover:text-gold transition-colors duration-300 relative group py-2"
                >
                  <T en={link.labelEn} kn={link.labelKn} />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500 ease-out-expo" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="group relative h-9 px-3 rounded-full border border-foreground/[0.08] hover:border-gold/30 flex items-center gap-2 transition-all duration-500 hover:bg-gold/[0.05] cursor-pointer"
              aria-label={`Switch to ${lang === "EN" ? "Kannada" : "English"}`}
            >
              <Globe className="w-3.5 h-3.5 text-muted group-hover:text-gold transition-colors duration-300" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted group-hover:text-gold transition-colors duration-300"
                >
                  {lang === "EN" ? "ಕನ್ನಡ" : "ENG"}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={toggleTheme}
              className="group relative w-9 h-9 rounded-full border border-foreground/[0.08] hover:border-gold/30 flex items-center justify-center transition-all duration-500 hover:bg-gold/[0.05] cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Sun className="w-3.5 h-3.5 text-muted group-hover:text-gold transition-colors duration-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Moon className="w-3.5 h-3.5 text-muted group-hover:text-gold transition-colors duration-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <div className="w-px h-5 bg-foreground/[0.06] mx-1" />

            <Link
              href="/promote"
              className="group flex items-center gap-3"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/70 group-hover:text-gold transition-colors duration-300">
                <T en="PROMOTE" kn="ಜಾಹೀರಾತು" />
              </span>
              <div className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center group-hover:bg-gold/5 group-hover:border-gold/40 transition-all duration-500">
                <ArrowUpRight className="w-3.5 h-3.5 text-gold group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2 relative z-[110]">
            <button
              onClick={toggleLang}
              className="flex items-center justify-center gap-1.5 h-9 px-2.5 rounded-full bg-foreground/[0.05] transition-transform active:scale-90 cursor-pointer"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-foreground/50" />
              <span className="font-mono text-[8px] uppercase tracking-wider text-foreground/50">
                {lang}
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-foreground/[0.05] transition-transform active:scale-90 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-foreground/50" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-foreground/50" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-foreground/[0.05] text-foreground transition-transform active:scale-90"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[105] bg-background flex flex-col pt-28 px-8 md:hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-20 px-6 flex items-center justify-between">
              <Logo variant="minimal" scale={0.75} />
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-foreground/[0.05] text-foreground transition-transform active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold mb-1 block">Navigation</span>
              <ul className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-display text-4xl font-light text-foreground hover:text-gold transition-colors duration-300 flex items-center justify-between group"
                    >
                      <T en={link.labelEn} kn={link.labelKn} />
                      <ArrowUpRight className="w-6 h-6 text-gold opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pb-10">
              <Link
                href="/promote"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-5 rounded-2xl bg-gold/10 border border-gold/20 group"
              >
                <span className="font-display text-xl text-foreground">Promote Brand</span>
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-white group-hover:rotate-45 transition-transform" />
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
