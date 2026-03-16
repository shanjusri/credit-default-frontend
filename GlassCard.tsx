import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  delay?: number;
}

const GlassCard = ({ title, icon, children, delay = 0 }: GlassCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className="glass-card p-6"
  >
    <div className="flex items-center gap-2 mb-5">
      <span className="text-primary">{icon}</span>
      <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
    </div>
    {children}
  </motion.div>
);

export default GlassCard;
