import {
  adminStatusBadges,
  dealStatuses,
  jobStatuses,
  mockJobs,
  quotationStatuses,
  workStatuses,
} from "@/components/site-data";

export type JobStatus = (typeof adminStatusBadges)[number];
export type QuotationStatus = (typeof quotationStatuses)[number];
export type DealStatus = (typeof dealStatuses)[number];
export type WorkStatus = (typeof workStatuses)[number];

export type StoredJob = {
  id: string;
  customerName: string;
  phone: string;
  lineId: string;
  province: string;
  district: string;
  mapsLink: string;
  serviceType: string;
  budget: string;
  surveyTime: string;
  jobDetail: string;
  status: JobStatus;
  createdDate: string;
  surveyNote: string;
  internalNote: string;
  isUrgent: boolean;
  quotationAmount: number | null;
  quotationNote: string;
  quotationSentAt: string;
  quotationStatus: QuotationStatus;
  dealStatus: DealStatus;
  depositAmount: number | null;
  depositNote: string;
  confirmedAt: string;
  startDate: string;
  expectedFinishDate: string;
  actualFinishDate: string;
  progressPercent: number;
  progressNote: string;
  workStatus: WorkStatus;
  deliveredAt: string;
  deliveryNote: string;
  customerRating: number | null;
  customerReview: string;
  warrantyStartDate: string;
  warrantyEndDate: string;
  warrantyNote: string;
  photos: JobPhoto[];
};

export type JobPhoto = {
  filename: string;
  size: number;
  type: string;
  previewDataUrl?: string;
  fileUrl?: string;
};

export type JobInput = Omit<
  StoredJob,
  | "id"
  | "status"
  | "createdDate"
  | "surveyNote"
  | "internalNote"
  | "isUrgent"
  | "quotationAmount"
  | "quotationNote"
  | "quotationSentAt"
  | "quotationStatus"
  | "dealStatus"
  | "depositAmount"
  | "depositNote"
  | "confirmedAt"
  | "startDate"
  | "expectedFinishDate"
  | "actualFinishDate"
  | "progressPercent"
  | "progressNote"
  | "workStatus"
  | "deliveredAt"
  | "deliveryNote"
  | "customerRating"
  | "customerReview"
  | "warrantyStartDate"
  | "warrantyEndDate"
  | "warrantyNote"
>;

export type JobAdminPatch = Partial<
  Pick<
    StoredJob,
    | "status"
    | "surveyNote"
    | "internalNote"
    | "isUrgent"
    | "quotationAmount"
    | "quotationNote"
    | "quotationSentAt"
    | "quotationStatus"
    | "dealStatus"
    | "depositAmount"
    | "depositNote"
    | "confirmedAt"
    | "startDate"
    | "expectedFinishDate"
    | "actualFinishDate"
    | "progressPercent"
    | "progressNote"
    | "workStatus"
    | "deliveredAt"
    | "deliveryNote"
    | "customerRating"
    | "customerReview"
    | "warrantyStartDate"
    | "warrantyEndDate"
    | "warrantyNote"
  >
>;

export const STORAGE_KEY = "trust-build.jobs";

export function getStoredJobs(): StoredJob[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawJobs = window.localStorage.getItem(STORAGE_KEY);

  if (!rawJobs) {
    return [];
  }

  try {
    const parsedJobs = JSON.parse(rawJobs);
    return Array.isArray(parsedJobs) ? parsedJobs.filter(isStoredJob).map(normalizeStoredJob) : [];
  } catch {
    return [];
  }
}

export function getJobsWithFallback(): StoredJob[] {
  const storedJobs = getStoredJobs();
  return storedJobs.length > 0 ? storedJobs : getMockStoredJobs();
}

export function createStoredJob(input: JobInput): StoredJob {
  const jobs = getStoredJobs();
  const nextJob: StoredJob = {
    ...input,
    id: generateJobId(jobs),
    status: "รอการติดต่อ",
    createdDate: new Date().toISOString().slice(0, 10),
    surveyNote: "",
    internalNote: "",
    isUrgent: false,
    quotationAmount: null,
    quotationNote: "",
    quotationSentAt: "",
    quotationStatus: "ยังไม่เสนอราคา",
    dealStatus: "ยังไม่ปิดการขาย",
    depositAmount: null,
    depositNote: "",
    confirmedAt: "",
    startDate: "",
    expectedFinishDate: "",
    actualFinishDate: "",
    progressPercent: 0,
    progressNote: "",
    workStatus: "ยังไม่เริ่มงาน",
    deliveredAt: "",
    deliveryNote: "",
    customerRating: null,
    customerReview: "",
    warrantyStartDate: "",
    warrantyEndDate: "",
    warrantyNote: "",
    photos: input.photos,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([nextJob, ...jobs]));
  return nextJob;
}

export function updateStoredJobStatus(jobId: string, status: JobStatus) {
  return updateStoredJob(jobId, { status });
}

export function updateStoredJob(jobId: string, patch: JobAdminPatch) {
  const jobs = getStoredJobs();
  const updatedJobs = jobs.map((job) =>
    job.id === jobId
      ? {
          ...job,
          ...patch,
        }
      : job,
  );

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
  return updatedJobs;
}

