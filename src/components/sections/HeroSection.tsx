"use client";

import Image from "next/image";
import { ShieldCheck, Users, CheckCircle2, Sparkles } from "lucide-react";
import ProfileForm from "@/components/forms/ProfileForm";
import styles from "./HeroSection.module.css";

const badges = [
  { icon: ShieldCheck, text: "100% Private" },
  { icon: Users, text: "Personal Attention" },
  { icon: CheckCircle2, text: "Verified Profiles" },
  { icon: Sparkles, text: "Free Registration" },
];

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Happy Life Matrimony Introduction" id="hero">
      {/* Editorial Decorative Background */}
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.glowOverlay} />
        <div className={styles.paperTexture} />
      </div>

      <div className={`${styles.inner} container`}>
        {/* Left Column: Editorial Value Proposition */}
        <div className={styles.editorial}>
          {/* Eyebrow Label */}
          <div className={`${styles.eyebrow} ${styles.animateFadeUp}`}>
            <span className={styles.eyebrowLine} />
            <span>Personal Matchmaking</span>
          </div>

          {/* Headline */}
          <h1 className={`${styles.headline} ${styles.animateHeadline}`}>
            Find someone who
            <br />
            feels like <span className="accent-serif">home.</span>
          </h1>

          {/* Warm, Concise Supporting Copy */}
          <p className={`${styles.subhead} ${styles.animateText}`}>
            Happy Life Matrimony is a personal, privacy-first matchmaking service in Hyderabad. 
            We build genuine connections based on care, shared values, and mutual respect.
          </p>

          {/* Trust Indicators (Refined Lightweight Badges) */}
          <div className={`${styles.badges} ${styles.animateBadges}`} role="list" aria-label="Key features">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={badge.text} className={styles.badge} role="listitem">
                  <Icon size={14} className={styles.badgeIcon} />
                  <span>{badge.text}</span>
                </div>
              );
            })}
          </div>

          {/* Editorial Image Collage */}
          <div className={`${styles.collage} ${styles.animateCollage}`} aria-hidden="true">
            <div className={styles.imgMain}>
              <Image
                src="/wedding-1.jpg"
                alt="Indian couple celebrating after wedding ceremony"
                width={500}
                height={340}
                className={styles.img}
                priority
              />
              <div className={styles.imgOverlay} />
            </div>
            <div className={styles.imgStack}>
              <div className={styles.imgSm}>
                <Image
                  src="/wedding-3.jpg"
                  alt="Indian bride and groom holding hands with mehendi"
                  width={280}
                  height={160}
                  className={styles.img}
                />
                <div className={styles.imgOverlay} />
              </div>
              <div className={styles.imgSm}>
                <Image
                  src="/wedding-4.jpg"
                  alt="Traditional saree knot tying ceremony detail"
                  width={280}
                  height={160}
                  className={styles.img}
                />
                <div className={styles.imgOverlay} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Card */}
        <div className={`${styles.formCol} ${styles.animateForm}`} id="hero-form">
          <ProfileForm variant="hero" id="hero-profile-form" />
        </div>
      </div>
    </section>
  );
}
