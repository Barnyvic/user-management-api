import { Schema, model } from "mongoose";
import { IUser } from "../utils/interface";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    phoneNumber: { type: String, unique: true },
  },
  { timestamps: true }
);

userSchema.index({
  firstName: "text",
  lastName: "text",
});

const Users = model<IUser>("User", userSchema);

export default Users;
