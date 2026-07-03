import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BriefcaseBusiness,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Clock3,
  DoorOpen,
  Droplets,
  Hammer,
  HelpCircle,
  Home,
  Images,
  MapPin,
  MessageCircle,
  Paintbrush,
  PanelsTopLeft,
  ReceiptText,
  ShieldCheck,
  Star,
  ThumbsUp,
  Trees,
  Umbrella,
  Wrench,
  Zap,
} from "lucide-react";
import { brand, services } from "@/components/site-data";

export const metadata: Metadata = {
  title: "ไว้ใจช่าง | ศูนย์รวมบริการช่างซ่อมบ้าน รีโนเวท ต่อเติม",
  description:
    "ไว้ใจช่าง ศูนย์รวมช่างซ่อมบ้าน รีโนเวท ต่อเติม ระบบไฟ ระบบประปา หลังคา สี และกระเบื้อง นัดสำรวจง่าย ติดตามงานผ่าน LINE",
};

const quickTabs = [
  {
    title: "ซ่อม",
    description: "งานซ่อมแซมทั่วไป ไฟ ประปา หลังคา",
    href: "/services",
    icon: Wrench,
  },
  {
    title: "รีโนเวท",
    description: "ปรับปรุงบ้าน ห้องน้ำ ครัว พื้นที่ใช้งาน",
    href: "/services",
    icon: Paintbrush,
  },
  {
    title: "ติดตั้ง",
    description: "ติดตั้งอุปกรณ์ ระบบไฟ และงานภายในบ้าน",
    href: "/services",
    icon: Hammer,
  },
  {
    title: "ต่อเติม",
    description: "ครัวหลังบ้าน กันสาด ห้องเก็บของ",
    href: "/services",
    icon: Home,
  },
];

const serviceCategories = [
  { title: "รีโนเวทบ้าน", icon: Paintbrush },
  { title: "ต่อเติมบ้าน", icon: Hammer },
  { title: "งานซ่อมแซม", icon: Wrench },
  { title: "ระบบไฟฟ้า", icon: Zap },
  { title: "ระบบประปา", icon: Droplets },
  { title: "หลังคา / รั่วซึม", icon: Umbrella },
  { title: "ทาสี", icon: Paintbrush },
  { title: "ปูกระเบื้อง", icon: PanelsTopLeft },
  { title: "ประตูและหน้าต่าง", icon: DoorOpen },
  { title: "พื้น ผนัง และฝ้าเพดาน", icon: BriefcaseBusiness },
  { title: "ห้องน้ำและครัว", icon: Bath },
  { title: "งานภายนอกบ้าน", icon: Trees },
];

const popularServices = [
  {
    title: "สำรวจงานรั่วซึมหลังคา",
    category: "หลังคา / รั่วซึม",
    price: "เริ่มต้น 500.-",
    unit: "ครั้ง",
    rating: "4.9",
    tone: "from-[oklch(82%_0.08_76)] to-[oklch(95%_0.02_86)]",
  },
  {
    title: "ตรวจระบบไฟภายในบ้าน",
    category: "ระบบไฟฟ้า",
    price: "เริ่มต้น 800.-",
    unit: "ครั้ง",
    rating: "4.8",
    tone: "from-[oklch(82%_0.06_95)] to-[oklch(96%_0.018_86)]",
  },
  {
    title: "ซ่อมท่อน้ำรั่ว / สุขภัณฑ์",
    category: "ระบบประปา",
    price: "เริ่มต้น 700.-",
    unit: "ครั้ง",
    rating: "4.8",
    tone: "from-[oklch(84%_0.06_190)] to-[oklch(96%_0.018_86)]",
  },
  {
    title: "ประเมินงานรีโนเวทบ้าน",
    category: "รีโนเวทบ้าน",
    price: "ประเมินหน้างาน",
    unit: "",
    rating: "4.9",
    tone: "from-[oklch(84%_0.07_151)] to-[oklch(96%_0.018_86)]",
  },
];

