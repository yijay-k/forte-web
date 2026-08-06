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
| `/account` | `screen: profile`, `acctTab: profile` | entitlements, CV on file, history |
| `/account/settings` | `screen: profile`, `acctTab: settings` | sign-in, notifications, billing, data |

Interview stages stay internal state deliberately: a running clock and an in-flight
session must not survive a URL change, and deep-linking to `/interview/live` with no
session would be meaningless. The account tabs went the other way — they hold
substantial, linkable content, so they are real routes.

### Two gates, deliberately separate

| Gate | Where | Behaviour |
| --- | --- | --- |
| **Account** — is the user signed in? | `features/auth/use-gate-guard.ts` | Private routes (`/`, `/cv`, `/interview`, `/revise`, `/progress`, `/account/**`) redirect to `/cv/new`. Sidebar items open the unlock wall instead of navigating. |
| **Entitlement** — do they have an application left? | `features/billing/entitled-link.tsx` | Actions that *spend* an application open the plans modal instead of proceeding. Never blocks reading; everything already scored stays readable forever. |

The paywall sits at the point of spend, not at the door — which is why the free
report is fully readable and only *new* applications are gated.

## Tree

Generated from the working tree; `[c]` marks a client component.

```
app/
  (app)/
    account/
      page.tsx
      settings/
        page.tsx
    cv/
      [runId]/
        page.tsx
      new/
        page.tsx
      page.tsx
    interview/
      page.tsx
    layout.tsx
    page.tsx
    progress/
      page.tsx
    revise/
      page.tsx
  globals.css
  layout.tsx
  not-found.tsx
components/
  brand/
    forte-mark.tsx
  layout/
    app-shell.tsx [c]
    flow-stepper.tsx [c]
    scroll-container.tsx [c]
    sidebar-footer.tsx [c]
    sidebar-loop-rail.tsx
    sidebar-nav.tsx [c]
    sidebar-plan-card.tsx [c]
    sidebar-user-menu.tsx [c]
    sidebar.tsx [c]
  ui/
    chip.tsx
    icon-list-row.tsx
    modal.tsx [c]
    paper-card.tsx
    pill-button.tsx [c]
    progress-bar.tsx
    score-dial.tsx
    section-heading.tsx
    section-rule.tsx
    setting-row.tsx [c]
    sparkline.tsx
    stat-card.tsx
    sticker.tsx
    toggle.tsx [c]
constants/
  navigation.ts
  scoring.ts
features/
  account/
    account-header.tsx [c]
    account-screen.tsx
    account-tabs.tsx [c]
    application-row.tsx
    applications-section.tsx
    coaching-section.tsx
    cv-on-file.tsx
    data-section.tsx [c]
    entitlements-card.tsx [c]
    notification-settings.tsx [c]
    payment-section.tsx [c]
    profile-tab.tsx [c]
    recording-settings.tsx [c]
    saved-card.tsx
    settings-tab.tsx [c]
    sign-in-section.tsx
    use-account-settings.ts [c]
  auth/
    auth-provider.tsx [c]
    gated-section.tsx [c]
    unlock-sticky-bar.tsx [c]
    unlock-wall.tsx [c]
    use-auth.ts [c]
    use-gate-guard.ts [c]
    use-wall-sentinel.ts [c]
  billing/
    billing-provider.tsx [c]
    entitled-link.tsx [c]
    pack-card.tsx [c]
    pay-mark.tsx
    pay-modal.tsx [c]
    use-billing.ts [c]
  cv/
    cv-analyzing.tsx
    cv-attach-panel.tsx [c]
    cv-coverage-matrix.tsx
    cv-coverage-row.tsx
    cv-four-numbers.tsx
    cv-headline-fix.tsx
    cv-interview-cta.tsx
    cv-marked-up.tsx
    cv-overall-score.tsx
    cv-remaining-fixes.tsx
    cv-results-screen.tsx [c]
    cv-run-row.tsx
    cv-runs-screen.tsx
    cv-upload-screen.tsx [c]
    jd-parsed-summary.tsx
    jd-paste-panel.tsx [c]
    use-cv-analysis.ts [c]
    use-jd-input.ts [c]
  home/
    four-numbers.tsx
    home-header.tsx
    home-screen.tsx
    quick-actions.tsx
    recent-activity.tsx
    revise-callout.tsx [c]
  interview/
    delivery-metrics.tsx
    feedback-numbers.tsx
    interview-feedback.tsx
    interview-live.tsx [c]
    interview-screen.tsx [c]
    interview-setup.tsx [c]
    interview-stage.tsx [c]
    interviewer-card.tsx [c]
    interviewer-picker.tsx [c]
    live-controls.tsx [c]
    mode-picker.tsx [c]
    not-measured.tsx
    question-card.tsx
    question-feedback-card.tsx
    transcript-panel.tsx [c]
    transcript-turn.tsx
    use-interview-session.ts [c]
    use-transcript.ts [c]
    visual-events.tsx
  progress/
    focus-card.tsx
    progress-curve.tsx
    progress-headline-stats.tsx
    progress-screen.tsx
    rep-history.tsx
  revise/
    claim-actions.tsx [c]
    claim-card.tsx [c]
    claim-editor.tsx [c]
    claims-provider.tsx [c]
    rescore-card.tsx [c]
    rescore-result.tsx
    revise-progress.tsx
    revise-screen.tsx [c]
    use-claims.ts [c]
lib/
  data/
    account.ts
    claims.ts
    cv-report.ts
    cv-runs.ts
    interview-feedback.ts
    interview-questions.ts
    interviewers.ts
    job-description.ts
    plans.ts
    progress.ts
    transcript.ts
types/
  account.ts
  billing.ts
  common.ts
  cv.ts
  interview.ts
  progress.ts
  revise.ts
utils/
  cn.ts
  format-clock.ts
  text.ts
  use-isomorphic-layout-effect.ts [c]
```

## State

Three providers, all mounted in `app/(app)/layout.tsx`. Each earns its place by
being read from more than one route; everything else is local.

| Concern | Owner | Why a provider |
| --- | --- | --- |
| Auth + report gate | `features/auth/auth-provider.tsx` | Sidebar, gated report, wall and sticky bar all read it. |
| Entitlements + plans modal | `features/billing/billing-provider.tsx` | Sidebar plan card, account screen, and every spend action read it. Reads auth, because "at the limit" only means anything once signed in. |
| Claim resolution | `features/revise/claims-provider.tsx` (`useReducer`) | Sidebar badge, home callout and the revise screen all read it. A reducer, not five setters — the statuses form a state machine. |

Local by design:

| Concern | Owner |
| --- | --- |
| CV upload wizard | `use-jd-input` + `use-cv-analysis` — scoped to `/cv/new`, dies with the route |
| Interview session | `use-interview-session` — owns the clock, must not leak across routes |
| Account settings toggles | `use-account-settings` — nothing outside the Settings tab reads them yet |

No global store.

## Paint timing

Anything the user would otherwise see in a wrong state for one frame runs in a
layout effect via `utils/use-isomorphic-layout-effect.ts`:

- **Route scroll reset** — otherwise the new screen paints at the old scroll offset.
- **Hiding the flow stepper for a live interview** — otherwise it flashes, then
  shifts the whole screen as it disappears.
- **Transcript autoscroll** — otherwise each caption appears at the stale position.
- **The account gate redirect** — the shell withholds `children` entirely while a
  redirect is in flight, so private content never paints at all.

Motion is honest about the OS setting: `prefers-reduced-motion: reduce` collapses
every animation and transition in `globals.css`. Three of this app's animations
loop forever, so this is not optional.

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
