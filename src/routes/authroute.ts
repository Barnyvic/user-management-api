import { Router } from "express";
import { createUser, loginUser } from "../controller/authController";

const authRouter = Router();

authRouter.route("/signup").post(createUser).get(loginUser);
authRouter.route("/login").get(loginUser);
export default authRouter;
