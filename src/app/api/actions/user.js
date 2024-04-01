"use server";
import User from "@/src/models/user";
import { connectToDB } from "@/src/utils/database";
import bcrypt from "bcrypt";

let user = User;

connectToDB();

export async function createUser(newUser) {
  try {
    const duplicate = await User.exists({ username: newUser.username });
    if (duplicate) return null;

    newUser.password = await bcrypt.hash(newUser.password, 10);
    const user = await User.create(newUser);
    return user;
  } catch (error) {
    console.log("Error creating new user...\n", error);
  }
  return null;
}

export async function getUsers(filter) {
  try {
    const users = await User.find(filter);
    return users;
  } catch (error) {
    console.log(`Error getting users with filter: ${filter}...\n`, error);
  }
  return null;
}

export async function authUser(userCredentials) {
  try {
    const { username, password } = userCredentials;
    if (!username || !password) {
      return null;
    }

    const user = await User.findOne({ username: username })
      .select("+password")
      .lean()
      .exec();

    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);
    // const match = password == user.password;
    if (match) {
      console.log("Valid User");
      // Remove password from user variable (not database)
      delete user.password;
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error occurred while logging in...\n", error);
  }
  return null;
}

export async function updateUser(newUser) {
  try {
   
    const user = await User.findOne({ username: newUser.username });

    if (user) {
     
      user.approved = true; 

      await user.save();

      return user;
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.log('Error updating user...\n', error);
  }

  return null;
}




export async function deleteUser(userDelete) {
  try {
    const status = await User.deleteOne({ username: userDelete.username });
    return status;
  } catch (error) {
    console.log(`Error deleting ${userDelete.username}...\n`, error);
  }

  return null;
}
