import type { ReactNode } from "react";
import Chip from "../../shared/ui/Chip";

interface ChipGroupProps<Option extends { value: string }> {
  layoutGroup: string;
  options: readonly Option[];
  selectedValue: Option["value"];
  onSelect: (value: Option["value"]) => void;
  renderOption: (option: Option) => ReactNode;
  /** Grid columns for the chips. */
  className: string;
  isCompact?: boolean;
  getAriaLabel?: (option: Option) => string | undefined;
}

/** A grid of chips where exactly one option is selected. */
export default function ChipGroup<Option extends { value: string }>({
  layoutGroup,
  options,
  selectedValue,
  onSelect,
  renderOption,
  className,
  isCompact,
  getAriaLabel,
}: ChipGroupProps<Option>) {
  return (
    <div className={`grid gap-2 ${className}`}>
      {options.map((option) => (
        <Chip
          key={option.value}
          isCompact={isCompact}
          layoutGroup={layoutGroup}
          ariaLabel={getAriaLabel?.(option)}
          isSelected={selectedValue === option.value}
          onClick={() => onSelect(option.value)}
        >
          {renderOption(option)}
        </Chip>
      ))}
    </div>
  );
}

/** Plain text inside a compact chip. */
export function ChipText({ children }: { children: ReactNode }) {
  return <span className="text-base">{children}</span>;
}
