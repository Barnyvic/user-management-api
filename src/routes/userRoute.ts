import { Router } from "express";

import { authguard } from "../middleware/authMiddleware";
import {
  deleteAccount,
  getAllUsers,
  updatePassword,
  updateProfile,
  uploadProfilePicture,
} from "../controller/userController";
import parser from "../middleware/upload";
import { getSingleUser } from "../controller/userController";

const userRouter = Router();

userRouter.route("/profiles").get(authguard, getAllUsers);
userRouter.route("/profile/:id").get(authguard, getSingleUser);
userRouter.route("/updateprofile/:id").put(authguard, updateProfile);
userRouter
  .route("/upload")
  .patch(authguard, parser.single("file"), uploadProfilePicture);
userRouter.route("/delete/:id").delete(authguard, deleteAccount);
userRouter.route("/update-password").patch(authguard, updatePassword);


export default userRouter;
