import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ผลงานที่ผ่านมา | ไว้ใจช่าง",
  description:
    "ดูตัวอย่างผลงานรีโนเวท ซ่อมแซม ต่อเติม และรีวิวจากลูกค้าของไว้ใจช่าง",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
