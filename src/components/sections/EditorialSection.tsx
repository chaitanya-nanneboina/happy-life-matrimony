"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./EditorialSection.module.css";

const images = [
  {
    src: "/wedding-2.jpg",
    alt: "Traditional South Indian wedding ceremony with family",
    caption: "Sacred Ceremony",
    sub: "Sacred Rituals",
  },
  {
    src: "/wedding-3.jpg",
    alt: "Indian bride and groom holding hands with mehendi",
    caption: "Bridal Grace",
    sub: "Timeless Elegance",
  },
  {
    src: "/wedding-1.jpg",
    alt: "Indian couple celebrating with flower petals after wedding",
    caption: "Festive Joy",
    sub: "Joyous Union",
  },
  {
    src: "/wedding-4.jpg",
    alt: "Traditional saree knot tying ceremony — a sacred promise",
    caption: "The Promise",
    sub: "A New Beginning",
  },
];

export default function EditorialSection() {
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
      aria-labelledby="editorial-heading"
    >
      <div className="container">
        {/* Editorial Section Header */}
        <div className={`${styles.header} reveal`}>
          <div className="section-eyebrow">Visual Narratives</div>
          <h2 id="editorial-heading" className={styles.heading}>
            Every Wedding is a <span className="accent-serif">Story</span>
          </h2>
          <p className={styles.subhead}>
            Honoring the rich heritage, traditions, and timeless values that bring two souls and families together.
          </p>
        </div>

        {/* Asymmetric Editorial Collage Layout */}
        <div className={styles.collageGrid} aria-label="Indian wedding photography gallery">
          {/* Main Large Image (Left Column) */}
          <div className={`${styles.imageBlock} ${styles.largeBlock} reveal`}>
            <div className={styles.imageInner}>
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={700}
                height={500}
                className={styles.img}
                loading="lazy"
              />
              <div className={styles.overlay} />
              <div className={styles.contentOverlay}>
                <span className={styles.cardSub}>{images[0].sub}</span>
                <h3 className={styles.cardTitle}>
                  {images[0].caption}
                  <ArrowUpRight size={14} className={styles.arrow} />
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column Stack */}
          <div className={styles.rightStack}>
            {/* Tall Vertical Image */}
            <div className={`${styles.imageBlock} ${styles.tallBlock} reveal reveal-delay-1`}>
              <div className={styles.imageInner}>
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  width={500}
                  height={580}
                  className={styles.img}
                  loading="lazy"
                />
                <div className={styles.overlay} />
                <div className={styles.contentOverlay}>
                  <span className={styles.cardSub}>{images[1].sub}</span>
                  <h3 className={styles.cardTitle}>
                    {images[1].caption}
                    <ArrowUpRight size={14} className={styles.arrow} />
                  </h3>
                </div>
              </div>
            </div>

            {/* Bottom Row (Double Small Images) */}
            <div className={styles.bottomRow}>
              {/* Small 1 */}
              <div className={`${styles.imageBlock} ${styles.smallBlock} reveal reveal-delay-2`}>
                <div className={styles.imageInner}>
                  <Image
                    src={images[2].src}
                    alt={images[2].alt}
                    width={500}
                    height={250}
                    className={styles.img}
                    loading="lazy"
                  />
                  <div className={styles.overlay} />
                  <div className={styles.contentOverlay}>
                    <span className={styles.cardSub}>{images[2].sub}</span>
                    <h3 className={styles.cardTitle}>
                      {images[2].caption}
                      <ArrowUpRight size={14} className={styles.arrow} />
                    </h3>
                  </div>
                </div>
              </div>

              {/* Small 2 */}
              <div className={`${styles.imageBlock} ${styles.smallBlock} reveal reveal-delay-3`}>
                <div className={styles.imageInner}>
                  <Image
                    src={images[3].src}
                    alt={images[3].alt}
                    width={500}
                    height={250}
                    className={styles.img}
                    loading="lazy"
                  />
                  <div className={styles.overlay} />
                  <div className={styles.contentOverlay}>
                    <span className={styles.cardSub}>{images[3].sub}</span>
                    <h3 className={styles.cardTitle}>
                      {images[3].caption}
                      <ArrowUpRight size={14} className={styles.arrow} />
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Editorial Quote Block */}
        <blockquote className={`${styles.quoteBlock} reveal`}>
          <p className={styles.quoteText}>
            "A successful marriage requires falling in love many times, always with the same person."
          </p>
          <cite className={styles.quoteAuthor}>— Timeless Matrimonial Blessing</cite>
        </blockquote>
      </div>
    </section>
  );
}
