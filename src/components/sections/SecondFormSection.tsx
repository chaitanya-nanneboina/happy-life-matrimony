"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import styles from "./SecondFormSection.module.css";

export default function SecondFormSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="register"
      aria-labelledby="cta-heading"
    >
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.bgBlob1} />
        <div className={styles.bgBlob2} />
      </div>

      <div className={`${styles.inner} container`}>
        <div className={`${styles.content} reveal`}>
          <div className="section-eyebrow">Begin Your Journey</div>
          
          <h2 id="cta-heading" className={styles.heading}>
            Your <span className="accent-serif">story</span> could begin here.
          </h2>

          <p className={styles.subhead}>
            Finding a life partner should feel personal rather than transactional. 
            Take the first step today. Let us help you find someone who feels like home.
          </p>

          {/* Action CTAs */}
          <div className={styles.actionRow}>
            <a href="#hero-form" className="btn btn-primary btn-lg">
              <span>Create Your Profile</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <p className={styles.badgeLine}>
            Private • Personal Matchmaking • Free to register
          </p>

          {/* Direct Support Details */}
          <div className={styles.directContact}>
            <p className={styles.contactLabel}>Prefer to call or message directly?</p>
            <div className={styles.contactLinks}>
              <a href="tel:+918688971732" className={`btn btn-ghost btn-sm ${styles.contactBtn}`}>
                <Phone size={14} />
                <span>+91 86889 71732</span>
              </a>
              <a
                href="https://wa.me/918688971732?text=Hey%20hii%20!%20Can%20u%20help%20me"
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-ghost btn-sm ${styles.contactBtn} ${styles.waHover}`}
              >
                <MessageSquare size={14} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
