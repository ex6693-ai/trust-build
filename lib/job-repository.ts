import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  createStoredJob,
  findJobById,
  generateJobId,
  getJobsWithFallback,
  getMockStoredJobs,
  getStoredJobs,
  saveStoredJobs,
  updateStoredJob,
  type DealStatus,
  type JobAdminPatch,
  type JobInput,
  type JobPhoto,
  type JobStatus,
  type QuotationStatus,
  type StoredJob,
  type WorkStatus,
} from "@/lib/local-jobs";

export type {
  DealStatus,
  JobAdminPatch,
  JobInput,
  JobPhoto,
  JobStatus,
  QuotationStatus,
  StoredJob,
  WorkStatus,
} from "@/lib/local-jobs";

type SupabaseJobRow = {
  id: string;
  job_id: string;
  customer_name: string;
  phone: string;
  line_id: string | null;
  province: string;
  district: string;
  map_link: string | null;
  service_type: string;
  budget_range: string;
  preferred_time: string;
  job_detail: string;
  status: string;
  survey_note: string | null;
  internal_note: string | null;
  is_urgent: boolean | null;
  quotation_amount: number | null;
  quotation_note: string | null;
  quotation_sent_at: string | null;
  quotation_status: string | null;
  deal_status: string | null;
  deposit_amount: number | null;
  deposit_note: string | null;
  confirmed_at: string | null;
  start_date: string | null;
  expected_finish_date: string | null;
  actual_finish_date: string | null;
  progress_percent: number | null;
  progress_note: string | null;
  work_status: string | null;
  delivered_at: string | null;
  delivery_note: string | null;
  customer_rating: number | null;
  customer_review: string | null;
  warranty_start_date: string | null;
  warranty_end_date: string | null;
  warranty_note: string | null;
  created_at: string;
  updated_at: string;
};

type SupabasePhotoRow = {
  job_id: string;
  file_name: string;
  file_url: string | null;
  file_type: string;
  file_size: number;
  created_at: string;
};

export type JobRepositoryMode = "localStorage" | "supabase";

export function getJobRepositoryMode(): JobRepositoryMode {
  return isSupabaseConfigured ? "supabase" : "localStorage";
}

export async function listJobs(): Promise<StoredJob[]> {
  if (getJobRepositoryMode() === "supabase") {
    const supabaseJobs = await tryListSupabaseJobs();

    if (supabaseJobs.length > 0) {
      return supabaseJobs;
    }
  }

  return getJobsWithFallback();
}

export async function createJob(input: JobInput): Promise<StoredJob> {
  if (getJobRepositoryMode() === "supabase") {
    const supabaseJob = await tryCreateSupabaseJob(input);

    if (supabaseJob) {
      return supabaseJob;
    }
  }

  return createStoredJob(input);
}

export async function findJob(jobId: string): Promise<StoredJob | null> {
  if (getJobRepositoryMode() === "supabase") {
    const supabaseJob = await tryFindSupabaseJob(jobId);

    if (supabaseJob) {
      return supabaseJob;
    }
  }

  return findJobById(jobId) ?? null;
}

export async function updateJobStatus(jobId: string, status: JobStatus): Promise<StoredJob[]> {
  return updateJobAdminFields(jobId, { status });
}

export async function updateJobAdminFields(
  jobId: string,
  patch: JobAdminPatch,
): Promise<StoredJob[]> {
  if (getJobRepositoryMode() === "supabase") {
    const supabaseJobs = await tryUpdateSupabaseJob(jobId, patch);

    if (supabaseJobs) {
      return supabaseJobs.length > 0 ? supabaseJobs : getMockStoredJobs();
    }
  }

  const storedJobs = getStoredJobs();

  if (storedJobs.length === 0) {
    const seededJobs = getMockStoredJobs().map((job) =>
      job.id === jobId
        ? {
            ...job,
            ...patch,
          }
        : job,
    );
    saveStoredJobs(seededJobs);
    return seededJobs;
  }

  return updateStoredJob(jobId, patch);
}

async function tryListSupabaseJobs(): Promise<StoredJob[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const photoRows = await tryListSupabasePhotoRows(data.map((job) => job.job_id));

  return data.map((row) => mapSupabaseRowToStoredJob(row, photoRows));
}

