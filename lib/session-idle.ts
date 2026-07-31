// Shared constants so the idle guard and the login flow agree on the same activity clock.
export const IDLE_TIMEOUT_MS = 5 * 60 * 1000;
export const LAST_ACTIVITY_KEY = "blue_islet_last_activity";

export function markSessionActivityNow() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
}
