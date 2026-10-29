import { AUTHOR_GITHUB_URL, AUTHOR_NAME } from "../../shared/constants/brand";
import { GitHubIcon } from "../../shared/ui/Icons";
import Logo from "../../shared/ui/Logo";

/** Closing logo, the author credit, and a link to the author's GitHub. */
export default function SiteFooter() {
  return (
    <footer className="relative flex flex-col items-center gap-4 px-4 pt-24 pb-10 text-center">
      <Logo className="h-20 w-auto" />
      <p className="text-sm font-semibold text-amber-soft">Created by {AUTHOR_NAME}</p>
      <a
        href={AUTHOR_GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${AUTHOR_NAME} on GitHub`}
        title="GitHub"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-amber/40 bg-bark-light/50 text-amber-soft transition hover:border-amber hover:bg-amber hover:text-night focus-visible:ring-2 focus-visible:ring-amber/50 focus-visible:outline-none"
      >
        <GitHubIcon className="h-6 w-6" />
      </a>
    </footer>
  );
}
