# TRUST BUILD

MVP web app for a contractor and renovation service receiving job requests from LINE Rich Menu.

## Brand Structure

- Customer-facing brand: `ไว้ใจช่าง`
- Thai tagline: `ช่างที่ไว้ใจได้ ช่างที่ซื่อสัตย์`
- Legal / operations name: `TRUST BUILD`
- Admin, database tables, schemas, repository names, and legal documents should keep using `TRUST BUILD`.
- Customer pages, LINE OA copy, public quotation heading, and marketing copy should use `ไว้ใจช่าง`.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

Supabase is prepared but optional. If keys are missing, the app keeps working with browser `localStorage`.

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/jobs-schema.sql`.
4. Copy `.env.example` to `.env.local`.
5. Fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ADMIN_PIN=123456
```

6. Restart the dev server.

## Supabase Storage Setup

Photo upload is local-preview first. The app stores photo metadata in localStorage now and prepares Supabase for later upload.

The SQL schema creates:

- Storage bucket: `job-photos`
- Metadata table: `public.job_photos`

If the bucket is not created by SQL in your Supabase project, create it manually:

1. Go to Supabase Storage.
2. Create a bucket named `job-photos`.
3. Set it public for MVP previews, or keep it private and add signed URL logic later.

Do not add or expose a Supabase service role key in the frontend.

Current mode:
- With valid Supabase keys: app attempts Supabase first, then falls back locally if a request fails.
- Without Supabase keys: app uses `localStorage`.

## Admin PIN

The `/admin` page is protected by a simple browser-side PIN gate for MVP use.

1. Set `NEXT_PUBLIC_ADMIN_PIN` in `.env.local`.
2. Default example value is `123456`.
3. Admin session is stored in browser `sessionStorage`.

This is not production authentication. Replace it with real auth before launch.

## Quotation Workflow

Admin can open a job detail modal and save a basic quotation:

- Quotation amount
- Quotation note
- Quotation status

Quotation statuses:

- ยังไม่เสนอราคา
- ส่งใบเสนอราคาแล้ว
- ลูกค้าสนใจ
- ลูกค้าปฏิเสธ
- ปิดการขายแล้ว

The customer `/track` page shows quotation details only after the quotation status changes from `ยังไม่เสนอราคา`. Internal admin notes and uploaded photos are not shown to customers.

Quotation preview pages:

- Admin printable quotation: `/admin/quotation/[jobId]`
- Customer read-only quotation: `/quotation/[jobId]`

Both pages include a `พิมพ์ / บันทึกเป็น PDF` button that uses the browser print dialog. Choose "Save as PDF" from the print dialog to export a PDF.

No server-side PDF generation or payment flow is included yet.

## Deal Closing Workflow

After a customer opens the public quotation page, they can click `ยืนยันงานนี้`.

This updates the job with:

- Deal status: `ลูกค้ายืนยันงาน`
- Confirmation time: `confirmed_at`

Admin can then manage closing details from the job detail modal:

- Deal status
- Deposit amount
- Deposit note

Deal statuses:

- ยังไม่ปิดการขาย
- ลูกค้ายืนยันงาน
- รอมัดจำ
- รับมัดจำแล้ว
- เตรียมเริ่มงาน

The customer `/track` page shows deal status only after confirmation. It can show the deposit amount, but does not expose internal admin notes.

No payment gateway is included yet.

## Project Execution Workflow

After a deal is confirmed, admin can manage work progress from the job detail modal:

- Start date
- Expected finish date
- Actual finish date
- Progress percent
- Progress note
- Work status

Work statuses:

- ยังไม่เริ่มงาน
- เตรียมวัสดุ
- เริ่มงานแล้ว
- กำลังดำเนินงาน
- รอตรวจงาน
- ส่งมอบแล้ว
- รับประกัน

The customer `/track` page shows work progress after the deal is confirmed or moved into deposit/start preparation. Customers can see work status, progress percent, key dates, and public progress notes. Internal admin notes are never shown to customers.

## Delivery, Review, And Warranty Workflow

When work is delivered, admin can save:

- Delivered date
- Delivery note
- Warranty start date
- Warranty end date
- Warranty note

When `work_status` is `ส่งมอบแล้ว`, the customer `/track` page shows delivery and warranty details plus a review form. Customer reviews save through the same repository layer, using Supabase when configured and localStorage fallback otherwise.

The portfolio page can show completed real jobs with customer ratings when available. Mock portfolio items remain the fallback.

## LINE Rich Menu Links

- นัดสำรวจงาน → `/request`
- ติดตามงาน → `/track`
- บริการทั้งหมด → `/services`
- ผลงานที่ผ่านมา → `/portfolio`
- ติดต่อทีมงาน → LINE chat

When a quotation has been sent, the tracking page can link customers to `/quotation/[jobId]`.

## Final LINE Rich Menu Link Config

Use your production domain for the first four links.

- นัดสำรวจงาน → `/request`
- ติดตามงาน → `/track`
- บริการทั้งหมด → `/services`
- ผลงานที่ผ่านมา → `/portfolio`
- ติดต่อทีมงาน → `https://line.me/R/ti/p/@trustbuild`

Optional helper page for testing all Rich Menu actions:

- LINE menu guide → `/line`

## Pre-Launch Checklist

- Set real domain
- Set LINE Rich Menu links
- Set Supabase env keys
- Run Supabase SQL schema
- Create `job-photos` bucket
- Change admin PIN
- Run `npm run build`
- Deploy

## `.env.production` Checklist

Set these values in your production hosting dashboard:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
NEXT_PUBLIC_ADMIN_PIN=change-this-pin
```

Do not add a Supabase service role key to frontend environment variables.

## Deploy Notes

### Vercel

1. Import the Git repository into Vercel.
2. Set framework preset to Next.js.
3. Add the `.env.production` values in Project Settings → Environment Variables.
4. Use the default build command: `npm run build`.
5. Deploy, then add the production domain to LINE Rich Menu links.

### Netlify

1. Create a new site from the Git repository.
2. Netlify will read `netlify.toml`.
3. Build command: `npm run build`.
4. Publish directory: `.next`.
5. Set Node version to `24` if your Netlify project does not read it from `netlify.toml`.
6. Netlify detects Next.js and uses the Next.js runtime automatically.
7. Add the `.env.production` values in Site configuration → Environment variables.
8. Deploy, then add the production domain to LINE Rich Menu links.

Required Netlify environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ADMIN_PIN=
```

## Current Scope

- Local working job flow
- Supabase schema and client prepared
- Supabase Storage bucket/table prepared
- Local photo previews and metadata
- Basic quotation workflow
- Printable quotation preview
- Deal closing workflow
- Project execution and progress tracking
- Delivery, review, and warranty workflow
- Mock data fallback
- No login yet
- No production file upload yet
- No PDF quotation yet
- No payment yet
- Mobile-first pages for LINE traffic
