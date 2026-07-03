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



export default popcar;