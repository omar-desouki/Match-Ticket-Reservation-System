import { Schema, model, models, SchemaTypes } from "mongoose";
import { validValues } from "../utils/validation";
// import models, { Schema, model, SchemaTypes } from "mongoose";

const stadiumSchema = new Schema(
  {
    stadiumName: {
      type: String,
      unique: [true, "Must be unique"],
      required: [true, "This Stadiumname is required."],
      trim: true,
      min: 1,
      max: 30,
    },
    shape: {
      numOfRows: {
        type: Number,
        required: true,
        min: [validValues.stadiumShape.minNumOfRows, "Must be greater than 0"],
        max: [
          validValues.stadiumShape.maxNumOfRows,
          `Must be less than ${validValues.stadiumShape.maxNumOfRows}`,
        ],
      },
      numOfSeatsPerRow: {
        type: Number,
        required: true,
        min: [
          validValues.stadiumShape.minNumOfSeatsPerRow,
          "Must be greater than 0",
        ],
        max: [
          validValues.stadiumShape.maxNumOfSeatsPerRow,
          `Must be less than ${validValues.stadiumShape.maxNumOfSeatsPerRow}`,
        ],
      },
      // required: [true, "Stadium shape is required."],
    },
  },
  { timestamps: true }
); // Add timestamps for createdAt and updatedAt

const Stadium = models.Stadium || model("Stadium", stadiumSchema, "stadiums");

export default Stadium;
