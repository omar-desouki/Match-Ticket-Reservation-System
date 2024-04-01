import { connectToDB } from "@/src/utils/database";
import Match from "@/src/models/match";
import Stadium from "@/src/models/stadium";
import { ObjectId } from "mongodb";
import { validateMatch } from "@/src/utils/validateFunctions";
import { validValues } from "@/src/utils/validation";
// import { pusherServer } from "@/src/utils/pusher";
// import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

const teams = validValues.teams;

export async function GET(req, { params }) {
  await connectToDB();

  try {
    const matches = await Match.findById(params.matchId)
      .populate("stadium.stadiumId")
      .exec();
    console.log(matches);
    return new Response(JSON.stringify(matches), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all matches. Error: " + error, {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  await connectToDB();

  try {
    const match = await Match.findById(params.matchId);
    if (!match) return new Response("Match not found.", { status: 404 });

    const newMatchData = await req.json();

    console.log("newMatchData", newMatchData);
    console.log("match", match);

    if (match == newMatchData)
      return new Response("No changes.", { status: 200 });

    // pusherServer.trigger(`match-${params.matchId}`, "book-seat", {
    //   matchId: params.matchId,
    //   seats: newMatchData.stadium.seats,
    // });

    const stadium = await Stadium.findById(
      newMatchData.stadium.stadiumId
    ).exec();

    return validateMatch(newMatchData)
      .then((response) => {
        if (!response.ok) return response;

        // console.log("response", response);
        // console.log("Hena");
        // console.log("newMatchData", newMatchData);
        // console.log("stadium", stadium);

        let seats = {};
        const numOfSeats =
          stadium.shape.numOfRows * stadium.shape.numOfSeatsPerRow;
        // Check if stadium changed
        if (stadium._id != match.stadium.stadiumId) {
          // Set new stadium dimension and removing all booked seats
          for (let i = 0; i < numOfSeats; i++) {
            seats[i] = { booked: false, userId: null };
          }
        } else {
          seats = match.stadium.seats;
        }

        // const seats =
        //   numOfSeats != match.stadium.seats.length
        //     ? match.stadium.seats // Existing seats
        //     : newMatchData.stadium.seats; // New seats

        // Update
        var opts = { runValidators: true };
        const newMatch = Match.findByIdAndUpdate(
          match._id,
          {
            ...newMatchData,
          },
          opts
        ).exec();

        return new Response(JSON.stringify(newMatch), { status: 201 });
      })
      .catch((error) => {
        console.error(error);
        return new Response("Failed to updating match match.\n" + error, {
          status: 500,
        });
      });
  } catch (error) {
    console.error(error);
    return new Response("Failed to updating match.\n" + error, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectToDB();

  const { id } = req.query;

  try {
    const deletedMatch = await Match.findByIdAndDelete(params.matchId);
    return new Response("Match Deleted successfuly.", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete the Match.", { status: 500 });
  }
}
