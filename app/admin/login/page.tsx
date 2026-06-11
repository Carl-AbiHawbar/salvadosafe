"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const params = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Invalid username or password");
      return;
    }
    const next = params.get("next") || "/admin";
    window.location.href = next;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f1115] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#14161a] p-8 shadow-2xl"
      >
        <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand">Salvado Admin</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-white">Sign in</h1>
        <p className="mt-2 text-[14px] text-white/60">Manage products, categories, and website content.</p>

        {error && <p className="mt-4 rounded-lg bg-brand/20 px-4 py-3 text-[14px] text-red-200">{error}</p>}

        <label className="mt-6 block">
          <span className="text-[13px] font-semibold text-white/70">Username</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f1115] px-4 py-3 text-white outline-none focus:border-brand"
          />
        </label>
        <label className="mt-4 block">
          <span className="text-[13px] font-semibold text-white/70">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f1115] px-4 py-3 text-white outline-none focus:border-brand"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-brand py-3 text-[15px] font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
