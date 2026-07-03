import type { Metadata } from "next";
import { Footer, MobileActionBar, SiteHeader } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "ไว้ใจช่าง | รับซ่อม รีโนเวท ต่อเติมบ้าน",
  description:
    "ไว้ใจช่าง ช่างที่ไว้ใจได้ ช่างที่ซื่อสัตย์ รับซ่อม รีโนเวท ต่อเติม ระบบไฟ ระบบประปา หลังคา สี กระเบื้อง พร้อมนัดสำรวจและติดตามงานผ่าน LINE ให้บริการโดย TRUST BUILD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>
        <SiteHeader />
        {children}
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
