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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const dbConfig_1 = require("../config/dbConfig");
const api = (0, supertest_1.default)(app_1.default);
describe("sign up and login a user", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, dbConfig_1.dbConnection)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    it("should create a new user ", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            email: "victor@gmail.com",
            password: "1234567",
            firstName: "Victor",
            lastName: "Barny",
            phoneNumber: "Vicky",
            confirmPassword: "1234567",
        };
        const response = yield api.post("/api/auth/signup").send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message");
    }), 120000);
    it("should log a user in ", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginDetails = {
            email: "victor@gmail.com",
            password: "1234567",
        };
        const response = yield api.get("/api/auth/login").send(loginDetails);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("data");
    }));
    it("should return error if incorect password ", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginDetails = {
            email: "victor@gmail.com",
            password: "12345",
        };
        const response = yield api.get("/api/auth/login").send(loginDetails);
        expect(response.status).toBe(400);
    }));
});
//# sourceMappingURL=authRoute.test.js.map