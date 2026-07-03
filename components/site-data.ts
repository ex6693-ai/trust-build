import {
  BadgeCheck,
  Bolt,
  Brush,
  ClipboardCheck,
  Droplets,
  Hammer,
  Home,
  Paintbrush,
  ShieldCheck,
  SquareStack,
  Umbrella,
  Wrench,
} from "lucide-react";

export const brand = {
  name: "ไว้ใจช่าง",
  customerName: "ไว้ใจช่าง",
  legalName: "TRUST BUILD",
  tagline: "ช่างที่ไว้ใจได้ ช่างที่ซื่อสัตย์",
  service: "รับซ่อม รีโนเวท ต่อเติม ระบบไฟ ระบบประปา หลังคา สี กระเบื้อง",
  phone: "02-118-8899",
  line: "@trustbuild",
  lineChatUrl: "https://line.me/R/ti/p/@trustbuild",
};

export const navItems = [
  { href: "/", label: "หน้าแรก" },
  { href: "/request", label: "นัดสำรวจงาน" },
  { href: "/track", label: "ติดตามงาน" },
  { href: "/services", label: "บริการ" },
  { href: "/portfolio", label: "ผลงาน" },
  { href: "/admin", label: "Admin" },
];

export const services = [
  {
    title: "รีโนเวทบ้าน",
    detail: "ปรับพื้นที่เดิมให้ใช้งานดีขึ้น ทั้งครัว ห้องน้ำ ห้องนอน และพื้นที่พักอาศัย",
    icon: Paintbrush,
  },
  {
    title: "ต่อเติมบ้าน",
    detail: "ต่อเติมครัวหลังบ้าน กันสาด ห้องเก็บของ และพื้นที่ใช้งานใหม่",
    icon: Hammer,
  },
  {
    title: "งานซ่อมแซม",
    detail: "ซ่อมประตู หน้าต่าง ฝ้า ผนัง พื้น และจุดเสียหายในบ้าน",
    icon: Wrench,
  },
  {
    title: "ระบบไฟฟ้า",
    detail: "เพิ่มปลั๊ก เดินสาย ติดตั้งโคมไฟ ตู้เบรกเกอร์ และตรวจความปลอดภัย",
    icon: Bolt,
  },
  {
    title: "ระบบประปา",
    detail: "แก้ท่อน้ำรั่ว ปั๊มน้ำ สุขภัณฑ์ แรงดันน้ำ และระบบระบายน้ำ",
    icon: Droplets,
  },
  {
    title: "หลังคา / รั่วซึม",
    detail: "ตรวจจุดรั่ว ซ่อมหลังคา รางน้ำ ฝ้าเสียหาย และงานกันซึม",
    icon: Umbrella,
  },
  {
    title: "ทาสี",
    detail: "ทาสีภายใน ภายนอก เก็บผิวผนัง และเลือกสีให้เหมาะกับบ้าน",
    icon: Brush,
  },
  {
    title: "ปูกระเบื้อง",
    detail: "ปูกระเบื้องพื้น ผนัง ห้องน้ำ ครัว และแก้งานกระเบื้องหลุดร่อน",
    icon: SquareStack,
  },
];

export const requestServiceTypes = [
  ...services.map((service) => service.title),
  "อื่นๆ",
];

export const budgetRanges = [
  "ต่ำกว่า 30,000 บาท",
  "30,000-100,000 บาท",
  "100,000-300,000 บาท",
  "มากกว่า 300,000 บาท",
];

export const surveyTimes = ["เช้า", "บ่าย", "เย็น"];

export const serviceSteps = [
  "ส่งข้อมูล",
  "นัดสำรวจ",
  "เสนอราคา",
  "เริ่มงาน",
  "ส่งมอบ",
];

export const jobStatuses = [
  "รับข้อมูลแล้ว",
  "โทรนัด",
  "นัดสำรวจ",
  "ประเมินราคา",
  "เสนอราคา",
  "รอลูกค้าตัดสินใจ",
  "เริ่มงาน",
  "ส่งมอบ",
  "รับประกัน",
];

export const adminStatusBadges = [
  "รอการติดต่อ",
  "นัดสำรวจแล้ว",
  "กำลังประเมินราคา",
  "เสนอราคาแล้ว",
  "รอลูกค้าตัดสินใจ",
  "เริ่มงานแล้ว",
  "ส่งมอบแล้ว",
];

export const quotationStatuses = [
  "ยังไม่เสนอราคา",
  "ส่งใบเสนอราคาแล้ว",
  "ลูกค้าสนใจ",
  "ลูกค้าปฏิเสธ",
  "ปิดการขายแล้ว",
];

