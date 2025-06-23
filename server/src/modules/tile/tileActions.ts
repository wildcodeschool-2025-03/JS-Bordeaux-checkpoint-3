import { DatabaseModule } from "@faker-js/faker/.";
import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const coord_x = Number(req.body.coord_x);
    const coord_y = Number(req.body.coord_y);

    if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
      res.sendStatus(422);
      return;
    }
    next();
    const valid = await tileRepository.readByCoordinates(coord_x, coord_y);
    if (!valid) {
      res.sendStatus(422);
    }
    res.json(valid);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
