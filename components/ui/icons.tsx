import type { SVGProps } from "react";

/**
 * The app's icon set — drawn here rather than pulled from a library, because
 * every line in this design is a 1.5px ink stroke and no general-purpose set
 * ships at that weight. A 20px Lucide glyph next to a `border-hair` card reads
 * as a different product.
 *
 * `vector-effect: non-scaling-stroke` is what makes that exact: the stroke is
 * measured in screen pixels, so a 16px icon and a 28px icon both draw at 1.5px,
 * matching every border on the page instead of thinning as the icon shrinks.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** CV Evaluator — a page with a turned corner and two scored lines. */
export function IconDocument(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 3H7a1.8 1.8 0 0 0-1.8 1.8v14.4A1.8 1.8 0 0 0 7 21h10a1.8 1.8 0 0 0 1.8-1.8V7.8Z" />
      <path d="M14 3v4.8h4.8" />
      <path d="M8.6 13.2h6.8M8.6 16.6h4.2" />
    </Icon>
  );
}

/** Home. */
export function IconHome(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 10.4 12 4l8 6.4v8.8A1.8 1.8 0 0 1 18.2 21H5.8A1.8 1.8 0 0 1 4 19.2Z" />
      <path d="M9.6 21v-6.2h4.8V21" />
    </Icon>
  );
}

/** Mock Interview — a microphone, because the rep is spoken, not typed. */
export function IconMic(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="9.2" y="3" width="5.6" height="11" rx="2.8" />
      <path d="M5.8 11.4v.8a6.2 6.2 0 0 0 12.4 0v-.8" />
      <path d="M12 18.4V21M9 21h6" />
    </Icon>
  );
}

/** Revise — a pencil on the line it is rewriting. */
export function IconPencil(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 20h3.6L18.4 9.2a1.9 1.9 0 0 0-2.7-2.7L5 17.3Z" />
      <path d="M14.6 7.6 17.3 10.3" />
    </Icon>
  );
}

/**
 * Progress — a rising trend, not a bar chart. Bars are the Forte mark, and the
 * nav item sits eight pixels from the logo.
 */
export function IconTrend(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.6 20.4h16.8" />
      <path d="M5 16.2 10 11l3.2 3.2L20 7.4" />
      <path d="M20 11.6V7.4h-4.2" />
    </Icon>
  );
}

/** Attach / upload — the drop zone and the CV-on-file row. */
export function IconUpload(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 15.6V4.4" />
      <path d="M7.8 8.6 12 4.4l4.2 4.2" />
      <path d="M4.4 15.2v3.4A1.8 1.8 0 0 0 6.2 20.4h11.6a1.8 1.8 0 0 0 1.8-1.8v-3.4" />
    </Icon>
  );
}

/** A gated destination. Replaces the 🔒 emoji, which rendered at the mercy of
 *  whichever font the OS picked and never matched the ink palette. */
export function IconLock(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4.6" y="10.4" width="14.8" height="10" rx="2" />
      <path d="M8.4 10.4V7.6a3.6 3.6 0 0 1 7.2 0v2.8" />
    </Icon>
  );
}

/** Re-run the same rep — a loop that closes. */
export function IconLoop(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 12a8 8 0 1 1-2.6-5.9" />
      <path d="M20 4.4V9h-4.6" />
    </Icon>
  );
}
