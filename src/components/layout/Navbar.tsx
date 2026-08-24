"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About" },
  { href: "#founder", label: "Founder" },
  { href: "#location", label: "Location" },
  { href: "/login", label: "Admin Login" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} role="banner">
      <nav className={`${styles.nav} container`} aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Happy Life Matrimony Home">
          <Heart className={styles.logoIcon} strokeWidth={2.5} size={20} aria-hidden="true" />
          <div className={styles.logoText}>
            <span className={styles.logoMain}>Happy Life</span>
            <span className={styles.logoSub}>Matrimony</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className={styles.navLinks} role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/") ? (
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA Button */}
        <div className={styles.ctaWrapper}>
          <a href="#hero-form" className={`btn btn-primary btn-sm ${styles.ctaBtn}`}>
            Create Profile
          </a>
        </div>

        {/* Hamburger Mobile Menu Toggle */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/") ? (
                <Link href={link.href} className={styles.mobileLink} onClick={handleLinkClick}>
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} className={styles.mobileLink} onClick={handleLinkClick}>
                  {link.label}
                </a>
              )}
            </li>
          ))}
          <li className={styles.mobileCtaItem}>
            <a
              href="#hero-form"
              className={`btn btn-primary ${styles.mobileCta}`}
              onClick={handleLinkClick}
            >
              Create Your Profile
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
