"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { portfolioItems } from "@/components/site-data";
import { PageIntro } from "@/components/site-shell";
import { listJobs, type StoredJob } from "@/lib/job-repository";

export default function PortfolioPage() {
  const [completedJobs, setCompletedJobs] = useState<StoredJob[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [portfolioError, setPortfolioError] = useState("");

  useEffect(() => {
    listJobs()
      .then((jobs) =>
        setCompletedJobs(
          jobs.filter((job) => job.workStatus === "ส่งมอบแล้ว" && Boolean(job.customerRating)),
        ),
      )
      .catch(() =>
        setPortfolioError("โหลดผลงานจากระบบไม่สำเร็จ ตอนนี้ยังสามารถดูผลงานตัวอย่างได้ตามปกติ"),
      )
      .finally(() => setIsLoadingJobs(false));
  }, []);

  return (
    <main>
      <PageIntro eyebrow="ผลงานที่ผ่านมา" title="ตัวอย่างงานก่อนและหลังของไว้ใจช่าง">
        <p>
          แสดงผลงานตัวอย่างสำหรับ MVP ก่อนใช้รูปจริง
          โดยวางโครงให้รองรับภาพ before / after ของงานลูกค้าในอนาคต
        </p>
      </PageIntro>

      <section className="px-4 pb-14 sm:px-6">
        {isLoadingJobs && (
          <div className="card mx-auto mb-8 max-w-6xl p-5">
            <h2 className="text-2xl font-black text-stone-950">กำลังโหลดผลงานจริง...</h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
              ระบบกำลังตรวจสอบงานที่ส่งมอบแล้วและรีวิวจากลูกค้า
            </p>
          </div>
        )}

        {portfolioError && (
          <div className="card mx-auto mb-8 max-w-6xl p-5">
            <h2 className="text-2xl font-black text-stone-950">ยังโหลดผลงานจริงไม่ได้</h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-red-700">
              {portfolioError}
            </p>
          </div>
        )}

        {!isLoadingJobs && completedJobs.length > 0 ? (
          <div className="mx-auto mb-8 max-w-6xl">
            <h2 className="text-2xl font-black text-stone-950">งานส่งมอบจากลูกค้าจริง</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              {completedJobs.map((job) => (
                <article
                  key={job.id}
                  className="rounded-lg border border-stone-300 bg-[oklch(99%_0.008_86)] p-5 shadow-[0_18px_50px_oklch(42%_0.045_76_/_0.1)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-[oklch(43%_0.13_76)]">{job.id}</p>
                      <h3 className="mt-1 text-2xl font-black text-stone-950">
                        {job.serviceType}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-stone-950 px-3 py-1 text-xs font-black text-[oklch(98%_0.014_86)]">
                      <Star size={14} />
                      {job.customerRating}/5
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-bold text-stone-600">
                    {job.province} {job.district}
                  </p>
                  {job.customerReview && (
                    <p className="mt-4 whitespace-pre-wrap leading-7 text-stone-700">
                      {job.customerReview}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        ) : !isLoadingJobs && !portfolioError ? (
          <div className="card mx-auto mb-8 max-w-6xl p-5">
            <h2 className="text-2xl font-black text-stone-950">ยังไม่มีผลงานจริงจากระบบ</h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-stone-600">
              เมื่อมีงานที่ส่งมอบแล้วและลูกค้าให้คะแนน ระบบจะแสดงผลงานจริงในส่วนนี้ ตอนนี้ยังแสดงตัวอย่างผลงานสำหรับ MVP ไว้ด้านล่าง
            </p>
          </div>
        ) : null}

        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          {portfolioItems.map((project, index) => (
            <article key={project.title} className="overflow-hidden rounded-lg border border-stone-300 bg-[oklch(99%_0.008_86)] shadow-[0_18px_50px_oklch(42%_0.045_76_/_0.1)]">
              <div className="grid grid-cols-2">
                <PortfolioPlaceholder label="Before" index={index} />
                <PortfolioPlaceholder label="After" index={index + 1} />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm font-black text-stone-600">
                  <MapPin size={16} />
                  {project.area}
                </div>
                <h2 className="mt-3 text-2xl font-black text-stone-950">{project.title}</h2>
                <p className="mt-2 font-bold text-[oklch(43%_0.13_76)]">
                  {project.serviceType}
                </p>
                <p className="mt-3 leading-7 text-stone-700">{project.result}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-6xl rounded-lg bg-[oklch(31%_0.08_151)] p-6 text-[oklch(98%_0.014_86)] sm:p-8">
          <h2 className="text-3xl font-black">มีงานคล้ายกันที่บ้านคุณไหม</h2>
          <p className="mt-3 max-w-2xl leading-8 text-stone-200">
            ส่งรูปหน้างานและคำอธิบายสั้น ๆ ทีมจะช่วยจัดประเภทงานและประเมินขั้นตอนถัดไป
          </p>
          <Link
            href="/request"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-[oklch(84%_0.12_76)] px-5 py-3 font-black text-stone-950"
          >
            นัดสำรวจงาน
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function PortfolioPlaceholder({ label, index }: { label: string; index: number }) {
  return (
    <div
      className={`grid aspect-[4/3] place-items-center ${
        index % 2 === 0 ? "bg-[oklch(84%_0.08_76)]" : "bg-[oklch(82%_0.07_151)]"
      }`}
    >
      <span className="rounded-full bg-stone-950/80 px-3 py-1 text-xs font-black text-[oklch(98%_0.014_86)]">
        {label}
      </span>
    </div>
  );
}
