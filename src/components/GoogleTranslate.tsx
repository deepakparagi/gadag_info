"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function GoogleTranslate() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Setup the init function globally for the Google Translate script to call
    (window as any).googleTranslateElementInit = () => {
      // Create the widget and point it to the div
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,kn",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div
        id="google_translate_element"
        style={{
          display: "none",
          width: "0px",
          height: "0px",
          position: "absolute",
          left: "-9999px",
        }}
      ></div>
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
