"use client";

import { useEffect, useRef } from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import styles from "./MapSection.module.css";

const LAT = 17.443939;
const LNG = 78.448440;
const MAPS_URL = `https://www.google.com/maps?q=${LAT},${LNG}&z=15&hl=en`;
const EMBED_URL = `https://maps.google.com/maps?q=${LAT},${LNG}&t=&z=15&ie=UTF8&iwloc=&output=embed&hl=en`;

export default function MapSection() {
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
      id="location"
      aria-labelledby="map-heading"
    >
      <div className="container">
        <div className={styles.inner}>
          {/* Left Column: Location Details */}
          <div className={`${styles.infoCol} reveal`}>
            <div className="section-eyebrow">Visit or Connect</div>
            <h2 id="map-heading" className={styles.heading}>Our Location</h2>
            <p className={styles.subhead}>
              We are based in Hyderabad, Telangana. Feel free to call us or schedule a personal visit.
            </p>

            <div className={styles.infoItems} role="list" aria-label="Office details">
              {/* Address */}
              <div className={styles.infoItem} role="listitem">
                <div className={styles.infoIcon} aria-hidden="true">
                  <MapPin size={18} strokeWidth={2} />
                </div>
                <div className={styles.infoText}>
                  <strong>Address</strong>
                  <span>Hyderabad, Telangana, India</span>
                </div>
              </div>

              {/* Phone */}
              <div className={styles.infoItem} role="listitem">
                <div className={styles.infoIcon} aria-hidden="true">
                  <Phone size={18} strokeWidth={2} />
                </div>
                <div className={styles.infoText}>
                  <strong>Phone</strong>
                  <a href="tel:+918688971732" className={styles.phoneLink}>
                    +91 86889 71732
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className={styles.infoItem} role="listitem">
                <div className={styles.infoIcon} aria-hidden="true">
                  <Clock size={18} strokeWidth={2} />
                </div>
                <div className={styles.infoText}>
                  <strong>Business Hours</strong>
                  <span>Mon – Sun · 9:00 AM – 9:00 PM</span>
                </div>
              </div>
            </div>

            {/* Directions Action */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${styles.directionsBtn}`}
              aria-label="Get directions to Happy Life Matrimony on Google Maps"
            >
              <span>Get Directions</span>
              <Navigation size={16} />
            </a>
          </div>

          {/* Right Column: Embedded Map */}
          <div className={`${styles.mapCol} reveal reveal-delay-2`}>
            <div className={styles.mapWrapper}>
              <iframe
                src={EMBED_URL}
                title="Happy Life Matrimony location on Google Maps"
                className={styles.iframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                aria-label="Google Map showing office location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
