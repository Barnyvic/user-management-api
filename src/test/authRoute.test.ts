import supertest from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { dbConnection } from "../config/dbConfig";

const api = supertest(app);

describe("sign up and login a user", () => {
  beforeAll(async () => {
    await dbConnection();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new user ", async () => {
    const newUser = {
      email: "victor@gmail.com",
      password: "1234567",
      firstName: "Victor",
      lastName: "Barny",
      phoneNumber: "Vicky",
      confirmPassword: "1234567",
    };
    const response = await api.post("/api/auth/signup").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  }, 120000);

  it("should log a user in ", async () => {
    const loginDetails = {
      email: "victor@gmail.com",
      password: "1234567",
    };
    const response = await api.get("/api/auth/login").send(loginDetails);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
  });

  it("should return error if incorect password ", async () => {
    const loginDetails = {
      email: "victor@gmail.com",
      password: "12345",
    };
    const response = await api.get("/api/auth/login").send(loginDetails);
    expect(response.status).toBe(400);
  });
});
