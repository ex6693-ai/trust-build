import Link from "next/link";
import { MessageCircle, Phone, Search, ShieldCheck, Tag } from "lucide-react";
import { brand, navItems } from "@/components/site-data";

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-stone-200/80 bg-[oklch(98%_0.014_86)]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="ไว้ใจช่าง home">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[oklch(31%_0.08_151)] text-[oklch(97%_0.018_86)]">
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

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-bold text-stone-700 transition hover:bg-stone-200/70 hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <form className="hidden min-w-[280px] flex-1 items-center rounded-2xl border border-stone-300 bg-[oklch(99%_0.008_86)] p-1 shadow-[0_8px_24px_oklch(42%_0.045_76_/_0.08)] lg:flex">
          <Search className="ml-3 shrink-0 text-stone-500" size={18} />
          <input
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-semibold text-stone-800 outline-none placeholder:text-stone-400"
            placeholder="ค้นหาบริการ เช่น ซ่อมไฟ รั่วซึม รีโนเวท"
            aria-label="ค้นหาบริการ"
          />
          <button
            type="submit"
            className="rounded-xl bg-[oklch(84%_0.12_76)] px-4 py-2 text-sm font-black text-stone-950"
          >
            ค้นหา
          </button>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-black text-[oklch(31%_0.08_151)] hover:bg-stone-200/70"
          >
            <Tag size={16} />
            โปรโมชั่น
          </Link>
          <a
            href={brand.lineChatUrl}
            className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-black text-stone-700 hover:bg-stone-200/70"
          >
            <MessageCircle size={16} />
            แชท LINE
          </a>
          <a
            href={`tel:${brand.phone}`}
            className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-black text-stone-700 hover:bg-stone-200/70"
          >
            <Phone size={16} />
            {brand.phone}
          </a>
        </div>

        <Link
          href="/request"
          className="hidden rounded-xl bg-[oklch(56%_0.15_76)] px-4 py-2 text-sm font-black text-stone-950 shadow-[0_8px_0_oklch(31%_0.08_151)] transition hover:translate-y-0.5 hover:shadow-[0_6px_0_oklch(31%_0.08_151)] sm:inline-flex"
        >
          นัดสำรวจ
        </Link>
      </nav>
      <div className="mx-auto px-4 pb-3 sm:px-6 lg:hidden">
        <form className="flex items-center rounded-2xl border border-stone-300 bg-[oklch(99%_0.008_86)] p-1 shadow-[0_8px_24px_oklch(42%_0.045_76_/_0.08)]">
          <Search className="ml-3 shrink-0 text-stone-500" size={18} />
          <input
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-semibold text-stone-800 outline-none placeholder:text-stone-400"
            placeholder="ค้นหาบริการ เช่น ซ่อมไฟ รั่วซึม"
            aria-label="ค้นหาบริการบนมือถือ"
          />
          <button
            type="submit"
            className="rounded-xl bg-[oklch(84%_0.12_76)] px-4 py-2 text-sm font-black text-stone-950"
          >
            ค้นหา
          </button>
        </form>
      </div>
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
  const columns = [
    {
      title: "บริการ",
      links: [
        { label: "บริการทั้งหมด", href: "/services" },
        { label: "นัดสำรวจงาน", href: "/request" },
        { label: "ผลงานที่ผ่านมา", href: "/portfolio" },
      ],
    },
    {
      title: "ลูกค้า",
      links: [
        { label: "ติดตามงาน", href: "/track" },
        { label: "วิธีนัดสำรวจงาน", href: "/line" },
        { label: "คำถามที่พบบ่อย", href: "/line" },
      ],
    },
    {
      title: "ติดต่อเรา",
      links: [
        { label: "แชท LINE", href: brand.lineChatUrl },
        { label: `โทร ${brand.phone}`, href: `tel:${brand.phone}` },
        { label: "พื้นที่ให้บริการ", href: "/services" },
      ],
    },
  ];

  return (
    <footer className="no-print bg-[oklch(20%_0.05_151)] px-4 pb-28 pt-12 text-[oklch(96%_0.018_86)] sm:px-6 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.25fr_1.75fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-[oklch(84%_0.12_76)] text-[oklch(20%_0.05_151)]">
              <ShieldCheck size={24} />
            </span>
            <p className="text-2xl font-black">{brand.customerName}</p>
          </div>
          <p className="mt-2 max-w-xl text-sm leading-7 text-stone-200">
            {brand.tagline} {brand.service}
            สำหรับเจ้าของบ้าน คอนโด และร้านค้าขนาดเล็ก
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-stone-300">
            ให้บริการโดย {brand.legalName}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="font-black text-[oklch(84%_0.12_76)]">{column.title}</p>
              <div className="mt-4 grid gap-3 text-sm font-bold text-stone-200">
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith("http") || link.href.startsWith("tel:");
                  return isExternal ? (
                    <a key={link.label} href={link.href} className="hover:text-[oklch(84%_0.12_76)]">
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.label} href={link.href} className="hover:text-[oklch(84%_0.12_76)]">
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
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
