"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const response_1 = require("../utils/response");
const hashpassword_1 = require("../utils/hashpassword");
const jwt_1 = require("../utils/jwt");
//@desc Register new user
//@route POST /signup
//@access Public
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, phoneNumber, email, password, confirmPassword, } = req.body;
        //    making sure all fields are valid
        if (!email ||
            !password ||
            !firstName ||
            !lastName ||
            !phoneNumber ||
            !confirmPassword) {
            return (0, response_1.errorResponse)(res, 400, "Please Fill empty fields");
        }
        //   confirming password
        if (password !== confirmPassword) {
            return (0, response_1.errorResponse)(res, 400, "PassWord must Match");
        }
        const emialExist = yield user_1.default.findOne({ email });
        if (emialExist)
            return (0, response_1.errorResponse)(res, 409, "email already in use by another user");
        const phoneExist = yield user_1.default.findOne({ phoneNumber });
        if (phoneExist)
            return (0, response_1.errorResponse)(res, 409, "Phone Number already in use by another user");
        const hash = yield (0, hashpassword_1.hashPassword)(password);
        // save user to db
        const user = yield user_1.default.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hash,
        });
        return (0, response_1.successResponse)(res, 201, "Account created successfully", user);
    }
    catch (error) {
        (0, response_1.handleError)(error, req);
        return (0, response_1.errorResponse)(res, 500, "Server error.");
    }
});
exports.createUser = createUser;
//@desc Login
//@route GET /login
//@access Public
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return (0, response_1.errorResponse)(res, 400, "please fill all fields");
        const user = yield user_1.default.findOne({ email });
        if (!user)
            return (0, response_1.errorResponse)(res, 404, "user not found");
        const isPassword = yield (0, hashpassword_1.comparePassword)(password, user.password);
        if (!isPassword)
            return (0, response_1.errorResponse)(res, 400, "incorrect password");
        const token = yield (0, jwt_1.generateToken)({
            id: user.id,
            email: user.email,
        });
        return (0, response_1.successResponse)(res, 200, "user logged in successfully", {
            user,
            token,
        });
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, "Server error.");
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map