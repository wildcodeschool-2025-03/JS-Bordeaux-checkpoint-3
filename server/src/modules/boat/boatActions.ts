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
    const boatToUpdate = {
      id: Number(req.params.id),
      coord_x: Number(req.body.coord_x),
      coord_y: Number(req.body.coord_y),
    };
    const affectedRows = await boatRepository.update(boatToUpdate);
    if (affectedRows === 0) {
      res.status(404).json({ message: "no boat has been updated" });
    } else {
      res.status(204).json({ message: "boat has been updated" });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
