"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("Auth is being configured. Please check back soon.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-text-onDark">ITOLOGY</h1>
          <p className="mt-2 text-text-onDark/60">Admin Portal</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-floating">
          <h2 className="font-display text-xl font-semibold text-text-primary mb-6">Sign in</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:border-jade"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2.5 rounded-lg border border-line text-sm focus:outline-none focus:border-jade"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-ink text-text-onDark rounded-lg text-sm font-semibold hover:bg-jade disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
