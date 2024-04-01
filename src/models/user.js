import { Schema, model, models, SchemaTypes } from "mongoose";
import { validValues } from "../utils/validation";
// import models, { Schema, model, SchemaTypes } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, "User name must be unique. Pick another one."],
      required: [true, "This username is required."],
      trim: true,
      // lowercase: true, // Remove leading and trailing whitespaces from string values before saving them to the database.
      // match: [
      //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
      // ],
    },
    password: {
      type: String,
      required: [true, "This password is required."],
      select: false,
    }, // Hide password in query results
    firstName: {
      type: String,
      required: [true, "This field is required."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "This field is required."],
      trim: true,
    },
    birthDate: {
      type: Date,
      required: [true, "This field is required."],
    },
    gender: {
      type: String,
      enum: validValues.genders,
      required: [true, "This field is required."],
    },
    city: {
      type: String,
      required: [true, "This field is required."],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "This field is required."],
      trim: true,
    },
    emailAddress: {
      type: String,
      default: "",
      unique: [true, "Email must be unique"],
      lowercase: true,
      trim: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: validValues.roles,
      required: [true, "This field is required."],
    },
  },
  { timestamps: true }
); // Add timestamps for createdAt and updatedAt

const User = models.User || model("User", userSchema, "users");

export default User;
