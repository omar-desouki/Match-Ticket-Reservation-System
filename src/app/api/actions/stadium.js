"use server";
import Stadium from "@src/models/stadium";
import { connectToDB } from "@/src/utils/database";
import bcrypt from "bcrypt";

let stadium = Stadium;

connectToDB();

export async function createstadium(newstadium) {
  try {
    const duplicate = await stadium.exists({
      stadiumname: newstadium.stadiumname,
    });
    if (duplicate) return null;

    newstadium.password = await bcrypt.hash(newstadium.password, 10);
    const stadium = await stadium.create(newstadium);
    return stadium;
  } catch (error) {
    console.log("Error creating new stadium...\n", error);
  }
  return null;
}

export async function getstadiums(filter) {
  try {
    const stadiums = await Stadium.find(filter);
    return stadiums;
  } catch (error) {
    console.log(`Error getting stadiums with filter: ${filter}...\n`, error);
  }
  return null;
}

export async function updatestadium(newstadium) {
  try {
    await stadium
      .findOne({ stadiumname: newstadium.stadiumname })
      .then((stadium) => {
        stadium = {
          ...newstadium,
        };
        // Update with validation
        stadium.save();
        return stadium;
      });
  } catch (error) {
    console.log("Error updating new stadium...\n", error);
  }
  return null;
}

export async function deletestadium(stadiumDelete) {
  try {
    const status = await stadium.deleteOne({
      stadiumname: stadiumDelete.stadiumname,
    });
    return status;
  } catch (error) {
    console.log(`Error deleting ${stadiumDelete.stadiumname}...\n`, error);
  }

  return null;
}
