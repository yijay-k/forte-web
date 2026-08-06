# Architecture

Mirrors the `stackd-web` layout and conventions.

## Principles

1. **`app/` holds routes, not markup.** A `page.tsx` is 3–5 lines: import a feature
   screen, render it. All layout and logic live in `features/`.
2. **A screen is composed, never monolithic.** Every page is assembled from 4–8
   feature components. No file owns an entire screen's markup.
3. **A file per meaningful block, not per element.** A component earns a file when
   it is ~30+ lines with a single coherent purpose, or when it is a repeating list
   item. One-off markup under ~25 lines is inlined in its parent, or dropped at the
   bottom of the parent file as a local subcomponent (the `nav.tsx` / `MenuItem`
   pattern from stackd).
4. **`components/ui/` is domain-agnostic.** It knows about borders and shadows, never
   about CVs or interviews. `features/` is domain-aware.
5. **Fixture data is never inline in JSX.** Everything the prototype hardcodes lives
   in `lib/data/` behind a typed accessor, so it swaps for an API without touching a
   component.
6. **`"use client"` at the smallest boundary that works.** Static report sections stay
   server components.

## Naming

| Rule | Example |
| --- | --- |
| Files kebab-case | `claim-card.tsx` |
| Named exports | `export function ClaimCard()` |
| Default export only for routes | `app/**/page.tsx`, `layout.tsx` |
| Hooks colocated in feature folder | `features/revise/use-claims.ts` |
| Types per domain | `types/interview.ts` |

## Route map

The prototype is one page driven by a `screen`/`stage` state machine. That becomes
real URLs — linkable, back-button-correct, and server-renderable.

| URL | Prototype state | Notes |
| --- | --- | --- |
| `/` | `screen: home` | dashboard |
| `/cv` | `cv` + `cvStage: list` | saved evaluations |
| `/cv/new` | `cv` + `upload` → `analyzing` | wizard; analyzing is a transient state |
| `/cv/[runId]` | `cv` + `results` | the gated report |
| `/interview` | `interview` (all 3 stages) | one route — a live session is a session, not a page |
| `/revise` | `revise` | claim resolution |
| `/progress` | `progress` | loop history |

Interview stages stay internal state deliberately: a running clock and an in-flight
session must not survive a URL change, and deep-linking to `/interview/live` with no
session would be meaningless.

## Tree

