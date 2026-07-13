export type FooterLinkGroup = {
  title: string;
  links: Array<{
    href: string;
    label: string;
  }>;
};

export const footerSummary =
  "معیارگران جهان، آزمایشگاه تخصصی و مرجع همراهی تولیدکنندگان، واردکنندگان و تیم‌های کنترل کیفیت برای اخذ تاییدیه، ارزیابی انطباق، آموزش و ارتقای کیفیت محصول است.";

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "دسترسی سریع",
    links: [
      { href: "/", label: "خانه" },
      { href: "/about", label: "درباره ما" },
      { href: "/services", label: "خدمات" },
      { href: "/contact", label: "ارتباط با ما" },
    ],
  },
  {
    title: "صفحات تخصصی",
    links: [
      { href: "/projects", label: "پروژه‌ها" },
      { href: "/experts", label: "کارشناسان" },
      { href: "/accreditations", label: "اعتبارنامه‌ها" },
      { href: "/blog", label: "بلاگ" },
    ],
  },
];

export const footerLegalLinks = [
  { href: "/contact", label: "حریم خصوصی" },
  { href: "/contact", label: "شرایط استفاده" },
];
