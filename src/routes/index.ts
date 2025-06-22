import { Router } from "express";

import { UserRoutes } from "./users-routes";

const routes = Router();

routes.use("/users", UserRoutes);

export { routes };