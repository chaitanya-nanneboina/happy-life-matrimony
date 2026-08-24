"use client";

import Image from "next/image";
import founderImg from "../../../assets/founder.png";
import { useEffect, useRef } from "react";
import { ShieldCheck, Heart, UserCheck, MessageSquare } from "lucide-react";
import styles from "./FounderSection.module.css";

const credibilityPoints = [
  { icon: Heart, label: "Personal Commitment" },
  { icon: ShieldCheck, label: "Privacy First" },
  { icon: UserCheck, label: "Genuine Care" },
];

export default function FounderSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} section`}
      id="founder"
      aria-labelledby="founder-heading"
    >
      <div className="container">
        <div className={styles.inner}>
          {/* Portrait Column */}
          <div className={`${styles.imageCol} reveal`}>
            <div className={styles.imageFrame}>
              <div className={styles.imageBg} aria-hidden="true" />
              <div className={styles.imageWrapper}>
                <Image
                  src={founderImg}
                  alt="Chettimala Rama Chandra Rao — Founder of Happy Life Matrimony"
                  width={380}
                  height={460}
                  className={styles.founderImg}
                  priority={false}
                />
              </div>
              <div className={styles.founderBadge} aria-hidden="true">
                <Heart size={12} className={styles.badgeHeart} fill="currentColor" />
                <span>Founder & Director</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className={`${styles.content} reveal reveal-delay-2`}>
            <div className="section-eyebrow">The Person Behind Happy Life</div>

            <h2 id="founder-heading" className={styles.name}>
              Chettimala
              <br />
              <span className="accent-serif">Rama Chandra Rao</span>
            </h2>

            <p className={styles.philosophy}>
              "Finding a life partner is too sacred to be left to algorithms. Every family deserves personal attention, absolute confidentiality, and genuine matchmaking care."
            </p>

            <div className={styles.bioText}>
              <p>
                Unlike other matrimony platforms that simply help you find a partner, Happy Life Matrimony stays with you even after the connection. We believe our responsibility doesn&apos;t end when you find your match. We&apos;re here to support, guide, and help you build a truly happy life together. ❤️
              </p>
            </div>

            {/* Credibility Points */}
            <div className={styles.credibilityList} role="list" aria-label="Founder commitments">
              {credibilityPoints.map((point) => {
                const IconComponent = point.icon;
                return (
                  <div key={point.label} className={styles.credibilityItem} role="listitem">
                    <IconComponent size={16} className={styles.pointIcon} />
                    <span>{point.label}</span>
                  </div>
                );
              })}
            </div>

            {/* WhatsApp Contact Action */}
            <a
              href="https://wa.me/918688971732?text=Hey%20hii%20!%20Can%20u%20help%20me"
              className={`btn btn-outline ${styles.contactBtn}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Send a direct WhatsApp message to the founder"
            >
              <MessageSquare size={16} />
              <span>Message Me on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
