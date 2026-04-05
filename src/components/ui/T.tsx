import React from "react";

export function T({
  en,
  kn,
  ...props
}: {
  en: React.ReactNode;
  kn: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={`t-wrapper ${props.className || ""}`}>
      <span className="lang-en">{en}</span>
      <span className="lang-kn">{kn}</span>
    </span>
  );
}
