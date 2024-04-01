import { connectToDB } from "@/src/utils/database";
import Match from "@/src/models/match";
import { validValues } from "@/src/utils/validation";

export const revalidate = 0;

const teams = validValues.teams;

export async function PUT(req, { params }) {
  await connectToDB();

  try {
    const newMatchData = await req.json();
    
    const match = await Match.findById(params.matchId);
    if (!match) return new Response("Match not found.", { status: 404 });


    const updated = await Match.findByIdAndUpdate(
      params.matchId,
      newMatchData,
      {
        runValidators: true,
      }
    ).exec();

    return new Response(JSON.stringify(matches), { status: 200 });
  } catch (error) {
    return new Response("Failed to All matches. Error: " + error, {
      status: 500,
    });
  }
}
