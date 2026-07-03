import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/components/site-data";
import { PageIntro } from "@/components/site-shell";

export default function ServicesPage() {
  return (
    <main>
      <PageIntro eyebrow="บริการทั้งหมด" title="เลือกงานที่ต้องการให้ไว้ใจช่างดูแล">
        <p>
          รวมบริการซ่อม รีโนเวท ต่อเติม และระบบภายในบ้าน
          ลูกค้าจาก LINE สามารถเลือกบริการแล้วส่งข้อมูลนัดสำรวจได้ทันที
        </p>
      </PageIntro>

      <section className="px-4 pb-14 sm:px-6">
        {services.length === 0 ? (
          <div className="card mx-auto max-w-3xl p-6">
            <h2 className="text-2xl font-black text-stone-950">ยังไม่มีข้อมูลบริการ</h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
              ทีมไว้ใจช่างจะเพิ่มรายการบริการเร็ว ๆ นี้ หากต้องการสอบถามงานด่วน กรุณาติดต่อทีมงานทาง LINE
            </p>
          </div>
        ) : (
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="card grid content-between gap-6 p-5">
                <div>
                  <span className="grid size-12 place-items-center rounded-md bg-[oklch(88%_0.08_76)] text-[oklch(31%_0.08_151)]">
                    <Icon size={24} />
                  </span>
                  <h2 className="mt-5 text-xl font-black text-stone-950">{service.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{service.detail}</p>
                </div>
                <Link
                  href="/request"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[oklch(31%_0.08_151)] px-4 py-3 text-sm font-black text-[oklch(98%_0.014_86)]"
                >
                  นัดสำรวจงานนี้
                  <ArrowRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>
        )}
      </section>
    </main>
  );
}
