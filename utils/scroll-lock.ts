/**
 * Reference-counted freeze of the app's scrolling.
 *
 * More than one thing can want the page held still at once — the plans modal
 * opened from inside the mobile drawer is the case that actually happens — and
 * a plain set/remove would let whichever closes first unfreeze the page while
 * the other is still open. The counter makes the last one out turn off the
 * lights.
 *
 * `globals.css` does the actual freezing off `html[data-modal-open]`, covering
 * the document, the body and the app's own `[data-scroll-container]`.
 */
let depth = 0;

/** Locks scrolling and returns the matching release. Safe to call twice. */
export function lockScroll(): () => void {
  depth += 1;
  document.documentElement.setAttribute("data-modal-open", "");

  let released = false;
  return () => {
    // React can run an effect cleanup more than once; a second release must not
    // decrement someone else's claim.
    if (released) return;
    released = true;

    depth = Math.max(0, depth - 1);
    if (depth === 0) {
      document.documentElement.removeAttribute("data-modal-open");
    }
  };
}
