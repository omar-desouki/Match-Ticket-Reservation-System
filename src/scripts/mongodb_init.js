import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import bcrypt from "bcrypt";

config();

// ! Don't run this file!!!

// console.log(process.env.MONGODB_URI)

// Connection URL
const url = process.env.MONGODB_URI;

// Database Name
const dbName = "EgyptCheer";

async function run() {
  // Create the database if it does not exist, and make a connection to it.
  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected to the database");

    // const dbCheck = client.db(dbName);

    // // Drop users collections
    // dbCheck.dropDatabase();

    const db = client.db(dbName);

    // Create Users Collection
    const usersCollection = db.collection("users");

    await usersCollection.insertMany([
      {
        username: "adminUser",
        password: (await bcrypt.hash("password1", 10)).toString(),
        firstName: "Test",
        lastName: "Admin",
        birthDate: new Date("1990-01-01"),
        gender: "Male",
        city: "Cairo",
        address: "123 Main St",
        emailAddress: "john.doe@example.com",
        role: "Admin",
      },
      {
        username: "managerUser",
        password: (await bcrypt.hash("password2", 10)).toString(),
        firstName: "Test",
        lastName: "Manager",
        birthDate: new Date("1990-01-01"),
        gender: "Male",
        city: "Cairo",
        address: "123 Main St",
        emailAddress: "",
        role: "Manager",
      },
      {
        username: "fanUser",
        password: (await bcrypt.hash("password3", 10)).toString(),
        firstName: "Test",
        lastName: "Fan",
        birthDate: new Date("1990-01-01"),
        gender: "Male",
        city: "Cairo",
        address: "123 Main St",
        emailAddress: "",
        role: "Fan",
      },
      // Add more users as needed
    ]);

    // Create Stadiums Collection
    const stadiumsCollection = db.collection("stadiums");
    await stadiumsCollection.insertMany([
      {
        stadiumName: "Etihad Stadium",
        shape: {
          numOfSeats: 10,
          numOfRows: 2,
        },
      },
      // Add more stadiums as needed
    ]);

    const stadium = stadiumsCollection.findOne();
    const stadiumIdStr = stadium._id;

    // Create Matches Collection
    const matchesCollection = db.collection("matches");
    await matchesCollection.insertMany([
      {
        homeTeam: "Ahly",
        awayTeam: "Zamalek",
        stadium: {
          stadiumId: stadiumIdStr,
          seats: [
            { row: 1, column: 1 },
            { row: 1, column: 2 },
            // Add more seats as needed
          ],
        },
        dateTime: new Date("2023-01-15T18:00:00"),
        mainReferee: "Referee A",
        linesmen: ["Linesman A", "Linesman B"],
      },
      // Add more matches as needed
    ]);

    console.log("Data inserted successfully!");
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

run().catch(console.error);
