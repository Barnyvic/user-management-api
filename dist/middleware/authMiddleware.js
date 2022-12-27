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
exports.authguard = void 0;
const jwt_1 = require("../utils/jwt");
const user_1 = __importDefault(require("../model/user"));
const response_1 = require("../utils/response");
const authguard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = yield (0, jwt_1.decodeToken)(token);
            const user = yield user_1.default.findById(decoded.id);
            if (!user)
                return (0, response_1.errorResponse)(res, 404, "user not found");
            req.user = user;
            return next();
        }
        else {
            return (0, response_1.errorResponse)(res, 401, "Authorization not found");
        }
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, 500, error.message);
    }
});
exports.authguard = authguard;
//# sourceMappingURL=authMiddleware.js.map