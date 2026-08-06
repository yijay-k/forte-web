"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

export type AuthState = {
  /** Signed in — the whole report is readable. */
  authed: boolean;
  /** The unlock modal is showing. */
  wallOpen: boolean;
  /**
   * The wall has fired at least once. The scroll sentinel only opens the wall
   * on the first pass; after that a sticky bar takes over so the user isn't
   * trapped in a loop of dismissing the same modal.
   */
  wallSeen: boolean;
  openWall: () => void;
  dismissWall: () => void;
  unlock: () => void;
  /** Called by the sentinel. No-ops once the user is in or has seen the wall. */
  triggerWall: () => void;
};

export const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({
  children,
  initialAuthed = false,
}: {
  children: ReactNode;
  initialAuthed?: boolean;
}) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [wallOpen, setWallOpen] = useState(false);
  const [wallSeen, setWallSeen] = useState(false);

  const openWall = useCallback(() => {
    setWallOpen(true);
    setWallSeen(true);
  }, []);

  const dismissWall = useCallback(() => setWallOpen(false), []);

  // No scroll reset on unlock: the blur dissolves exactly where they are.
  const unlock = useCallback(() => {
    setAuthed(true);
    setWallOpen(false);
  }, []);

  const triggerWall = useCallback(() => {
    setAuthed((isAuthed) => {
      if (!isAuthed) {
        setWallSeen((seen) => {
          if (!seen) setWallOpen(true);
          return true;
        });
      }
      return isAuthed;
    });
  }, []);

  const value = useMemo<AuthState>(
    () => ({ authed, wallOpen, wallSeen, openWall, dismissWall, unlock, triggerWall }),
    [authed, wallOpen, wallSeen, openWall, dismissWall, unlock, triggerWall],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
