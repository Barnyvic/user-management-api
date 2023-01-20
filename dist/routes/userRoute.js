"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const userController_1 = require("../controller/userController");
const upload_1 = __importDefault(require("../middleware/upload"));
const userController_2 = require("../controller/userController");
const userRouter = (0, express_1.Router)();
userRouter.route("/profile").get(authMiddleware_1.authguard, userController_1.getAllUsers);
userRouter.route("/profile/:id").get(authMiddleware_1.authguard, userController_2.getSingleUser);
userRouter.route("/updateprofile/:id").put(authMiddleware_1.authguard, userController_1.updateProfile);
userRouter
    .route("/upload")
    .patch(authMiddleware_1.authguard, upload_1.default.single("file"), userController_1.uploadProfilePicture);
userRouter.route("/delete/:id").delete(authMiddleware_1.authguard, userController_1.deleteAccount);
exports.default = userRouter;
//# sourceMappingURL=userRoute.js.map