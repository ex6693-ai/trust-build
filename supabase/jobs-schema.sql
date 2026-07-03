create extension if not exists "pgcrypto";

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  job_id text not null unique,
  customer_name text not null,
  phone text not null,
  line_id text,
  province text not null,
  district text not null,
  map_link text,
  service_type text not null,
  budget_range text not null,
  preferred_time text not null,
  job_detail text not null,
  status text not null default 'รอการติดต่อ',
  survey_note text not null default '',
  internal_note text not null default '',
  is_urgent boolean not null default false,
  quotation_amount numeric(12,2),
  quotation_note text not null default '',
  quotation_sent_at timestamptz,
  quotation_status text not null default 'ยังไม่เสนอราคา',
  deal_status text not null default 'ยังไม่ปิดการขาย',
  deposit_amount numeric(12,2),
  deposit_note text not null default '',
  confirmed_at timestamptz,
  start_date date,
  expected_finish_date date,
  actual_finish_date date,
  progress_percent integer not null default 0,
  progress_note text not null default '',
  work_status text not null default 'ยังไม่เริ่มงาน',
  delivered_at date,
  delivery_note text not null default '',
  customer_rating integer,
  customer_review text not null default '',
  warranty_start_date date,
  warranty_end_date date,
  warranty_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint jobs_status_check check (
    status in (
      'รอการติดต่อ',
      'นัดสำรวจแล้ว',
      'กำลังประเมินราคา',
      'เสนอราคาแล้ว',
      'รอลูกค้าตัดสินใจ',
      'เริ่มงานแล้ว',
      'ส่งมอบแล้ว'
    )
  ),
  constraint jobs_quotation_status_check check (
    quotation_status in (
      'ยังไม่เสนอราคา',
      'ส่งใบเสนอราคาแล้ว',
      'ลูกค้าสนใจ',
      'ลูกค้าปฏิเสธ',
      'ปิดการขายแล้ว'
    )
  ),
  constraint jobs_deal_status_check check (
    deal_status in (
      'ยังไม่ปิดการขาย',
      'ลูกค้ายืนยันงาน',
      'รอมัดจำ',
      'รับมัดจำแล้ว',
      'เตรียมเริ่มงาน'
    )
  ),
  constraint jobs_progress_percent_check check (
    progress_percent >= 0 and progress_percent <= 100
  ),
  constraint jobs_customer_rating_check check (
    customer_rating is null or (customer_rating >= 1 and customer_rating <= 5)
  ),
  constraint jobs_work_status_check check (
    work_status in (
      'ยังไม่เริ่มงาน',
      'เตรียมวัสดุ',
      'เริ่มงานแล้ว',
      'กำลังดำเนินงาน',
      'รอตรวจงาน',
      'ส่งมอบแล้ว',
      'รับประกัน'
    )
  )
);

create index if not exists jobs_job_id_idx on public.jobs (job_id);
create index if not exists jobs_status_idx on public.jobs (status);
create index if not exists jobs_created_at_idx on public.jobs (created_at desc);

alter table public.jobs
  add column if not exists survey_note text not null default '',
  add column if not exists internal_note text not null default '',
  add column if not exists is_urgent boolean not null default false,
  add column if not exists quotation_amount numeric(12,2),
  add column if not exists quotation_note text not null default '',
  add column if not exists quotation_sent_at timestamptz,
  add column if not exists quotation_status text not null default 'ยังไม่เสนอราคา',
  add column if not exists deal_status text not null default 'ยังไม่ปิดการขาย',
  add column if not exists deposit_amount numeric(12,2),
  add column if not exists deposit_note text not null default '',
  add column if not exists confirmed_at timestamptz,
  add column if not exists start_date date,
  add column if not exists expected_finish_date date,
  add column if not exists actual_finish_date date,
  add column if not exists progress_percent integer not null default 0,
  add column if not exists progress_note text not null default '',
  add column if not exists work_status text not null default 'ยังไม่เริ่มงาน',
  add column if not exists delivered_at date,
  add column if not exists delivery_note text not null default '',
  add column if not exists customer_rating integer,
  add column if not exists customer_review text not null default '',
  add column if not exists warranty_start_date date,
  add column if not exists warranty_end_date date,
  add column if not exists warranty_note text not null default '';

