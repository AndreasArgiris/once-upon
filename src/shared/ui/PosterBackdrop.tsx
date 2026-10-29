import { MEDIA } from "../constants/media";

/** The hero poster, softly blurred behind a page header. Pass an opacity class to set its strength. */
export default function PosterBackdrop({ className }: { className: string }) {
  return (
    <img
      src={MEDIA.heroPoster}
      alt=""
      className={`fade-bottom absolute inset-0 -z-10 h-full w-full object-cover blur-[2px] ${className}`}
    />
  );
}
