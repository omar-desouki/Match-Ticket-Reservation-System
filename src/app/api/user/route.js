import { connectToDB } from "@/src/utils/database";
import User from "@/src/models/user";
import bcrypy from "bcrypt";

export const revalidate = 0;

export async function GET(req, res) {
    await connectToDB();
    try {
        // console.log("params", req.nextUrl.searchParams);
        const searchParams = req.nextUrl.searchParams;
        const approved = searchParams.get("approved") || false;
        const filter = { approved: approved };

        console.log("approved", approved);

        const users = await User.find(filter);
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch all users", { status: 500 });
    }
}

export async function POST(req, res) {
    await connectToDB();

    try {
        const user = await req.json();

        console.log("user", user);
        console.log("user", typeof user.password);

        const newUser = new User({
            ...user,
            password: await bcrypy.hash(user.password, 10),
            approved: false,
        });

        const savedUser = await newUser.save();
        return new Response("User Created Successfuly.", { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(`Failed to create user.\n ${error}`, {
            status: 500,
        });
    }
}

// Update
export async function PUT(req, res) {
    const { id } = req.query;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function DELETE(req) {
    await connectToDB();
    try {
        // Expects a JSON having a filter to search by. Ex. { _id: "123" }, { role: "manager" }
        const filter = await req.json();

        // Check if the an admin is trying to get deleted
        const users = await User.find(filter);

        // Do not delete admin user(s)
        const check = await User.deleteMany({
            ...filter,
            role: { $ne: "admin" },
        });

        console.log("check.deletedCount", check.deletedCount);
        console.log("users.length", users.length);

        // 100% of the users were deleted
        if (check.deletedCount === users.length) {
            return new Response("User(s) deleted successfuly.", {
                status: 200,
            });
        }
        // Not all users were deleted (some of them were admins)
        return new Response(
            "User(s) deleted successfuly.\n Warning: You are trying to delete an admin user. Cannot delete admin user he tried to delete himself by providing his credentials.",
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return new Response("Failed to delete user(s).", { status: 500 });
    }
}
