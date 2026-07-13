"use client"

import { useId, useState } from "react"

import { faqs } from "@/data/homepage"

import Reveal from "@/components/site/shared/Reveal"

import styles from "../site-home.module.css"

type FaqAccordionItemProps = {
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
  question: string
}

function FaqAccordionItem({
  answer,
  index,
  isOpen,
  onToggle,
  question,
}: FaqAccordionItemProps) {
  const reactId = useId()
  const buttonId = `faq-trigger-${reactId}-${index}`
  const panelId = `faq-panel-${reactId}-${index}`

  return (
    <Reveal
      as="article"
      className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
      delay={index * 70}
      effect="fade-up"
    >
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className={styles.faqButton}
        id={buttonId}
        onClick={onToggle}
        type="button"
      >
        <span>{question}</span>
        <span className={`${styles.faqIcon} ${isOpen ? styles.faqIconOpen : ""}`}>
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        aria-labelledby={buttonId}
        className={`${styles.faqAnswerWrap} ${isOpen ? styles.faqAnswerWrapOpen : ""}`}
        id={panelId}
        role="region"
      >
        <div className={styles.faqAnswerInner}>
          <p className={styles.faqAnswer}>{answer}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className={`${styles.section} ${styles.sectionMuted}`} id="faq">
      <div className={styles.container}>
        <Reveal className={styles.sectionHeader} effect="fade-up">
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            سوالات متداول
          </span>
          <h2 className={styles.sectionTitle}>پاسخ‌های سریع برای شروع همکاری</h2>
        </Reveal>

        <div className={styles.faqLayout}>
          <Reveal as="aside" className={styles.faqAside} effect="slide-inline-start">
            <span className={styles.whyUsValuePill}>
              پرسش‌های پرتکرار پیش از شروع پروژه
            </span>
            <h3 className={styles.whyUsLeadTitle}>اگر هنوز نقطه شروع پروژه روشن نیست</h3>
            <p className={styles.faqAsideText}>
              پاسخ این پرسش‌های متداول می‌تواند مسیر اولیه همکاری را شفاف‌تر
              کند. اگر هنوز درباره آزمون، خدمات آموزشی یا دریافت تاییدیه پرسشی
              دارید، از همین صفحه با ما در تماس باشید.
            </p>
            <div className={styles.faqAsideActions}>
              <a className={styles.buttonPrimary} href="#contact">
                دریافت مشاوره
              </a>
              <a className={styles.buttonGhost} href="/contact">
                تماس با ما
              </a>
            </div>
          </Reveal>

          <div className={styles.faqList}>
            {faqs.map((item, index) => {
              const isOpen = openIndex === index

              return (
                <FaqAccordionItem
                  answer={item.answer}
                  index={index}
                  isOpen={isOpen}
                  key={item.question}
                  onToggle={() => setOpenIndex(isOpen ? -1 : index)}
                  question={item.question}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
