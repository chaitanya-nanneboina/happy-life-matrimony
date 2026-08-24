"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminDashboard.module.css";

/* â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface Profile {
  id: number;
  name: string;
  gender: string;
  looking_for: string;
  phone: string;
  state: string;
  district: string;
  city: string;
  status: "pending" | "verified" | "rejected";
  submitted_at: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

interface AdminDashboardProps {
  adminName: string;
}

/* â”€â”€â”€ Icon components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
function IconSearch() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}
function IconX() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function IconLogOut() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}
function IconChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}
function IconChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
function IconEye() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function IconHeart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#801A2B" aria-hidden="true">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
    </svg>
  );
}
function IconClipboard() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .87h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.5a16 16 0 006.29 6.29l1.19-1.19a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
    </svg>
  );
}
function IconAlert() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
function IconTrash() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );
}

/* â”€â”€â”€ Status Badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function StatusBadge({ status }: { status: Profile["status"] }) {
  return (
    <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
      {status === "verified" && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
      )}
      {status === "pending" && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      )}
      {status === "rejected" && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      )}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/* â”€â”€â”€ Skeleton row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function SkeletonRow() {
  return (
    <tr className={styles.skeletonRow}>
      <td><div className={styles.skeletonCell} style={{ width: 180 }} /></td>
      <td><div className={styles.skeletonCell} style={{ width: 70 }} /></td>
      <td><div className={styles.skeletonCell} style={{ width: 70 }} /></td>
      <td><div className={styles.skeletonCell} style={{ width: 110 }} /></td>
      <td><div className={styles.skeletonCell} style={{ width: 80 }} /></td>
      <td><div className={styles.skeletonCell} style={{ width: 100 }} /></td>
      <td><div className={styles.skeletonCell} style={{ width: 52 }} /></td>
    </tr>
  );
}

/* â”€â”€â”€ Avatar initial â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function Avatar({ name, gender }: { name: string; gender: string }) {
  const initial = name.trim().charAt(0).toUpperCase();
  const isMale = gender === "Male";
  return (
    <span className={`${styles.avatar} ${isMale ? styles.avatarMale : styles.avatarFemale}`}>
      {initial}
    </span>
  );
}

/* â”€â”€â”€ Main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function AdminDashboard({ adminName }: AdminDashboardProps) {
  const router = useRouter();

  /* Data state */
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Filter state */
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  /* UI state */
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [drawerProfile, setDrawerProfile] = useState<Profile | null>(null);
  const [drawerAction, setDrawerAction] = useState<"verify" | "reject" | "delete" | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounter = useRef(0);

  const limit = 20;
  const totalPages = Math.ceil(total / limit);
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  /* â”€â”€ Derived KPIs â”€â”€ */
  const verifiedCount = profiles.filter(p => p.status === "verified").length;
  const pendingCount = profiles.filter(p => p.status === "pending").length;
  const todayStr = new Date().toLocaleDateString("en-IN");
  const newTodayCount = profiles.filter(p => {
    try { return new Date(p.submitted_at).toLocaleDateString("en-IN") === todayStr; } catch { return false; }
  }).length;

  /* â”€â”€ Toast helper â”€â”€ */
  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = ++toastCounter.current;
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  }, []);

  /* â”€â”€ Fetch profiles â”€â”€ */
  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search && { search }),
        ...(genderFilter && { gender: genderFilter }),
        ...(statusFilter && { status: statusFilter }),
      });
      const res = await fetch(`/api/admin/profiles?${params}`);
      if (res.status === 401) { router.push("/login"); return; }
      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles);
        setTotal(data.total);
      } else {
        setError("Failed to load profiles.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, search, genderFilter, statusFilter, router]);

  useEffect(() => { fetchProfiles(); }, [fetchProfiles]);
  useEffect(() => { setPage(1); }, [search, genderFilter, statusFilter]);

  /* â”€â”€ Drawer keyboard close â”€â”€ */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setDrawerProfile(null); setDrawerAction(null); setRejectReason(""); }
    };
    if (drawerProfile) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [drawerProfile]);

  /* â”€â”€ Logout â”€â”€ */
  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  /* â”€â”€ Format date â”€â”€ */
  const formatDate = (dt: string) => {
    try {
      return new Date(dt).toLocaleString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    } catch { return dt; }
  };

  /* â”€â”€ Profile status action â”€â”€ */
  const handleStatusAction = async (profile: Profile, action: "verify" | "reject") => {
    setActionLoading(true);
    const newStatus = action === "verify" ? "verified" : "rejected";
    try {
      const body: Record<string, string> = { status: newStatus };
      if (action === "reject" && rejectReason.trim()) body.reason = rejectReason.trim();

      const res = await fetch(`/api/admin/profiles/${profile.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setProfiles(prev => prev.map(p => p.id === profile.id ? { ...p, status: newStatus } : p));
        if (drawerProfile?.id === profile.id) setDrawerProfile({ ...drawerProfile, status: newStatus });
        showToast(`Profile ${action === "verify" ? "verified" : "rejected"} successfully.`);
        setDrawerAction(null);
        setRejectReason("");
      } else {
        showToast("Failed to update status. Please try again.", "error");
      }
    } catch {
      showToast("Connection error.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteAction = async (profile: Profile) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/profiles/${profile.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProfiles(prev => prev.filter(p => p.id !== profile.id));
        setTotal(t => t - 1);
        showToast("Profile deleted permanently.");
        setDrawerProfile(null);
        setDrawerAction(null);
      } else {
        showToast("Failed to delete profile.", "error");
      }
    } catch {
      showToast("Connection error.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  /* â”€â”€ Reset filters â”€â”€ */
  const resetFilters = () => { setSearch(""); setGenderFilter(""); setStatusFilter(""); };
  const hasFilters = !!(search || genderFilter || statusFilter);

  return (
    <div className={styles.page}>

      {/* â”€â”€ Toast system â”€â”€ */}
      <div className={styles.toastContainer} role="status" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className={`${styles.toast} ${t.type === "error" ? styles.toastError : styles.toastSuccess}`}>
            {t.type === "success"
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
              : <IconAlert />
            }
            {t.message}
          </div>
        ))}
      </div>

      {/* â”€â”€ Header â”€â”€ */}
      <header className={styles.header} role="banner">
        <div className={styles.headerInner}>
          <div className={styles.headerBrand}>
            <div className={styles.headerLogoBox}><IconHeart /></div>
            <div>
              <div className={styles.headerTitle}>Happy Life Matrimony</div>
              <div className={styles.headerSub}>Admin Portal</div>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.adminInfo}>
              <div className={styles.adminAvatar}>{adminName.charAt(0).toUpperCase()}</div>
              <span className={styles.adminName}>{adminName}</span>
            </div>
            <div className={styles.headerDivider} />
            <button
              className={styles.logoutBtn}
              onClick={() => setLogoutDialog(true)}
              aria-label="Sign out of admin dashboard"
            >
              <IconLogOut />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* â”€â”€ Logout Confirmation Dialog â”€â”€ */}
      {logoutDialog && (
        <div className={styles.dialogOverlay} role="dialog" aria-modal="true" aria-labelledby="logout-title">
          <div className={styles.dialog}>
            <div className={styles.dialogIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#801A2B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </div>
            <h2 id="logout-title" className={styles.dialogTitle}>Sign out?</h2>
            <p className={styles.dialogBody}>You will be redirected to the login screen. Any unsaved changes will be lost.</p>
            <div className={styles.dialogActions}>
              <button className={styles.dialogCancel} onClick={() => setLogoutDialog(false)} disabled={loggingOut}>Cancel</button>
              <button className={styles.dialogConfirm} onClick={handleLogout} disabled={loggingOut} aria-busy={loggingOut}>
                {loggingOut ? <><span className={styles.spinnerSm} aria-hidden="true" /> Signing outâ€¦</> : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* â”€â”€ Main â”€â”€ */}
      <main className={styles.main} role="main">

        {/* â”€â”€ KPI Row â”€â”€ */}
        <div className={styles.kpiRow}>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon} style={{ background: "rgba(99,102,241,0.08)", color: "#6366F1" }}><IconUsers /></div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiNumber}>{total}</span>
              <span className={styles.kpiLabel}>Total Profiles</span>
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon} style={{ background: "rgba(16,185,129,0.08)", color: "#059669" }}><IconCheck /></div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiNumber}>{verifiedCount}</span>
              <span className={styles.kpiLabel}>Verified</span>
            </div>
          </div>
          <div className={`${styles.kpiCard} ${styles.kpiCardPending}`}>
            <div className={styles.kpiIcon} style={{ background: "rgba(217,119,6,0.08)", color: "#D97706" }}><IconClock /></div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiNumber}>{pendingCount}</span>
              <span className={styles.kpiLabel}>Pending</span>
              {pendingCount > 0 && <span className={styles.kpiHint}>Needs attention</span>}
            </div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiIcon} style={{ background: "rgba(128,26,43,0.07)", color: "#801A2B" }}><IconStar /></div>
            <div className={styles.kpiBody}>
              <span className={styles.kpiNumber}>{newTodayCount}</span>
              <span className={styles.kpiLabel}>New Today</span>
            </div>
          </div>
        </div>

        {/* â”€â”€ Page heading + toolbar â”€â”€ */}
        <div className={styles.pageHeading}>
          <div>
            <h1 className={styles.pageTitle}>Profile Management</h1>
            <p className={styles.pageDesc}>Review, verify, and manage registered profiles.</p>
          </div>
        </div>

        {/* â”€â”€ Filter toolbar â”€â”€ */}
        <div className={styles.toolbar} role="search" aria-label="Filter profiles">
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}><IconSearch /></span>
            <input
              type="search"
              placeholder="Search by name or phoneâ€¦"
              className={styles.searchInput}
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search profiles by name or phone number"
            />
          </div>
          <div className={styles.selectWrap}>
            <select
              className={styles.filterSelect}
              value={genderFilter}
              onChange={e => setGenderFilter(e.target.value)}
              aria-label="Filter by gender"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className={styles.selectWrap}>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          {hasFilters && (
            <button className={styles.resetBtn} onClick={resetFilters} aria-label="Clear all filters">
              <IconX /> Reset
            </button>
          )}
        </div>

        {/* â”€â”€ Error state â”€â”€ */}
        {error && (
          <div className={styles.errorBanner} role="alert">
            <IconAlert /> {error}
            <button onClick={fetchProfiles} className={styles.retryLink}>Retry</button>
          </div>
        )}

        {/* â”€â”€ Table card â”€â”€ */}
        <div className={styles.tableCard}>
          <div className={styles.tableScroll}>
            {loading ? (
              <table className={styles.table} aria-label="Loading profiles">
                <thead><tr>
                  <th>Profile</th><th>Gender</th><th>Looking For</th>
                  <th>Phone</th><th>Status</th><th>Submitted</th><th>Actions</th>
                </tr></thead>
                <tbody>
                  <SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow />
                </tbody>
              </table>
            ) : profiles.length === 0 ? (
              <div className={styles.emptyState} aria-live="polite">
                <div className={styles.emptyIcon}><IconClipboard /></div>
                <p className={styles.emptyTitle}>No profiles found</p>
                <p className={styles.emptyDesc}>
                  {hasFilters ? "Try adjusting your filters to see results." : "Registered profiles will appear here."}
                </p>
                {hasFilters && (
                  <button className={styles.emptyReset} onClick={resetFilters}>Clear Filters</button>
                )}
              </div>
            ) : (
              <table className={styles.table} aria-label="Registered profiles">
                <thead>
                  <tr>
                    <th scope="col">Profile</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Looking For</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Status</th>
                    <th scope="col">Submitted</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map(p => (
                    <tr
                      key={p.id}
                      className={styles.row}
                      onClick={() => { setDrawerProfile(p); setDrawerAction(null); }}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        <div className={styles.profileCell}>
                          <Avatar name={p.name} gender={p.gender} />
                          <div>
                            <div className={styles.profileName}>{p.name}</div>
                            <div className={styles.profileId}>#{p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`${styles.genderBadge} ${p.gender === "Male" ? styles.genderMale : p.gender === "Female" ? styles.genderFemale : styles.genderOther}`}>
                          {p.gender}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.genderBadge} ${p.looking_for === "Male" ? styles.genderMale : p.looking_for === "Female" ? styles.genderFemale : styles.genderOther}`}>
                          {p.looking_for}
                        </span>
                      </td>
                      <td>
                        <a
                          href={`tel:+91${p.phone}`}
                          className={styles.phoneLink}
                          onClick={e => e.stopPropagation()}
                          aria-label={`Call +91 ${p.phone}`}
                        >
                          <IconPhone /> +91 {p.phone}
                        </a>
                      </td>
                      <td><StatusBadge status={p.status || "pending"} /></td>
                      <td className={styles.dateCell}>{formatDate(p.submitted_at)}</td>
                      <td onClick={e => e.stopPropagation()}>
                        <button
                          className={styles.viewBtn}
                          onClick={() => { setDrawerProfile(p); setDrawerAction(null); }}
                          aria-label={`View profile of ${p.name}`}
                        >
                          <IconEye /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className={styles.pagination} role="navigation" aria-label="Table pagination">
              <span className={styles.pageInfo}>
                Showing {startItem}â€“{endItem} of {total} profiles
              </span>
              <div className={styles.pageButtons}>
                <button
                  className={styles.pageBtn}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <IconChevronLeft /> Prev
                </button>
                <span className={styles.pageCurrent}>{page} / {totalPages}</span>
                <button
                  className={styles.pageBtn}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  Next <IconChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* â”€â”€ Profile Drawer â”€â”€ */}
      {drawerProfile && (
        <>
          <div
            className={styles.drawerOverlay}
            onClick={() => { setDrawerProfile(null); setDrawerAction(null); setRejectReason(""); }}
            aria-hidden="true"
          />
          <aside className={styles.drawer} role="complementary" aria-label={`Profile details for ${drawerProfile.name}`}>
            {/* Drawer Header */}
            <div className={styles.drawerHeader}>
              <div className={styles.drawerProfileRow}>
                <Avatar name={drawerProfile.name} gender={drawerProfile.gender} />
                <div>
                  <h2 className={styles.drawerName}>{drawerProfile.name}</h2>
                  <StatusBadge status={drawerProfile.status || "pending"} />
                </div>
              </div>
              <button
                className={styles.drawerClose}
                onClick={() => { setDrawerProfile(null); setDrawerAction(null); setRejectReason(""); }}
                aria-label="Close profile drawer"
              >
                <IconX />
              </button>
            </div>

            {/* Drawer Content */}
            <div className={styles.drawerContent}>
              <section className={styles.drawerSection}>
                <h3 className={styles.drawerSectionTitle}>Personal Information</h3>
                <div className={styles.drawerGrid}>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Full Name</span>
                    <span className={styles.drawerFieldValue}>{drawerProfile.name}</span>
                  </div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Gender</span>
                    <span className={styles.drawerFieldValue}>{drawerProfile.gender}</span>
                  </div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Looking For</span>
                    <span className={styles.drawerFieldValue}>{drawerProfile.looking_for}</span>
                  </div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Profile ID</span>
                    <span className={styles.drawerFieldValue}>#{drawerProfile.id}</span>
                  </div>
                </div>
              </section>

              <section className={styles.drawerSection}>
                <h3 className={styles.drawerSectionTitle}>Contact Information</h3>
                <div className={styles.drawerGrid}>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Mobile Number</span>
                    <a href={`tel:+91${drawerProfile.phone}`} className={styles.drawerPhone}>
                      <IconPhone /> +91 {drawerProfile.phone}
                    </a>
                  </div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>WhatsApp</span>
                    <a
                      href={`https://wa.me/91${drawerProfile.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.drawerWhatsapp}
                    >
                      Open WhatsApp
                    </a>
                  </div>
                </div>
              </section>

              <section className={styles.drawerSection}>
                <h3 className={styles.drawerSectionTitle}>Registration Details</h3>
                <div className={styles.drawerGrid}>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Submitted</span>
                    <span className={styles.drawerFieldValue}>{formatDate(drawerProfile.submitted_at)}</span>
                  </div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Location</span>
                    <span className={styles.drawerFieldValue}>
                      {drawerProfile.city}, {drawerProfile.district}, {drawerProfile.state}
                    </span>
                  </div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Admin Status</span>
                    <StatusBadge status={drawerProfile.status || "pending"} />
                  </div>
                </div>
              </section>

              {/* Actions */}
              {drawerAction === null && (
                <div className={styles.drawerActions}>
                  {drawerProfile.status !== "verified" && (
                    <button
                      className={styles.actionVerify}
                      onClick={() => setDrawerAction("verify")}
                      disabled={actionLoading}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      Verify Profile
                    </button>
                  )}
                  {drawerProfile.status !== "rejected" && (
                    <button
                      className={styles.actionReject}
                      onClick={() => setDrawerAction("reject")}
                      disabled={actionLoading}
                    >
                      <IconX /> Reject Profile
                    </button>
                  )}
                  <a
                    href={`tel:+91${drawerProfile.phone}`}
                    className={styles.actionContact}
                  >
                    <IconPhone /> Contact
                  </a>
                  <button
                    className={styles.actionDelete}
                    onClick={() => setDrawerAction("delete")}
                    disabled={actionLoading}
                    style={{ background: "#fff0f0", color: "#dc2626", border: "1px solid #fecaca", padding: "8px 12px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontWeight: 500, marginTop: "8px", justifyContent: "center", width: "100%" }}
                  >
                    <IconTrash /> Delete Profile
                  </button>
                </div>
              )}

              {/* Verify confirm */}
              {drawerAction === "verify" && (
                <div className={styles.confirmBox}>
                  <p className={styles.confirmText}>Mark <strong>{drawerProfile.name}</strong> as verified? This confirms the profile is legitimate.</p>
                  <div className={styles.confirmBtns}>
                    <button className={styles.confirmCancel} onClick={() => setDrawerAction(null)} disabled={actionLoading}>Cancel</button>
                    <button className={styles.confirmVerify} onClick={() => handleStatusAction(drawerProfile, "verify")} disabled={actionLoading} aria-busy={actionLoading}>
                      {actionLoading ? <><span className={styles.spinnerSm} /> Verifyingâ€¦</> : "Confirm Verify"}
                    </button>
                  </div>
                </div>
              )}

              {/* Reject confirm */}
              {drawerAction === "reject" && (
                <div className={styles.confirmBox}>
                  <p className={styles.confirmText}>Reject <strong>{drawerProfile.name}</strong>{"'"}s profile?</p>
                  <div className={styles.confirmField}>
                    <label htmlFor="reject-reason" className={styles.confirmLabel}>Reason (optional)</label>
                    <textarea
                      id="reject-reason"
                      className={styles.confirmTextarea}
                      placeholder="Add a note about why this profile is being rejectedâ€¦"
                      value={rejectReason}
                      onChange={e => setRejectReason(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className={styles.confirmBtns}>
                    <button className={styles.confirmCancel} onClick={() => { setDrawerAction(null); setRejectReason(""); }} disabled={actionLoading}>Cancel</button>
                    <button className={styles.confirmReject} onClick={() => handleStatusAction(drawerProfile, "reject")} disabled={actionLoading} aria-busy={actionLoading}>
                      {actionLoading ? <><span className={styles.spinnerSm} /> Rejectingâ€¦</> : "Confirm Reject"}
                    </button>
                  </div>
                </div>
              )}

              {/* Delete confirm */}
              {drawerAction === "delete" && (
                <div className={styles.confirmBox}>
                  <p className={styles.confirmText} style={{ color: "#dc2626" }}>
                    Are you sure you want to permanently delete <strong>{drawerProfile.name}</strong>{"'"}s profile? This action cannot be undone.
                  </p>
                  <div className={styles.confirmBtns}>
                    <button className={styles.confirmCancel} onClick={() => setDrawerAction(null)} disabled={actionLoading}>Cancel</button>
                    <button 
                      className={styles.confirmReject} 
                      style={{ background: "#dc2626", borderColor: "#dc2626" }}
                      onClick={() => handleDeleteAction(drawerProfile)} 
                      disabled={actionLoading} 
                      aria-busy={actionLoading}
                    >
                      {actionLoading ? <><span className={styles.spinnerSm} /> Deleting…</> : "Yes, Delete Permanently"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

