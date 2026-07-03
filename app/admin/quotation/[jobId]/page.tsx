"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Printer, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { QuotationDocument } from "@/components/quotation-document";
import { findJob, type StoredJob } from "@/lib/job-repository";

const ADMIN_SESSION_KEY = "trust-build.admin-session";

export default function AdminQuotationPage() {
  const params = useParams<{ jobId: string }>();
  const jobId = decodeURIComponent(params.jobId ?? "").toUpperCase();
  const [job, setJob] = useState<StoredJob | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    setIsAuthenticated(window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true");
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    findJob(jobId)
      .then((nextJob) => setJob(nextJob))
      .catch(() => setPageError("โหลดใบเสนอราคาไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated, jobId]);

  return (
    <main className="px-4 py-8 sm:px-6">
      <div className="no-print mx-auto mb-4 flex max-w-4xl flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-stone-300 bg-stone-100 px-4 text-sm font-black text-stone-800"
        >
          <ArrowLeft size={18} />
          กลับ Admin
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[oklch(31%_0.08_151)] px-5 text-sm font-black text-[oklch(98%_0.014_86)]"
        >
          <Printer size={18} />
          พิมพ์ / บันทึกเป็น PDF
        </button>
      </div>

      {!isAuthenticated && (
        <div className="card mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-black text-stone-950">กรุณาเข้าสู่ระบบ Admin</h1>
          <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
            เข้าหน้า Admin ด้วย PIN ก่อนเปิดใบเสนอราคา
          </p>
        </div>
      )}

      {isAuthenticated && isLoading && (
        <div className="card mx-auto max-w-4xl p-6 text-sm font-bold text-stone-600">
          กำลังโหลดใบเสนอราคา...
        </div>
      )}

      {isAuthenticated && pageError && (
        <div className="card mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-black text-stone-950">เกิดข้อผิดพลาด</h1>
          <p className="mt-2 text-sm font-semibold leading-7 text-red-700">{pageError}</p>
        </div>
      )}

      {isAuthenticated && !isLoading && !pageError && !job && (
        <div className="card mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-black text-stone-950">ไม่พบใบเสนอราคา</h1>
          <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
            กรุณาตรวจสอบเลขงานอีกครั้ง
          </p>
        </div>
      )}

      {isAuthenticated && job && <QuotationDocument job={job} />}
    </main>
  );
}
