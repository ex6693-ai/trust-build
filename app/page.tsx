import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Home,
  Images,
  MessageCircle,
  SearchCheck,
} from "lucide-react";
import { brand, services } from "@/components/site-data";

export const metadata: Metadata = {
  title: "ไว้ใจช่าง | ช่างซ่อม รีโนเวท ต่อเติม ที่ไว้ใจได้",
  description:
    "นัดสำรวจงาน รีโนเวท ต่อเติม ซ่อมแซม ระบบไฟ ระบบประปา หลังคา สี และกระเบื้อง พร้อมติดตามงานผ่าน LINE",
};

const lineMenuLinks = [
  {
    title: "นัดสำรวจงาน",
    description: "ส่งรายละเอียดงานและรูปหน้างานให้ทีมงานประเมินเบื้องต้น",
    href: "/request",
    icon: SearchCheck,
  },
  {
    title: "ติดตามสถานะ",
    description: "ดูความคืบหน้างาน นัดหมาย และขั้นตอนถัดไป",
    href: "/track",
    icon: ClipboardList,
  },
  {
    title: "บริการทั้งหมด",
    description: "ดูหมวดงานซ่อม รีโนเวท ต่อเติม และงานระบบ",
    href: "/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "ผลงานที่ผ่านมา",
    description: "ดูตัวอย่างงานจริง ก่อนหลัง และประเภทงานที่เคยทำ",
    href: "/portfolio",
    icon: Images,
  },
  {
    title: "แชทกับทีมงาน",
    description: "สอบถามรายละเอียดหรือขอให้ทีมงานติดต่อกลับ",
    href: brand.lineChatUrl,
    icon: MessageCircle,
  },
];

const trustBadges = [
  "ช่างผ่านการคัดกรอง",
  "แจ้งราคาก่อนเริ่มงาน",
  "ติดตามสถานะผ่าน LINE",
  "กรุงเทพและปริมณฑล",
];

const processChecklist = [
  "ประเมินเบื้องต้นจากรูปหน้างาน",
  "นัดหมายตามเวลาที่สะดวก",
  "แจ้งขอบเขตงานและราคาก่อนเริ่ม",
  "ติดตามความคืบหน้าผ่านมือถือ",
];

