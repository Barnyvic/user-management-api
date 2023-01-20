"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid E-mail",
        ],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    profilePicture: { type: String, default: "" },
    phoneNumber: { type: String, unique: true },
}, { timestamps: true });
userSchema.index({
    firstName: "text",
    lastName: "text",
});
const Users = (0, mongoose_1.model)("User", userSchema);
exports.default = Users;
//# sourceMappingURL=user.js.map