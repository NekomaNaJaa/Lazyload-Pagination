# Blog Posts: Lazy Load + Pagination

โปรเจกต์ Next.js สำหรับศึกษาการแสดงข้อมูลจำนวนมากด้วยเทคนิค **Lazy Load (infinite scroll)** และ **Pagination** โดยนำสองเทคนิคมารวมกันในหน้า Blog Posts หน้าเดียว

ข้อมูลมาจาก API ฟรีของ [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts) (100 โพสต์)

## เทคโนโลยีที่ใช้

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- [shadcn/ui](https://ui.shadcn.com/) (Button, Pagination)
- [Framer Motion](https://www.framer.com/motion/) (แอนิเมชันของการ์ด)
- Axios

## หน้าเว็บ

| Route    | รายละเอียด                                                      |
| -------- | --------------------------------------------------------------- |
| `/posts` | หน้า Blog Posts: Lazy Load ภายในแต่ละหน้า + Pagination ด้านล่าง |

## ฟีเจอร์

- **ด้านบน:** ตัวกรองเลือกว่าแต่ละหน้าจะแสดงกี่รายการ (ตัวเลือกกำหนดได้ใน `constants.ts`)
- **ตรงกลาง:** เมื่อ scroll ลง ระบบจะโหลดโพสต์เพิ่มทีละก้อน (ก้อนละ 5 รายการ) จนครบจำนวนของหน้านั้น
- **ด้านล่าง:** Pagination แบบมีจุดไข่ปลา (`1 … 4 5 6 … 10`) สำหรับเปลี่ยนหน้า
- เปลี่ยนจำนวนต่อหน้าแล้วจะกลับไปหน้า 1 เสมอ
- แสดง Skeleton ระหว่างโหลด และมีข้อความ error พร้อมปุ่มลองใหม่
- การ์ดโผล่ด้วยแอนิเมชัน spring ไล่ทีละใบ และสีของไอคอนเปลี่ยนทุก 10 โพสต์

## หลักการทำงาน

### Pagination ฝั่ง server

แต่ละคำขอดึงเฉพาะข้อมูลที่ต้องใช้ โดยส่ง `_start` (ข้ามกี่รายการ) และ `_limit` (เอากี่รายการ) ไปที่ API

```
start = (หน้า - 1) * จำนวนต่อหน้า + ตำแหน่งภายในหน้า
```

จำนวนโพสต์ทั้งหมดอ่านจาก header `x-total-count` ของ response จึงคำนวณจำนวนหน้าได้จาก `Math.ceil(total / limit)`

### Lazy Load ด้วย IntersectionObserver

วาง element ว่างไว้ท้ายรายการ เมื่อ element นี้เข้ามาในจอ (และไม่ได้กำลังโหลด และยังมีข้อมูลเหลือ) ระบบจะขอก้อนถัดไปมาต่อท้ายรายการ และหยุดเมื่อหน้านั้นมีครบทุกรายการแล้ว

### ป้องกัน Race Condition

ทุกคำขอใช้ `AbortController` เมื่อเปลี่ยนหน้าหรือจำนวนต่อหน้า คำขอเก่าจะถูกยกเลิก ทำให้ response ที่ช้ากว่าไม่สามารถเขียนทับข้อมูลใหม่ได้

### รีเซ็ต state ด้วย `key`

`PostFeed` ถูกใส่ `key={`${page}-${limit}`}` เมื่อหน้าหรือจำนวนต่อหน้าเปลี่ยน React จะสร้าง component ใหม่ รายการและก้อนที่โหลดไว้จึงรีเซ็ตเองโดยไม่ต้องเขียนโค้ดรีเซ็ต

## วิธีรันโปรเจกต์

ต้องมี Node.js 20 ขึ้นไป

```bash
npm install
npm run dev
```

เปิด http://localhost:3000/posts

คำสั่งอื่น

```bash
npm run build   # build สำหรับ production
npm run start   # รันตัวที่ build แล้ว
npm run lint    # ตรวจโค้ดด้วย ESLint
```

## ค่าที่ปรับได้

ที่ไฟล์ `src/components/posts/constants.ts`

```ts
export const PAGE_SIZE_OPTIONS = [20, 30, 40, 50]; // ตัวเลือกจำนวนต่อหน้า
export const DEFAULT_LIMIT = 20; // ต้องเป็นค่าที่อยู่ในตัวเลือก
export const CHUNK = 5; // Lazy Load รอบละกี่รายการ
```

## โครงสร้างโปรเจกต์

```
src/
  app/
    posts/page.tsx             # หน้า Blog Posts (รวม state หลักและประกอบ components)
  components/
    posts/
      constants.ts             # ตัวเลือกจำนวนต่อหน้า และขนาดก้อน
      PageSizeSelect.tsx       # ตัวกรองจำนวนต่อหน้า
      PostCard.tsx             # การ์ดโพสต์ (มีแอนิเมชัน)
      PostSkeleton.tsx         # ตัวแทนระหว่างโหลด
      PostFeed.tsx             # รายการโพสต์ + Lazy Load
      Pagination.tsx           # ปุ่มเปลี่ยนหน้า พร้อมจุดไข่ปลา
    ui/                        # components ของ shadcn/ui (button, pagination)
  hooks/
    use-pagination.ts          # คำนวณว่าจะแสดงเลขหน้าไหนบ้าง
  lib/
    api.ts                     # getPostsRange(start, count, signal)
    utils.ts                   # ฟังก์ชัน cn() จาก shadcn/ui
```

## สิ่งที่ได้เรียนรู้

- Pagination ต้องมีค่า `page`, `limit` และ `total`
- Lazy Load คือการต่อท้ายรายการเดิม ไม่ใช่การแทนที่
- `AbortController` ยกเลิกคำขอเก่าและกัน race condition ได้
- ค่าอย่าง `loading` คำนวณจาก state ที่มีอยู่ได้ ไม่จำเป็นต้องสร้าง state เพิ่ม
- การใส่ `key` ให้ component เป็นวิธีง่ายๆ ในการรีเซ็ต state
- Skeleton ควรมีขนาดเท่าเนื้อหาจริง เพื่อไม่ให้หน้าเว็บกระตุกตอนข้อมูลมาถึง

## แหล่งข้อมูล

[JSONPlaceholder](https://jsonplaceholder.typicode.com/) เป็น REST API ปลอมสำหรับทดสอบ รองรับ query `_page`, `_limit`, `_start` และส่งจำนวนทั้งหมดมาใน header `x-total-count`