const processSteps = [
  {
    number: "1",
    title: "ส่งข้อมูล",
    description: "แจ้งประเภทงาน พื้นที่ และแนบรูปหน้างาน",
    status: "เริ่มต้นง่าย",
  },
  {
    number: "2",
    title: "นัดสำรวจ",
    description: "ทีมงานติดต่อกลับเพื่อนัดเวลาที่สะดวก",
    status: "ทีมงานติดต่อกลับ",
  },
  {
    number: "3",
    title: "เสนอราคา",
    description: "รับใบเสนอราคาพร้อมขอบเขตงานชัดเจน",
    status: "โปร่งใส",
  },
  {
    number: "4",
    title: "เริ่มงาน",
    description: "เริ่มงานตามคิว พร้อมอัปเดตความคืบหน้า",
    status: "ติดตามได้",
  },
  {
    number: "5",
    title: "ส่งมอบ",
    description: "ตรวจรับงานและรับคำแนะนำหลังส่งมอบ",
    status: "จบงานมั่นใจ",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="px-4 pb-10 pt-7 sm:px-6 lg:pb-16 lg:pt-12">
        <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-[oklch(86%_0.09_151)] px-4 py-2 text-sm font-black text-[oklch(24%_0.07_151)]">
              {brand.tagline}
            </p>
            <h1 className="mt-5 text-5xl font-black leading-[0.94] tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">
              ไว้ใจช่าง
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-stone-700">
              {brand.service} พร้อมทีมช่างที่สื่อสารชัด นัดหมายง่าย
              และติดตามงานได้จากมือถือ
            </p>

            <div className="mt-7 grid gap-3 sm:flex">
              <Link
                href="/request"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-[oklch(31%_0.08_151)] px-5 py-4 text-base font-black text-[oklch(98%_0.014_86)]"
              >
                นัดสำรวจหน้างาน
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/track"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md border border-stone-300 bg-stone-100 px-5 py-4 text-base font-black text-stone-950"
              >
                <ClipboardList size={18} />
                ติดตามงาน
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-stone-300 bg-stone-100 shadow-[0_24px_80px_oklch(42%_0.045_76_/_0.18)]">
            <Image
              src="/images/trust-build-hero.png"
              alt="ทีมช่างไว้ใจช่าง นัดสำรวจหน้างานกับเจ้าของบ้าน"
              width={1536}
              height={1024}
              priority
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-band px-4 py-11 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black text-[oklch(43%_0.13_76)]">
              เมนูลัดสำหรับลูกค้า
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
              ทุกอย่างจัดการได้ใน LINE
            </h2>
            <p className="mt-4 text-base leading-8 text-stone-700">
              นัดสำรวจ ติดตามสถานะ ดูบริการ และคุยกับทีมงานได้จากเมนูเดียว
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {lineMenuLinks.map((item) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("http");
              const cardClass =
                "group block rounded-2xl border border-[oklch(78%_0.08_76_/_0.55)] bg-[oklch(99%_0.01_86)] p-5 shadow-[0_14px_40px_oklch(42%_0.045_76_/_0.09)] transition hover:-translate-y-1 hover:shadow-[0_20px_55px_oklch(42%_0.045_76_/_0.14)]";

              const content = (
                <>
                  <span className="grid size-12 place-items-center rounded-xl bg-[oklch(84%_0.12_76)] text-[oklch(24%_0.07_151)] transition group-hover:bg-[oklch(31%_0.08_151)] group-hover:text-[oklch(98%_0.014_86)]">
                    <Icon size={23} />
                  </span>
                  <span className="mt-5 block text-lg font-black text-stone-950">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-7 text-stone-600">
                    {item.description}
                  </span>
                </>
              );

              return isExternal ? (
                <a key={item.title} href={item.href} className={cardClass}>
                  {content}
                </a>
              ) : (
                <Link key={item.title} href={item.href} className={cardClass}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-18"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,oklch(88%_0.08_76_/_0.38),transparent_34%),radial-gradient(circle_at_bottom_right,oklch(82%_0.07_151_/_0.28),transparent_32%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(oklch(90%_0.01_86_/_0.28)_1px,transparent_1px),linear-gradient(90deg,oklch(90%_0.01_86_/_0.28)_1px,transparent_1px)] bg-[size:34px_34px]" />

        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black text-[oklch(43%_0.13_76)]">บริการของเรา</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
              งานบ้านที่ต้องการช่างไว้ใจได้
            </h2>
            <p className="mt-4 text-base leading-8 text-stone-700">
              เลือกประเภทงานที่ต้องการ ส่งรายละเอียดและรูปหน้างาน
              แล้วทีมงานจะติดต่อกลับเพื่อประเมินและนัดสำรวจ
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {trustBadges.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-[oklch(77%_0.08_76_/_0.6)] bg-[oklch(96%_0.025_86)] px-4 py-2 text-sm font-black text-[oklch(31%_0.08_151)]"
              >
                <CheckCircle2 size={16} />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isHighlighted = index === 0;

              return (
                <Link
                  key={service.title}
                  href={`/request?service=${encodeURIComponent(service.title)}`}
                  className={`group rounded-3xl border border-[oklch(78%_0.08_76_/_0.45)] bg-[linear-gradient(145deg,oklch(99%_0.012_86),oklch(96%_0.025_86))] p-5 shadow-[0_16px_45px_oklch(42%_0.045_76_/_0.1)] transition hover:-translate-y-1 hover:border-[oklch(60%_0.12_76_/_0.7)] hover:shadow-[0_24px_65px_oklch(42%_0.045_76_/_0.16)] ${
                    isHighlighted ? "md:col-span-2 xl:row-span-2" : ""
                  }`}
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-[oklch(84%_0.12_76)] text-[oklch(24%_0.07_151)]">
                    <Icon size={24} />
                  </span>
                  <h3
                    className={`mt-5 font-black text-stone-950 ${
                      isHighlighted ? "text-2xl" : "text-xl"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-stone-600">
                    {service.detail}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[oklch(31%_0.08_151)]">
                    ดูรายละเอียด
                    <ArrowRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="section-band px-4 py-14 sm:px-6 sm:py-18"
      >
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-black text-[oklch(43%_0.13_76)]">
              ขั้นตอนการใช้บริการ
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
              เริ่มจากส่งข้อมูล จบที่ส่งมอบงาน
            </h2>
            <p className="mt-4 leading-8 text-stone-700">
              ออกแบบให้เหมาะกับผู้ใช้จาก LINE Rich Menu:
              อ่านเร็ว กดง่าย และรู้ทันทีว่าขั้นต่อไปคืออะไร
            </p>

            <div className="mt-6 rounded-3xl border border-[oklch(78%_0.08_76_/_0.5)] bg-[oklch(99%_0.01_86)] p-5 shadow-[0_16px_45px_oklch(42%_0.045_76_/_0.1)]">
              <p className="text-sm font-black text-[oklch(31%_0.08_151)]">
                สิ่งที่ลูกค้าได้รับ
              </p>
              <div className="mt-4 grid gap-3">
                {processChecklist.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-[oklch(43%_0.13_76)]"
                      size={18}
                    />
                    <p className="text-sm font-bold leading-7 text-stone-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ol className="relative grid gap-4">
            <span className="absolute bottom-8 left-6 top-8 hidden w-0.5 bg-[linear-gradient(oklch(84%_0.12_76),oklch(31%_0.08_151))] sm:block" />
            {processSteps.map((step) => (
              <li
                key={step.number}
                className="group relative grid gap-3 rounded-3xl border border-stone-200 bg-[oklch(99%_0.01_86)] p-5 shadow-[0_14px_40px_oklch(42%_0.045_76_/_0.09)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_oklch(42%_0.045_76_/_0.14)] sm:grid-cols-[52px_1fr]"
              >
                <span className="relative z-10 grid size-12 place-items-center rounded-2xl bg-[oklch(31%_0.08_151)] text-lg font-black text-[oklch(98%_0.014_86)]">
                  {step.number}
                </span>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-xl font-black text-stone-950">{step.title}</h3>
                    <span className="rounded-full bg-[oklch(88%_0.08_76)] px-3 py-1 text-xs font-black text-[oklch(24%_0.07_151)]">
                      {step.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto rounded-3xl bg-[oklch(31%_0.08_151)] p-6 text-[oklch(98%_0.014_86)] shadow-[0_24px_80px_oklch(42%_0.045_76_/_0.2)] sm:max-w-6xl sm:p-8">
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
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[oklch(84%_0.12_76)] px-5 py-3 font-black text-stone-950"
          >
            นัดสำรวจหน้างาน
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
