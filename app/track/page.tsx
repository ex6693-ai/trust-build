"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Circle, Clock3, FileText, Search } from "lucide-react";
import { jobStatuses } from "@/components/site-data";
import { findJob, updateJobAdminFields } from "@/lib/job-repository";
import {
  getTimelineIndexForStatus,
  getTimelineLabel,
  type StoredJob,
} from "@/lib/local-jobs";
import { PageIntro } from "@/components/site-shell";
import { formatThaiCurrency } from "@/lib/format";

export default function TrackPage() {
  const [jobId, setJobId] = useState("TB-0001");
  const [searchedJobId, setSearchedJobId] = useState("TB-0001");
  const [job, setJob] = useState<StoredJob | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [trackError, setTrackError] = useState("");
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewText, setReviewText] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [isSavingReview, setIsSavingReview] = useState(false);

  useEffect(() => {
    findJob("TB-0001")
      .then((initialJob) => setJob(initialJob))
      .catch(() => setTrackError("โหลดข้อมูลติดตามงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
      .finally(() => setIsLoadingJob(false));
  }, []);

  useEffect(() => {
    if (job?.customerRating) {
      setReviewRating(String(job.customerRating));
    }

    if (job?.customerReview) {
      setReviewText(job.customerReview);
    }
  }, [job]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextJobId = jobId.trim().toUpperCase() || "TB-0001";
    setSearchedJobId(nextJobId);
    setIsLoadingJob(true);
    setTrackError("");
    try {
      setJob(await findJob(nextJobId));
    } catch {
      setJob(null);
      setTrackError("ค้นหาเลขงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อทีมงานทาง LINE");
    } finally {
      setIsLoadingJob(false);
    }
    setHasSearched(true);
  }

  async function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!job) {
      return;
    }

    setIsSavingReview(true);
    setReviewError("");
    const parsedRating = Number(reviewRating);
    try {
      const updatedJobs = await updateJobAdminFields(job.id, {
        customerRating: Number.isFinite(parsedRating)
          ? Math.min(5, Math.max(1, parsedRating))
          : 5,
        customerReview: reviewText,
      });
      setJob(updatedJobs.find((item) => item.id === job.id) ?? job);
      setReviewMessage("ขอบคุณสำหรับรีวิว ทีมงานไว้ใจช่างได้รับข้อมูลแล้ว");
    } catch {
      setReviewError("ส่งรีวิวไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsSavingReview(false);
    }
  }

  const activeIndex = getTimelineIndexForStatus(job?.status ?? "รอการติดต่อ");
  const canShowWorkProgress = Boolean(
    job &&
      ["ลูกค้ายืนยันงาน", "รอมัดจำ", "รับมัดจำแล้ว", "เตรียมเริ่มงาน"].includes(
        job.dealStatus,
      ),
  );
  const canShowDelivery = job?.workStatus === "ส่งมอบแล้ว";

  return (
    <main>
      <PageIntro eyebrow="ติดตามงาน" title="ตรวจสอบสถานะงานไว้ใจช่าง">
        <p>
          กรอกเลขงาน เช่น TB-0001 เพื่อดูสถานะล่าสุด
          ข้อมูลจะอ่านจาก browser localStorage และใช้ mock data เฉพาะตอนยังไม่มีงานจริง
        </p>
      </PageIntro>

      <section className="px-4 pb-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="card self-start p-5 sm:p-7">
            <form onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-black text-stone-800">
                Job ID
                <div className="flex gap-2">
                  <input
                    className="field"
                    value={jobId}
                    onChange={(event) => setJobId(event.target.value)}
                    placeholder="TB-0001"
                  />
                  <button
                    className="grid min-w-12 place-items-center rounded-md bg-stone-950 text-[oklch(98%_0.014_86)] disabled:opacity-60"
                    type="submit"
                    disabled={isLoadingJob}
                    aria-label="ค้นหางาน"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </label>
            </form>

            {trackError && (
              <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-black leading-7 text-red-700">
                {trackError}
              </p>
            )}

            {isLoadingJob ? (
              <div className="mt-6 rounded-md border border-stone-200 bg-stone-100 p-4">
                <p className="font-black text-stone-950">กำลังโหลดข้อมูล...</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  กรุณารอสักครู่ ระบบกำลังตรวจสอบเลขงานของคุณ
                </p>
              </div>
            ) : job ? (
              <>
                <div className="mt-6 rounded-md bg-[oklch(88%_0.08_76)] p-4">
                  <p className="text-sm font-black text-stone-700">เลขงาน</p>
                  <h2 className="mt-1 text-3xl font-black text-stone-950">{job.id}</h2>
                </div>

                <div className="mt-4 grid gap-3">
                  <PublicInfo label="ประเภทงาน" value={job.serviceType} />
                  <PublicInfo label="สถานะปัจจุบัน" value={getTimelineLabel(activeIndex)} />
                  <PublicInfo label="วันที่สร้างงาน" value={job.createdDate} />
                  {job.surveyNote && (
                    <PublicInfo label="บันทึกนัดสำรวจ" value={job.surveyNote} />
                  )}
                </div>

                {job.quotationStatus !== "ยังไม่เสนอราคา" && (
                  <section className="mt-4 rounded-md border border-[oklch(82%_0.08_76)] bg-[oklch(97%_0.02_86)] p-4">
                    <p className="text-sm font-black text-stone-700">ใบเสนอราคาเบื้องต้น</p>
                    <p className="mt-2 text-3xl font-black text-stone-950">
                      {formatThaiCurrency(job.quotationAmount)}
                    </p>
                    <div className="mt-3 grid gap-3">
                      <PublicInfo label="สถานะใบเสนอราคา" value={job.quotationStatus} />
                      {job.quotationNote && (
                        <PublicInfo label="รายละเอียดใบเสนอราคา" value={job.quotationNote} />
                      )}
                    </div>
                    <p className="mt-4 rounded-md bg-stone-950 px-4 py-3 text-sm font-black leading-7 text-[oklch(98%_0.014_86)]">
                      หากต้องการยืนยันงาน กรุณาติดต่อทีมงานทาง LINE
                    </p>
                    <Link
                      href={`/quotation/${job.id}`}
                      className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[oklch(31%_0.08_151)] px-4 text-sm font-black text-[oklch(98%_0.014_86)]"
                    >
                      <FileText size={18} />
                      ดูใบเสนอราคา
                    </Link>
                  </section>
                )}

                {job.dealStatus !== "ยังไม่ปิดการขาย" && (
                  <section className="mt-4 rounded-md border border-stone-300 bg-stone-100 p-4">
                    <p className="text-sm font-black text-stone-700">สถานะยืนยันงาน</p>
                    <div className="mt-3 grid gap-3">
                      <PublicInfo label="สถานะปิดการขาย" value={job.dealStatus} />
                      {job.depositAmount !== null && (
                        <PublicInfo label="ยอดมัดจำ" value={formatThaiCurrency(job.depositAmount)} />
                      )}
                    </div>
                    <p className="mt-4 rounded-md bg-stone-950 px-4 py-3 text-sm font-black leading-7 text-[oklch(98%_0.014_86)]">
                      ทีมงานจะยืนยันวันเริ่มงานผ่าน LINE
                    </p>
                  </section>
                )}

                {canShowWorkProgress && (
                  <section className="mt-4 rounded-md border border-[oklch(82%_0.08_151)] bg-[oklch(97%_0.02_151)] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-stone-700">ความคืบหน้างาน</p>
                        <p className="mt-1 text-2xl font-black text-stone-950">
                          {job.progressPercent}%
                        </p>
                      </div>
                      <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-black text-[oklch(98%_0.014_86)]">
                        {job.workStatus}
                      </span>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-200">
                      <div
                        className="h-full rounded-full bg-[oklch(31%_0.08_151)]"
                        style={{ width: `${Math.min(100, Math.max(0, job.progressPercent))}%` }}
                      />
                    </div>
                    <div className="mt-4 grid gap-3">
                      <PublicInfo label="สถานะงาน" value={job.workStatus} />
                      {job.startDate && <PublicInfo label="วันเริ่มงาน" value={job.startDate} />}
                      {job.expectedFinishDate && (
                        <PublicInfo label="วันคาดว่าจะเสร็จ" value={job.expectedFinishDate} />
                      )}
                      {job.progressNote && (
                        <PublicInfo label="บันทึกความคืบหน้า" value={job.progressNote} />
                      )}
                    </div>
                    <p className="mt-4 rounded-md bg-stone-950 px-4 py-3 text-sm font-black leading-7 text-[oklch(98%_0.014_86)]">
                      หากมีข้อสงสัย กรุณาติดต่อทีมงานทาง LINE
                    </p>
                  </section>
                )}

                {canShowDelivery && (
                  <section className="mt-4 rounded-md border border-[oklch(82%_0.08_76)] bg-[oklch(97%_0.02_86)] p-4">
                    <p className="text-sm font-black text-stone-700">ส่งมอบและรับประกัน</p>
                    <div className="mt-3 grid gap-3">
                      {job.deliveryNote && (
                        <PublicInfo label="บันทึกส่งมอบ" value={job.deliveryNote} />
                      )}
                      {(job.warrantyStartDate || job.warrantyEndDate) && (
                        <PublicInfo
                          label="ระยะเวลารับประกัน"
                          value={`${job.warrantyStartDate || "-"} ถึง ${job.warrantyEndDate || "-"}`}
                        />
                      )}
                      {job.warrantyNote && (
                        <PublicInfo label="รายละเอียดรับประกัน" value={job.warrantyNote} />
                      )}
                    </div>

                    <form className="mt-4 grid gap-4" onSubmit={handleReviewSubmit}>
                      <label className="grid gap-2 text-sm font-black text-stone-800">
                        คะแนนความพึงพอใจ
                        <select
                          className="field"
                          value={reviewRating}
                          onChange={(event) => setReviewRating(event.target.value)}
                        >
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <option key={rating} value={rating}>
                              {rating} ดาว
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="grid gap-2 text-sm font-black text-stone-800">
                        รีวิวจากลูกค้า
                        <textarea
                          className="field min-h-28 resize-y"
                          value={reviewText}
                          onChange={(event) => setReviewText(event.target.value)}
                          placeholder="บอกเล่าประสบการณ์การใช้บริการไว้ใจช่าง"
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={isSavingReview}
                        className="min-h-11 rounded-md bg-[oklch(31%_0.08_151)] px-5 text-sm font-black text-[oklch(98%_0.014_86)] disabled:opacity-60"
                      >
                        {isSavingReview ? "กำลังส่งรีวิว..." : "ส่งรีวิว"}
                      </button>
                      {(reviewMessage || job.customerReview) && (
                        <p className="rounded-md bg-stone-950 px-4 py-3 text-sm font-black leading-7 text-[oklch(98%_0.014_86)]">
                          {reviewMessage || "ขอบคุณสำหรับรีวิวของคุณ"}
                        </p>
                      )}
                      {reviewError && (
                        <p className="rounded-md bg-red-50 p-3 text-sm font-black leading-7 text-red-700">
                          {reviewError}
                        </p>
                      )}
                    </form>
                  </section>
                )}
              </>
            ) : (
              <div className="mt-6 rounded-md border border-stone-200 bg-stone-100 p-4">
                <p className="font-black text-stone-950">ไม่พบเลขงาน {searchedJobId}</p>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  กรุณาตรวจสอบ Job ID อีกครั้ง หรือส่งคำขอนัดสำรวจใหม่
                </p>
              </div>
            )}
          </aside>

          <section className="card p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <Clock3 className="text-[oklch(43%_0.13_76)]" />
              <h2 className="text-2xl font-black text-stone-950">ไทม์ไลน์สถานะงาน</h2>
            </div>

            {!job && hasSearched ? (
              <div className="mt-7 rounded-md bg-stone-100 p-5 text-sm font-bold text-stone-600">
                ยังไม่มี timeline สำหรับเลขงานนี้
              </div>
            ) : (
              <ol className="mt-7">
                {jobStatuses.map((status, index) => {
                  const isDone = index < activeIndex;
                  const isActive = index === activeIndex;
                  const Icon = isDone ? CheckCircle2 : Circle;

                  return (
                    <li key={status} className="relative grid grid-cols-[42px_1fr] gap-3 pb-6 last:pb-0">
                      {index !== jobStatuses.length - 1 && (
                        <span
                          className={`absolute left-[20px] top-10 h-[calc(100%-2.5rem)] w-0.5 ${
                            isDone ? "bg-[oklch(48%_0.12_151)]" : "bg-stone-300"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative z-10 grid size-10 place-items-center rounded-full border ${
                          isDone || isActive
                            ? "border-[oklch(31%_0.08_151)] bg-[oklch(31%_0.08_151)] text-[oklch(98%_0.014_86)]"
                            : "border-stone-300 bg-stone-100 text-stone-400"
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <div
                        className={`rounded-md border p-4 ${
                          isActive
                            ? "border-[oklch(65%_0.12_76)] bg-[oklch(88%_0.08_76)]"
                            : "border-stone-200 bg-stone-100"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-black text-stone-500">
                              ขั้นตอนที่ {index + 1}
                            </p>
                            <h3 className="mt-1 text-lg font-black text-stone-950">{status}</h3>
                          </div>
                          {isActive && (
                            <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-black text-[oklch(98%_0.014_86)]">
                              ล่าสุด
                            </span>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

function PublicInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-stone-200 bg-stone-100 p-4">
      <p className="text-sm font-black text-stone-700">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-lg font-black text-[oklch(31%_0.08_151)]">
        {value}
      </p>
    </div>
  );
}
