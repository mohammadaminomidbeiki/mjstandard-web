import Image from "next/image"
import Link from "next/link"

import { homepageAssets } from "@/data/homepage"

import styles from "@/components/site/site-home.module.css"

type HeroAction = {
  href: string
  label: string
  variant?: "primary" | "ghost"
}

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  actions?: HeroAction[]
  imageAlt?: string
}

export default function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  imageAlt = "نمایی از محیط کاری و آزمایشگاهی معیارگران جهان",
}: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} ${styles.innerPageHeroInner}`}>
        <div className={styles.innerPageHeroShell}>
          <div className={styles.innerPageHeroContent}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              {eyebrow}
            </span>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroText}>{description}</p>
            {actions.length > 0 ? (
              <div className={styles.heroActions}>
                {actions.map((action) => (
                  <Link
                    className={action.variant === "ghost" ? styles.buttonGhost : styles.buttonPrimary}
                    href={action.href}
                    key={action.href}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.innerPageHeroVisual}>
          <Image
            alt={imageAlt}
            className={styles.innerPageHeroImage}
            loading="lazy"
            sizes="(max-width: 767px) 100vw, (max-width: 1180px) 90vw, 42vw"
            src={homepageAssets.aboutImage}
          />
        </div>
      </div>
    </section>
  )
}
