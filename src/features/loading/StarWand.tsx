import { STAR_PATHS, WAND_PATHS } from "./starWandPaths";

// Where the stars sit relative to the wand in the original combined artwork.
const STARS_OFFSET = "translate(-25.475 145.12)";

/** The wand waves from its handle while the sparkles at its tip twinkle and the trails shimmer. */
export default function StarWand({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="150 275 265 230" className={`star-wand ${className}`} aria-hidden>
      <g className="star-wand__wave">
        {WAND_PATHS.map((path, index) => (
          <path key={index} d={path.d} fill={path.fill} />
        ))}
        <g transform={STARS_OFFSET}>
          {STAR_PATHS.map((path, index) => (
            <path
              key={index}
              d={path.d}
              fill={path.fill}
              className={path.trail ? "star-wand__trail" : "star-wand__sparkle"}
              style={{ animationDelay: `${((index * 0.37) % 1.8).toFixed(2)}s` }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
