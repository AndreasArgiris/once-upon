import BottomWallpaper from "../../shared/ui/BottomWallpaper";
import Hero from "./Hero";
import SiteFooter from "./SiteFooter";
import StoryMakerSection from "./StoryMakerSection";
import { useLandingScroll } from "./useLandingScroll";

export default function HomePage() {
  useLandingScroll();

  return (
    <main>
      <Hero />
      <div className="relative isolate overflow-hidden">
        <StoryMakerSection />
        <BottomWallpaper />
        <SiteFooter />
      </div>
    </main>
  );
}
