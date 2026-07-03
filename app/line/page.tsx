import type { Metadata } from "next";
import Link from "next/link";
import {
  BriefcaseBusiness,
  ClipboardList,
  Images,
  MessageCircle,
  SearchCheck,
} from "lucide-react";
import { brand } from "@/components/site-data";
import { PageIntro } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "LINE Rich Menu | ไว้ใจช่าง",
  description:
    "คู่มือปุ่มหลักสำหรับลูกค้าที่เปิดไว้ใจช่างจาก LINE Rich Menu",
};

const lineActions = [
  {
    title: "นัดสำรวจงาน",
    detail: "ส่งข้อมูลหน้างาน รูปภาพ พื้นที่ งบประมาณ และช่วงเวลาที่สะดวกให้ทีมติดต่อกลับ",
    href: "/request",
    display: "/request",
    icon: SearchCheck,
  },
  {
    title: "ติดตามงาน",
    detail: "กรอกเลขงาน เช่น TB-0001 เพื่อดูสถานะ ใบเสนอราคา ความคืบหน้า และการรับประกัน",
    href: "/track",
    display: "/track",
    icon: ClipboardList,
  },
  {
    title: "บริการทั้งหมด",
    detail: "ดูบริการรีโนเวท ต่อเติม งานซ่อม ระบบไฟ ระบบประปา หลังคา สี และกระเบื้อง",
    href: "/services",
    display: "/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "ผลงานที่ผ่านมา",
    detail: "ดูตัวอย่างงานก่อนและหลัง รวมถึงรีวิวจากลูกค้าที่ส่งมอบงานแล้ว",
    href: "/portfolio",
    display: "/portfolio",
    icon: Images,
  },
  {
    title: "ติดต่อทีมงาน",
    detail: "เปิด LINE Chat เพื่อคุยกับทีมไว้ใจช่างโดยตรง",
    href: brand.lineChatUrl,
    display: "LINE Chat",
    icon: MessageCircle,
  },
];

export default function LinePage() {
  return (
    <main>
      <PageIntro eyebrow="LINE Rich Menu" title="เมนูหลักสำหรับลูกค้าไว้ใจช่าง">
        <p>
          หน้านี้สรุป 5 ปุ่มสำคัญสำหรับใช้งานจาก LINE Rich Menu
          ลูกค้าสามารถเริ่มนัดสำรวจ ติดตามงาน ดูบริการ ดูผลงาน หรือติดต่อทีมงานได้ทันที
        </p>
      </PageIntro>

      <section className="px-4 pb-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-5">
          {lineActions.map((action) => {
            const Icon = action.icon;
            const isExternal = action.href.startsWith("http");
            const content = (
              <>
                <span className="grid size-12 place-items-center rounded-md bg-[oklch(88%_0.08_76)] text-[oklch(31%_0.08_151)]">
                  <Icon size={24} />
                </span>
                <h2 className="mt-5 text-xl font-black text-stone-950">{action.title}</h2>
                <p className="mt-3 text-sm leading-7 text-stone-700">{action.detail}</p>
                <p className="mt-4 break-all text-xs font-black text-[oklch(43%_0.13_76)]">
                  {action.display}
                </p>
              </>
            );

            return isExternal ? (
              <a key={action.title} href={action.href} className="card block p-5">
                {content}
              </a>
            ) : (
              <Link key={action.title} href={action.href} className="card block p-5">
                {content}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
