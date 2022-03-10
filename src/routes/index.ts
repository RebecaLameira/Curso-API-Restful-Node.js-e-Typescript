import { Router } from "express";
import itemsRoutes from "./items.routes";
import locationsRouter from "./locations.routes";
const routes = Router();

routes.use("/items", itemsRoutes);
routes.use("/locations", locationsRouter);

export default routes;
