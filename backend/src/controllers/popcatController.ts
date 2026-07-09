import { Context } from "hono";
import { prisma } from "../config/database.js";

// 🛠️ FIX: วิธีแก้ปัญหา BigInt - สอนให้ JavaScript แปลง BigInt เป็นตัวเลขปกติก่อนส่ง JSON
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

// 💾 Cache สำหรับ Leaderboard ป้องกัน DB Overload
let cachedLeaderboard: any = null;
let lastLeaderboardCacheTime = 0;
const LEADERBOARD_CACHE_TTL = 2000; // 2 วินาที

export const getScores = async (c: Context) => {
  try {
    const rows = await prisma.departments_score.findMany({
      orderBy: {
        total_clicks: 'desc'
      }
    });

    return c.json({
      status: true,
      data: rows,
    });
  } catch (error) {
    console.error(error);

    return c.json(
      {
        status: false,
        message: "Server Error",
      },
      500
    );
  }
};

export const getScoreByDepartment = async (c: Context) => {
  try {
    const departmentKey = c.req.param("departmentKey");

    const rows = await prisma.departments_score.findMany({
      where: {
        department_key: departmentKey
      }
    });

    if (rows.length === 0) {
      return c.json(
        {
          status: false,
          message: "Department not found",
        },
        404
      );
    }

    return c.json({
      status: true,
      data: rows[0],
    });
  } catch (error) {
    console.error(error);

    return c.json(
      {
        status: false,
        message: "Server Error",
      },
      500
    );
  }
};

export const click = async (c: Context) => {
  try {
    const { departmentKey } = await c.req.json();

    if (!departmentKey) {
      return c.json(
        {
          status: false,
          message: "departmentKey is required",
        },
        400
      );
    }

    const updated = await prisma.departments_score.update({
      where: {
        department_key: departmentKey
      },
      data: {
        total_clicks: {
          increment: 1
        },
        updated_at: new Date()
      }
    });

    return c.json({
      status: true,
      data: updated,
    });
  } catch (error) {
    console.error(error);

    return c.json(
      {
        status: false,
        message: "Server Error",
      },
      500
    );
  }
};

export const clickBulk = async (c: Context) => {
  try {
    const body = await c.req.json();

    // 1. รองรับแบบรูปแบบดั้งเดิม { departmentKey, count }
    if (body.departmentKey !== undefined && body.count !== undefined) {
      const { departmentKey, count } = body;
      const parsedCount = Number(count);
      if (isNaN(parsedCount) || parsedCount <= 0) {
        return c.json({ status: false, message: "Invalid count value" }, 400);
      }
      if (parsedCount > 1000) {
        return c.json({ status: false, message: "Click count exceeds limit (max 1000)" }, 400);
      }

      const updated = await prisma.departments_score.update({
        where: {
          department_key: departmentKey
        },
        data: {
          total_clicks: {
            increment: BigInt(parsedCount)
          },
          updated_at: new Date()
        }
      });

      return c.json({
        status: true,
        data: updated,
      });
    }

    // 2. รองรับแบบ Map { "digital-media": 45 } ที่ถูกส่งมาจาก navigator.sendBeacon ตอนปิดเกม
    if (typeof body === 'object' && body !== null) {
      const updates = [];
      for (const [departmentKey, count] of Object.entries(body)) {
        const parsedCount = Number(count);
        // ข้ามหากจำนวนคลิกไม่ถูกต้อง หรือโกงค่าลบ
        if (isNaN(parsedCount) || parsedCount <= 0 || parsedCount > 1000) {
          continue;
        }

        updates.push(
          prisma.departments_score.update({
            where: {
              department_key: departmentKey
            },
            data: {
              total_clicks: {
                increment: BigInt(parsedCount)
              },
              updated_at: new Date()
            }
          })
        );
      }

      if (updates.length > 0) {
        await prisma.$transaction(updates);
      }

      return c.json({
        status: true,
        message: "Bulk clicks from sendBeacon processed successfully"
      });
    }

    return c.json(
      {
        status: false,
        message: "Invalid payload format",
      },
      400
    );
  } catch (error) {
    console.error(error);

    return c.json(
      {
        status: false,
        message: "Server Error",
      },
      500
    );
  }
};

