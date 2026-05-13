import { Variants } from "framer-motion";

export const pageVariants: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { x: "-30%", opacity: 0, transition: { type: "tween", duration: 0.2, ease: [0.55, 0, 1, 0.45] } },
};

export const pageBackVariants: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { x: "30%", opacity: 0, transition: { type: "tween", duration: 0.2 } },
};

export const fadeUp: Variants = {
  initial: { y: 24, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { y: -12, opacity: 0, transition: { duration: 0.2 } },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const staggerContainer: Variants = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerFast: Variants = {
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const cardReveal: Variants = {
  initial: { y: 32, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const logoPulse: Variants = {
  initial: { scale: 0.6, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 18, delay: 0.2 },
  },
};

export const slideUp: Variants = {
  initial: { y: 80, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { y: 80, opacity: 0, transition: { duration: 0.2 } },
};

export const scaleIn: Variants = {
  initial: { scale: 0.85, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 250, damping: 25 } },
  exit: { scale: 0.85, opacity: 0 },
};

export const sheetVariants: Variants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: { type: "spring", stiffness: 400, damping: 40 } },
  exit: { y: "100%", transition: { duration: 0.25, ease: "easeIn" } },
};
