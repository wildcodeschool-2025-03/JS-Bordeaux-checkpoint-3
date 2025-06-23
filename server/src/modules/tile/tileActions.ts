import type { RequestHandler } from "express";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1106",
  database: "Pirates",
});

const browse: RequestHandler = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tile");
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const boatId = req.params.id;
    const { coord_x, coord_y } = req.body;

    await pool.query("UPDATE tile SET coord_x = ?, coord_y = ? WHERE id = ?", [
      coord_x,
      coord_y,
      boatId,
    ]);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = (req, res, next) => {
  const { type } = req.query;
  if (type && typeof type !== "string") {
    res.status(400).json({ error: "Invalid 'type' query parameter" });
    return;
  }
  next();
};

export default {
  browse,
  edit,
  validate,
};
