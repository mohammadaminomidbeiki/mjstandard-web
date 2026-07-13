"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { companyProfile } from "@/data/company"
import { homepageAssets } from "@/data/homepage"
import { primaryNavigation } from "@/data/navigation"

import ThemeToggle from "@/components/site/shared/ThemeToggle"

import styles from "@/components/site/site-home.module.css"

const DESKTOP_BREAKPOINT = 1024

export default function SiteHeader() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { contact } = companyProfile
  const mobilePanelRef = useRef<HTMLElement | null>(null)
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null)

  const closeMobile = useCallback(() => setIsMobileOpen(false), [])

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname],
  )

  /* بستن منو هنگام تغییر مسیر (شامل back/forward مرورگر) */
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  /* قفل اسکرول فقط وقتی منو باز است */
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileOpen])

  /* Escape → بستن منو | ریسایز به دسکتاپ → بستن منو */
  useEffect(() => {
    if (!isMobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobile()
    }

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null

      if (!target) {
        return
      }

      const clickedInsidePanel = mobilePanelRef.current?.contains(target)
      const clickedToggle = mobileToggleRef.current?.contains(target)

      if (!clickedInsidePanel && !clickedToggle) {
        closeMobile()
      }
    }

    const onResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) closeMobile()
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("mousedown", onPointerDown)
    window.addEventListener("touchstart", onPointerDown, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("mousedown", onPointerDown)
      window.removeEventListener("touchstart", onPointerDown)
      window.removeEventListener("resize", onResize)
    }
  }, [isMobileOpen, closeMobile])

  /* حالت اسکرول‌شده برای هدر (پس‌زمینهٔ شیشه‌ای قوی‌تر) */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      <div className={`${styles.container} ${styles.headerSurface}`}>
        <div className={styles.headerInner}>
          <Link className={styles.brand} href="/" onClick={closeMobile}>
            <Image
              src={homepageAssets.logo}
              alt="لوگوی معیارگران جهان"
              className={styles.brandMark}
              priority
            />
            <span className={styles.brandText}>
              <span className={styles.brandTitle}>معیارگران جهان</span>
             
            </span>
          </Link> 

          <nav className={styles.nav} aria-label="ناوبری اصلی">
            <ul className={styles.navList}>
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className={`${styles.navLink} ${isActive(item.href) ? styles.navLinkActive : ""}`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.headerActions}>
            <ThemeToggle />
           
            <button
              aria-controls="mobile-navigation"
              aria-expanded={isMobileOpen}
              aria-label={isMobileOpen ? "بستن منوی موبایل" : "باز کردن منوی موبایل"}
              className={`${styles.mobileToggle} ${isMobileOpen ? styles.mobileToggleOpen : ""}`}
              onClick={() => setIsMobileOpen((open) => !open)}
              ref={mobileToggleRef}
              type="button"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden={!isMobileOpen}
        className={`${styles.mobilePanel} ${isMobileOpen ? styles.mobilePanelOpen : ""}`}
      >
        <button
          aria-label="بستن منوی موبایل"
          className={`${styles.mobileOverlay} ${isMobileOpen ? styles.mobileOverlayVisible : ""}`}
          onClick={closeMobile}
          tabIndex={isMobileOpen ? 0 : -1}
          type="button"
        />

        <nav
          id="mobile-navigation"
          aria-label="ناوبری موبایل"
          className={`${styles.mobileNav} ${isMobileOpen ? styles.mobileNavOpen : ""}`}
          ref={mobilePanelRef}
        >
            <div className={styles.mobileNavActions}>
              <Link className={styles.buttonPrimary} href="/contact" onClick={closeMobile}>
                درخواست مشاوره
              </Link>
              <a className={styles.buttonGhost} href={`tel:${contact.phoneHref}`} onClick={closeMobile}>
                تماس فوری
              </a>
            </div>

            {primaryNavigation.map((item) => (
              <Link
                className={`${styles.mobileNavLink} ${isActive(item.href) ? styles.mobileNavLinkActive : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
                href={item.href}
                key={item.href}
                onClick={closeMobile}
              >
                <span>{item.label}</span>
                <span aria-hidden="true">←</span>
              </Link>
            ))}

            <div className={styles.mobileContactBand}>
              <a className={styles.mobileContactItem} href={`mailto:${contact.email}`}>
                <span>ایمیل</span>
                <bdi className={styles.ltrText} dir="ltr">
                  {contact.email}
                </bdi>
              </a>
              <a className={styles.mobileContactItem} href={`tel:${contact.phoneHref}`}>
                <span>تلفن</span>
                <bdi className={styles.ltrText} dir="ltr">
                  {contact.phoneDisplay}
                </bdi>
              </a>
              <Link className={styles.mobileContactItem} href="/services" onClick={closeMobile}>
                <span>خدمات</span>
                <span>آزمون، آموزش، مشاوره</span>
              </Link>
            </div>
        </nav>
      </div>
    </header>
  )
}
