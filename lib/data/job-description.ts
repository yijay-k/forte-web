/** The posting the CV is scored against. */
export const TARGET_ROLE = "Senior Product Designer";
export const TARGET_COMPANY = "Meridian";

export const SAMPLE_JD = `Senior Product Designer — Meridian

We are looking for a senior product designer to own end-to-end flows across our core workspace. You will partner with engineering and data to run experiments, and help govern the design system as it scales past 60 components.

What you will do
- Own end-to-end product flows, from problem framing to shipped UI
- Run experiments and interpret results with our data team
- Contribute to and help govern our design system
- Mentor mid-level designers on the team

What we look for
- Comfort with Figma variables and advanced prototyping
- Evidence of measurable product outcomes`;

/** What the parser pulls out of the posting — the checkable requirements. */
export const PARSED_REQUIREMENTS: readonly string[] = [
  "Own end-to-end product flows, from problem framing to shipped UI",
  "Run experiments and interpret results with the data team",
  "Contribute to and help govern the design system",
  "Mentor mid-level designers",
  "Comfort with Figma variables and advanced prototyping",
];

/** Shown instead of requirements when the user scores against a bare role. */
export const ROLE_FALLBACK_NOTE =
  "Without a posting we can only score general CV quality — no coverage check, and interview questions stay generic. Paste a JD when you have one.";
