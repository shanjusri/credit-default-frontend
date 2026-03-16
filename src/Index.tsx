import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Users, FileText, Wallet, Loader2 } from "lucide-react";
import GlassCard from "./GlassCard";
import FormField from "./FormField";
import ResultCard from "./ResultCard";

const defaultValues = () => ({
  LIMIT_BAL: "", SEX: "1", EDUCATION: "1", MARRIAGE: "1", AGE: "",
  PAY_0: "0", PAY_2: "0", PAY_3: "0", PAY_4: "0", PAY_5: "0", PAY_6: "0",
  BILL_AMT1: "", BILL_AMT2: "", BILL_AMT3: "", BILL_AMT4: "", BILL_AMT5: "", BILL_AMT6: "",
  PAY_AMT1: "", PAY_AMT2: "", PAY_AMT3: "", PAY_AMT4: "", PAY_AMT5: "", PAY_AMT6: "",
});

const payStatusOptions = [
  { value: "-2", label: "-2: No consumption" },
  { value: "-1", label: "-1: Paid in full" },
  { value: "0", label: "0: Revolving credit" },
  { value: "1", label: "1: 1 month delay" },
  { value: "2", label: "2: 2 months delay" },
  { value: "3", label: "3: 3 months delay" },
  { value: "4", label: "4: 4 months delay" },
  { value: "5", label: "5: 5 months delay" },
  { value: "6", label: "6: 6 months delay" },
  { value: "7", label: "7: 7 months delay" },
  { value: "8", label: "8: 8 months delay" },
  { value: "9", label: "9: 9+ months delay" },
];

const Index = () => {
  const [form, setForm] = useState(defaultValues());
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: string) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const features = [
      Number(form.LIMIT_BAL), Number(form.SEX), Number(form.EDUCATION),
      Number(form.MARRIAGE), Number(form.AGE),
      Number(form.PAY_0), Number(form.PAY_2), Number(form.PAY_3),
      Number(form.PAY_4), Number(form.PAY_5), Number(form.PAY_6),
      Number(form.BILL_AMT1), Number(form.BILL_AMT2), Number(form.BILL_AMT3),
      Number(form.BILL_AMT4), Number(form.BILL_AMT5), Number(form.BILL_AMT6),
      Number(form.PAY_AMT1), Number(form.PAY_AMT2), Number(form.PAY_AMT3),
      Number(form.PAY_AMT4), Number(form.PAY_AMT5), Number(form.PAY_AMT6),
    ];

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });
      const data = await res.json();
      setResult(data.prediction ?? data.result ?? data.default ?? 0);
    } catch {
      setError("Could not connect to prediction server. Make sure it's running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm font-medium text-primary mb-4">
            <CreditCard className="w-4 h-4" />
            ML-Powered Analysis
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-card-foreground mb-3">
            Credit Card Default Predictor
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Predict whether a customer will default on their credit card payment using machine learning.
          </p>
        </motion.div>

        {/* Result */}
        {result !== null && <div className="mb-8"><ResultCard result={result} /></div>}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-4 mb-8 text-center text-destructive text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GlassCard title="Demographics" icon={<Users className="w-5 h-5" />} delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <FormField label="Credit Limit (LIMIT_BAL)" value={form.LIMIT_BAL} onChange={update("LIMIT_BAL")} placeholder="e.g. 50000" />
              </div>
              <FormField label="Sex" type="select" value={form.SEX} onChange={update("SEX")}
                options={[{ value: "1", label: "Male" }, { value: "2", label: "Female" }]} />
              <FormField label="Education" type="select" value={form.EDUCATION} onChange={update("EDUCATION")}
                options={[
                  { value: "1", label: "Graduate School" }, { value: "2", label: "University" },
                  { value: "3", label: "High School" }, { value: "4", label: "Others" },
                ]} />
              <FormField label="Marriage" type="select" value={form.MARRIAGE} onChange={update("MARRIAGE")}
                options={[{ value: "1", label: "Married" }, { value: "2", label: "Single" }, { value: "3", label: "Others" }]} />
              <FormField label="Age" value={form.AGE} onChange={update("AGE")} placeholder="e.g. 35" />
            </div>
          </GlassCard>

          <GlassCard title="Payment Status" icon={<CreditCard className="w-5 h-5" />} delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {["PAY_0", "PAY_2", "PAY_3", "PAY_4", "PAY_5", "PAY_6"].map((key) => (
                <FormField key={key} label={key} type="select" value={form[key as keyof typeof form]} onChange={update(key)} options={payStatusOptions} />
              ))}
            </div>
          </GlassCard>

          <GlassCard title="Bill Amounts" icon={<FileText className="w-5 h-5" />} delay={0.3}>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <FormField key={i} label={`BILL_AMT${i}`} value={form[`BILL_AMT${i}` as keyof typeof form]} onChange={update(`BILL_AMT${i}`)} placeholder="0" />
              ))}
            </div>
          </GlassCard>

          <GlassCard title="Payment History" icon={<Wallet className="w-5 h-5" />} delay={0.4}>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <FormField key={i} label={`PAY_AMT${i}`} value={form[`PAY_AMT${i}` as keyof typeof form]} onChange={update(`PAY_AMT${i}`)} placeholder="0" />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Predict Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-[var(--button-shadow)] hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Predict Default Risk"
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
