import Link from "next/link";
import { Heart, Phone, MapPin, Shield, MessageCircle } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`${styles.inner} container`}>
        {/* Column 1: Brand & WhatsApp */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Happy Life Matrimony">
            <Heart className={styles.logoIcon} strokeWidth={2.5} size={20} aria-hidden="true" />
            <div>
              <div className={styles.logoMain}>Happy Life</div>
              <div className={styles.logoSub}>Matrimony</div>
            </div>
          </Link>
          <p className={styles.tagline}>
            A personal, privacy-first matrimony service based in Hyderabad, rooted in genuine care, transparency, and trust.
          </p>
          <a
            href="https://wa.me/918688971732?text=Hey%20hii%20!%20Can%20u%20help%20me"
            className={styles.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect with us on WhatsApp"
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Column 2: Quick Links */}
        <nav className={styles.links} aria-label="Footer navigation">
          <h3 className={styles.title}>Quick Links</h3>
          <ul role="list">
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#about">Why Choose Us</a></li>
            <li><a href="#founder">About Founder</a></li>
            <li><a href="#location">Our Location</a></li>
          </ul>
        </nav>

        {/* Column 3: Contact Details & Privacy Reassurance */}
        <div className={styles.contact}>
          <h3 className={styles.title}>Get In Touch</h3>
          <address className={styles.address}>
            <div className={styles.contactLine}>
              <MapPin size={14} className={styles.contactIcon} />
              <span>Hyderabad, Telangana, India</span>
            </div>
            <div className={styles.contactLine}>
              <Phone size={14} className={styles.contactIcon} />
              <a href="tel:+918688971732">+91 86889 71732</a>
            </div>
          </address>
          <div className={styles.privacyBox}>
            <Shield size={14} className={styles.privacyIcon} />
            <span>
              All registered data is stored securely and never exposed publicly.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p>© {year} Happy Life Matrimony. All rights reserved.</p>
            <p className={styles.disclaimer}>
              Designed for meaningful relationships.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
