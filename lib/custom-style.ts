export const glassCard = [
  "bg-linear-to-b from-white to-[#f5f5f5]",
  "dark:from-[#1c1c1c] dark:to-[#141414]",
  "border border-neutral-200/80 dark:border-neutral-800/80",
  "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.06)]",
  "dark:shadow-[0_2px_8px_rgba(0,0,0,0.4),0_8px_24px_rgba(0,0,0,0.5)]",
  "ring-1 ring-black/3 dark:ring-white/5",
  "transition-shadow duration-200",
].join(" ");

export const glassCardFocus = [
  glassCard,
  "focus-within:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.1)]",
  "focus-within:ring-black/8 dark:focus-within:ring-white/10",
  "focus-within:border-neutral-300 dark:focus-within:border-neutral-700",
].join(" ");