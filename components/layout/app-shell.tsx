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
import { UnlockWall } from "@/features/auth/unlock-wall";
import { UnlockStickyBar } from "@/features/auth/unlock-sticky-bar";
import { useGateGuard } from "@/features/auth/use-gate-guard";

/**
 * The scrolling <main>. The gate sentinel observes against this element rather
 * than the viewport, and route changes reset it to the top.
 */
const ScrollContainer = createContext<HTMLElement | null>(null);

export function useScrollContainer() {
  return useContext(ScrollContainer);
}

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
  useEffect(() => {
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

  useGateGuard();

  const chrome = useMemo(() => ({ setStepperHidden }), []);

  // Publish the node once mounted so consumers re-run against a real element.
  useEffect(() => setScrollEl(mainRef.current), []);

  // The prototype resets scroll on every screen change; client-side route
  // transitions don't do this for a nested scroll container.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <ScrollContainer.Provider value={scrollEl}>
      <ChromeContext.Provider value={chrome}>
        <div className="flex h-full w-full overflow-hidden bg-paper text-ink">
          <Sidebar />
          <main ref={mainRef} className="relative h-full min-w-0 flex-1 overflow-y-auto">
            {!stepperHidden && <FlowStepper />}
            {children}
            <UnlockStickyBar />
          </main>
        </div>
        <UnlockWall />
      </ChromeContext.Provider>
    </ScrollContainer.Provider>
  );
}
