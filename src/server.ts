import express, { Express, Request, Response } from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";

import { config as DotEven } from "dotenv";
DotEven();
import { config, databaseConnection } from "./config";
import mainRoute from "./route";

const app: Express = express();

const swaggerPath = path.join(__dirname, "../swagger/openapi.yaml");
const swaggerDoc = yaml.load(fs.readFileSync(swaggerPath, "utf-8")) as Object;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To My App");
});

app.use(config.prefix, mainRoute);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "router path not found",
  });
});
databaseConnection().then((value) =>
  app.listen(config.port, () =>
    console.log(`Server is running on port ${config.port}`)
  )
);

export default app;
