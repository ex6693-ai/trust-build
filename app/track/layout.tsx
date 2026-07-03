import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ติดตามงาน | ไว้ใจช่าง",
  description:
    "ตรวจสอบสถานะงาน ใบเสนอราคา ความคืบหน้า การส่งมอบ และการรับประกันด้วยเลขงานไว้ใจช่าง",
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
