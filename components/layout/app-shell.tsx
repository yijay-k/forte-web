"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { FlowStepper } from "./flow-stepper";
import { MobileTopBar } from "./mobile-top-bar";
import { ScrollContainerContext } from "./scroll-container";
import { DrawerContext, useIsNarrow } from "./drawer";
import { AppFrameContext } from "./app-frame";
import { UnlockWall } from "@/features/auth/unlock-wall";
import { UnlockStickyBar } from "@/features/auth/unlock-sticky-bar";
import { useGateGuard } from "@/features/auth/use-gate-guard";
import { PayModal } from "@/features/billing/pay-modal";
import { cn } from "@/utils/cn";
import { lockScroll } from "@/utils/scroll-lock";
import { useIsomorphicLayoutEffect } from "@/utils/use-isomorphic-layout-effect";

const ChromeContext = createContext<{
  setStepperHidden: (hidden: boolean) => void;
}>({
  setStepperHidden: () => {},
});

/**
 * Lets a screen take the viewport over completely. The live interview is the
 * only caller: a running session must not show flow chrome, because the whole
 * premise is that a real interview has no dashboard.
 */
export function useHideStepper(hidden: boolean) {
  const { setStepperHidden } = useContext(ChromeContext);
  // Layout effect, not a passive one: a passive effect runs after paint, so
  // the stepper would flash over the live interview for a frame and then shift
  // the whole screen up as it disappeared.
  useIsomorphicLayoutEffect(() => {
    if (!hidden) return;
    setStepperHidden(true);
    return () => setStepperHidden(false);
  }, [hidden, setStepperHidden]);
}

export function AppShell({ children }: { children: ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const [scrollEl, setScrollEl] = useState<HTMLElement | null>(null);
  // A ref callback rather than an effect: the modals portal into this element,
  // and a callback publishes it during commit instead of a render later.
  const [frameEl, setFrameEl] = useState<HTMLElement | null>(null);
  const [stepperHidden, setStepperHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const isNarrow = useIsNarrow();

  // True while bouncing a signed-out visitor off a gated route. Children are
  // withheld rather than rendered-then-replaced, so private content never
  // paints even for a frame.
  const redirecting = useGateGuard();

  const chrome = useMemo(() => ({ setStepperHidden }), []);

  const drawer = useMemo(
    () => ({
      open: drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }),
    [drawerOpen],
  );

  // Publish the node once mounted so consumers re-run against a real element.
  useEffect(() => setScrollEl(mainRef.current), []);

  // Two things force the drawer shut: navigating, and widening past the
  // breakpoint (otherwise the state stays `true` and the rail springs open
  // again the moment the window narrows). Both are adjustments to a value that
  // changed, not events — so they happen during render, which React finishes
  // before painting. An effect would let the drawer show for one frame in the
  // wrong state.
  const drawerReset = `${pathname}|${isNarrow}`;
  const [lastReset, setLastReset] = useState(drawerReset);
  if (lastReset !== drawerReset) {
    setLastReset(drawerReset);
    setDrawerOpen(false);
  }

  // Nothing behind the drawer scrolls. Reference-counted, so opening a modal
  // from inside the drawer and closing it again does not thaw the page.
  useEffect(() => {
    if (!drawerOpen || !isNarrow) return;
    return lockScroll();
  }, [drawerOpen, isNarrow]);

  // The prototype resets scroll on every screen change; client-side route
  // transitions don't do this for a nested scroll container. Before paint, so
  // the new screen is never shown at the old screen's scroll offset.
  useIsomorphicLayoutEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <ScrollContainerContext.Provider value={scrollEl}>
      <ChromeContext.Provider value={chrome}>
        <DrawerContext.Provider value={drawer}>
          <AppFrameContext.Provider value={frameEl}>
            {/* `relative` because the drawer, its scrim and both modals are
              absolutely positioned — they clip to this box rather than to the
              viewport, which is also why the element itself is published on
              context. `dvh` so mobile browser chrome cannot crop the last row
              of the layout. */}
            <div
              ref={setFrameEl}
              className="relative flex h-dvh w-full overflow-hidden bg-paper text-ink"
            >
              <Sidebar />

              {/* Only interactive while the drawer is open; `aria-hidden` because
                the drawer's own focus trap is what closes it for keyboard and
                screen-reader users. */}
              <div
                onClick={drawer.closeDrawer}
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 z-55 bg-ink/42 backdrop-blur-[2px] transition-opacity duration-200 app:hidden",
                  drawerOpen
                    ? "cursor-pointer opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              />

              <main
                ref={mainRef}
                data-scroll-container
                className="relative h-full min-w-0 flex-1 overflow-y-auto"
              >
                <MobileTopBar />
                {!stepperHidden && !redirecting && <FlowStepper />}
                {redirecting ? null : children}
                <UnlockStickyBar />
              </main>

              <UnlockWall />
              <PayModal />
            </div>
          </AppFrameContext.Provider>
        </DrawerContext.Provider>
      </ChromeContext.Provider>
    </ScrollContainerContext.Provider>
  );
}
