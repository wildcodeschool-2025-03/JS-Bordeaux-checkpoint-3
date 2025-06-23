import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tile = await tileRepository.readAll();
    if (!tile || tile.length === 0) {
      res.status(404).json({ message: "No tile found." });
      return;
    }
    res.status(200).json(tile);
  } catch (err) {
    res.status(500);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
};
