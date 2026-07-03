import Link from "next/link";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { brand, navItems } from "@/components/site-data";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-stone-200/80 bg-[oklch(97%_0.018_86)]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="ไว้ใจช่าง home">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-[oklch(31%_0.08_151)] text-[oklch(97%_0.018_86)]">
            <ShieldCheck size={22} />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-black tracking-tight text-stone-950">
              {brand.name}
            </span>
            <span className="block truncate text-xs font-semibold text-stone-600">
              {brand.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-bold text-stone-700 transition hover:bg-stone-200/70 hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/request"
          className="hidden rounded-md bg-[oklch(56%_0.15_76)] px-4 py-2 text-sm font-black text-stone-950 shadow-[0_8px_0_oklch(31%_0.08_151)] transition hover:translate-y-0.5 hover:shadow-[0_6px_0_oklch(31%_0.08_151)] sm:inline-flex"
        >
          นัดสำรวจงาน
        </Link>
      </nav>
    </header>
  );
}

export function MobileActionBar() {
  return (
    <div className="no-print fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-[oklch(98%_0.014_86)] p-3 shadow-[0_-12px_30px_rgba(41,37,36,0.12)] lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <Link
          href="/track"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-stone-100 px-3 py-3 text-sm font-black text-stone-900"
        >
          <Phone size={18} />
          ติดตามงาน
        </Link>
        <Link
          href="/request"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[oklch(31%_0.08_151)] px-3 py-3 text-sm font-black text-[oklch(97%_0.018_86)]"
        >
          <MessageCircle size={18} />
          นัดสำรวจงาน
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="no-print bg-[oklch(24%_0.045_151)] px-4 pb-28 pt-10 text-[oklch(96%_0.018_86)] sm:px-6 lg:pb-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-2xl font-black">{brand.customerName}</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-stone-200">
            {brand.tagline} {brand.service}
            สำหรับเจ้าของบ้าน คอนโด และร้านค้าขนาดเล็ก
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-stone-300">
            ให้บริการโดย {brand.legalName}
          </p>
        </div>
        <div className="grid gap-2 text-sm font-bold text-stone-200">
          <span>LINE: {brand.line}</span>
          <span>โทร: {brand.phone}</span>
          <span>พื้นที่ให้บริการ: กรุงเทพและปริมณฑล</span>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-black text-[oklch(43%_0.13_76)]">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
          {title}
        </h1>
        <div className="mt-5 max-w-2xl text-base leading-8 text-stone-700">
          {children}
        </div>
      </div>
    </section>
  );
}
