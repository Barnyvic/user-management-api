import { Request, Response, NextFunction } from "express";

import { decodeToken } from "../utils/jwt";
import Users from "../model/user";
import { errorResponse } from "../utils/response";


export const authguard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return errorResponse(res, 401, "Authorization not found");
    }

    const decoded: any = await decodeToken(token);

    const user = await Users.findById(decoded.id);
    if (!user) return errorResponse(res, 404, "user not found");
    req.user = user;
    return next();
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