alter table public.jobs drop constraint if exists jobs_status_check;
alter table public.jobs
  add constraint jobs_status_check check (
    status in (
      'รอการติดต่อ',
      'นัดสำรวจแล้ว',
      'กำลังประเมินราคา',
      'เสนอราคาแล้ว',
      'รอลูกค้าตัดสินใจ',
      'เริ่มงานแล้ว',
      'ส่งมอบแล้ว'
    )
  );

alter table public.jobs drop constraint if exists jobs_quotation_status_check;
alter table public.jobs
  add constraint jobs_quotation_status_check check (
    quotation_status in (
      'ยังไม่เสนอราคา',
      'ส่งใบเสนอราคาแล้ว',
      'ลูกค้าสนใจ',
      'ลูกค้าปฏิเสธ',
      'ปิดการขายแล้ว'
    )
  );

alter table public.jobs drop constraint if exists jobs_deal_status_check;
alter table public.jobs
  add constraint jobs_deal_status_check check (
    deal_status in (
      'ยังไม่ปิดการขาย',
      'ลูกค้ายืนยันงาน',
      'รอมัดจำ',
      'รับมัดจำแล้ว',
      'เตรียมเริ่มงาน'
    )
  );

alter table public.jobs drop constraint if exists jobs_progress_percent_check;
alter table public.jobs
  add constraint jobs_progress_percent_check check (
    progress_percent >= 0 and progress_percent <= 100
  );

alter table public.jobs drop constraint if exists jobs_customer_rating_check;
alter table public.jobs
  add constraint jobs_customer_rating_check check (
    customer_rating is null or (customer_rating >= 1 and customer_rating <= 5)
  );

alter table public.jobs drop constraint if exists jobs_work_status_check;
alter table public.jobs
  add constraint jobs_work_status_check check (
    work_status in (
      'ยังไม่เริ่มงาน',
      'เตรียมวัสดุ',
      'เริ่มงานแล้ว',
      'กำลังดำเนินงาน',
      'รอตรวจงาน',
      'ส่งมอบแล้ว',
      'รับประกัน'
    )
  );

create index if not exists jobs_is_urgent_idx on public.jobs (is_urgent);
create index if not exists jobs_quotation_status_idx on public.jobs (quotation_status);
create index if not exists jobs_deal_status_idx on public.jobs (deal_status);
create index if not exists jobs_work_status_idx on public.jobs (work_status);
create index if not exists jobs_delivered_at_idx on public.jobs (delivered_at desc);
create index if not exists jobs_warranty_end_date_idx on public.jobs (warranty_end_date);

insert into storage.buckets (id, name, public)
values ('job-photos', 'job-photos', true)
on conflict (id) do nothing;

create table if not exists public.job_photos (
  id uuid primary key default gen_random_uuid(),
  job_id text not null references public.jobs (job_id) on delete cascade,
  file_name text not null,
  file_url text,
  file_type text not null,
  file_size bigint not null,
  created_at timestamptz not null default now()
);

create index if not exists job_photos_job_id_idx on public.job_photos (job_id);
create index if not exists job_photos_created_at_idx on public.job_photos (created_at desc);

alter table public.job_photos disable row level security;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists jobs_set_updated_at on public.jobs;

create trigger jobs_set_updated_at
before update on public.jobs
for each row
execute function public.set_updated_at();

alter table public.jobs disable row level security;

-- MVP note:
-- RLS is disabled for the no-login prototype. Before production, enable RLS
-- and replace this with authenticated/admin policies or server-side writes.
