type Props = {
  /** `"x,y x,y …"` in a 90×20 viewBox. */
  points: string;
  stroke: string;
  className?: string;
};

/**
 * The trend line on a rubric card. The prototype encoded this as a background
 * data-URI; a real SVG scales cleanly and can be styled.
 */
export function Sparkline({ points, stroke, className }: Props) {
  return (
    <svg
      viewBox="0 0 90 20"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className ?? "h-5 w-full"}
    >
      <polyline points={points} fill="none" stroke={stroke} strokeWidth={2} />
    </svg>
  );
}
