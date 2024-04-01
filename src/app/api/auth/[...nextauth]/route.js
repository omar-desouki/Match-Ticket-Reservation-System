import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authUser } from "@/src/app/api/actions/user";
import { connectToDB } from "@/src/utils/database";
import User from "@/src/models/user";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "example",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDB();
        const { username, password } = credentials;
        if (!username || !password) {
          return null;
        }

        const user = await User.findOne({ username: username })
          .select("+password")
          .lean()
          .exec();

        if (!user) {
          throw new Error(
            "No user found with given username.\n Make sure you entered the correct username."
          );
        }

        if (!user?.approved) {
          throw new Error(
            "User not approved yet.\nYou need to wait for the admin to approve your account."
          );
        }

        const match = await bcrypt.compare(password, user.password);
        // const match = password == user.password;
        if (match) {
          console.log("Valid User");
          // Remove password from user variable (not database)
          delete user.password;
          return user;
        }
        throw new Error(
          "Invalid user credentials.\n Make sure you entered the correct username and password."
        );
      },
    }),
  ],
  pages: {
    signIn: "/fan/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt token", token, "jwt user", user);
      if (user) {
        const { _id, username, firstName, lastName, role } = user;
        token = {
          ...token,
          _id,
          username,
          firstName,
          lastName,
          role,
        };
      }
      return { ...token };
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      console.log("session", session, "token", token);
      return session;
    },
  },
  session: {
    staregy: "jwt", // Enable JWT sessions
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
