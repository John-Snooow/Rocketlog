import { Router } from "express";

import { UsersController } from "@/controllers/users-controller";

const UserRoutes = Router();

const usersController = new UsersController();

UserRoutes.post("/", usersController.create);

export { UserRoutes };