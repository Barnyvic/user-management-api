import { Request, Response } from "express";

import Users from "../model/user";
import { successResponse, errorResponse, handleError } from "../utils/response";
import { hashPassword, comparePassword } from "../utils/hashpassword";
import { generateToken } from "../utils/jwt";

//@desc Register new user
//@route POST /signup
//@access Public

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = req.body;
    //    making sure all fields are valid
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !confirmPassword
    ) {
      return errorResponse(res, 400, "Please Fill empty fields");
    }
    //   confirming password
    if (password !== confirmPassword) {
      return errorResponse(res, 400, "PassWord must Match");
    }

    const emialExist = await Users.findOne({ email });
    if (emialExist)
      return errorResponse(res, 409, "email already in use by another user");

    const phoneExist = await Users.findOne({ phoneNumber });

    if (phoneExist)
      return errorResponse(
        res,
        409,
        "Phone Number already in use by another user"
      );

    const hash = await hashPassword(password);

    // save user to db
    const user = await Users.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hash,
    });

    return successResponse(res, 201, "Account created successfully", user);
  } catch (error) {
    handleError(error, req);
    return errorResponse(res, 500, "Server error.");
  }
};

//@desc Login
//@route GET /login
//@access Public

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return errorResponse(res, 400, "please fill all fields");
    const user = await Users.findOne({ email });
    if (!user) return errorResponse(res, 404, "user not found");
    const isPassword = await comparePassword(password, user.password);
    if (!isPassword) return errorResponse(res, 400, "incorrect password");
    const token = await generateToken({
      id: user.id,
      email: user.email,
    });
    return successResponse(res, 200, "user logged in successfully", {
      user,
      token,
    });
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Server error.");
  }
};
