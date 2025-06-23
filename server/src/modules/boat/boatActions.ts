import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const coord_x = Number(req.body.coord_x);
    const coord_y = Number(req.body.coord_y);

    const boatToUpdate = { id, coord_x, coord_y };

    const updatedBoat = await boatRepository.update(boatToUpdate);
    if (updatedBoat) {
      res.status(204).json(updatedBoat);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  edit,
};
