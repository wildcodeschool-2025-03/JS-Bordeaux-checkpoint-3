import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      `select b.id as boatId, b.name as boatName, b.coord_x as boat_coord_x, 
       b.coord_y as boat_coord_y, 
       t.id as tileId, t.type as tileType, t.coord_x as tile_coord_x, 
       t.coord_y as tile_coord_y, t.has_treasure 
      FROM boat b 
      JOIN tile t ON b.coord_x = t.coord_x AND b.coord_y = t.coord_y
      
      `,
    );

    const boats = [];
    for (const row of rows) {
      boats.push({
        id: row.boatId,
        name: row.boatName,
        coord_x: row.boat_coord_x,
        coord_y: row.boat_coord_y,
        tileId: row.tileId,
        type: row.tileType,
        has_treasure: row.has_treasure,
      });
    }
    return boats;
  }

  async update(boatToUpdate: Partial<Boat>) {
    const { id, coord_x, coord_y } = boatToUpdate;
    const [result] = await databaseClient.query<Result>(
      "update boat set coord_x = ?, coord_y = ? where id = ?",
      [coord_x, coord_y, id],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