export const registerUser = async (c: Context) => {
  try {
    const {
      studentId,
      studentName,
    } = await c.req.json();

    if (!studentId || !studentName) {
      return c.json(
        {
          status: false,
          message: "studentId and studentName required",
        },
        400
      );
    }

    const user = await prisma.popcat_users.upsert({
      where: {
        student_id: studentId
      },
      update: {
        student_name: studentName
      },
      create: {
        student_id: studentId,
        student_name: studentName
      }
    });

    return c.json({
      status: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return c.json(
      {
        status: false,
        message: "Server Error",
      },
      500
    );
  }
};

export const clickBulkUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { departmentKey, count, studentId } = body;

    if (!departmentKey || count === undefined || !studentId) {
      return c.json(
        {
          status: false,
          message: "departmentKey, count and studentId required",
        },
        400
      );
    }

    // 🔒 Security check: ป้องกันการส่งค่าโกง/ติดลบ
    const parsedCount = Number(count);
    if (isNaN(parsedCount) || parsedCount <= 0) {
      return c.json({ status: false, message: "Invalid count value" }, 400);
    }
    if (parsedCount > 1000) {
      return c.json({ status: false, message: "Click count exceeds limit (max 1000)" }, 400);
    }

    const user = await prisma.popcat_users.findUnique({
      where: {
        student_id: studentId
      }
    });

    if (!user) {
      return c.json(
        {
          status: false,
          message: "User not found",
        },
        404
      );
    }

    // 🔄 รันแบบ Transaction เพื่อความชัวร์ว่าอัปเดตทั้ง 2 ตารางพร้อมกันแบบ Atomically
    const [player] = await prisma.$transaction([
      prisma.popcat_players.upsert({
        where: {
          student_id_department_key: {
            student_id: user.student_id,
            department_key: departmentKey
          }
        },
        update: {
          student_name: user.student_name,
          total_clicks: {
            increment: BigInt(parsedCount)
          },
          updated_at: new Date()
        },
        create: {
          student_id: user.student_id,
          student_name: user.student_name,
          department_key: departmentKey,
          total_clicks: BigInt(parsedCount)
        }
      }),
      prisma.departments_score.update({
        where: {
          department_key: departmentKey
        },
        data: {
          total_clicks: {
            increment: BigInt(parsedCount)
          },
          updated_at: new Date()
        }
      })
    ]);

    return c.json({
      status: true,
      data: player,
    });

  } catch (error) {
    console.error(error);

    return c.json(
      {
        status: false,
        message: "Server Error",
      },
      500
    );
  }
};

export const getTopDepartments = async (c: Context) => {
  try {
    const rows = await prisma.$queryRaw`
      SELECT student_id, student_name, department_key, total_clicks, updated_at
      FROM (
        SELECT 
          student_id,
          student_name,
          department_key,
          total_clicks,
          updated_at,
          ROW_NUMBER() OVER (PARTITION BY department_key ORDER BY total_clicks DESC) as rn
        FROM popcat_players
      ) t
      WHERE rn = 1
      ORDER BY total_clicks DESC;
    `;

    return c.json({
      status: true,
      data: rows,
    });

  } catch (error) {
    console.error(error);

    return c.json(
      {
        status: false,
        message: "Server Error",
      },
      500
    );
  }
};

// 🏆 Leaderboard รวม: aggregate จาก popcat_players โดยตรง (รองรับกรณี departments_score ว่าง)
export const getLeaderboard = async (c: Context) => {
  try {
    const now = Date.now();
    // 💾 หากยังมี Cache อยู่ ให้ส่งผลลัพธ์จาก Cache ได้ทันทีเพื่อลดโหลด DB
    if (cachedLeaderboard && (now - lastLeaderboardCacheTime < LEADERBOARD_CACHE_TTL)) {
      return c.json({ status: true, data: cachedLeaderboard });
    }

    // ดึงคะแนนรวมและ top player ของแต่ละคณะจาก popcat_players
    const rows: any[] = await prisma.$queryRaw`
      SELECT
        d.department_key,
        d.total_clicks,
        top.student_id   AS top_student_id,
        top.student_name AS top_student_name,
        top.total_clicks AS top_student_clicks
      FROM (
        SELECT department_key, SUM(total_clicks) AS total_clicks
        FROM popcat_players
        GROUP BY department_key
      ) d
      JOIN (
        SELECT student_id, student_name, department_key, total_clicks,
               ROW_NUMBER() OVER (PARTITION BY department_key ORDER BY total_clicks DESC) AS rn
        FROM popcat_players
      ) top ON top.department_key = d.department_key AND top.rn = 1
      ORDER BY d.total_clicks DESC;
    `;

    const result = rows.map((r) => ({
      department_key:       r.department_key,
      total_clicks:         Number(r.total_clicks),
      top_student_id:       r.top_student_id ?? null,
      top_student_name:     r.top_student_name ?? null,
      top_student_clicks:   Number(r.top_student_clicks ?? 0),
    }));

    // บันทึก Cache ล่าสุด
    cachedLeaderboard = result;
    lastLeaderboardCacheTime = now;

    return c.json({ status: true, data: result });

  } catch (error) {
    console.error(error);
    return c.json({ status: false, message: "Server Error" }, 500);
  }
};
