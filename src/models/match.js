import { Schema, model, models, SchemaTypes } from "mongoose";
import Stadium from "./stadium";
// import models, { Schema, model, SchemaTypes } from "mongoose";

const matchSchema = new Schema(
  {
    homeTeam: {
      type: String,
      required: [true, "This Matchname is required."],
      trim: true,
    },
    awayTeam: {
      type: String,
      required: [true, "This Matchname is required."],
      trim: true,
    },

    stadium: {
      stadiumId: { type: SchemaTypes.ObjectId, ref: "Stadium", required: true },
      seats: SchemaTypes.Map,
      // required: [true, "This field is required."],
    },

    dateTime: {
      type: Date,
      required: [true, "This field is required."],
    },
    mainReferee: {
      type: String,
      required: [true, "This field is required."],
      trim: true,
    },
    linesmen: {
      firstLineman: {
        type: String,
        required: [true, "This field is required."],
      },
      secondLineman: {
        type: String,
        required: [true, "This field is required."],
      },
    },
  },
  { timestamps: true }
); // Add timestamps for createdAt and updatedAt

const Match = models.Match || model("Match", matchSchema, "matches");

export default Match;

// match: [
//   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
//   "Matchname invalid, it should contain 8-20 alphanumeric letters and be unique!",
// ],
