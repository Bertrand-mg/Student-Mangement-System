import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config as DotEven } from "dotenv";
DotEven();
import { config, databaseConnection } from "./config";
import mainRoute from "./route";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To My App");
});

app.use(config.prefix, mainRoute);
// app.use(mainRoute);

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
