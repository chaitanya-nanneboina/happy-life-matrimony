"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Users, CheckCircle2, Lock, HelpCircle, MessageCircle } from "lucide-react";
import styles from "./TrustSection.module.css";

const primaryPillars = [
  {
    icon: ShieldCheck,
    title: "Private by Design",
    body: "Your name, phone number, and personal details are never displayed publicly. Only our authorized administrator can access your profile database.",
  },
  {
    icon: Users,
    title: "Personal Matchmaking",
    body: "We are not a faceless algorithm. Every profile receives genuine human attention, with our founder personally overseeing potential matches.",
  },
  {
    icon: CheckCircle2,
    title: "Verified Profiles",
    body: "Every single registered profile is verified through phone number OTP, ensuring a secure and authentic community of members.",
  },
];

const secondaryPillars = [
  {
    icon: Lock,
    title: "Secure Data Handling",
    body: "Data is stored in a secured database. We follow strict privacy protocols — your details are never sold, shared, or exposed.",
  },
  {
    icon: HelpCircle,
    title: "Transparent Approach",
    body: "No hidden layers or confusing upgrades. We communicate clearly at every stage so you always know what to expect.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    body: "Reach us instantly via WhatsApp or phone. We respond personally to solve your matrimonial queries directly.",
  },
];

export default function TrustSection() {
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
      className={`${styles.section} section`}
      id="about"
      aria-labelledby="trust-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className={`${styles.header} reveal`}>
          <div className="section-eyebrow">Our Guiding Values</div>
          <h2 id="trust-heading" className={styles.heading}>
            Your Trust is Our <span className="accent-serif">Foundation</span>
          </h2>
          <p className={styles.subhead}>
            Choosing a life partner is a monumental decision. We build our service around 
            absolute privacy, personal care, and genuine safety.
          </p>
        </div>

        {/* Primary Pillars: 3 Elegant Cards */}
        <div className={styles.primaryGrid} role="list" aria-label="Core trust pillars">
          {primaryPillars.map((pillar, i) => {
            const IconComponent = pillar.icon;
            return (
              <article
                key={pillar.title}
                className={`${styles.primaryCard} reveal reveal-delay-${i + 1}`}
                role="listitem"
              >
                <div className={styles.iconWrapper} aria-hidden="true">
                  <IconComponent size={24} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                <p className={styles.cardBody}>{pillar.body}</p>
              </article>
            );
          })}
        </div>

        {/* Divider Line */}
        <div className={`${styles.dividerLine} reveal`} aria-hidden="true" />

        {/* Secondary Pillars: Smaller, Editorial Layout */}
        <div className={styles.secondaryList} role="list" aria-label="Secondary safety features">
          {secondaryPillars.map((pillar, i) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`${styles.secondaryItem} reveal reveal-delay-${i + 1}`}
                role="listitem"
              >
                <div className={styles.secIconWrapper} aria-hidden="true">
                  <IconComponent size={18} strokeWidth={2} />
                </div>
                <div className={styles.secContent}>
                  <h4 className={styles.secTitle}>{pillar.title}</h4>
                  <p className={styles.secBody}>{pillar.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className={`${styles.banner} reveal`}>
          <ShieldCheck size={24} className={styles.bannerIcon} aria-hidden="true" />
          <div className={styles.bannerText}>
            <strong>Zero Public Exposure</strong>
            <span>
              Submitted profiles are never shown on the public website. Your personal
              information is exclusively visible to our authorized administrator.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