```
app/
  layout.tsx                        [s] fonts, metadata, globals.css
  globals.css                       Tailwind v4 @theme token block
  not-found.tsx                     [s]
  icon.svg
  (app)/
    layout.tsx                      [s] wraps children in AppShell + AuthProvider
    page.tsx                        [s] → HomeScreen
    cv/page.tsx                     [s] → CvRunsScreen
    cv/new/page.tsx                 [s] → CvUploadScreen
    cv/[runId]/page.tsx             [s] → CvResultsScreen
    interview/page.tsx              [s] → InterviewScreen
    revise/page.tsx                 [s] → ReviseScreen
    progress/page.tsx               [s] → ProgressScreen

components/
  brand/
    forte-mark.tsx                  [s] 3-bar logo + Newsreader wordmark
  layout/
    app-shell.tsx                   [c] flex row; owns the <main> scroll container
    sidebar.tsx                     [c] left rail composition
    sidebar-nav.tsx                 [c] 5 nav items, lock pips, revise badge
    sidebar-loop-rail.tsx           [c] "the loop · rep N" dotted rail
    sidebar-footer.tsx              [c] readiness card + account, or unlock CTA
    flow-stepper.tsx                [c] 4-step horizontal stepper, derived from pathname
  ui/
    paper-card.tsx                  [s] the bordered card — tone × shadow variants
    pill-button.tsx                 [c] 999px button — ink/accent/paper/ghost, press effect
    chip.tsx                        [s] status pill — ok/weak/miss/neutral/accent/amber
    stat-card.tsx                   [s] label + Newsreader numeral + delta + sparkline
    sparkline.tsx                   [s] inline SVG polyline
    score-dial.tsx                  [s] 132px SVG donut + centred numeral
    progress-bar.tsx                [s] track + fill
    section-heading.tsx             [s] uppercase eyebrow + optional right action
    toggle.tsx                      [c] track/knob switch
    sticker.tsx                     [s] rotated amber floating label
    modal.tsx                       [c] portal, escape, scroll lock
    empty-state.tsx                 [s]

features/
  auth/
    auth-provider.tsx               [c] authed, wall open/seen, unlock, gated nav
    use-auth.ts                     [c] context hook
    gated-section.tsx               [c] blur gate + sentinel + unlock overlay
    use-wall-sentinel.ts            [c] IntersectionObserver → opens the wall once
    unlock-wall.tsx                 [c] the email modal
    unlock-sticky-bar.tsx           [c] bottom bar after the wall is dismissed
  home/
    home-screen.tsx                 [s] composition
    home-header.tsx                 [s] greeting chips + serif headline
    revise-callout.tsx              [s] the black step-4 CTA card
    four-numbers.tsx                [s] rubric grid + heading
    quick-actions.tsx               [s] the two action cards
    recent-activity.tsx             [s] card wrapper
    activity-row.tsx                [s] repeating row
  cv/
    cv-runs-screen.tsx              [s] saved evaluations list
    cv-run-row.tsx                  [s] repeating row
    cv-upload-screen.tsx            [c] wizard shell: attach + JD + analyzing
    cv-attach-panel.tsx             [c] file attach / remove
    jd-paste-panel.tsx              [c] textarea, sample, parse, role fallback
    jd-parsed-summary.tsx           [s] parsed requirement preview
    cv-analyzing.tsx                [c] dark animated progress screen
    use-cv-analysis.ts              [c] 900ms step interval → completion
    use-jd-input.ts                 [c] jd text + parsed + fallback state
    cv-results-screen.tsx           [s] report composition
    cv-headline-fix.tsx             [s] free: black diagnosis + before/after
    cv-overall-score.tsx            [s] free: dial + shown arithmetic
    cv-four-numbers.tsx             [s] gated: breakdown bars
    cv-coverage-matrix.tsx          [s] gated: requirement card
    cv-coverage-row.tsx             [s] repeating requirement row
    cv-remaining-fixes.tsx          [s] gated: fixes 2–3
    cv-marked-up.tsx                [s] gated: annotated CV
    cv-interview-cta.tsx            [s] gated: hand-off to interview
  interview/
    interview-screen.tsx            [c] stage machine: setup → live → feedback
    use-interview-session.ts        [c] stage, question index, probe, clock
    use-transcript.ts               [c] elapsed-driven transcript + autoscroll
    interview-setup.tsx             [c] setup composition
    mode-picker.tsx                 [c] video / voice cards
    interviewer-picker.tsx          [c] grid of 3
    interviewer-card.tsx            [c] repeating orb card
    interview-live.tsx              [c] live composition
    interview-stage.tsx             [c] video canvas + PiP swap
    question-card.tsx               [s] current question + source + probe
    transcript-panel.tsx            [c] scrolling transcript
    transcript-turn.tsx             [s] repeating turn
    live-controls.tsx               [c] clock, mic toggle, next/finish
    interview-feedback.tsx          [s] report composition
    feedback-numbers.tsx            [s] the four numbers, post-session
    delivery-metrics.tsx            [s] time-to-first-word etc.
    visual-events.tsx               [s] timestamped video moments
    not-measured.tsx                [s] the "we don't measure this" list
    question-feedback-card.tsx      [s] repeating per-question card
  revise/
    revise-screen.tsx               [c] composition + progress
    use-claims.ts                   [c] claim reducer (open/editing/rewritten/cut/stood)
    claim-card.tsx                  [c] repeating claim, all 5 states
    claim-editor.tsx                [c] textarea + suggest / save / cancel
    claim-actions.tsx               [c] rewrite / cut / stand by
    revise-progress.tsx             [s] "N of 3 resolved" bar
    rescore-card.tsx                [c] gated re-score CTA
    rescore-result.tsx              [s] the score deltas
  progress/
    progress-screen.tsx             [s] composition
    loop-rail.tsx                   [s] the 4-step vertical rail
    rep-history.tsx                 [s] card wrapper
    rep-history-row.tsx             [s] repeating row

lib/
  data/
    cv-report.ts                    rubric, breakdown, coverage, fixes, marked-up CV
    cv-runs.ts                      saved evaluation history
    job-description.ts              sample JD + parsed requirements
    interviewers.ts                 the 3 personas
    interview-questions.ts          5 questions + probes
    transcript.ts                   timed transcript script
    interview-feedback.ts           numbers, delivery, visual events, per-question
    claims.ts                       the 3 undefended claims
    progress.ts                     loop rail + rep history
constants/
  navigation.ts                     sidebar items, flow steps
  scoring.ts                        rubric labels, status→style maps
types/
  cv.ts  interview.ts  revise.ts  progress.ts  common.ts
utils/
  cn.ts                             className joiner
  format-clock.ts                   seconds → mm:ss
docs/
  architecture.md
```

`[s]` server component · `[c]` client component

## State

| Concern | Owner | Why |
| --- | --- | --- |
| Auth + paywall gate | `features/auth/auth-provider.tsx` (context, mounted in `(app)/layout.tsx`) | Sidebar, gated report, wall, and sticky bar all read it; it is the only genuinely app-wide state. |
| CV upload wizard | `use-jd-input` + `use-cv-analysis` in `features/cv/` | Scoped to `/cv/new`. Dies with the route. |
| Interview session | `use-interview-session` in `features/interview/` | Owns the timer; must not leak across routes. |
| Claim resolution | `use-claims` (`useReducer`) in `features/revise/` | Pure state transitions over a claim list — a reducer, not five setters. |

No global store. Nothing that isn't shared across routes goes into context.

## Design tokens

All in `app/globals.css` under `@theme inline`, so Tailwind generates
`bg-*` / `text-*` / `border-*` / `shadow-*` / `rounded-*` / `font-*` utilities.

The accent is a **runtime** variable (`--forte-accent`) set on the shell element, so
the palette can be re-themed without a rebuild — the prototype exposes lavender,
sage, amber, and sky. Everything else is a build-time token.

Signature properties of the visual language, encoded as tokens:

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#161513` | text + every border |
| `--color-paper` | `#FDFBEA` | app background |
| `--color-surface` | `#FFFEF6` | raised card |
| `--color-surface-sunk` | `#FBF6EA` | inset panel |
| `--shadow-hard` | `5px 5px 0 rgb(22 21 19 / 0.9)` | the offset-block shadow |
| `--shadow-soft` | `6px 6px 0 rgb(22 21 19 / 0.1)` | resting cards |
| `--shadow-accent` | `7px 7px 0 var(--forte-accent)` | hero cards |
| border width | `1.5px` everywhere | never 1px, never 2px |
| `--radius-pill` | `999px` | 64 occurrences — the dominant shape |

Fonts load via `next/font/google`: **Newsreader** (serif — display headings and every
numeral) and **Hanken Grotesk** (UI — 400/500/600/700/800).