const portfolioItems = [
  {
    title: "ซ่อมหลังคารั่ว บ้านเดี่ยว",
    location: "นนทบุรี",
    duration: "1 วัน",
    type: "หลังคา / รั่วซึม",
  },
  {
    title: "รีโนเวทห้องน้ำ",
    location: "กรุงเทพฯ",
    duration: "5 วัน",
    type: "รีโนเวท",
  },
  {
    title: "เดินระบบไฟห้องครัว",
    location: "ปทุมธานี",
    duration: "2 วัน",
    type: "ระบบไฟฟ้า",
  },
];

const whyItems = [
  {
    title: "จองง่าย",
    description: "ส่งข้อมูลงานและรูปหน้างานผ่าน LINE หรือหน้าเว็บได้ทันที",
    icon: CalendarCheck,
  },
  {
    title: "ไม่บานปลาย",
    description: "แจ้งขอบเขตงานและราคาก่อนเริ่มงานทุกครั้ง",
    icon: ReceiptText,
  },
  {
    title: "ช่างคุณภาพ",
    description: "คัดกรองทีมช่างและติดตามคุณภาพงานอย่างต่อเนื่อง",
    icon: ThumbsUp,
  },
  {
    title: "ติดตามงานได้",
    description: "รู้สถานะงาน นัดหมาย และขั้นตอนถัดไปผ่านมือถือ",
    icon: ShieldCheck,
  },
];

const stats = [
  { value: "20+", label: "กลุ่มงานบริการ" },
  { value: "80+", label: "ทีมช่างในเครือข่าย" },
  { value: "1,000+", label: "งานที่ดูแลและส่งมอบ" },
];

const helpLinks = [
  "วิธีนัดสำรวจงาน",
  "การประเมินราคา",
  "คำถามที่พบบ่อย",
  "เงื่อนไขการรับประกัน",
];

