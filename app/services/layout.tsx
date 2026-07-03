import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "บริการทั้งหมด | ไว้ใจช่าง",
  description:
    "บริการรีโนเวท ต่อเติม ซ่อมแซม ระบบไฟฟ้า ระบบประปา หลังคารั่วซึม ทาสี และปูกระเบื้อง",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
