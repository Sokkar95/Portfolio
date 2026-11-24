/**
 * Minimal GA4 event helper.
 *
 * Safe to call from anywhere on the client: it does nothing during the server
 * render, and nothing until the GA script has loaded (or when no measurement
 * id is configured at all). Keeps the call sites free of `window.gtag` guards.
 */
type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function track(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params ?? {});
}