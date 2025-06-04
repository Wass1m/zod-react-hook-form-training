import { AnimatePresence, motion } from "motion/react";
import { LayoutProps } from "../types";

function AnimatedOverlay({ children, key }: LayoutProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0.3, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimatedOverlay;
