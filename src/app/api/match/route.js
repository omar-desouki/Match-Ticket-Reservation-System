import { connectToDB } from "@/src/utils/database";
import Match from "@/src/models/match";
import Stadium from "@/src/models/stadium";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { validValues } from "@/src/utils/validation";
import { validateMatch } from "@/src/utils/validateFunctions";

export const revalidate = 0;

const teams = validValues.teams;

export async function GET(req) {
  await connectToDB();

  try {
    // console.log("params", req.nextUrl.searchParams);
    const searchParams = req.nextUrl.searchParams;
    const team = searchParams.get("team") || "";
    const page = Number(searchParams.get("page")) || 1;
    const itemsPerPage = Number(searchParams.get("itemsPerPage")) || 10;
    const filter =
      team == ""
        ? { dateTime: { $gte: new Date(Date.now()) } }
        : {
            $or: [
              { homeTeam: { $regex: team, $options: "i" } },
              { awayTeam: { $regex: team, $options: "i" } },
            ],
            dateTime: { $gt: new Date(Date.now()) },
          };

    const matches = await Match.find(filter)
      .populate("stadium.stadiumId")
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .sort({ dateTime: 1 })
      .exec();
    // console.log("team", team);
    // console.log("page", page);
    // console.log("itemsPerPage", itemsPerPage);
    // console.log("skip", (page - 1) * itemsPerPage);
    // console.log("filter", filter);
    // console.log("matches");
    // console.log(matches);
    return new Response(JSON.stringify(matches), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all matches. Error: " + error, {
      status: 500,
    });
  }
}

export async function POST(req) {
  await connectToDB();

  try {
    const newMatchData = await req.json();
    const stadium = await Stadium.findById(
      newMatchData.stadium.stadiumId
    ).exec();

    return validateMatch(newMatchData)
      .then((response) => {
        if (!response.ok) return response;

        // console.log("response", response);
        // console.log("newMatchData", newMatchData);
        // console.log("stadium", stadium);

        const seats = {};
        const numOfSeats =
          stadium.shape.numOfRows * stadium.shape.numOfSeatsPerRow;
        for (let i = 0; i < numOfSeats; i++) {
          seats[i] = { booked: false, userId: null };
        }

        // Create
        const newMatch = new Match({
          ...newMatchData,
          stadium: {
            stadiumId: new ObjectId(newMatchData.stadium.stadiumId),
            seats: seats,
          },
        });
        console.log("newMatch", newMatch);

        async function saveMatch() {
          try {
            const savedMatch = await newMatch.save();
            console.log("savedMatch", savedMatch);
            return new Response("Match added successfuly.", { status: 201 });
          } catch (error) {
            console.error(error);
            return new Response("Failed to saving match match.\n" + error, {
              status: 500,
            });
          }
        }

        return saveMatch();
      })
      .catch((error) => {
        console.error(error);
        return new Response("Failed to saving match match.\n" + error, {
          status: 500,
        });
      });
  } catch (error) {
    console.error(error);
    return new Response("Failed to add match.\n" + error, { status: 500 });
  }
}

export async function PUT(req) {
  await connectToDB();

  try {
    const newMatchData = await req.json();

    // Id must be provided to prevent duplicate matches (using ".save()". T2riban m3 ay update lazem ykon feh id)
    if (!newMatchData._id) {
      throw new Error(
        "Match ID is required.\nYou probably called the wrong API. Make sure you are using the POST API."
      );
    }

    return validateMatchAndSave(newMatchData);
    return new Response(JSON.stringify(savedMatch), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to add match.\n" + error, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectToDB();

  try {
    const { _id: id } = req.json();

    const deletedMatch = await Match.findByIdAndDelete(id);
    return new Response(
      `${JSON.stringify(deletedMatch)} deleted successfuly.`,
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete match.", { status: 500 });
  }
}
