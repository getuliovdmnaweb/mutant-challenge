import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app = express() as Application;

app.use(cors());

app.use(routes);

app.set("json spaces", 4);

app.listen(8080);
