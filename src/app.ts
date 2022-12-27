import express, { Express, Request, Response } from "express";
import logger from "morgan";
import helmet from "helmet";

import { CustomRequest } from "./utils/interface";
import authRouter from "./routes/authroute";
import userRouter from "./routes/userRoute";

const app: Express = express();
app.use(helmet());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

declare global {
  namespace Express {
    interface Request extends CustomRequest {}
  }
}

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// routes not found
app.use("*", (req: Request, res: Response) => {
  return res.status(404).json({ message: "route not found" });
});

export default app;
