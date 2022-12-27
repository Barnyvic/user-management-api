import { Request, Response } from "express";
import Users from "../model/user";

import { errorResponse, successResponse, handleError } from "../utils/response";

//@desc updateProfile
//@route GET /profile/:id
//@access Private

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;

    if (_id.toString() === req.params.id) {
      const user = await Users.findById(req.params.id).select("-password");
      return successResponse(res, 200, "User Data", user);
    }
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Server error.");
  }
};

//@desc updateProfile
//@route PUT /updateprofile/:id
//@access Private

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const { email, firstName, lastName, phoneNumber } = req.body;
    if (_id.toString() === req.params.id) {
      const user = await Users.findById(req.params.id);
      if (!user) return errorResponse(res, 404, "user not found");
      if (user.id.toString() != _id)
        return errorResponse(res, 404, "user not authorized");
      const profile = await Users.findByIdAndUpdate(
        { _id },
        { email, firstName, lastName, phoneNumber },
        { new: true }
      );
      return successResponse(
        res,
        200,
        "user profile updated successfully",
        profile
      );
    }
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Server error.");
  }
};

//@desc uploadProfilePicture
//@route PATCH /upload
//@access Private

export const uploadProfilePicture = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    const user = await Users.findByIdAndUpdate(
      _id,
      { profilePicture: req.file?.path },
      { new: true }
    );
    return successResponse(res, 200, "picture uploaded successfully", user);
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Server error.");
  }
};

//@desc deleteAccount
//@route PUT /delete
//@access Private

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;
    if (_id.toString() === req.params.id) {
      const user = await Users.findByIdAndDelete(req.params.id);
      if (!user) return errorResponse(res, 404, "user not found");
      return successResponse(res, 204, "user account deleted successfully");
    }
  } catch (error) {
    handleError(req, error);
    return errorResponse(res, 500, "Server error.");
  }
};
