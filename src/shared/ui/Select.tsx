import { FIELD_CONTROL } from "../constants/classNames";
import { ChevronDownIcon } from "./Icons";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  ariaLabel: string;
}

/** A styled dropdown with a gold chevron. */
export default function Select({ value, onChange, options, ariaLabel }: SelectProps) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${FIELD_CONTROL} appearance-none pr-10`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-amber/80" />
    </div>
  );
}
