import { connectToDB } from "@/src/utils/database";
import Match from "@/src/models/match";
import Stadium from "@/src/models/stadium";
import { ObjectId } from "mongodb";
import { validValues } from "@/src/utils/validation";

export const revalidate = 0;

const teams = validValues.teams;

export async function GET(req) {
  await connectToDB();

  try {
    const numberOfMatches = await Match.countDocuments().exec();
    console.log(numberOfMatches);
    return new Response(numberOfMatches.toString(), { status: 200 });
  } catch (error) {
    return new Response("Failed to get Number Of Matches. Error: " + error, {
      status: 500,
    });
  }
}
