"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) { setError("Username is required."); return; }
    if (!password) { setError("Password is required."); return; }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-maroon)" aria-hidden="true">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>
          <div>
            <div className={styles.brandName}>Happy Life Matrimony</div>
            <div className={styles.brandChip}>Admin Portal</div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.heading}>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>Restricted access — authorized personnel only.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="admin-username" className={styles.label}>Username</label>
            <input
              id="admin-username"
              type="text"
              className={styles.input}
              placeholder="Enter your username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-required="true"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="admin-password" className={styles.label}>Password</label>
            <div className={styles.pwWrapper}>
              <input
                id="admin-password"
                type={showPw ? "text" : "password"}
                className={styles.input}
                style={{ paddingRight: 44 }}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-required="true"
              />
              <button
                type="button"
                className={styles.pwToggle}
                onClick={() => setShowPw(!showPw)}
                aria-label={showPw ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPw ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.error} role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Authenticating…
              </>
            ) : "Sign In"}
          </button>
        </form>

        <div className={styles.footer}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          Secure connection · Not indexed · Access is logged
        </div>
      </div>
    </div>
  );
}
