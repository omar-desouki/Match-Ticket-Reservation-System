import { connectToDB } from "@/src/utils/database";
import Stadium from "@/src/models/stadium";

export const revalidate = 0;

export async function GET(req) {
  await connectToDB();

  try {
    const stadiums = await Stadium.find().exec();

    console.log("stadiums", stadiums);
    return new Response(JSON.stringify(stadiums), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all stadiums", { status: 500 });
  }
}

export async function POST(req) {
  await connectToDB();

  try {
    const newStadiumData = await req.json();

    const newStadium = new Stadium({
      stadiumName: newStadiumData.stadiumName,
      shape: {
        numOfRows: newStadiumData.shape.numOfRows,
        numOfSeatsPerRow: newStadiumData.shape.numOfSeatsPerRow,
      },
    });

    const savedStadium = await newStadium.save();
    return new Response("Stadium Created successfuly.", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      "Failed to create new stadium. Make sure the stadium name is unique.\n",
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req) {
  await connectToDB();

  const { id } = req.query;

  try {
    const updatedMatch = await Match.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function DELETE(req) {
  await connectToDB();

  const { id } = req.query;

  try {
    const deletedMatch = await Match.findByIdAndDelete(id);
    res.status(200).json(deletedMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
