"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function AuthForm({ type = "login" }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = type === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      const contentType = res.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("API returned non-JSON:", text);
        throw new Error("Server returned an invalid response (not JSON). Please check the server logs. If you just added environment variables, you may need to restart the server.");
      }

      if (!res.ok || data.success === false) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md premium-card p-6 sm:p-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-sm text-[var(--theme-text-muted)] mt-2 font-medium">
          {isLogin ? "Enter your details to access your dashboard" : "Start navigating your career path today"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div>
            <label className="tool-label">Name</label>
            <input
              type="text"
              required
              autoComplete="name"
              className="w-full px-4 py-3 tool-input"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        )}

        <div>
          <label className="tool-label">Email</label>
          <input
            type="email"
            required
            autoComplete="username"
            className="w-full px-4 py-3 tool-input"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="tool-label">Password</label>
          <input
            type="password"
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            className="w-full px-4 py-3 tool-input"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 p-4 rounded-lg border border-red-200 dark:border-red-900/50">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-lg mt-4 shadow-sm"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" />}
          {isLogin ? "Sign in" : "Sign up"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-[var(--theme-text-muted)] border-t border-[var(--theme-border)] pt-6 font-medium">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <Link href="/signup" className="text-[var(--theme-primary)] hover:underline font-semibold">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--theme-primary)] hover:underline font-semibold">
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
