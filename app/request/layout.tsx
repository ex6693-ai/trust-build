import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "นัดสำรวจงาน | ไว้ใจช่าง",
  description:
    "ส่งข้อมูลหน้างาน รูปภาพ งบประมาณ และพื้นที่ เพื่อให้ทีมไว้ใจช่างติดต่อกลับและนัดสำรวจหน้างาน",
};

export default function RequestLayout({ children }: { children: React.ReactNode }) {
  return children;
}
