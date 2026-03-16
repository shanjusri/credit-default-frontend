import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert } from "lucide-react";

interface ResultCardProps {
  result: number | null;
}

const ResultCard = ({ result }: ResultCardProps) => {
  if (result === null) return null;

  const isHighRisk = result === 1;
  const riskLabel = isHighRisk ? "High Risk" : "Low Risk";
  const riskDescription = isHighRisk
    ? "This customer is likely to default on their credit card payment next month."
    : "This customer is unlikely to default on their credit card payment next month.";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="glass-card p-8 text-center"
    >
      <div className="flex flex-col items-center gap-4">
        {isHighRisk ? (
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-[hsl(var(--success)/0.1)] flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-[hsl(var(--success))]" />
          </div>
        )}
        <h2
          className={`text-2xl font-bold ${isHighRisk ? "text-destructive" : "text-[hsl(var(--success))]"}`}
        >
          {riskLabel}
        </h2>
        <p className="text-muted-foreground max-w-md">{riskDescription}</p>
      </div>
    </motion.div>
  );
};

export default ResultCard;
