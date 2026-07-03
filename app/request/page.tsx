"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Send,
} from "lucide-react";
import {
  budgetRanges,
  requestServiceTypes,
  surveyTimes,
} from "@/components/site-data";
import { createJob } from "@/lib/job-repository";
import { type JobPhoto, type StoredJob } from "@/lib/local-jobs";
import { PageIntro } from "@/components/site-shell";

type SelectedPhoto = JobPhoto & {
  previewUrl: string;
};

const MAX_PHOTOS = 10;
const DATA_URL_LIMIT_BYTES = 750_000;

export default function RequestPage() {
  const [createdJob, setCreatedJob] = useState<StoredJob | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      selectedPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
    };
  }, [selectedPhotos]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const nextJob = await createJob({
        customerName: getFormValue(formData, "customerName"),
        phone: getFormValue(formData, "phone"),
        lineId: getFormValue(formData, "lineId"),
        province: getFormValue(formData, "province"),
        district: getFormValue(formData, "district"),
        mapsLink: getFormValue(formData, "mapsLink"),
        serviceType: getFormValue(formData, "serviceType"),
        budget: getFormValue(formData, "budgetRange"),
        surveyTime: getFormValue(formData, "surveyTime"),
        jobDetail: getFormValue(formData, "jobDetail"),
        photos: selectedPhotos.map(({ previewUrl, ...photo }) => photo),
      });

      setCreatedJob(nextJob);
      event.currentTarget.reset();
      selectedPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));
      setSelectedPhotos([]);
      setPhotoError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError("ส่งข้อมูลไม่สำเร็จ กรุณาตรวจสอบข้อมูลและลองอีกครั้ง หรือติดต่อทีมงานทาง LINE");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length > MAX_PHOTOS) {
      setPhotoError(`เลือกได้สูงสุด ${MAX_PHOTOS} รูป กรุณาลดจำนวนรูปแล้วลองอีกครั้ง`);
      event.target.value = "";
      return;
    }

    const nonImageFile = files.find((file) => !file.type.startsWith("image/"));

    if (nonImageFile) {
      setPhotoError("กรุณาเลือกเฉพาะไฟล์รูปภาพเท่านั้น");
      event.target.value = "";
      return;
    }

    selectedPhotos.forEach((photo) => URL.revokeObjectURL(photo.previewUrl));

    const nextPhotos = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        size: file.size,
        type: file.type,
        previewUrl: URL.createObjectURL(file),
        previewDataUrl:
          file.size <= DATA_URL_LIMIT_BYTES ? await readFileAsDataUrl(file) : undefined,
      })),
    );

    setSelectedPhotos(nextPhotos);
    setPhotoError("");
  }

  return (
    <main>
      <PageIntro eyebrow="นัดสำรวจงาน" title="ส่งข้อมูลเพื่อให้ทีมไว้ใจช่างประเมินงาน">
        <p>
          กรอกข้อมูลหน้างานให้ครบ ทีมงานจะติดต่อกลับเพื่อยืนยันวันสำรวจ
          เหมาะสำหรับลูกค้าที่เปิดจาก LINE Rich Menu และต้องการส่งเรื่องอย่างรวดเร็ว
        </p>
      </PageIntro>

      <section className="px-4 pb-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_360px]">
          <form className="card grid gap-5 p-5 sm:p-7" onSubmit={handleSubmit}>
            {createdJob && (
              <div
                className="rounded-lg border border-[oklch(71%_0.12_151)] bg-[oklch(91%_0.07_151)] p-5 text-[oklch(24%_0.07_151)]"
                role="status"
              >
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0" size={24} />
                  <div>
                    <p className="font-black leading-7">
                      ส่งข้อมูลสำเร็จ ทีมงานจะติดต่อกลับเพื่อยืนยันวันสำรวจหน้างาน
                    </p>
                    <p className="mt-2 text-sm font-bold">
                      กรุณาเก็บเลขงานนี้ไว้สำหรับติดตามสถานะ
                    </p>
                  </div>
                </div>

                <dl className="mt-5 grid gap-3 rounded-md bg-[oklch(98%_0.014_86)] p-4 text-stone-900 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-black text-stone-500">Job ID</dt>
                    <dd className="mt-1 text-xl font-black text-[oklch(31%_0.08_151)]">
                      {createdJob.id}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-black text-stone-500">Customer name</dt>
                    <dd className="mt-1 font-black">{createdJob.customerName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-black text-stone-500">Service type</dt>
                    <dd className="mt-1 font-black">{createdJob.serviceType}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Customer name">
                <input className="field" name="customerName" placeholder="ชื่อผู้ติดต่อ" required />
              </Field>
              <Field label="Phone number">
                <input className="field" name="phone" placeholder="08x-xxx-xxxx" required />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="LINE ID">
                <input className="field" name="lineId" placeholder="LINE ID สำหรับติดต่อกลับ" />
              </Field>
              <Field label="Province">
                <input className="field" name="province" placeholder="จังหวัด" required />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="District">
                <input className="field" name="district" placeholder="เขต / อำเภอ" required />
              </Field>
              <Field label="Google Maps location link">
                <input
                  className="field"
                  name="mapsLink"
                  placeholder="https://maps.google.com/..."
                  type="url"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Service type">
                <select className="field" name="serviceType" defaultValue="" required>
                  <option value="" disabled>
                    เลือกประเภทงาน
                  </option>
                  {requestServiceTypes.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </Field>
              <Field label="Budget range">
                <select className="field" name="budgetRange" defaultValue="" required>
                  <option value="" disabled>
                    เลือกงบประมาณ
                  </option>
                  {budgetRanges.map((range) => (
                    <option key={range}>{range}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Preferred survey time">
              <div className="grid gap-3 sm:grid-cols-3">
                {surveyTimes.map((time) => (
                  <label
                    key={time}
                    className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-stone-300 bg-stone-100 px-4 text-sm font-black text-stone-800 has-[:checked]:border-[oklch(31%_0.08_151)] has-[:checked]:bg-[oklch(88%_0.08_76)]"
                  >
                    <input
                      className="size-4 accent-[oklch(31%_0.08_151)]"
                      name="surveyTime"
                      type="radio"
                      value={time}
                      required
                    />
                    {time}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Job detail">
              <textarea
                className="field min-h-36 resize-y"
                name="jobDetail"
                placeholder="อธิบายงานที่ต้องการ เช่น รีโนเวทห้องครัว ซ่อมน้ำรั่ว ต่อเติมหลังบ้าน หรือรายละเอียดอื่น ๆ"
                required
              />
            </Field>

            <div className="rounded-md border border-dashed border-stone-300 bg-stone-100 p-5">
              <Camera className="text-[oklch(43%_0.13_76)]" />
              <p className="mt-3 font-black text-stone-950">แนบรูปหน้างาน</p>
              <p className="mt-1 text-sm leading-7 text-stone-600">
                เลือกรูปภาพได้สูงสุด 10 รูป รองรับเฉพาะไฟล์รูปภาพ
              </p>
              <label className="mt-4 inline-flex cursor-pointer rounded-md border border-stone-300 bg-[oklch(99%_0.008_86)] px-4 py-3 text-sm font-black text-stone-900">
                เลือกรูปภาพ
                <input
                  className="sr-only"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                />
              </label>

              {photoError && (
                <p className="mt-3 rounded-md bg-red-50 p-3 text-sm font-black text-red-700">
                  {photoError}
                </p>
              )}

              {selectedPhotos.length > 0 && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedPhotos.map((photo) => (
                    <div key={`${photo.filename}-${photo.size}`} className="overflow-hidden rounded-md border border-stone-300 bg-[oklch(99%_0.008_86)]">
                      <img
                        src={photo.previewUrl}
                        alt={photo.filename}
                        className="aspect-[4/3] w-full object-cover"
                      />
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
              )}
            </div>

            <div className="rounded-md border border-stone-300 bg-stone-100 p-4">
              <p className="text-sm font-black text-stone-900">ประกาศความเป็นส่วนตัว</p>
              <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
                ข้อมูลที่กรอกใช้เพื่อประเมินงาน นัดสำรวจ และติดต่อกลับเท่านั้น
              </p>
              <label className="mt-4 flex items-start gap-3 text-sm font-black leading-7 text-stone-800">
                <input
                  className="mt-1 size-4 shrink-0 accent-[oklch(31%_0.08_151)]"
                  name="consent"
                  type="checkbox"
                  required
                />
                ยินยอมให้ทีมไว้ใจช่างติดต่อกลับเพื่อประเมินและนัดสำรวจหน้างาน
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-[oklch(31%_0.08_151)] px-5 py-4 font-black text-[oklch(98%_0.014_86)] disabled:opacity-60"
            >
              {isSubmitting ? "กำลังส่งข้อมูล..." : "ส่งข้อมูลนัดสำรวจหน้างาน"}
              <Send size={18} />
            </button>
            {submitError && (
              <p className="rounded-md bg-red-50 p-3 text-sm font-black leading-7 text-red-700">
                {submitError}
              </p>
            )}
          </form>

          <aside className="grid gap-4 self-start">
            {[
              {
                icon: ClipboardList,
                title: "ข้อมูลครบ ประเมินเร็ว",
                text: "รายละเอียด พื้นที่ งบประมาณ และเวลาสำรวจช่วยให้ทีมจัดคิวได้แม่นขึ้น",
              },
              {
                icon: MapPin,
                title: "ส่งลิงก์แผนที่",
                text: "Google Maps link ช่วยลดความคลาดเคลื่อนตอนนัดสำรวจหน้างาน",
              },
              {
                icon: CalendarClock,
                title: "เลือกช่วงเวลาสะดวก",
                text: "เช้า บ่าย หรือเย็น เพื่อให้ทีมติดต่อยืนยันอีกครั้ง",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card p-5">
                  <Icon className="text-[oklch(43%_0.13_76)]" />
                  <h2 className="mt-4 font-black text-stone-950">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-stone-600">{item.text}</p>
                </div>
              );
            })}
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-stone-800">
      {label}
      {children}
    </label>
  );
}

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}
