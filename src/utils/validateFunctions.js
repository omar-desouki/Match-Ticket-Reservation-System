import { ObjectId } from "mongodb";
import Match from "../models/match";
import { validValues } from "./validation";
// import Stadium from "../models/stadium";

export const validateMatch = async (newMatchData) => {
  try {
    // Home and Away is the same club -> Return error
    if (newMatchData.homeTeam === newMatchData.awayTeam) {
      return new Response(`Choose different clubs for home and away teams`, {
        status: 404,
      });
    }

    // Valid team names
    if (!validValues.teams.includes(newMatchData.homeTeam)) {
      return new Response(`Invalid home team name`, { status: 404 });
    }
    if (!validValues.teams.includes(newMatchData.awayTeam)) {
      return new Response(`Invalid away team name`, { status: 404 });
    }

    // Check if match uses a stadium at a clashed time
    const matchDuration = 3; // hours
    const startMatchDate = new Date(newMatchData.dateTime);
    console.log("startMatchDate", startMatchDate);
    const endMatchDate = new Date(startMatchDate);
    endMatchDate.setHours(
      endMatchDate.getHours() + matchDuration // * 60 * 60 * 1000 // convert to hours
    );

    console.log("newMatchData", newMatchData);

    console.log("newMatchData._id", typeof newMatchData._id);
    console.log(
      "newMatchData.stadium.stadiumId",
      typeof newMatchData.stadium.stadiumId
    );
    let excludeIdOnUpdate = {};
    if (typeof newMatchData._id === "string") {
      excludeIdOnUpdate = newMatchData._id
        ? {
            _id: { $ne: new ObjectId(newMatchData._id) },
          }
        : {};
    } else {
      excludeIdOnUpdate = newMatchData._id
        ? {
            _id: { $ne: newMatchData._id },
          }
        : {};
    }

    let stadiumId = newMatchData.stadium.stadiumId;
    if (typeof !newMatchData.stadium.stadiumId === "string") {
      stadiumId = new ObjectId(newMatchData.stadium.stadiumId);
    } else {
      stadiumId = newMatchData.stadium.stadiumId;
    }

    const matches = await Match.find({
      ...excludeIdOnUpdate,
      "stadium.stadiumId": stadiumId,
      $or: [
        // Check for start time of existing matches
        {
          dateTime: {
            $gte: startMatchDate,
            $lt: endMatchDate,
          },
        },
        // Check for end time of existing matches
        {
          dateTime: {
            $gte: new Date(startMatchDate).setHours(
              startMatchDate.getHours() - 3
            ),
            $lt: new Date(endMatchDate).setHours(endMatchDate.getHours() - 3),
          },
        },
      ],
    })
      .populate("stadium.stadiumId")
      .exec();

    // If clashed time -> Return error
    if (matches.length != 0) {
      return new Response(
        `Another Match used the same ${matches[0].stadium.stadiumId.stadiumName} stadium at the same time slot`,
        { status: 404 }
      );
    }

    // Check if a team has a match at the same day
    const startMatchDay = new Date(newMatchData.dateTime).setHours(0, 0, 0, 0);
    const endMatchDay = new Date(startMatchDate).setHours(23, 59, 59, 999);
    const matchesAtSameDay = await Match.find({
      ...excludeIdOnUpdate,
      $or: [
        { homeTeam: newMatchData.homeTeam },
        { homeTeam: newMatchData.awayTeam },
        { awayTeam: newMatchData.awayTeam },
        { awayTeam: newMatchData.homeTeam },
      ],
      dateTime: {
        $gte: startMatchDay,
        $lt: endMatchDay,
      },
    });
    // If a team is playing at the same day -> Return error
    if (matchesAtSameDay.length != 0) {
      return new Response(`Teams cannot play at the same day.`, {
        status: 404,
      });
    }

    return new Response("Validation is correct.", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(`Validation Error.\n ${error}`, {
      status: 500,
    });
  }
};
