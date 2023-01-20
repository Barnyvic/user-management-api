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
exports.deleteAccount = exports.uploadProfilePicture = exports.updateProfile = exports.getSingleUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../model/user"));
const response_1 = require("../utils/response");
//@desc get all  user
//@route GET /profile
//@access Private
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.find().select("-password").sort({ createdAt: -1 });
        return (0, response_1.successResponse)(res, 200, "Users Data", user);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, "Server error.");
    }
});
exports.getAllUsers = getAllUsers;
//@desc get single  user
//@route GET /profile/:id
//@access Private
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        if (_id.toString() === req.params.id) {
            const user = yield user_1.default.findById(req.params.id).select("-password");
            return (0, response_1.successResponse)(res, 200, "User Data", user);
        }
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, "Server error.");
    }
});
exports.getSingleUser = getSingleUser;
//@desc updateProfile
//@route PUT /updateprofile/:id
//@access Private
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { email, firstName, lastName, phoneNumber } = req.body;
        if (_id.toString() === req.params.id) {
            const user = yield user_1.default.findById(req.params.id);
            if (!user)
                return (0, response_1.errorResponse)(res, 404, "user not found");
            if (user.id.toString() != _id)
                return (0, response_1.errorResponse)(res, 404, "user not authorized");
            const profile = yield user_1.default.findByIdAndUpdate({ _id }, { email, firstName, lastName, phoneNumber }, { new: true });
            return (0, response_1.successResponse)(res, 200, "user profile updated successfully", profile);
        }
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, "Server error.");
    }
});
exports.updateProfile = updateProfile;
//@desc uploadProfilePicture
//@route PATCH /upload
//@access Private
const uploadProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { _id } = req.user;
        console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const user = yield user_1.default.findByIdAndUpdate(_id, { profilePicture: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path }, { new: true });
        return (0, response_1.successResponse)(res, 200, "picture uploaded successfully", user);
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, "Server error.");
    }
});
exports.uploadProfilePicture = uploadProfilePicture;
//@desc deleteAccount
//@route PUT /delete
//@access Private
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        if (_id.toString() === req.params.id) {
            const user = yield user_1.default.findByIdAndDelete(req.params.id);
            if (!user)
                return (0, response_1.errorResponse)(res, 404, "user not found");
            return (0, response_1.successResponse)(res, 204, "user account deleted successfully");
        }
    }
    catch (error) {
        (0, response_1.handleError)(req, error);
        return (0, response_1.errorResponse)(res, 500, "Server error.");
    }
});
exports.deleteAccount = deleteAccount;
//# sourceMappingURL=userController.js.map