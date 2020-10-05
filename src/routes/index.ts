import { Router } from "express";
import { getUsers, saveUsers } from "../controllers/users";

const routes = Router();

routes.get("/users", getUsers);

routes.get("/users/save", saveUsers);

export default routes;
