import React from "react";
interface FormFieldProps {
  label: string;
  type?: "number" | "select";
  value: string;
  onChange: (val: string) => void;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

const FormField = ({ label, type = "number", value, onChange, options, placeholder }: FormFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    {type === "select" && options ? (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="glass-input px-3 py-2.5 text-sm text-card-foreground outline-none focus:ring-2 focus:ring-ring/30 transition-all"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    ) : (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "0"}
        className="glass-input px-3 py-2.5 text-sm text-card-foreground outline-none focus:ring-2 focus:ring-ring/30 transition-all"
      />
    )}
  </div>
);

export default FormField;
