"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const authRouter = (0, express_1.Router)();
authRouter.route("/signup").post(authController_1.createUser).get(authController_1.loginUser);
authRouter.route("/login").get(authController_1.loginUser);
exports.default = authRouter;
//# sourceMappingURL=authroute.js.map