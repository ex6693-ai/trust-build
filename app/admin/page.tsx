"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CalendarCheck,
  ClipboardList,
  Eye,
  FileText,
  HardHat,
  LockKeyhole,
  X,
} from "lucide-react";
import {
  adminStatusBadges,
  dealStatuses,
  quotationStatuses,
  workStatuses,
} from "@/components/site-data";
import {
  listJobs,
  updateJobAdminFields,
  type DealStatus,
  type QuotationStatus,
  type JobStatus,
  type StoredJob,
  type WorkStatus,
} from "@/lib/job-repository";
import { PageIntro } from "@/components/site-shell";
import { formatThaiCurrency } from "@/lib/format";

const ADMIN_SESSION_KEY = "trust-build.admin-session";
const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "123456";

const badgeStyles: Record<string, string> = {
  รอการติดต่อ: "bg-[oklch(90%_0.08_76)] text-stone-950",
  นัดสำรวจแล้ว: "bg-[oklch(88%_0.08_151)] text-[oklch(24%_0.07_151)]",
  กำลังประเมินราคา: "bg-[oklch(89%_0.06_230)] text-[oklch(28%_0.08_230)]",
  เสนอราคาแล้ว: "bg-[oklch(90%_0.07_110)] text-[oklch(28%_0.08_110)]",
  รอลูกค้าตัดสินใจ: "bg-[oklch(92%_0.05_82)] text-[oklch(31%_0.08_76)]",
  เริ่มงานแล้ว: "bg-[oklch(86%_0.09_151)] text-[oklch(24%_0.07_151)]",
  ส่งมอบแล้ว: "bg-stone-200 text-stone-800",
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [jobs, setJobs] = useState<StoredJob[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [filter, setFilter] = useState("ทั้งหมด");
  const [workFilter, setWorkFilter] = useState("ทั้งหมด");
  const [selectedJob, setSelectedJob] = useState<StoredJob | null>(null);

  useEffect(() => {
    setIsAuthenticated(window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true");
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoadingJobs(true);
      setAdminError("");
      listJobs()
        .then((nextJobs) => setJobs(nextJobs))
        .catch(() => setAdminError("โหลดรายการงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"))
        .finally(() => setIsLoadingJobs(false));
    }
  }, [isAuthenticated]);

  const summaryCards = useMemo(
    () => [
      {
        label: "งานใหม่วันนี้",
        value: String(jobs.filter((job) => job.createdDate === currentDate()).length || jobs.length),
        icon: ClipboardList,
      },
      {
        label: "รอนัดสำรวจ",
        value: String(jobs.filter((job) => job.status === "รอการติดต่อ").length),
        icon: CalendarCheck,
      },
      {
        label: "รอเสนอราคา",
        value: String(
          jobs.filter((job) => job.status === "กำลังประเมินราคา" || job.status === "นัดสำรวจแล้ว")
            .length,
        ),
        icon: BriefcaseBusiness,
      },
      {
        label: "กำลังทำงาน",
        value: String(jobs.filter((job) => job.status === "เริ่มงานแล้ว").length),
        icon: HardHat,
      },
      {
        label: "งานกำลังดำเนินงาน",
        value: String(
          jobs.filter((job) => ["เริ่มงานแล้ว", "กำลังดำเนินงาน"].includes(job.workStatus))
            .length,
        ),
        icon: HardHat,
      },
      {
        label: "ส่งมอบแล้ว",
        value: String(jobs.filter((job) => job.workStatus === "ส่งมอบแล้ว").length),
        icon: ClipboardList,
      },
      {
        label: "อยู่ในประกัน",
        value: String(jobs.filter((job) => isWarrantyActive(job)).length),
        icon: CalendarCheck,
      },
    ],
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    const visibleJobs = jobs.filter((job) => {
      const matchesStatus = filter === "ทั้งหมด" || job.status === filter;
      const matchesWorkStatus = workFilter === "ทั้งหมด" || job.workStatus === workFilter;
      return matchesStatus && matchesWorkStatus;
    });
    return [...visibleJobs].sort((a, b) => Number(b.isUrgent) - Number(a.isUrgent));
  }, [filter, jobs, workFilter]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pin === ADMIN_PIN) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }

    setLoginError("PIN ไม่ถูกต้อง");
  }

  function handleLogout() {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
    setPin("");
  }

  async function patchJob(jobId: string, patch: Partial<StoredJob>) {
    setAdminError("");
    try {
      const updatedJobs = await updateJobAdminFields(jobId, {
        status: patch.status,
        surveyNote: patch.surveyNote,
        internalNote: patch.internalNote,
        isUrgent: patch.isUrgent,
        quotationAmount: patch.quotationAmount,
        quotationNote: patch.quotationNote,
        quotationSentAt: patch.quotationSentAt,
        quotationStatus: patch.quotationStatus,
        dealStatus: patch.dealStatus,
        depositAmount: patch.depositAmount,
        depositNote: patch.depositNote,
        confirmedAt: patch.confirmedAt,
        startDate: patch.startDate,
        expectedFinishDate: patch.expectedFinishDate,
        actualFinishDate: patch.actualFinishDate,
        progressPercent: patch.progressPercent,
        progressNote: patch.progressNote,
        workStatus: patch.workStatus,
        deliveredAt: patch.deliveredAt,
        deliveryNote: patch.deliveryNote,
        customerRating: patch.customerRating,
        customerReview: patch.customerReview,
        warrantyStartDate: patch.warrantyStartDate,
        warrantyEndDate: patch.warrantyEndDate,
        warrantyNote: patch.warrantyNote,
      });
      setJobs(updatedJobs);
      setSelectedJob((currentJob) =>
        currentJob?.id === jobId
          ? updatedJobs.find((job) => job.id === jobId) ?? currentJob
          : currentJob,
      );
    } catch {
      setAdminError("บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    }
  }

  if (!isAuthenticated) {
    return (
      <main>
        <section className="px-4 py-14 sm:px-6">
          <div className="card mx-auto max-w-md p-6 sm:p-8">
            <span className="grid size-12 place-items-center rounded-md bg-[oklch(88%_0.08_76)] text-[oklch(31%_0.08_151)]">
              <LockKeyhole size={24} />
            </span>
            <h1 className="mt-5 text-3xl font-black text-stone-950">Admin PIN</h1>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              ใส่ PIN เพื่อเข้าดูรายการงานและจัดการสถานะ
            </p>

            <form className="mt-6 grid gap-4" onSubmit={handleLogin}>
              <label className="grid gap-2 text-sm font-black text-stone-800">
                PIN
                <input
                  className="field"
                  inputMode="numeric"
                  type="password"
                  value={pin}
                  onChange={(event) => setPin(event.target.value)}
                  placeholder="123456"
                />
              </label>
              {loginError && <p className="text-sm font-black text-red-700">{loginError}</p>}
              <button
                type="submit"
                className="min-h-12 rounded-md bg-[oklch(31%_0.08_151)] px-5 font-black text-[oklch(98%_0.014_86)]"
              >
                เข้าสู่ระบบแอดมิน
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageIntro eyebrow="Admin dashboard" title="จัดการรายการงาน TRUST BUILD">
        <p>
          เปลี่ยนสถานะ เพิ่มบันทึกนัดสำรวจ บันทึกภายใน และทำเครื่องหมายงานเร่งด่วน
          ข้อมูลจะบันทึกลง repository ปัจจุบัน พร้อม localStorage fallback
        </p>
      </PageIntro>

      <section className="px-4 pb-14 sm:px-6">
        <div className="mx-auto flex max-w-6xl justify-end pb-4">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-stone-300 bg-stone-100 px-4 py-2 text-sm font-black text-stone-800"
          >
            ออกจากระบบ
          </button>
        </div>

        {adminError && (
          <div className="mx-auto mb-4 max-w-6xl rounded-md bg-red-50 p-3 text-sm font-black leading-7 text-red-700">
            {adminError}
          </div>
        )}

        {isLoadingJobs && (
          <div className="mx-auto mb-4 max-w-6xl rounded-md bg-stone-100 p-3 text-sm font-black leading-7 text-stone-700">
            กำลังโหลดรายการงาน...
          </div>
        )}

        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.label} className="card p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-md bg-[oklch(88%_0.08_76)] text-[oklch(31%_0.08_151)]">
                    <Icon size={22} />
                  </span>
                  <span className="text-4xl font-black text-stone-950">{card.value}</span>
                </div>
                <p className="mt-4 text-sm font-black text-stone-600">{card.label}</p>
              </article>
            );
          })}
        </div>

        <section className="card mx-auto mt-6 max-w-6xl overflow-hidden">
          <div className="border-b border-stone-200 p-5">
            <div className="sm:flex sm:items-end sm:justify-between sm:gap-4">
              <div>
                <p className="text-sm font-black text-[oklch(43%_0.13_76)]">Operations</p>
                <h2 className="mt-1 text-2xl font-black text-stone-950">รายการคำของาน</h2>
              </div>
              <p className="mt-2 text-sm font-bold text-stone-600 sm:mt-0">
                แสดง {filteredJobs.length} จาก {jobs.length} รายการ
              </p>
            </div>

            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {["ทั้งหมด", ...adminStatusBadges].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
                    filter === status
                      ? "bg-[oklch(31%_0.08_151)] text-[oklch(98%_0.014_86)]"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {["ทั้งหมด", ...workStatuses].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setWorkFilter(status)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
                    workFilter === status
                      ? "bg-stone-950 text-[oklch(98%_0.014_86)]"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1320px] border-collapse text-left text-sm">
              <thead className="bg-stone-100 text-xs font-black uppercase text-stone-600">
                <tr>
                  {[
                    "Job",
                    "Customer",
                    "Service",
                    "Budget",
                    "Province",
                    "Status",
                    "Survey note",
                    "Internal note",
                    "Urgent",
                    "Detail",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-4">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="bg-[oklch(99%_0.008_86)] align-top">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {job.isUrgent && <AlertTriangle className="text-red-700" size={18} />}
                        <span className="font-black text-[oklch(31%_0.08_151)]">{job.id}</span>
                      </div>
                      <p className="mt-1 text-xs font-bold text-stone-500">{job.createdDate}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-bold text-stone-950">{job.customerName}</p>
                      <p className="mt-1 text-xs font-semibold text-stone-600">{job.phone}</p>
                    </td>
                    <td className="px-4 py-4 font-semibold text-stone-700">{job.serviceType}</td>
                    <td className="px-4 py-4 font-semibold text-stone-700">{job.budget}</td>
                    <td className="px-4 py-4 font-semibold text-stone-700">{job.province}</td>
                    <td className="px-4 py-4">
                      <div className="grid gap-2">
                        <span
                          className={`inline-flex w-fit whitespace-nowrap rounded-full px-3 py-1 text-xs font-black ${
                            badgeStyles[job.status]
                          }`}
                        >
                          {job.status}
                        </span>
                        <select
                          className="field min-w-44 py-2 text-xs font-bold"
                          value={job.status}
                          onChange={(event) =>
                            patchJob(job.id, { status: event.target.value as JobStatus })
                          }
                        >
                          {adminStatusBadges.map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <textarea
                        className="field min-h-20 min-w-56 resize-y text-xs"
                        value={job.surveyNote}
                        onChange={(event) => patchJob(job.id, { surveyNote: event.target.value })}
                        placeholder="บันทึกนัดสำรวจที่ลูกค้าเห็นได้"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <textarea
                        className="field min-h-20 min-w-56 resize-y text-xs"
                        value={job.internalNote}
                        onChange={(event) => patchJob(job.id, { internalNote: event.target.value })}
                        placeholder="บันทึกภายใน ไม่แสดงให้ลูกค้าเห็น"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <label className="flex items-center gap-2 text-xs font-black text-stone-700">
                        <input
                          className="size-4 accent-[oklch(31%_0.08_151)]"
                          type="checkbox"
                          checked={job.isUrgent}
                          onChange={(event) => patchJob(job.id, { isUrgent: event.target.checked })}
                        />
                        เร่งด่วน
                      </label>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedJob(job)}
                        className="inline-flex items-center gap-2 rounded-md bg-stone-950 px-3 py-2 text-xs font-black text-[oklch(98%_0.014_86)]"
                      >
                        <Eye size={16} />
                        ดูงาน
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSaveQuotation={(patch) => patchJob(selectedJob.id, patch)}
          onSaveDeal={(patch) => patchJob(selectedJob.id, patch)}
          onSaveWorkProgress={(patch) => patchJob(selectedJob.id, patch)}
          onSaveDelivery={(patch) => patchJob(selectedJob.id, patch)}
        />
      )}
    </main>
  );
}