async function tryCreateSupabaseJob(input: JobInput): Promise<StoredJob | null> {
  if (!supabase) {
    return null;
  }

  const existingJobs = await tryListSupabaseJobs();
  const nextJobId = generateJobId(existingJobs);

  const { data, error } = await supabase
    .from("jobs")
    .insert({
      job_id: nextJobId,
      customer_name: input.customerName,
      phone: input.phone,
      line_id: input.lineId || null,
      province: input.province,
      district: input.district,
      map_link: input.mapsLink || null,
      service_type: input.serviceType,
      budget_range: input.budget,
      preferred_time: input.surveyTime,
      job_detail: input.jobDetail,
      status: "รอการติดต่อ",
      survey_note: "",
      internal_note: "",
      is_urgent: false,
      quotation_amount: null,
      quotation_note: "",
      quotation_sent_at: null,
      quotation_status: "ยังไม่เสนอราคา",
      deal_status: "ยังไม่ปิดการขาย",
      deposit_amount: null,
      deposit_note: "",
      confirmed_at: null,
      start_date: null,
      expected_finish_date: null,
      actual_finish_date: null,
      progress_percent: 0,
      progress_note: "",
      work_status: "ยังไม่เริ่มงาน",
      delivered_at: null,
      delivery_note: "",
      customer_rating: null,
      customer_review: "",
      warranty_start_date: null,
      warranty_end_date: null,
      warranty_note: "",
    })
    .select("*")
    .single();

  if (error || !data) {
    return null;
  }

  await tryInsertSupabasePhotoRows(nextJobId, input.photos);

  return {
    ...mapSupabaseRowToStoredJob(data, []),
    photos: input.photos,
  };
}

async function tryFindSupabaseJob(jobId: string): Promise<StoredJob | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("job_id", jobId.trim().toUpperCase())
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const photoRows = await tryListSupabasePhotoRows([data.job_id]);
  return mapSupabaseRowToStoredJob(data, photoRows);
}

async function tryUpdateSupabaseJob(
  jobId: string,
  patch: JobAdminPatch,
): Promise<StoredJob[] | null> {
  if (!supabase) {
    return null;
  }

  const supabasePatch: Partial<SupabaseJobRow> = {};

  if (patch.status !== undefined) {
    supabasePatch.status = patch.status;
  }

  if (patch.surveyNote !== undefined) {
    supabasePatch.survey_note = patch.surveyNote;
  }

  if (patch.internalNote !== undefined) {
    supabasePatch.internal_note = patch.internalNote;
  }

  if (patch.isUrgent !== undefined) {
    supabasePatch.is_urgent = patch.isUrgent;
  }

  if (patch.quotationAmount !== undefined) {
    supabasePatch.quotation_amount = patch.quotationAmount;
  }

  if (patch.quotationNote !== undefined) {
    supabasePatch.quotation_note = patch.quotationNote;
  }

  if (patch.quotationSentAt !== undefined) {
    supabasePatch.quotation_sent_at = patch.quotationSentAt || null;
  }

  if (patch.quotationStatus !== undefined) {
    supabasePatch.quotation_status = patch.quotationStatus;
  }

  if (patch.dealStatus !== undefined) {
    supabasePatch.deal_status = patch.dealStatus;
  }

  if (patch.depositAmount !== undefined) {
    supabasePatch.deposit_amount = patch.depositAmount;
  }

  if (patch.depositNote !== undefined) {
    supabasePatch.deposit_note = patch.depositNote;
  }

  if (patch.confirmedAt !== undefined) {
    supabasePatch.confirmed_at = patch.confirmedAt || null;
  }

  if (patch.startDate !== undefined) {
    supabasePatch.start_date = patch.startDate || null;
  }

  if (patch.expectedFinishDate !== undefined) {
    supabasePatch.expected_finish_date = patch.expectedFinishDate || null;
  }

  if (patch.actualFinishDate !== undefined) {
    supabasePatch.actual_finish_date = patch.actualFinishDate || null;
  }

  if (patch.progressPercent !== undefined) {
    supabasePatch.progress_percent = patch.progressPercent;
  }

  if (patch.progressNote !== undefined) {
    supabasePatch.progress_note = patch.progressNote;
  }

  if (patch.workStatus !== undefined) {
    supabasePatch.work_status = patch.workStatus;
  }

  if (patch.deliveredAt !== undefined) {
    supabasePatch.delivered_at = patch.deliveredAt || null;
  }

  if (patch.deliveryNote !== undefined) {
    supabasePatch.delivery_note = patch.deliveryNote;
  }

  if (patch.customerRating !== undefined) {
    supabasePatch.customer_rating = patch.customerRating;
  }

  if (patch.customerReview !== undefined) {
    supabasePatch.customer_review = patch.customerReview;
  }

  if (patch.warrantyStartDate !== undefined) {
    supabasePatch.warranty_start_date = patch.warrantyStartDate || null;
  }

  if (patch.warrantyEndDate !== undefined) {
    supabasePatch.warranty_end_date = patch.warrantyEndDate || null;
  }

  if (patch.warrantyNote !== undefined) {
    supabasePatch.warranty_note = patch.warrantyNote;
  }

  const { data, error } = await supabase
    .from("jobs")
    .update({
      ...supabasePatch,
      updated_at: new Date().toISOString(),
    })
    .eq("job_id", jobId)
    .select("job_id");

  if (error || !data || data.length === 0) {
    return null;
  }

  return tryListSupabaseJobs();
}

