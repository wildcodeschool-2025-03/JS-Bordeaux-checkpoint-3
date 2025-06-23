import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  const { coordX, coordY } = req.body;
  if (
    !coordX ||
    !coordY ||
    coordX < 0 ||
    coordX > 11 ||
    coordY < 0 ||
    coordY > 5
  ) {
    res.sendStatus(422);
  } else {
    res.sendStatus(204);
  }
  next();
};

export default {
  browse,
  validate,
};
