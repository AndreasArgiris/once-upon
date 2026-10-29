// Each gutter is as wide as the space beside the 56rem text column, so it only shows where there's room.
const GUTTER_CLASS = "pointer-events-none fixed inset-y-0 -z-10 hidden w-[calc((100vw-56rem)/2)] lg:block";

/** One gutter: two sparkle layers that breathe in and out of step. The right one is mirrored and offset. */
function SparkleGutter({ side }: { side: "left" | "right" }) {
  const isRight = side === "right";
  return (
    <div aria-hidden className={`${GUTTER_CLASS} ${isRight ? "side-sparkles--right right-0" : "left-0"}`}>
      <div className="side-sparkles absolute inset-0" style={isRight ? { animationDelay: "-1.75s" } : undefined} />
      <div className="side-sparkles side-sparkles--alt absolute inset-0" style={isRight ? { animationDelay: "-5.25s" } : undefined} />
    </div>
  );
}

/** Sparkles fading in and out either side of the text column. */
export default function SideSparkles() {
  return (
    <>
      <SparkleGutter side="left" />
      <SparkleGutter side="right" />
    </>
  );
}
