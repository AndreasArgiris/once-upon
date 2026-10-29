import { motion } from "framer-motion";
import { EASE_OUT } from "../../shared/constants/motion";
import Field from "../../shared/ui/Field";
import { FemaleIcon, MaleIcon } from "../../shared/ui/Icons";
import Select from "../../shared/ui/Select";
import LoadingOverlay from "../loading/LoadingOverlay";
import { AGES, GENDERS, LANGUAGES, LENGTHS, pagesFor, THEMES } from "../story/model/options";
import type { Gender } from "../story/model/types";
import CharacterNameInput from "./CharacterNameInput";
import ChipGroup, { ChipText } from "./ChipGroup";
import GeneratorActions from "./GeneratorActions";
import { useStoryMaker } from "./useStoryMaker";

// "Any" is written out; girl and boy use their symbols.
const GENDER_ICONS: Partial<Record<Gender, typeof FemaleIcon>> = {
  girl: FemaleIcon,
  boy: MaleIcon,
};

/** The story maker form: pick the reader, the hero and the theme, then conjure a tale. */
export default function Generator() {
  const { filters, updateFilter, handleSubmit, generation } = useStoryMaker();

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className="panel mx-auto w-full max-w-4xl space-y-10 rounded-[1.5rem] p-4 min-[400px]:p-6 sm:rounded-[2rem] sm:p-10"
    >
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <Field label="Age of the child">
          <ChipGroup
            layoutGroup="age"
            className="grid-cols-4"
            isCompact
            options={AGES}
            selectedValue={filters.age}
            onSelect={(age) => updateFilter("age", age)}
            renderOption={(age) => <ChipText>{age.label}</ChipText>}
          />
        </Field>
        <Field label="Hero">
          <ChipGroup
            layoutGroup="gender"
            className="grid-cols-3"
            isCompact
            options={GENDERS}
            selectedValue={filters.gender}
            onSelect={(gender) => updateFilter("gender", gender)}
            getAriaLabel={(gender) => (GENDER_ICONS[gender.value] ? gender.label : undefined)}
            renderOption={(gender) => {
              const Icon = GENDER_ICONS[gender.value];
              return Icon ? <Icon className="h-6 w-6" /> : <ChipText>Any</ChipText>;
            }}
          />
        </Field>
      </div>

      <div className="grid gap-10 md:grid-cols-[minmax(0,15rem)_1fr]">
        <Field label="Language">
          <Select
            ariaLabel="Language"
            value={filters.language}
            onChange={(language) => updateFilter("language", language)}
            options={LANGUAGES}
          />
        </Field>
        <Field label="Story length">
          <ChipGroup
            layoutGroup="length"
            className="grid-cols-3"
            isCompact
            options={LENGTHS}
            selectedValue={filters.length}
            onSelect={(length) => updateFilter("length", length)}
            renderOption={(length) => <ChipText>{length.label}</ChipText>}
          />
        </Field>
      </div>

      <Field label="Character's name" hint="optional">
        <CharacterNameInput value={filters.characterName ?? ""} onChange={(name) => updateFilter("characterName", name)} />
      </Field>

      <Field label="Theme of the tale">
        <ChipGroup
          layoutGroup="theme"
          className="grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6"
          options={THEMES}
          selectedValue={filters.theme}
          onSelect={(theme) => updateFilter("theme", theme)}
          renderOption={(theme) => (
            <>
              <span className="text-xl" aria-hidden>
                {theme.icon}
              </span>
              {theme.value}
            </>
          )}
        />
      </Field>

      <LoadingOverlay
        isOpen={generation.isPending}
        pagesWritten={generation.pagesWritten}
        totalPages={pagesFor(filters.length)}
        onCancel={generation.cancel}
      />
      <GeneratorActions generation={generation} />
    </motion.form>
  );
}
