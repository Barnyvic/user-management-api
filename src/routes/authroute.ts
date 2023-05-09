import { Router } from "express";
import { createUser, loginUser, logoutUser } from "../controller/authController";

const authRouter = Router();

authRouter.route("/signup").post(createUser)
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").post(logoutUser);

export default authRouter;
