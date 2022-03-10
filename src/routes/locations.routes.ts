import { Router } from "express";
import knex from "../database/connection";

const locationsRouter = Router();

locationsRouter.post("/", async (request, response) => {
  const { name, email, whatsapp, latitude, logitude, city, uf, items } =
    request.body;
  const location = {
    image: "fake-image.jpg",
    name,
    email,
    whatsapp,
    latitude,
    logitude,
    city,
    uf,
  };
  const transaction = await knex.transaction();
  const newIds = await transaction("locations").insert(location);

  const locations_id = newIds[0];

  const locationItems = items.map((item_id: number) => {
    return {
      item_id,
      locations_id,
    };
  });

  await transaction("location_items").insert(locationItems);

  await transaction.commit();

  return response.json({
    id: locations_id,
    ...location,
  });
});

export default locationsRouter;
