"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "Login failed");
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <section className="max-w-md card-lux p-7 sm:p-9 mx-auto">
      <h1 className="heading-serif text-4xl">Staff Login</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full border border-[color:var(--gold)]/30 rounded-xl px-3 py-2 bg-white/90" required />
        </div>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button disabled={loading} className="w-full rounded-xl bg-[#2f2419] text-white py-2.5 disabled:opacity-70">
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
