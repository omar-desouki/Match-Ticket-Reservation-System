import { connectToDB } from "@/src/utils/database";
import User from "@/src/models/user";
import Match from "@/src/models/match";

export const revalidate = 0;

export async function GET(req, { params: { username } }) {
  await connectToDB();
  try {
    const users = await User.exists({ username: username });
    if (users) {
      return new Response("User found.", { status: 200 });
    } else {
      return new Response("User not found.", { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch all users", { status: 500 });
  }
}

// Book seat
export async function PUT(req, { params: { username } }) {
  await connectToDB();

  try {
    const newMatchData = await req.json();

    const match = await Match.findById(newMatchData._id);
    if (!match) return new Response("Match not found.", { status: 404 });

    const user = await User.findOne({ username: username });

    const updated = await Match.findByIdAndUpdate(match._id, newMatchData, {
      runValidators: true,
    }).exec();

    return new Response("Seat Booked", { status: 200 });
  } catch (error) {
    return new Response("Failed to Book seat. Error: " + error, {
      status: 500,
    });
  }
}

export async function DELETE(req, { params: { username } }) {
  await connectToDB();
  try {
    const user = await User.findOne({ username: username });
    if (!user) return new Response("User not found.", { status: 404 });

    const { password } = await req.json();
    // Do not delete admin user unless the right credencials are provided.
    if (user.role === "admin" && user.password !== password)
      return new Response(
        "You are trying to delete an admin user. Cannot delete admin user unless the right credencials are provided.",
        { status: 403 }
      );

    const deletedUser = await User.findByIdAndDelete(user._id);
    return new Response("User deleted successfuly.", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete user.", { status: 500 });
  }
}
