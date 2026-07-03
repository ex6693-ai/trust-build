import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ใบเสนอราคา | ไว้ใจช่าง",
  description:
    "ดูใบเสนอราคาเบื้องต้นของไว้ใจช่าง พร้อมรายละเอียดงาน ราคา และปุ่มยืนยันงานสำหรับลูกค้า",
};

export default function QuotationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
