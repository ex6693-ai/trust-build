"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { QuotationDocument } from "@/components/quotation-document";
import { findJob, updateJobAdminFields, type StoredJob } from "@/lib/job-repository";

export default function PublicQuotationPage() {
  const params = useParams<{ jobId: string }>();
  const jobId = decodeURIComponent(params.jobId ?? "").toUpperCase();
  const [job, setJob] = useState<StoredJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [pageError, setPageError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  useEffect(() => {
    findJob(jobId)
      .then((nextJob) => setJob(nextJob))
      .catch(() => setPageError("โหลดใบเสนอราคาไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
      .finally(() => setIsLoading(false));
  }, [jobId]);

  const isQuotationVisible = Boolean(job && job.quotationStatus !== "ยังไม่เสนอราคา");
  const isConfirmed = Boolean(job && job.dealStatus !== "ยังไม่ปิดการขาย");

  async function handleConfirmDeal() {
    if (!job) {
      return;
    }

    setIsConfirming(true);
    setConfirmError("");
    try {
      const updatedJobs = await updateJobAdminFields(job.id, {
        dealStatus: "ลูกค้ายืนยันงาน",
        confirmedAt: new Date().toISOString(),
      });
      const updatedJob = updatedJobs.find((item) => item.id === job.id) ?? {
        ...job,
        dealStatus: "ลูกค้ายืนยันงาน" as const,
        confirmedAt: new Date().toISOString(),
      };
      setJob(updatedJob);
      setConfirmationMessage("ยืนยันงานสำเร็จ ทีมงานจะติดต่อกลับทาง LINE เพื่อแจ้งขั้นตอนถัดไป");
    } catch {
      setConfirmError("ยืนยันงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อทีมงานทาง LINE");
    } finally {
      setIsConfirming(false);
    }
  }

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="no-print mx-auto mb-4 flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <Link
          href="/track"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-stone-300 bg-stone-100 px-4 text-sm font-black text-stone-800"
        >
          <ArrowLeft size={18} />
          กลับหน้าติดตามงาน
        </Link>
        {isQuotationVisible && (
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[oklch(31%_0.08_151)] px-5 text-sm font-black text-[oklch(98%_0.014_86)]"
          >
            <Printer size={18} />
            พิมพ์ / บันทึกเป็น PDF
          </button>
        )}
      </div>

      {isLoading && (
        <div className="card mx-auto max-w-4xl p-6 text-sm font-bold text-stone-600">
          กำลังโหลดใบเสนอราคา...
        </div>
      )}

      {pageError && (
        <div className="card mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-black text-stone-950">เกิดข้อผิดพลาด</h1>
          <p className="mt-2 text-sm font-semibold leading-7 text-red-700">{pageError}</p>
        </div>
      )}

      {!isLoading && !pageError && !job && (
        <div className="card mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-black text-stone-950">ไม่พบใบเสนอราคา</h1>
          <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
            กรุณาตรวจสอบเลขงานอีกครั้ง หรือติดต่อทีมงานทาง LINE
          </p>
        </div>
      )}

      {job && !isQuotationVisible && (
        <div className="card mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-black text-stone-950">ยังไม่มีใบเสนอราคา</h1>
          <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
            ทีมงานจะแจ้งใบเสนอราคาหลังสรุปรายละเอียดหน้างาน
          </p>
        </div>
      )}

      {job && isQuotationVisible && (
        <>
          <QuotationDocument job={job} />
          <section className="no-print mx-auto mt-4 max-w-4xl rounded-md border border-[oklch(82%_0.08_76)] bg-[oklch(97%_0.02_86)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black text-stone-700">ยืนยันใบเสนอราคา</p>
                <p className="mt-1 text-sm font-semibold leading-7 text-stone-600">
                  เมื่อยืนยันแล้ว ทีมงานจะติดต่อกลับเพื่อสรุปวันเริ่มงานและขั้นตอนมัดจำ
                </p>
              </div>
              {isConfirmed ? (
                <span className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[oklch(31%_0.08_151)] px-4 text-sm font-black text-[oklch(98%_0.014_86)]">
                  <CheckCircle2 size={18} />
                  ยืนยันแล้ว
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmDeal}
                  disabled={isConfirming}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[oklch(31%_0.08_151)] px-5 text-sm font-black text-[oklch(98%_0.014_86)] disabled:opacity-60"
                >
                  <CheckCircle2 size={18} />
                  {isConfirming ? "กำลังยืนยัน..." : "ยืนยันงานนี้"}
                </button>
              )}
            </div>
            {(confirmationMessage || isConfirmed) && (
              <p className="mt-4 rounded-md bg-stone-950 px-4 py-3 text-sm font-black leading-7 text-[oklch(98%_0.014_86)]">
                {confirmationMessage || "ลูกค้ายืนยันงานนี้แล้ว"}
              </p>
            )}
            {confirmError && (
              <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-black leading-7 text-red-700">
                {confirmError}
              </p>
            )}
          </section>
        </>
      )}
    </main>
  );
}
