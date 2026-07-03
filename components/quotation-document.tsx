import { ShieldCheck } from "lucide-react";
import { brand } from "@/components/site-data";
import { formatThaiCurrency } from "@/lib/format";
import type { StoredJob } from "@/lib/job-repository";

export function QuotationDocument({ job }: { job: StoredJob }) {
  const quotationDate = job.quotationSentAt
    ? new Date(job.quotationSentAt).toLocaleDateString("th-TH")
    : new Date().toLocaleDateString("th-TH");

  return (
    <article className="print-page mx-auto max-w-4xl bg-[oklch(99%_0.008_86)] p-5 text-stone-950 sm:p-8">
      <header className="border-b border-stone-300 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-md bg-[oklch(31%_0.08_151)] text-[oklch(97%_0.018_86)]">
              <ShieldCheck size={26} />
            </span>
            <div>
              <p className="text-2xl font-black tracking-tight">{brand.name}</p>
              <p className="mt-1 text-sm font-semibold text-stone-600">{brand.tagline}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-black uppercase text-stone-500">Quotation</p>
            <p className="mt-1 text-xl font-black text-[oklch(31%_0.08_151)]">{job.id}</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 border-b border-stone-200 py-6 sm:grid-cols-2">
        <InfoItem label="Customer name" value={job.customerName} />
        <InfoItem label="Phone" value={job.phone} />
        <InfoItem label="Service type" value={job.serviceType} />
        <InfoItem label="Quotation date" value={quotationDate} />
        <InfoItem label="Province" value={job.province} />
        <InfoItem label="District" value={job.district} />
        <InfoItem label="Map link" value={job.mapsLink || "-"} className="sm:col-span-2" />
      </section>

      <section className="grid gap-5 border-b border-stone-200 py-6 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-xs font-black uppercase text-stone-500">Job detail</p>
          <p className="mt-2 whitespace-pre-wrap rounded-md bg-stone-100 p-4 text-sm font-semibold leading-7 text-stone-800">
            {job.jobDetail || "-"}
          </p>
        </div>
        <div className="rounded-md border border-[oklch(82%_0.08_76)] bg-[oklch(97%_0.02_86)] p-4">
          <p className="text-xs font-black uppercase text-stone-500">Quotation amount</p>
          <p className="mt-2 text-3xl font-black text-stone-950">
            {formatThaiCurrency(job.quotationAmount)}
          </p>
          <p className="mt-4 text-xs font-black uppercase text-stone-500">Status</p>
          <p className="mt-1 text-sm font-black text-[oklch(31%_0.08_151)]">
            {job.quotationStatus}
          </p>
        </div>
      </section>

      <section className="border-b border-stone-200 py-6">
        <p className="text-xs font-black uppercase text-stone-500">Quotation note</p>
        <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-7 text-stone-800">
          {job.quotationNote || "-"}
        </p>
      </section>

      <section className="py-6">
        <h2 className="text-lg font-black text-stone-950">เงื่อนไขใบเสนอราคา</h2>
        <ul className="mt-3 grid gap-2 text-sm font-semibold leading-7 text-stone-800">
          <li>ราคานี้เป็นราคาประเมินเบื้องต้นหลังสำรวจหน้างาน</li>
          <li>รายละเอียดอาจเปลี่ยนแปลงตามวัสดุและขอบเขตงานจริง</li>
          <li>การเริ่มงานต้องยืนยันผ่านทีมงานไว้ใจช่าง</li>
        </ul>
      </section>

      <footer className="border-t border-stone-300 pt-5 text-sm font-bold text-stone-600">
        ออกโดย {brand.legalName}
      </footer>
    </article>
  );
}

function InfoItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-black uppercase text-stone-500">{label}</p>
      <p className="mt-1 break-words text-sm font-bold leading-7 text-stone-900">{value}</p>
    </div>
  );
}