const trustBadges = [
  "ช่างผ่านการคัดกรอง",
  "แจ้งราคาก่อนเริ่มงาน",
  "ติดตามงานผ่าน LINE",
  "กรุงเทพและปริมณฑล",
];

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden px-4 pb-24 pt-5 sm:px-6 lg:pb-28 lg:pt-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(96%_0.018_86),oklch(99%_0.004_86))]" />
        <div className="mx-auto max-w-7xl">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-[oklch(30%_0.09_236)] px-5 py-7 text-[oklch(98%_0.014_86)] shadow-[0_28px_85px_oklch(42%_0.045_76_/_0.22)] sm:px-8 lg:min-h-[430px] lg:px-12 lg:py-10">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_10%,oklch(84%_0.08_230_/_0.45),transparent_34%),radial-gradient(circle_at_82%_30%,oklch(68%_0.11_236_/_0.35),transparent_28%),linear-gradient(135deg,oklch(42%_0.11_236),oklch(21%_0.06_236)_58%,oklch(18%_0.05_151))]" />
            <div className="absolute inset-0 -z-10 opacity-35 [background-image:linear-gradient(115deg,transparent_0_46%,oklch(98%_0.014_86_/_0.2)_47%,transparent_48%_100%),linear-gradient(100deg,transparent_0_58%,oklch(84%_0.12_76_/_0.24)_59%,transparent_60%_100%)] [background-size:120px_120px,190px_190px]" />

            <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full bg-[oklch(98%_0.014_86_/_0.92)] px-4 py-2 text-sm font-black text-[oklch(30%_0.09_236)]">
                  โปรสำรวจหน้างานสำหรับเจ้าของบ้าน
                </p>
                <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl lg:text-7xl">
                  ซ่อมบ้าน รีโนเวท ต่อเติม
                  <span className="block text-[oklch(70%_0.18_35)]">ให้ไว้ใจช่างดูแล</span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-blue-50">
                  งานหลังคารั่ว ระบบไฟ ประปา ห้องน้ำ ครัว และรีโนเวท
                  นัดสำรวจง่าย แจ้งราคาก่อนเริ่มงาน
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-[220px_1fr] sm:items-center">
                  <div className="rounded-3xl bg-[oklch(98%_0.014_86)] p-4 text-stone-950 shadow-[0_18px_48px_oklch(15%_0.04_236_/_0.28)]">
                    <p className="text-sm font-black text-[oklch(30%_0.09_236)]">ค่าสำรวจ เริ่มเพียง</p>
                    <p className="mt-1 text-6xl font-black leading-none text-[oklch(62%_0.19_35)]">
                      699.-
                    </p>
                    <div className="mt-3 inline-flex overflow-hidden rounded-xl border border-stone-200 text-sm font-black">
                      <span className="bg-[oklch(62%_0.19_35)] px-3 py-2 text-white">CODE</span>
                      <span className="px-3 py-2 text-[oklch(30%_0.09_236)]">WAIJAI100</span>
                    </div>
                  </div>

                  <div>
                    <div className="grid gap-3 sm:flex sm:flex-wrap">
                      <Link
                        href="/request"
                        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[oklch(84%_0.12_76)] px-5 py-3 text-base font-black text-stone-950"
                      >
                        นัดสำรวจงาน
                        <ArrowRight size={18} />
                      </Link>
                      <a
                        href={brand.lineChatUrl}
                        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-base font-black text-white"
                      >
                        <MessageCircle size={18} />
                        แชท LINE
                      </a>
                      <a
                        href={`tel:${brand.phone}`}
                        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-base font-black text-white"
                      >
                        {brand.phone}
                      </a>
                    </div>
                    <p className="mt-3 text-xs font-bold text-blue-100">
                      *โปรโมชันตัวอย่างสำหรับช่วงเปิดระบบ เงื่อนไขเป็นไปตามที่บริษัทกำหนด
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[280px] lg:min-h-[370px]">
                <div className="absolute inset-x-0 bottom-0 overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-[0_24px_80px_oklch(15%_0.04_236_/_0.28)]">
                  <Image
                    src="/images/trust-build-hero.png"
                    alt="ทีมช่างไว้ใจช่างพร้อมสำรวจหน้างาน"
                    width={1536}
                    height={1024}
                    priority
                    className="aspect-[4/3] h-auto w-full object-cover"
                  />
                </div>
                <div className="absolute right-2 top-3 rounded-2xl bg-[oklch(98%_0.014_86)] px-4 py-3 text-sm font-black text-[oklch(30%_0.09_236)] shadow-xl">
                  โดยทีมช่างคัดกรอง
                </div>
                <div className="absolute bottom-4 left-4 rounded-2xl bg-[oklch(98%_0.014_86)] px-4 py-3 text-sm font-black text-[oklch(30%_0.09_236)] shadow-xl">
                  ติดตามสถานะผ่านมือถือ
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-4 -bottom-12 sm:inset-x-6">
          <div className="mx-auto max-w-7xl overflow-x-auto rounded-3xl border border-stone-200 bg-[oklch(99%_0.008_86)] p-3 shadow-[0_20px_55px_oklch(42%_0.045_76_/_0.16)]">
            <div className="grid min-w-[760px] grid-cols-4 gap-3 lg:min-w-0">
              {quickTabs.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-start gap-3 rounded-2xl border border-stone-200 p-4 transition hover:-translate-y-0.5 hover:border-[oklch(56%_0.15_76)] hover:bg-[oklch(96%_0.025_86)]"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[oklch(84%_0.12_76)] text-[oklch(24%_0.07_151)]">
                      <Icon size={24} />
                    </span>
                    <span>
                      <span className="block text-lg font-black text-stone-950">{item.title}</span>
                      <span className="mt-1 block text-sm font-semibold leading-6 text-stone-600">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[oklch(99%_0.004_86)] px-4 pb-16 pt-20 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black text-[oklch(43%_0.13_76)]">
              ศูนย์รวมบริการช่าง
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
              ไว้ใจช่าง{" "}
              <span className="text-[oklch(56%_0.15_35)]">ตัวกลางหาช่างคุณภาพ</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-stone-600">
              ศูนย์รวมช่างคุณภาพและบริการดูแลบ้านครบวงจร นัดสำรวจง่าย
              แจ้งราคาก่อนเริ่ม และติดตามสถานะงานผ่านมือถือ
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-3 gap-x-3 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
            {serviceCategories.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={`/request?service=${encodeURIComponent(item.title)}`}
                  className="group text-center"
                >
                  <span className="mx-auto grid size-20 place-items-center rounded-full bg-[oklch(96%_0.012_86)] text-[oklch(31%_0.08_151)] shadow-[0_10px_28px_oklch(42%_0.045_76_/_0.08)] ring-1 ring-stone-200 transition group-hover:-translate-y-1 group-hover:bg-[oklch(84%_0.12_76)] group-hover:text-[oklch(20%_0.05_151)] group-hover:shadow-[0_16px_36px_oklch(42%_0.045_76_/_0.14)]">
                    <Icon size={30} strokeWidth={2.2} />
                  </span>
                  <span className="mx-auto mt-4 block max-w-32 text-sm font-bold leading-6 text-[oklch(29%_0.06_230)] transition group-hover:text-[oklch(31%_0.08_151)]">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="บริการยอดนิยม"
            title="งานซ่อมและดูแลบ้านที่ลูกค้านิยมเรียกใช้"
            subtitle="เริ่มจากงานสำรวจขนาดเล็ก ไปจนถึงประเมินงานรีโนเวทเต็มรูปแบบ"
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {popularServices.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-stone-200 bg-[oklch(99%_0.008_86)] shadow-[0_16px_45px_oklch(42%_0.045_76_/_0.1)]"
              >
                <div className={`h-36 bg-gradient-to-br ${item.tone} p-4`}>
                  <span className="rounded-full bg-[oklch(31%_0.08_151)] px-3 py-1 text-xs font-black text-[oklch(98%_0.014_86)]">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black leading-7 text-stone-950">{item.title}</h3>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xl font-black text-[oklch(31%_0.08_151)]">
                        {item.price}
                      </p>
                      {item.unit && (
                        <p className="text-xs font-bold text-stone-500">ต่อ{item.unit}</p>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[oklch(96%_0.025_86)] px-3 py-1 text-sm font-black text-stone-800">
                      <Star size={15} className="fill-[oklch(84%_0.12_76)] text-[oklch(84%_0.12_76)]" />
                      {item.rating}
                    </span>
                  </div>
                  <Link
                    href="/request"
                    className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[oklch(31%_0.08_151)] px-4 text-sm font-black text-[oklch(98%_0.014_86)]"
                  >
                    นัดสำรวจ
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-3xl bg-[oklch(20%_0.05_151)] p-6 text-[oklch(98%_0.014_86)] shadow-[0_24px_80px_oklch(42%_0.045_76_/_0.18)] lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <p className="text-sm font-black text-[oklch(84%_0.12_76)]">บริการสำหรับบ้านและธุรกิจ</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              ไว้ใจช่าง สำหรับเจ้าของบ้านและธุรกิจขนาดเล็ก
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-stone-200">
              ดูแลงานซ่อม ติดตั้ง รีโนเวท และบำรุงรักษาแบบครบวงจร
              พร้อมทีมงานที่ติดตามสถานะและสื่อสารชัดเจน
            </p>
          </div>
          <div className="grid content-center gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[oklch(84%_0.12_76)] px-5 font-black text-stone-950"
            >
              ดูบริการทั้งหมด
            </Link>
            <a
              href={brand.lineChatUrl}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-stone-500 px-5 font-black text-[oklch(98%_0.014_86)]"
            >
              แชทสอบถาม
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="ผลงานที่ผ่านมา"
            title="มั่นใจงานจริงด้วยตัวอย่างงานจากทีมช่างของเรา"
            subtitle="ตัวอย่างงานซ่อม รีโนเวท และติดตั้งในพื้นที่กรุงเทพและปริมณฑล"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {portfolioItems.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-stone-200 bg-[oklch(99%_0.008_86)] shadow-[0_16px_45px_oklch(42%_0.045_76_/_0.1)]"
              >
                <div className="h-40 bg-[linear-gradient(135deg,oklch(84%_0.12_76_/_0.75),oklch(31%_0.08_151_/_0.82))]" />
                <div className="p-5">
                  <p className="text-xs font-black text-[oklch(43%_0.13_76)]">{item.type}</p>
                  <h3 className="mt-2 text-xl font-black text-stone-950">{item.title}</h3>
                  <div className="mt-4 grid gap-2 text-sm font-bold text-stone-600">
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} />
                      {item.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={16} />
                      {item.duration}
                    </span>
                  </div>
                  <Link
                    href="/portfolio"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[oklch(31%_0.08_151)]"
                  >
                    อ่านเพิ่มเติม
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <Link
            href="/portfolio"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl border border-stone-300 bg-stone-100 px-5 font-black text-stone-950"
          >
            ดูผลงานเพิ่มเติม
          </Link>
        </div>
      </section>

      <section className="section-band px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="ทำไมต้องเลือกเรา"
              title="ทำไมต้อง ไว้ใจช่าง"
              subtitle="ให้การซ่อม ต่อเติม และรีโนเวทบ้านเป็นเรื่องง่ายและสบายใจขึ้น"
            />
            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((item) => (
                <div
                  key={item.value}
                  className="rounded-3xl border border-stone-200 bg-[oklch(99%_0.008_86)] p-4 text-center shadow-[0_12px_32px_oklch(42%_0.045_76_/_0.08)]"
                >
                  <p className="text-3xl font-black text-[oklch(56%_0.15_76)]">{item.value}</p>
                  <p className="mt-2 text-xs font-black leading-5 text-stone-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-stone-200 bg-[oklch(99%_0.008_86)] p-5 shadow-[0_16px_45px_oklch(42%_0.045_76_/_0.1)]"
                >
                  <span className="grid size-14 place-items-center rounded-full border border-[oklch(84%_0.12_76)] text-[oklch(56%_0.15_76)]">
                    <Icon size={25} />
                  </span>
                  <h3 className="mt-4 text-xl font-black text-stone-950">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {helpLinks.map((item) => (
            <Link
              key={item}
              href="/line"
              className="inline-flex items-center gap-3 rounded-2xl border border-stone-200 bg-[oklch(99%_0.008_86)] p-4 font-black text-[oklch(31%_0.08_151)] shadow-[0_10px_25px_oklch(42%_0.045_76_/_0.08)]"
            >
              <HelpCircle size={20} className="text-[oklch(56%_0.15_76)]" />
              {item}
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto rounded-3xl bg-[oklch(31%_0.08_151)] p-6 text-[oklch(98%_0.014_86)] shadow-[0_24px_80px_oklch(42%_0.045_76_/_0.2)] sm:max-w-7xl sm:p-8">
          <Home size={30} className="text-[oklch(84%_0.12_76)]" />
          <h2 className="mt-4 text-3xl font-black tracking-tight">
            พร้อมนัดสำรวจหน้างานหรือยัง
          </h2>
          <p className="mt-3 max-w-2xl leading-8 text-stone-200">
            ส่งรายละเอียดงาน รูปหน้างาน และพื้นที่ให้บริการ
            ทีมไว้ใจช่างจะติดต่อกลับเพื่อจัดคิวสำรวจ
          </p>
          <Link
            href="/request"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[oklch(84%_0.12_76)] px-5 py-3 font-black text-stone-950"
          >
            นัดสำรวจหน้างาน
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black text-[oklch(43%_0.13_76)]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-stone-700">{subtitle}</p>
    </div>
  );
}