async function tryListSupabasePhotoRows(jobIds: string[]): Promise<SupabasePhotoRow[]> {
  if (!supabase || jobIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("job_photos")
    .select("*")
    .in("job_id", jobIds);

  if (error || !data) {
    return [];
  }

  return data;
}

async function tryInsertSupabasePhotoRows(jobId: string, photos: JobPhoto[]) {
  if (!supabase || photos.length === 0) {
    return;
  }

  await supabase.from("job_photos").insert(
    photos.map((photo) => ({
      job_id: jobId,
      file_name: photo.filename,
      file_url: photo.fileUrl ?? null,
      file_type: photo.type,
      file_size: photo.size,
    })),
  );
}

function mapSupabaseRowToStoredJob(
  row: SupabaseJobRow,
  photoRows: SupabasePhotoRow[],
): StoredJob {
  return {
    id: row.job_id,
    customerName: row.customer_name,
    phone: row.phone,
    lineId: row.line_id ?? "",
    province: row.province,
    district: row.district,
    mapsLink: row.map_link ?? "",
    serviceType: row.service_type,
    budget: row.budget_range,
    surveyTime: row.preferred_time,
    jobDetail: row.job_detail,
    status: row.status as JobStatus,
    createdDate: row.created_at.slice(0, 10),
    surveyNote: row.survey_note ?? "",
    internalNote: row.internal_note ?? "",
    isUrgent: Boolean(row.is_urgent),
    quotationAmount:
      typeof row.quotation_amount === "number" ? row.quotation_amount : Number(row.quotation_amount) || null,
    quotationNote: row.quotation_note ?? "",
    quotationSentAt: row.quotation_sent_at ?? "",
    quotationStatus: (row.quotation_status ?? "ยังไม่เสนอราคา") as QuotationStatus,
    dealStatus: (row.deal_status ?? "ยังไม่ปิดการขาย") as DealStatus,
    depositAmount:
      typeof row.deposit_amount === "number" ? row.deposit_amount : Number(row.deposit_amount) || null,
    depositNote: row.deposit_note ?? "",
    confirmedAt: row.confirmed_at ?? "",
    startDate: row.start_date ?? "",
    expectedFinishDate: row.expected_finish_date ?? "",
    actualFinishDate: row.actual_finish_date ?? "",
    progressPercent:
      typeof row.progress_percent === "number"
        ? Math.min(100, Math.max(0, row.progress_percent))
        : Number(row.progress_percent) || 0,
    progressNote: row.progress_note ?? "",
    workStatus: (row.work_status ?? "ยังไม่เริ่มงาน") as WorkStatus,
    deliveredAt: row.delivered_at ?? "",
    deliveryNote: row.delivery_note ?? "",
    customerRating:
      typeof row.customer_rating === "number"
        ? Math.min(5, Math.max(1, row.customer_rating))
        : Number(row.customer_rating) || null,
    customerReview: row.customer_review ?? "",
    warrantyStartDate: row.warranty_start_date ?? "",
    warrantyEndDate: row.warranty_end_date ?? "",
    warrantyNote: row.warranty_note ?? "",
    photos: photoRows
      .filter((photo) => photo.job_id === row.job_id)
      .map((photo) => ({
        filename: photo.file_name,
        size: photo.file_size,
        type: photo.file_type,
        fileUrl: photo.file_url ?? undefined,
      })),
  };
}
