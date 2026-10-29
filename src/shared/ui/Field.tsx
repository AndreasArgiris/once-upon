import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  children: ReactNode;
  hint?: string;
}

/** A labelled group of form controls. */
export default function Field({ label, children, hint }: FieldProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-3 flex items-baseline gap-2 font-display text-lg font-semibold text-amber-soft">
        {label}
        {hint && <span className="font-sans text-xs font-normal text-parchment/50">{hint}</span>}
      </legend>
      {children}
    </fieldset>
  );
}