function JobDetailModal({
  job,
  onClose,
  onSaveQuotation,
  onSaveDeal,
  onSaveWorkProgress,
  onSaveDelivery,
}: {
  job: StoredJob;
  onClose: () => void;
  onSaveQuotation: (
    patch: Pick<
      StoredJob,
      "quotationAmount" | "quotationNote" | "quotationSentAt" | "quotationStatus"
    >,
  ) => Promise<void>;
  onSaveDeal: (
    patch: Pick<StoredJob, "dealStatus" | "depositAmount" | "depositNote" | "confirmedAt">,
  ) => Promise<void>;
  onSaveWorkProgress: (
    patch: Pick<
      StoredJob,
      | "startDate"
      | "expectedFinishDate"
      | "actualFinishDate"
      | "progressPercent"
      | "progressNote"
      | "workStatus"
    >,
  ) => Promise<void>;
  onSaveDelivery: (
    patch: Pick<
      StoredJob,
      | "deliveredAt"
      | "deliveryNote"
      | "warrantyStartDate"
      | "warrantyEndDate"
      | "warrantyNote"
    >,
  ) => Promise<void>;
}) {
  const [quotationAmount, setQuotationAmount] = useState(
    job.quotationAmount ? String(job.quotationAmount) : "",
  );
  const [quotationNote, setQuotationNote] = useState(job.quotationNote);
  const [quotationStatus, setQuotationStatus] = useState<QuotationStatus>(job.quotationStatus);
  const [isSavingQuotation, setIsSavingQuotation] = useState(false);
  const [dealStatus, setDealStatus] = useState<DealStatus>(job.dealStatus);
  const [depositAmount, setDepositAmount] = useState(
    job.depositAmount ? String(job.depositAmount) : "",
  );
  const [depositNote, setDepositNote] = useState(job.depositNote);
  const [isSavingDeal, setIsSavingDeal] = useState(false);
  const [startDate, setStartDate] = useState(job.startDate);
  const [expectedFinishDate, setExpectedFinishDate] = useState(job.expectedFinishDate);
  const [actualFinishDate, setActualFinishDate] = useState(job.actualFinishDate);
  const [progressPercent, setProgressPercent] = useState(String(job.progressPercent));
  const [progressNote, setProgressNote] = useState(job.progressNote);
  const [workStatus, setWorkStatus] = useState<WorkStatus>(job.workStatus);
  const [isSavingWorkProgress, setIsSavingWorkProgress] = useState(false);
  const [deliveredAt, setDeliveredAt] = useState(job.deliveredAt);
  const [deliveryNote, setDeliveryNote] = useState(job.deliveryNote);
  const [warrantyStartDate, setWarrantyStartDate] = useState(job.warrantyStartDate);
  const [warrantyEndDate, setWarrantyEndDate] = useState(job.warrantyEndDate);
  const [warrantyNote, setWarrantyNote] = useState(job.warrantyNote);
  const [isSavingDelivery, setIsSavingDelivery] = useState(false);

  useEffect(() => {
    setQuotationAmount(job.quotationAmount ? String(job.quotationAmount) : "");
    setQuotationNote(job.quotationNote);
    setQuotationStatus(job.quotationStatus);
    setDealStatus(job.dealStatus);
    setDepositAmount(job.depositAmount ? String(job.depositAmount) : "");
    setDepositNote(job.depositNote);
    setStartDate(job.startDate);
    setExpectedFinishDate(job.expectedFinishDate);
    setActualFinishDate(job.actualFinishDate);
    setProgressPercent(String(job.progressPercent));
    setProgressNote(job.progressNote);
    setWorkStatus(job.workStatus);
    setDeliveredAt(job.deliveredAt);
    setDeliveryNote(job.deliveryNote);
    setWarrantyStartDate(job.warrantyStartDate);
    setWarrantyEndDate(job.warrantyEndDate);
    setWarrantyNote(job.warrantyNote);
  }, [job]);

  async function handleSaveQuotation() {
    setIsSavingQuotation(true);
    const parsedAmount = quotationAmount.trim() ? Number(quotationAmount) : null;
    const nextQuotationSentAt =
      quotationStatus === "ยังไม่เสนอราคา"
        ? ""
        : job.quotationSentAt || new Date().toISOString();

    await onSaveQuotation({
      quotationAmount: Number.isFinite(parsedAmount) ? parsedAmount : null,
      quotationNote,
      quotationSentAt: nextQuotationSentAt,
      quotationStatus,
    });
    setIsSavingQuotation(false);
  }

  async function handleSaveDeal() {
    setIsSavingDeal(true);
    const parsedDepositAmount = depositAmount.trim() ? Number(depositAmount) : null;
    const nextConfirmedAt =
      dealStatus === "ยังไม่ปิดการขาย" ? "" : job.confirmedAt || new Date().toISOString();

    await onSaveDeal({
      dealStatus,
      depositAmount: Number.isFinite(parsedDepositAmount) ? parsedDepositAmount : null,
      depositNote,
      confirmedAt: nextConfirmedAt,
    });
    setIsSavingDeal(false);
  }

  async function handleSaveWorkProgress() {
    setIsSavingWorkProgress(true);
    const parsedProgressPercent = progressPercent.trim() ? Number(progressPercent) : 0;

    await onSaveWorkProgress({
      startDate,
      expectedFinishDate,
      actualFinishDate,
      progressPercent: Number.isFinite(parsedProgressPercent)
        ? Math.min(100, Math.max(0, parsedProgressPercent))
        : 0,
      progressNote,
      workStatus,
    });
    setIsSavingWorkProgress(false);
  }

  async function handleSaveDelivery() {
    setIsSavingDelivery(true);
    await onSaveDelivery({
      deliveredAt,
      deliveryNote,
      warrantyStartDate,
      warrantyEndDate,
      warrantyNote,
    });
    setIsSavingDelivery(false);
  }

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-stone-950/55 px-4 py-8">
      <div className="card mx-auto max-w-2xl p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black text-[oklch(43%_0.13_76)]">{job.id}</p>
            <h2 className="mt-1 text-2xl font-black text-stone-950">{job.serviceType}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/admin/quotation/${job.id}`}
              className="grid size-10 place-items-center rounded-md bg-[oklch(31%_0.08_151)] text-[oklch(98%_0.014_86)]"
              aria-label="เปิดใบเสนอราคา"
            >
              <FileText size={20} />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="grid size-10 place-items-center rounded-md bg-stone-100 text-stone-800"
              aria-label="ปิดรายละเอียดงาน"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <Link
          href={`/admin/quotation/${job.id}`}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md border border-stone-300 bg-stone-100 px-4 text-sm font-black text-stone-900"
        >
          <FileText size={18} />
          เปิดใบเสนอราคา
        </Link>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            ["Customer name", job.customerName],
            ["Phone", job.phone],
            ["LINE ID", job.lineId || "-"],
            ["Province", job.province],
            ["District", job.district],
            ["Budget", job.budget],
            ["Preferred time", job.surveyTime],
            ["Created date", job.createdDate],
            ["Map link", job.mapsLink || "-"],
            ["Urgent", job.isUrgent ? "ใช่" : "ไม่ใช่"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-black text-stone-500">{label}</dt>
              <dd className="mt-1 break-words font-bold text-stone-900">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-4">
          <section className="rounded-md border border-[oklch(82%_0.08_76)] bg-[oklch(97%_0.02_86)] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black text-[oklch(43%_0.13_76)]">Quotation</p>
                <h3 className="mt-1 text-xl font-black text-stone-950">ใบเสนอราคาเบื้องต้น</h3>
              </div>
              <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-black text-[oklch(98%_0.014_86)]">
                {formatThaiCurrency(job.quotationAmount)}
              </span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-black text-stone-800">
                ยอดเสนอราคา
                <input
                  className="field"
                  inputMode="decimal"
                  min="0"
                  type="number"
                  value={quotationAmount}
                  onChange={(event) => setQuotationAmount(event.target.value)}
                  placeholder="0"
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-stone-800">
                สถานะใบเสนอราคา
                <select
                  className="field"
                  value={quotationStatus}
                  onChange={(event) => setQuotationStatus(event.target.value as QuotationStatus)}
                >
                  {quotationStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm font-black text-stone-800">
              รายละเอียดใบเสนอราคา
              <textarea
                className="field min-h-28 resize-y"
                value={quotationNote}
                onChange={(event) => setQuotationNote(event.target.value)}
                placeholder="สรุปขอบเขตงาน วัสดุ หรือเงื่อนไขที่แจ้งลูกค้า"
              />
            </label>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold text-stone-500">
                {job.quotationSentAt
                  ? `ส่งล่าสุด ${new Date(job.quotationSentAt).toLocaleString("th-TH")}`
                  : "ยังไม่มีวันที่ส่งใบเสนอราคา"}
              </p>
              <button
                type="button"
                onClick={handleSaveQuotation}
                disabled={isSavingQuotation}
                className="min-h-11 rounded-md bg-[oklch(31%_0.08_151)] px-5 text-sm font-black text-[oklch(98%_0.014_86)] disabled:opacity-60"
              >
                {isSavingQuotation ? "กำลังบันทึก..." : "บันทึกใบเสนอราคา"}
              </button>
            </div>
          </section>

          <section className="rounded-md border border-stone-300 bg-stone-100 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black text-[oklch(43%_0.13_76)]">Deal closing</p>
                <h3 className="mt-1 text-xl font-black text-stone-950">ปิดการขายและมัดจำ</h3>
              </div>
              <span className="rounded-full bg-[oklch(31%_0.08_151)] px-3 py-1 text-xs font-black text-[oklch(98%_0.014_86)]">
                {job.dealStatus}
              </span>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-black text-stone-800">
                สถานะปิดการขาย
                <select
                  className="field"
                  value={dealStatus}
                  onChange={(event) => setDealStatus(event.target.value as DealStatus)}
                >
                  {dealStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-black text-stone-800">
                ยอดมัดจำ
                <input
                  className="field"
                  inputMode="decimal"
                  min="0"
                  type="number"
                  value={depositAmount}
                  onChange={(event) => setDepositAmount(event.target.value)}
                  placeholder="0"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm font-black text-stone-800">
              บันทึกมัดจำ
              <textarea
                className="field min-h-24 resize-y"
                value={depositNote}
                onChange={(event) => setDepositNote(event.target.value)}
                placeholder="ช่องทางโอน วันเวลารับมัดจำ หรือเงื่อนไขก่อนเริ่มงาน"
              />
            </label>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold text-stone-500">
                {job.confirmedAt
                  ? `ลูกค้ายืนยัน ${new Date(job.confirmedAt).toLocaleString("th-TH")}`
                  : "ยังไม่มีเวลายืนยันงาน"}
              </p>
              <button
                type="button"
                onClick={handleSaveDeal}
                disabled={isSavingDeal}
                className="min-h-11 rounded-md bg-[oklch(31%_0.08_151)] px-5 text-sm font-black text-[oklch(98%_0.014_86)] disabled:opacity-60"
              >
                {isSavingDeal ? "กำลังบันทึก..." : "บันทึกสถานะปิดการขาย"}
              </button>
            </div>
          </section>

          <section className="rounded-md border border-[oklch(82%_0.08_151)] bg-[oklch(97%_0.02_151)] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black text-[oklch(31%_0.08_151)]">Work progress</p>
                <h3 className="mt-1 text-xl font-black text-stone-950">ความคืบหน้างาน</h3>
              </div>
              <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-black text-[oklch(98%_0.014_86)]">
                {job.progressPercent}%
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-[oklch(31%_0.08_151)]"
                style={{ width: `${Math.min(100, Math.max(0, job.progressPercent))}%` }}
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2 text-sm font-black text-stone-800">
                วันเริ่มงาน
                <input
                  className="field"
                  type="date"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-stone-800">
                วันคาดว่าจะเสร็จ
                <input
                  className="field"
                  type="date"
                  value={expectedFinishDate}
                  onChange={(event) => setExpectedFinishDate(event.target.value)}
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-stone-800">
                วันเสร็จจริง
                <input
                  className="field"
                  type="date"
                  value={actualFinishDate}
                  onChange={(event) => setActualFinishDate(event.target.value)}
                />
              </label>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-black text-stone-800">
                ความคืบหน้า (%)
                <input
                  className="field"
                  inputMode="numeric"
                  min="0"
                  max="100"
                  type="number"
                  value={progressPercent}
                  onChange={(event) => setProgressPercent(event.target.value)}
                  placeholder="0"
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-stone-800">
                สถานะงาน
                <select
                  className="field"
                  value={workStatus}
                  onChange={(event) => setWorkStatus(event.target.value as WorkStatus)}
                >
                  {workStatuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm font-black text-stone-800">
              บันทึกความคืบหน้า
              <textarea
                className="field min-h-24 resize-y"
                value={progressNote}
                onChange={(event) => setProgressNote(event.target.value)}
                placeholder="สรุปงานที่ทำแล้ว งานที่กำลังทำ หรือสิ่งที่ต้องรอลูกค้าตรวจ"
              />
            </label>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSaveWorkProgress}
                disabled={isSavingWorkProgress}
                className="min-h-11 rounded-md bg-[oklch(31%_0.08_151)] px-5 text-sm font-black text-[oklch(98%_0.014_86)] disabled:opacity-60"
              >
                {isSavingWorkProgress ? "กำลังบันทึก..." : "บันทึกความคืบหน้างาน"}
              </button>
            </div>
          </section>

          <section className="rounded-md border border-[oklch(82%_0.08_76)] bg-[oklch(97%_0.02_86)] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black text-[oklch(43%_0.13_76)]">Delivery</p>
                <h3 className="mt-1 text-xl font-black text-stone-950">ส่งมอบและรับประกัน</h3>
              </div>
              {job.customerRating && (
                <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-black text-[oklch(98%_0.014_86)]">
                  รีวิว {job.customerRating}/5
                </span>
              )}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2 text-sm font-black text-stone-800">
                วันที่ส่งมอบ
                <input
                  className="field"
                  type="date"
                  value={deliveredAt}
                  onChange={(event) => setDeliveredAt(event.target.value)}
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-stone-800">
                เริ่มรับประกัน
                <input
                  className="field"
                  type="date"
                  value={warrantyStartDate}
                  onChange={(event) => setWarrantyStartDate(event.target.value)}
                />
              </label>
              <label className="grid gap-2 text-sm font-black text-stone-800">
                สิ้นสุดรับประกัน
                <input
                  className="field"
                  type="date"
                  value={warrantyEndDate}
                  onChange={(event) => setWarrantyEndDate(event.target.value)}
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2 text-sm font-black text-stone-800">
              บันทึกส่งมอบ
              <textarea
                className="field min-h-24 resize-y"
                value={deliveryNote}
                onChange={(event) => setDeliveryNote(event.target.value)}
                placeholder="สรุปงานที่ส่งมอบ จุดที่ลูกค้าตรวจแล้ว หรือสิ่งที่ต้องติดตามหลังส่งมอบ"
              />
            </label>

            <label className="mt-4 grid gap-2 text-sm font-black text-stone-800">
              รายละเอียดรับประกัน
              <textarea
                className="field min-h-24 resize-y"
                value={warrantyNote}
                onChange={(event) => setWarrantyNote(event.target.value)}
                placeholder="ระยะเวลา เงื่อนไข และขอบเขตงานที่รับประกัน"
              />
            </label>

            {job.customerReview && (
              <div className="mt-4 rounded-md bg-stone-100 p-4">
                <p className="text-xs font-black text-stone-500">Customer review</p>
                <p className="mt-2 text-sm font-black text-[oklch(31%_0.08_151)]">
                  {job.customerRating ?? "-"} / 5
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-7 text-stone-800">
                  {job.customerReview}
                </p>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSaveDelivery}
                disabled={isSavingDelivery}
                className="min-h-11 rounded-md bg-[oklch(31%_0.08_151)] px-5 text-sm font-black text-[oklch(98%_0.014_86)] disabled:opacity-60"
              >
                {isSavingDelivery ? "กำลังบันทึก..." : "บันทึกการส่งมอบและรับประกัน"}
              </button>
            </div>
          </section>

          <NoteBlock title="Job detail" text={job.jobDetail} />
          <NoteBlock title="Survey appointment note" text={job.surveyNote || "-"} />
          <NoteBlock title="Internal note" text={job.internalNote || "-"} />
          <div className="rounded-md bg-stone-100 p-4">
            <p className="text-xs font-black text-stone-500">Uploaded photos</p>
            {job.photos.length > 0 ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {job.photos.map((photo) => (
                  <div
                    key={`${photo.filename}-${photo.size}`}
                    className="overflow-hidden rounded-md border border-stone-300 bg-[oklch(99%_0.008_86)]"
                  >
                    {photo.previewDataUrl || photo.fileUrl ? (
                      <img
                        src={photo.previewDataUrl || photo.fileUrl}
                        alt={photo.filename}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    ) : (
                      <div className="grid aspect-[4/3] place-items-center bg-stone-200 text-sm font-black text-stone-500">
                        ไม่มี preview
                      </div>
                    )}
                    <div className="p-3">
                      <p className="truncate text-sm font-black text-stone-950">
                        {photo.filename}
                      </p>
                      <p className="mt-1 text-xs font-bold text-stone-500">
                        {formatFileSize(photo.size)} � {photo.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm font-semibold leading-7 text-stone-800">
                ยังไม่มีรูปแนบ
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NoteBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-md bg-stone-100 p-4">
      <p className="text-xs font-black text-stone-500">{title}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-7 text-stone-800">
        {text}
      </p>
    </div>
  );
}

function currentDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function isWarrantyActive(job: StoredJob) {
  if (!job.warrantyStartDate || !job.warrantyEndDate) {
    return false;
  }

  const today = currentDate();
  return job.warrantyStartDate <= today && job.warrantyEndDate >= today;
}
