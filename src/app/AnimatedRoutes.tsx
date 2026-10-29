import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import NotFoundPage from "../features/not-found/NotFoundPage";
import StoryPage from "../features/story/StoryPage";
import { ROUTES } from "../shared/constants/routes";
import PageFade from "./PageFade";

/** The app's pages, each fading out before the next fades in. */
export default function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path={ROUTES.home}
          element={
            <PageFade>
              <HomePage />
            </PageFade>
          }
        />
        <Route
          path={ROUTES.story}
          element={
            <PageFade>
              <StoryPage />
            </PageFade>
          }
        />
        <Route
          path="*"
          element={
            <PageFade>
              <NotFoundPage />
            </PageFade>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
