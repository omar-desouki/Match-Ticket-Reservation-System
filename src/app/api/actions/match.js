"use server";
import Match from "@/src/models/match";
import { connectToDB } from "@/src/utils/database";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

let match = Match;

let teams = [
  "Al Ahly",
  "Zamalek",
  "Al-Ittihad",
  "Al Masry",
  "Al Mokawloon",
  "Ceramica Cleopatra",
  "El Gouna",
  "El-Sharkeyah",
  "ENPPI",
  "Future FC",
  "Ghazl El Mahalla",
  "Ismaily",
  "Misr El Makkasa",
  "National Bank",
  "Pharco FC",
  "Pyramids FC",
  "Smouha",
  "El Geish",
];

connectToDB();

// export const revalidate = 0;

export async function createMatch(newMatch) {
  try {
    // Check if match uses a stadium at a clashed time
    const matchDuration = 3; // hours
    const startMatchDate = newMatch.dateTime;
    const endMatchDate = new Date(startMatchDate);
    endMatchDate.setTime(
      endMatchDate.getTime() + matchDuration * 60 * 60 * 1000 // convert to hours
    );

    const matches = await Match.find({
      "stadium.stadiumId": ObjectId(newMatch.stadium.stadiumId),
      dateTime: {
        $gte: startMatchDate,
        $lt: endMatchDate,
      },
    });

    // If no clashed time -> Can add match
    if (matches.length == 0) {
      const match = await Match.create(newMatch);
      return match;
    }
    console.log("Cannot use stadium for 2 matches with clashed time");
  } catch (error) {
    console.log("Error creating new Match...\n", error);
  }
  return null;
}

export async function getMatches(filter) {
  try {
    // const matches = await Match.find().populate("stadium");
    // matches.map((match) => {
    //   return JSON.parse(JSON.stringify(match));
    // });
    // console.log("matches", matches);
    // return matches;

    const res = await fetch(
      "/api/match",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(form),
      },
      { cache: "no-store" }
    );

    return res.status(201).json();
  } catch (error) {
    console.log(`Error getting Matches with filter: ${filter}...\n`, error);
  }
  return null;
}

export async function updateMatch(newMatch) {
  try {
    await Match.findOne({ Matchname: newMatch.Matchname }).then((match) => {
      match = {
        ...newMatch,
      };
      // Update with validation
      match.save();
      return match;
    });
  } catch (error) {
    console.log("Error updating new Match...\n", error);
  }
  return null;
}

export async function deleteMatch(matchDelete) {
  try {
    const status = await Match.deleteOne({
      _id: matchDelete.stadium,
      dateTime: matchDelete.dateTime,
    });
    return status;
  } catch (error) {
    console.log(`Error deleting ${matchDelete.Matchname}...\n`, error);
  }

  return null;
}
