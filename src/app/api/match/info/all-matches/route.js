import { connectToDB } from "@/src/utils/database";
import Match from "@/src/models/match";
import { validValues } from "@/src/utils/validation";

export const revalidate = 0;

const teams = validValues.teams;

export async function GET(req) {
  await connectToDB();

  try {
    const matches = await Match.find({
      dateTime: { $gte: new Date(Date.now()) },
    })
      .populate("stadium.stadiumId")
      .sort({ dateTime: 1 })
      .exec();

    return new Response(JSON.stringify(matches), { status: 200 });
  } catch (error) {
    return new Response("Failed to All matches. Error: " + error, {
      status: 500,
    });
  }
}
