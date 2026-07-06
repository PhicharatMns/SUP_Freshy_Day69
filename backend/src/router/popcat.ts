import { Hono } from "hono";
import { pool } from "../DB/DB.js";

const popcar = new Hono();


//  ดึงคะแนนทุกคณะ
popcar.get("/scores", async (c) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM departments_score
      ORDER BY total_clicks DESC
    `);

    return c.json({
      status: true,
      data: result.rows,
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
});


//  ดึงคะแนนคณะเดียว
popcar.get("/score/:departmentKey", async (c) => {
  try {
    const departmentKey = c.req.param("departmentKey");

    const result = await pool.query(
      `
      SELECT *
      FROM departments_score
      WHERE department_key = $1
      `,
      [departmentKey]
    );

    if (result.rows.length === 0) {
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
      data: result.rows[0],
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
});

popcar.post("/click", async (c) => {
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

    const result = await pool.query(
      `
      UPDATE departments_score
      SET
        total_clicks = total_clicks + 1,
        updated_at = NOW()
      WHERE department_key = $1
      RETURNING *
      `,
      [departmentKey]
    );

    if (result.rows.length === 0) {
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
      data: result.rows[0],
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
});

popcar.post("/click-bulk", async (c) => {
  try {
    const { departmentKey, count } = await c.req.json();

    if (!departmentKey || !count) {
      return c.json(
        {
          status: false,
          message: "departmentKey and count required",
        },
        400
      );
    }

    const result = await pool.query(
      `
      UPDATE departments_score
      SET
        total_clicks = total_clicks + $2,
        updated_at = NOW()
      WHERE department_key = $1
      RETURNING *
      `,
      [departmentKey, count]
    );

    return c.json({
      status: true,
      data: result.rows[0],
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
});

popcar.post("/register", async (c) => {
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

    const result = await pool.query(
      `
      INSERT INTO popcat_users (
        student_id,
        student_name
      )
      VALUES ($1,$2)

      ON CONFLICT (student_id)
      DO UPDATE
      SET student_name = EXCLUDED.student_name

      RETURNING *
      `,
      [studentId, studentName]
    );

    return c.json({
      status: true,
      data: result.rows[0],
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
});

popcar.post("/click-bulk-user", async (c) => {
  try {
    const body = await c.req.json();

    const { departmentKey, count, studentId } = body;

    // validate
    if (!departmentKey || !count || !studentId) {
      return c.json(
        {
          status: false,
          message: "departmentKey, count and studentId required",
        },
        400
      );
    }

    // 1. get user (SOURCE OF TRUTH)
    const userResult = await pool.query(
      `
      SELECT student_id, student_name
      FROM popcat_users
      WHERE student_id = $1
      `,
      [studentId]
    );

    if (userResult.rows.length === 0) {
      return c.json(
        {
          status: false,
          message: "User not found",
        },
        404
      );
    }

    const user = userResult.rows[0];

    // 2. insert / update player
    const playerResult = await pool.query(
      `
      INSERT INTO popcat_players (
        student_id,
        student_name,
        department_key,
        total_clicks
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (student_id, department_key)
      DO UPDATE
      SET
        student_name = EXCLUDED.student_name,
        total_clicks = popcat_players.total_clicks + EXCLUDED.total_clicks,
        updated_at = NOW()
      RETURNING *;
      `,
      [
        user.student_id,
        user.student_name,
        departmentKey,
        count,
      ]
    );

    return c.json({
      status: true,
      data: playerResult.rows[0],
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
});

popcar.get("/top-departments", async (c) => {
  try {
    const result = await pool.query(`
 SELECT *
FROM (
  SELECT DISTINCT ON (department_key)
    student_id,
    student_name,
    department_key,
    total_clicks,
    updated_at
  FROM popcat_players
  ORDER BY department_key, total_clicks DESC
) t
ORDER BY total_clicks DESC;
    `);

    return c.json({
      status: true,
      data: result.rows,
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
});

export default popcar;