"use client";

import { useEffect, useRef, useState } from "react";
import { IDLE_TIMEOUT_MS, LAST_ACTIVITY_KEY } from "@/lib/session-idle";

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "wheel"] as const;

export default function SessionIdleGuard({ lang }: { lang: "zh" | "en" }) {
  const [expired, setExpired] = useState(false);
  const lastActivityRef = useRef<number>(Date.now());
  const expiredRef = useRef(false);

  useEffect(() => {
    function readStoredActivity() {
      const stored = Number(window.sessionStorage.getItem(LAST_ACTIVITY_KEY));
      return Number.isFinite(stored) && stored > 0 ? stored : Date.now();
    }

    function recordActivity() {
      if (expiredRef.current) return;
      const now = Date.now();
      lastActivityRef.current = now;
      window.sessionStorage.setItem(LAST_ACTIVITY_KEY, String(now));
    }

    function triggerExpire() {
      if (expiredRef.current) return;
      expiredRef.current = true;
      setExpired(true);
      void fetch("/api/auth/logout", { method: "POST" });
    }

    function checkIdle() {
      if (expiredRef.current) return;
      if (Date.now() - lastActivityRef.current >= IDLE_TIMEOUT_MS) {
        triggerExpire();
      }
    }

    // Page just loaded/regained focus: if it's been idle too long since the last
    // recorded activity (e.g. tab was left in the background), expire immediately.
    lastActivityRef.current = readStoredActivity();
    checkIdle();
    if (!expiredRef.current) {
      recordActivity();
    }

    for (const eventName of ACTIVITY_EVENTS) {
      window.addEventListener(eventName, recordActivity, { passive: true });
    }
    document.addEventListener("visibilitychange", checkIdle);
    window.addEventListener("focus", checkIdle);
    const interval = window.setInterval(checkIdle, 5000);

    return () => {
      for (const eventName of ACTIVITY_EVENTS) {
        window.removeEventListener(eventName, recordActivity);
      }
      document.removeEventListener("visibilitychange", checkIdle);
      window.removeEventListener("focus", checkIdle);
      window.clearInterval(interval);
    };
  }, []);

  if (!expired) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label={lang === "zh" ? "会话已结束" : "Session ended"}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="relative w-full max-w-sm rounded-2xl border border-[color:var(--gold)]/35 bg-[linear-gradient(150deg,rgba(255,252,246,0.97),rgba(248,236,214,0.94))] p-6 shadow-[0_24px_48px_rgba(56,34,13,0.28)]">
        <p className="heading-serif text-2xl text-[color:var(--ink)]">
          {lang === "zh" ? "会话已结束" : "Session Ended"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">
          {lang === "zh"
            ? "由于超过 5 分钟没有操作，系统已自动登出以保护账户安全。是否要继续使用？"
            : "You've been logged out automatically after 5 minutes of inactivity, to keep this account secure. Would you like to continue?"}
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-2.5">
          <a
            href="/login"
            className="rounded-full border border-[color:var(--gold)]/45 bg-white/85 px-4 py-2 text-sm text-[color:var(--ink-soft)] hover:bg-white hover:text-[color:var(--ink)]"
          >
            {lang === "zh" ? "退出登录" : "Logout"}
          </a>
          <a
            href="/login?next=/admin"
            className="rounded-full border border-[color:var(--gold)]/55 bg-[color:var(--gold)] px-4 py-2 text-sm font-semibold text-white hover:bg-[color:var(--gold-deep)]"
          >
            {lang === "zh" ? "继续使用（重新登录）" : "Continue (sign in again)"}
          </a>
        </div>
      </div>
    </div>
  );
}