export function saveStoredJobs(jobs: StoredJob[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function findJobById(jobId: string) {
  const normalizedJobId = jobId.trim().toUpperCase();
  return getJobsWithFallback().find((job) => job.id.toUpperCase() === normalizedJobId);
}

export function getTimelineIndexForStatus(status: string) {
  const statusToIndex: Record<string, number> = {
    รอการติดต่อ: 0,
    นัดสำรวจแล้ว: 2,
    กำลังประเมินราคา: 3,
    เสนอราคาแล้ว: 4,
    รอลูกค้าตัดสินใจ: 5,
    เริ่มงานแล้ว: 6,
    ส่งมอบแล้ว: 7,
  };

  return statusToIndex[status] ?? 0;
}

export function getTimelineLabel(index: number) {
  return jobStatuses[index] ?? jobStatuses[0];
}

export function generateJobId(jobs: StoredJob[]) {
  const highestJobNumber = jobs.reduce((highestNumber, job) => {
    const match = job.id.match(/^TB-(\d{4})$/);
    const jobNumber = match ? Number(match[1]) : 0;
    return Math.max(highestNumber, jobNumber);
  }, 0);

  return `TB-${String(highestJobNumber + 1).padStart(4, "0")}`;
}

export function getMockStoredJobs(): StoredJob[] {
  return mockJobs.map((job) => ({
    id: job.id,
    customerName: job.customer,
    phone: job.phone,
    lineId: "-",
    province: job.province,
    district: "-",
    mapsLink: "",
    serviceType: job.service,
    budget: job.budget,
    surveyTime: "-",
    jobDetail: "ข้อมูลตัวอย่างสำหรับทดสอบระบบ",
    status: job.status as JobStatus,
    createdDate: job.created,
    surveyNote: "",
    internalNote: "",
    isUrgent: false,
    quotationAmount: null,
    quotationNote: "",
    quotationSentAt: "",
    quotationStatus: "ยังไม่เสนอราคา",
    dealStatus: "ยังไม่ปิดการขาย",
    depositAmount: null,
    depositNote: "",
    confirmedAt: "",
    startDate: "",
    expectedFinishDate: "",
    actualFinishDate: "",
    progressPercent: 0,
    progressNote: "",
    workStatus: "ยังไม่เริ่มงาน",
    deliveredAt: "",
    deliveryNote: "",
    customerRating: null,
    customerReview: "",
    warrantyStartDate: "",
    warrantyEndDate: "",
    warrantyNote: "",
    photos: [],
  }));
}

function isStoredJob(value: unknown): value is StoredJob {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<StoredJob>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.customerName === "string" &&
    typeof candidate.phone === "string" &&
    typeof candidate.serviceType === "string" &&
    typeof candidate.budget === "string" &&
    typeof candidate.province === "string" &&
    typeof candidate.status === "string" &&
    typeof candidate.createdDate === "string"
  );
}

function normalizeStoredJob(job: StoredJob): StoredJob {
  return {
    ...job,
    surveyNote: typeof job.surveyNote === "string" ? job.surveyNote : "",
    internalNote: typeof job.internalNote === "string" ? job.internalNote : "",
    isUrgent: typeof job.isUrgent === "boolean" ? job.isUrgent : false,
    quotationAmount: typeof job.quotationAmount === "number" ? job.quotationAmount : null,
    quotationNote: typeof job.quotationNote === "string" ? job.quotationNote : "",
    quotationSentAt: typeof job.quotationSentAt === "string" ? job.quotationSentAt : "",
    quotationStatus: quotationStatuses.includes(job.quotationStatus)
      ? job.quotationStatus
      : "ยังไม่เสนอราคา",
    dealStatus: dealStatuses.includes(job.dealStatus) ? job.dealStatus : "ยังไม่ปิดการขาย",
    depositAmount: typeof job.depositAmount === "number" ? job.depositAmount : null,
    depositNote: typeof job.depositNote === "string" ? job.depositNote : "",
    confirmedAt: typeof job.confirmedAt === "string" ? job.confirmedAt : "",
    startDate: typeof job.startDate === "string" ? job.startDate : "",
    expectedFinishDate: typeof job.expectedFinishDate === "string" ? job.expectedFinishDate : "",
    actualFinishDate: typeof job.actualFinishDate === "string" ? job.actualFinishDate : "",
    progressPercent:
      typeof job.progressPercent === "number"
        ? Math.min(100, Math.max(0, job.progressPercent))
        : 0,
    progressNote: typeof job.progressNote === "string" ? job.progressNote : "",
    workStatus: workStatuses.includes(job.workStatus) ? job.workStatus : "ยังไม่เริ่มงาน",
    deliveredAt: typeof job.deliveredAt === "string" ? job.deliveredAt : "",
    deliveryNote: typeof job.deliveryNote === "string" ? job.deliveryNote : "",
    customerRating:
      typeof job.customerRating === "number"
        ? Math.min(5, Math.max(1, job.customerRating))
        : null,
    customerReview: typeof job.customerReview === "string" ? job.customerReview : "",
    warrantyStartDate: typeof job.warrantyStartDate === "string" ? job.warrantyStartDate : "",
    warrantyEndDate: typeof job.warrantyEndDate === "string" ? job.warrantyEndDate : "",
    warrantyNote: typeof job.warrantyNote === "string" ? job.warrantyNote : "",
    photos: Array.isArray(job.photos) ? job.photos.filter(isJobPhoto) : [],
  };
}

function isJobPhoto(value: unknown): value is JobPhoto {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<JobPhoto>;

  return (
    typeof candidate.filename === "string" &&
    typeof candidate.size === "number" &&
    typeof candidate.type === "string"
  );
}
