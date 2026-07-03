import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  ClipboardList,
  Home,
  Images,
  MessageCircle,
  SearchCheck,
} from "lucide-react";
import { brand, serviceSteps, services } from "@/components/site-data";

export const metadata: Metadata = {
  title: "ไว้ใจช่าง | ช่างซ่อม รีโนเวท ต่อเติม ที่ไว้ใจได้",
  description:
    "นัดสำรวจงาน รีโนเวท ต่อเติม ซ่อมแซม ระบบไฟ ระบบประปา หลังคา สี และกระเบื้อง พร้อมติดตามงานผ่าน LINE",
};

const lineMenuLinks = [
  {
    label: "นัดสำรวจงาน",
    href: "/request",
    displayUrl: "https://yourdomain.com/request",
    icon: SearchCheck,
  },
  {
    label: "ติดตามงาน",
    href: "/track",
    displayUrl: "https://yourdomain.com/track",
    icon: ClipboardList,
  },
  {
    label: "บริการทั้งหมด",
    href: "/services",
    displayUrl: "https://yourdomain.com/services",
    icon: BriefcaseBusiness,
  },
  {
    label: "ผลงานที่ผ่านมา",
    href: "/portfolio",
    displayUrl: "https://yourdomain.com/portfolio",
    icon: Images,
  },
  {
    label: "ติดต่อทีมงาน",
    href: brand.lineChatUrl,
    displayUrl: "LINE Chat",
    icon: MessageCircle,
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
            <p className="text-sm font-black text-[oklch(43%_0.13_76)]">เมนูลัดสำหรับ LINE</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
              ลิงก์หลักสำหรับ Rich Menu
            </h2>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {lineMenuLinks.map((item) => {
              const Icon = item.icon;
              const isExternal = item.href.startsWith("http");

              const content = (
                <>
                  <span className="grid size-11 place-items-center rounded-md bg-[oklch(88%_0.08_76)] text-[oklch(31%_0.08_151)]">
                    <Icon size={22} />
                  </span>
                  <span className="mt-4 block text-lg font-black text-stone-950">
                    {item.label}
                  </span>
                  <span className="mt-2 block break-all text-xs font-bold leading-5 text-stone-600">
                    {item.displayUrl}
                  </span>
                </>
              );

              return isExternal ? (
                <a key={item.label} href={item.href} className="card block p-5">
                  {content}
                </a>
              ) : (
                <Link key={item.label} href={item.href} className="card block p-5">
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-black text-[oklch(43%_0.13_76)]">บริการของเรา</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl">
              งานบ้านที่ต้องการช่างไว้ใจได้
            </h2>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="card p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-md bg-[oklch(88%_0.08_76)] text-[oklch(31%_0.08_151)]">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-stone-950">{service.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-700">{service.detail}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-band px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
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
            </div>

            <div className="grid gap-3">
              {serviceSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-lg border border-stone-200 bg-[oklch(99%_0.008_86)] p-4 shadow-[0_12px_30px_oklch(42%_0.045_76_/_0.08)]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-md bg-[oklch(31%_0.08_151)] text-base font-black text-[oklch(98%_0.014_86)]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-stone-950">{step}</h3>
                    <p className="mt-1 text-sm font-semibold text-stone-600">
                      {getStepDetail(index)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto rounded-lg bg-[oklch(31%_0.08_151)] p-6 text-[oklch(98%_0.014_86)] sm:max-w-6xl sm:p-8">
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

function getStepDetail(index: number) {
  const details = [
    "แจ้งประเภทงาน พื้นที่ และแนบรูปหน้างาน",
    "ทีมงานติดต่อกลับเพื่อนัดเวลาที่สะดวก",
    "รับใบเสนอราคาพร้อมขอบเขตงานชัดเจน",
    "เริ่มงานตามคิว พร้อมอัปเดตความคืบหน้า",
    "ตรวจรับงานและรับคำแนะนำหลังส่งมอบ",
  ];

  return details[index];
}
