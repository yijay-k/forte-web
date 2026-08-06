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
import { ScrollContainerContext } from "./scroll-container";
import { UnlockWall } from "@/features/auth/unlock-wall";
import { UnlockStickyBar } from "@/features/auth/unlock-sticky-bar";
import { useGateGuard } from "@/features/auth/use-gate-guard";
import { PayModal } from "@/features/billing/pay-modal";
import { useIsomorphicLayoutEffect } from "@/utils/use-isomorphic-layout-effect";

const ChromeContext = createContext<{ setStepperHidden: (hidden: boolean) => void }>({
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
  const [stepperHidden, setStepperHidden] = useState(false);
  const pathname = usePathname();

  // True while bouncing a signed-out visitor off a gated route. Children are
  // withheld rather than rendered-then-replaced, so private content never
  // paints even for a frame.
  const redirecting = useGateGuard();

  const chrome = useMemo(() => ({ setStepperHidden }), []);

  // Publish the node once mounted so consumers re-run against a real element.
  useEffect(() => setScrollEl(mainRef.current), []);

  // The prototype resets scroll on every screen change; client-side route
  // transitions don't do this for a nested scroll container. Before paint, so
  // the new screen is never shown at the old screen's scroll offset.
  useIsomorphicLayoutEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <ScrollContainerContext.Provider value={scrollEl}>
      <ChromeContext.Provider value={chrome}>
        <div className="flex h-full w-full overflow-hidden bg-paper text-ink">
          <Sidebar />
          <main
            ref={mainRef}
            data-scroll-container
            className="relative h-full min-w-0 flex-1 overflow-y-auto"
          >
            {!stepperHidden && !redirecting && <FlowStepper />}
            {redirecting ? null : children}
            <UnlockStickyBar />
          </main>
        </div>
        <UnlockWall />
        <PayModal />
      </ChromeContext.Provider>
    </ScrollContainerContext.Provider>
  );
}