export const dealStatuses = [
  "ยังไม่ปิดการขาย",
  "ลูกค้ายืนยันงาน",
  "รอมัดจำ",
  "รับมัดจำแล้ว",
  "เตรียมเริ่มงาน",
];

export const workStatuses = [
  "ยังไม่เริ่มงาน",
  "เตรียมวัสดุ",
  "เริ่มงานแล้ว",
  "กำลังดำเนินงาน",
  "รอตรวจงาน",
  "ส่งมอบแล้ว",
  "รับประกัน",
];

export const mockJobs = [
  {
    id: "TB-0001",
    customer: "คุณมีนา",
    phone: "081-234-5678",
    service: "ระบบประปา",
    budget: "30,000-100,000 บาท",
    province: "นนทบุรี",
    status: "รอการติดต่อ",
    created: "2026-07-03",
  },
  {
    id: "TB-0002",
    customer: "คุณนนท์",
    phone: "089-445-1188",
    service: "ระบบไฟฟ้า",
    budget: "ต่ำกว่า 30,000 บาท",
    province: "กรุงเทพฯ",
    status: "นัดสำรวจแล้ว",
    created: "2026-07-03",
  },
  {
    id: "TB-0003",
    customer: "คุณแพรว",
    phone: "086-902-4411",
    service: "รีโนเวทบ้าน",
    budget: "100,000-300,000 บาท",
    province: "สมุทรปราการ",
    status: "กำลังประเมินราคา",
    created: "2026-07-02",
  },
  {
    id: "TB-0004",
    customer: "คุณอาร์ม",
    phone: "082-781-3344",
    service: "ต่อเติมบ้าน",
    budget: "มากกว่า 300,000 บาท",
    province: "ปทุมธานี",
    status: "เสนอราคาแล้ว",
    created: "2026-07-01",
  },
  {
    id: "TB-0005",
    customer: "คุณส้ม",
    phone: "095-664-7722",
    service: "หลังคา / รั่วซึม",
    budget: "30,000-100,000 บาท",
    province: "กรุงเทพฯ",
    status: "เริ่มงานแล้ว",
    created: "2026-06-30",
  },
  {
    id: "TB-0006",
    customer: "คุณเจ",
    phone: "088-221-9044",
    service: "ทาสี",
    budget: "ต่ำกว่า 30,000 บาท",
    province: "นนทบุรี",
    status: "ส่งมอบแล้ว",
    created: "2026-06-28",
  },
];

export const portfolioItems = [
  {
    title: "รีโนเวทห้องเก่า",
    serviceType: "รีโนเวทบ้าน",
    area: "บางนา",
    result: "เปลี่ยนห้องเก็บของเป็นห้องทำงาน สว่างขึ้นและใช้งานจริงได้ทุกวัน",
  },
  {
    title: "ซ่อมระบบไฟ",
    serviceType: "ระบบไฟฟ้า",
    area: "ลาดพร้าว",
    result: "แยกวงจรใหม่ เพิ่มเบรกเกอร์ และลดปัญหาไฟตกในบ้าน",
  },
  {
    title: "แก้หลังคารั่ว",
    serviceType: "หลังคา / รั่วซึม",
    area: "พระราม 2",
    result: "ตรวจจุดรั่ว เปลี่ยนแผ่นหลังคา และทดสอบน้ำก่อนส่งมอบ",
  },
  {
    title: "ทาสีบ้านใหม่",
    serviceType: "ทาสี",
    area: "นนทบุรี",
    result: "เก็บผิวผนังเก่า ทาสีใหม่ทั้งภายนอก บ้านดูสะอาดขึ้นทันที",
  },
];

export const proofPoints = [
  { label: "ช่างผ่านการคัดกรอง", icon: ShieldCheck },
  { label: "ใบเสนอราคาชัดเจน", icon: BadgeCheck },
  { label: "ติดตามงานได้ทุกขั้นตอน", icon: ClipboardCheck },
];

export const trustSteps = serviceSteps;
export const portfolio = portfolioItems.map((item) => ({
  title: item.title,
  location: item.area,
  type: item.serviceType,
  result: item.result,
}));
export const jobTimeline = jobStatuses.map((label, index) => ({
  label,
  state: index < 5 ? "done" : index === 5 ? "active" : "next",
  time: index === 5 ? "สถานะล่าสุด" : index < 5 ? "เสร็จแล้ว" : "ขั้นถัดไป",
}));
export const adminJobs = mockJobs.map((job) => ({
  id: job.id,
  customer: job.customer,
  area: job.province,
  job: job.service,
  status: job.status,
}));
