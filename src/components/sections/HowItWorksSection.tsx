"use client";

import { useEffect, useRef } from "react";
import { UserPlus, PhoneCall, UserCheck, Heart } from "lucide-react";
import styles from "./HowItWorksSection.module.css";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Profile",
    desc: "Fill in basic details like name, gender, and who you're looking for in under two minutes.",
  },
  {
    number: "02",
    icon: PhoneCall,
    title: "Verify Phone",
    desc: "Confirm your mobile number with a secure OTP verification step to safeguard your account.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Profile Review",
    desc: "Our team personally reviews your preferences, maintaining the safety of our matched network.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Suitable Match",
    desc: "We manually identify compatible matches and reach out to you personally to guide your journey.",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.active);
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
      id="how-it-works"
      aria-labelledby="hiw-heading"
    >
      <div className="container">
        {/* Header */}
        <div className={`${styles.header} reveal`}>
          <div className="section-eyebrow">The Matrimonial Journey</div>
          <h2 id="hiw-heading" className={styles.heading}>
            How It <span className="accent-serif">Works</span>
          </h2>
          <p className={styles.subhead}>
            A thoughtful, personal matchmaking experience built around privacy and care.
          </p>
        </div>

        {/* Journey Timeline */}
        <div className={styles.journeyContainer}>
          {/* Animated Connecting Line */}
          <div className={styles.connectingLineContainer} aria-hidden="true">
            <div className={styles.connectingLine} />
          </div>

          <div className={styles.steps} role="list" aria-label="Process steps">
            {steps.map((step, i) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.number}
                  className={`${styles.step} reveal reveal-delay-${i + 1}`}
                  role="listitem"
                >
                  <div className={styles.stepMarkerContainer}>
                    <div className={styles.stepNum} aria-label={`Step ${step.number}`}>
                      {step.number}
                    </div>
                    <div className={styles.stepIconWrapper}>
                      <IconComponent size={20} className={styles.stepIcon} />
                    </div>
                  </div>

                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`${styles.cta} reveal`}>
          <a href="#hero-form" className="btn btn-primary btn-lg">
            Start Your Registration
          </a>
          <p className={styles.ctaNote}>Free Registration • Private Network • Direct Support</p>
        </div>
      </div>
    </section>
  );
}
