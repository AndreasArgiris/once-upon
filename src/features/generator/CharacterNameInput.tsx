import { FIELD_CONTROL } from "../../shared/constants/classNames";
import { CHARACTER_NAME_MAX_LENGTH, sanitizeCharacterName } from "./storyRequest";

interface CharacterNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

/** Optional hero name; only letters get through. */
export default function CharacterNameInput({ value, onChange }: CharacterNameInputProps) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(sanitizeCharacterName(event.target.value))}
      maxLength={CHARACTER_NAME_MAX_LENGTH}
      placeholder="e.g. Sofia"
      autoComplete="off"
      className={`${FIELD_CONTROL} placeholder:text-parchment/35 md:max-w-[15rem]`}
    />
  );
}
