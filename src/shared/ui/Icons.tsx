import type { SVGProps } from "react";

// Line icons drawn in SVG so they render everywhere (some emoji are missing on older systems).
const ICON_DEFAULTS: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const FemaleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...ICON_DEFAULTS} {...props}>
    <circle cx="12" cy="9" r="5" />
    <path d="M12 14v7M9 18h6" />
  </svg>
);

export const MaleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...ICON_DEFAULTS} {...props}>
    <circle cx="10" cy="14" r="5" />
    <path d="M13.6 10.4 20 4M15 4h5v5" />
  </svg>
);

export const ScrollDownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...ICON_DEFAULTS} {...props}>
    <path d="M7 3h10a2 2 0 0 1 2 2v12M7 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
    <path d="M12 8v7M9 12.5l3 3 3-3" />
  </svg>
);

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...ICON_DEFAULTS} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

// Filled mark, so it skips the line-icon defaults.
export const GitHubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...ICON_DEFAULTS} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
