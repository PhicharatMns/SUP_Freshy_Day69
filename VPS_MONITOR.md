# 🖥️ VPS Monitoring Cheatsheet — spu69.online

> **VPS IP**: `147.50.254.93` | **OS**: Ubuntu/Debian | **Process Manager**: PM2

---

## 🔌 เชื่อมต่อ VPS

```bash
ssh root@147.50.254.93
```

---

## 🟢 PM2 — ดูสถานะแอปพลิเคชัน

```bash
# ดูสถานะทุกแอป (CPU, RAM, Uptime)
pm2 status

# ดู Dashboard แบบ Real-time (กด q เพื่อออก)
pm2 monit

# ดู Log ทั้งหมด Real-time
pm2 logs

# ดู Log เฉพาะ Backend (20 บรรทัดล่าสุด)
pm2 logs backend --lines 20

# ดู Log เฉพาะ Frontend
pm2 logs frontend --lines 20

# เคลียร์ Log ทั้งหมด
pm2 flush
```

---

## 🔄 PM2 — ควบคุมแอปพลิเคชัน

```bash
# Restart Backend
pm2 restart backend

# Restart Frontend
pm2 restart frontend

# Restart ทุกแอปพร้อมกัน
pm2 restart all

# หยุดแอป
pm2 stop backend

# ลบแอปออกจาก PM2
pm2 delete backend
```

---

## 💾 RAM & CPU — ดูทรัพยากรเครื่อง

```bash
# ดู RAM แบบย่อ (แนะนำ)
free -h

# ดู Process ทั้งหมดแบบ Real-time (กด q เพื่อออก)
top

# ดู CPU + RAM + Process แบบสวยงาม (ต้องติดตั้งก่อน)
htop
# ติดตั้ง htop: apt install htop -y
```

### แปลผลคำสั่ง `free -h`

| คอลัมน์ | ความหมาย                                            |
| -------------- | ----------------------------------------------------------- |
| `total`      | RAM ทั้งหมดของเครื่อง                      |
| `used`       | RAM ที่ใช้อยู่ตอนนี้                        |
| `free`       | RAM ว่างล้วนๆ                                      |
| `available`  | RAM ที่พร้อมใช้ได้จริง (ดูตัวนี้) |

---

## 💿 Disk — ดูพื้นที่ดิสก์

```bash
# ดูพื้นที่ดิสก์รวม
df -h

# ดูขนาดโฟลเดอร์โปรเจค
du -sh /var/www/spu69/*
```

---

## 🌐 Network — ดูการรับส่งข้อมูล

```bash
# ดู Network Interfaces
ip addr

# ดู Log การเข้าชมเว็บ (Nginx) แบบ Real-time
tail -f /var/log/nginx/access.log

# ดู Error ของ Nginx
tail -f /var/log/nginx/error.log
```

---

## 🛡️ Firewall (UFW) — ตรวจสอบความปลอดภัย

```bash
# ดูสถานะ Firewall และพอร์ตที่เปิดอยู่
ufw status

# ดูประวัติการล็อกอิน SSH (มีใครพยายามเจาะไหม)
tail -f /var/log/auth.log
```

### พอร์ตที่เปิดอยู่ปัจจุบัน

| พอร์ต | ใช้สำหรับ                         |
| ---------- | ------------------------------------------ |
| `22`     | SSH (ล็อกอินเข้าเครื่อง) |
| `80`     | HTTP                                       |
| `443`    | HTTPS                                      |
| `3306`   | MySQL/MariaDB (DBeaver)                    |

---

## 🗄️ MySQL — ตรวจสอบฐานข้อมูล

```bash
# เข้าใช้งาน MySQL
mysql -u root -p

# เข้าใช้งานด้วย user beer
mysql -u beer -p spu69
```

```sql
-- ดูตารางทั้งหมดใน database
SHOW TABLES;

-- ดูข้อมูลในตาราง (ตัวอย่าง)
SELECT COUNT(*) FROM quotes;
SELECT COUNT(*) FROM ig_quotes;
SELECT * FROM departments_score;
```

---

## 📦 Git & Deploy — อัปเดตโค้ด

```bash
# ดึงโค้ดล่าสุดจาก GitHub
cd /var/www/spu69
git pull origin main

# อัปเดต Backend หลัง Pull
cd backend
npm install
npx prisma generate
npm run build
pm2 restart backend
```

---

## 🔍 ตรวจสอบด่วน (Quick Health Check)

```bash
# รันทีเดียวเพื่อดูสถานะรวมทั้งหมด
pm2 status && free -h && df -h | grep -E "/$|/var"
```

---

## 📁 โครงสร้างโฟลเดอร์บน VPS

```
/var/www/spu69/
├── backend/
│   ├── dist/          # โค้ด JS ที่ Build แล้ว (ที่ PM2 ใช้รัน)
│   ├── prisma/        # Prisma Schema และ Migrations
│   └── src/           # Source Code TypeScript
├── frontend/
│   └── .next/         # Next.js Build Output
└── .env               # ⚠️ ไฟล์นี้ไม่ได้อยู่ใน Git (ต้องตั้งค่าเองบน VPS)
```

---

## ⚠️ PM2 Log Files Location

```
/root/.pm2/logs/
├── backend-out.log    # Output ปกติของ Backend
├── backend-error.log  # Error ของ Backend
├── frontend-out.log   # Output ปกติของ Frontend
└── frontend-error.log # Error ของ Frontend
```
