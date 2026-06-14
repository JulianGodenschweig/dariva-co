"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
 children,
 className = "",
 delay = 0
}: {
 children: ReactNode;
 className?: string;
 delay?: number;
}) {
 const reduce = useReducedMotion();

 return (
 <motion.div
 className={`reveal-motion ${className}`}
 initial={reduce ? false : { opacity: 0, y: 40 }}
 whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-60px" }}
 transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay }}
 >
 {children}
 </motion.div>
 );
}

export function Stagger({
 children,
 className = ""
}: {
 children: ReactNode;
 className?: string;
}) {
 const reduce = useReducedMotion();

 return (
 <motion.div
 className={`stagger-motion ${className}`}
 initial={reduce ? false : "hidden"}
 whileInView={reduce ? undefined : "show"}
 viewport={{ once: true, margin: "-60px" }}
 variants={{
 hidden: {},
 show: { transition: { staggerChildren: 0.18 } }
 }}
 >
 {children}
 </motion.div>
 );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
 return (
 <motion.div
 className={`stagger-item-motion ${className}`}
 variants={{
 hidden: { opacity: 0, x: -30, y: 16 },
 show: {
 opacity: 1,
 x: 0,
 y: 0,
  transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }
 }
 }}
 >
 {children}
 </motion.div>
 );
}
