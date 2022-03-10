import { Router } from "express";
import knex from "../database/connection";
import { staticUrl } from "../shared";

const itemsRoutes = Router();

itemsRoutes.get("/", async (request, response) => {
  const items = await knex("items").select("*");

  const serializedItems = items.map((item: any) => {
    return {
      id: item.id,
      title: item.title,
      image_url: staticUrl + item.image,
    };
  });
  return response.json(serializedItems);
});

export default itemsRoutes;
