import { config } from "dotenv";
import mongoose from "mongoose";
import User from "../models/user.js";
import Stadium from "../models/stadium.js";
import Match from "../models/match.js";
import bcrypt from "bcrypt";

config();

// console.log(process.env.MONGODB_URI)

// Connection URL
const url = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(url, {
  dbName: "EgyptCheer",
});

try {
  // Add sample data to users collection
  User.create(
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
      approved: true,
      role: "admin",
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
      approved: true,
      role: "manager",
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
      approved: true,
      role: "fan",
    }
  );

  // Add sample data to stadiums collection
  const stadiums1 = new Stadium({
    stadiumName: "Etihad Stadium",
    shape: {
      numOfRows: 2,
      numOfSeatsPerRow: 10,
    },
  });
  const stadiums2 = new Stadium({
    stadiumName: "Old Trafford",
    shape: {
      numOfRows: 4,
      numOfSeatsPerRow: 20,
    },
  });
  stadiums1.save();
  stadiums2.save();

  // Get stadiumId of first stadium
  const stadiumIdStr = stadiums1._id;
  console.log("stadiumIdStr", stadiumIdStr);

  // Add sample data to matches collection
  Match.create({
    homeTeam: "Al Ahly",
    awayTeam: "Zamalek",
    stadium: {
      stadiumId: stadiumIdStr,
      seats: [
        { row: 1, column: 1 },
        { row: 1, column: 2 },
      ],
    },
    dateTime: new Date(),
    mainReferee: "Referee A",
    linesmen: {
      firstLineman: "Lineman A",
      secondLineman: "Lineman B",
    },
  });

  console.log("Database created successfully");
} catch (error) {
  console.log("Failed to create database", error);
}
