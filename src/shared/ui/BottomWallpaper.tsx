import { MEDIA } from "../constants/media";

/** Faded wallpaper along the bottom of a page. The parent must be `relative isolate`. */
export default function BottomWallpaper() {
  return (
    <img
      src={MEDIA.bottomWallpaper}
      alt=""
      aria-hidden
      className="fade-top pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[clamp(20rem,70svh,48rem)] w-full object-cover opacity-30"
    />
  );
}
