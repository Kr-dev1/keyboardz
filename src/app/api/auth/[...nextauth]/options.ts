import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bycrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await userModel.findOne({
            email: credentials.identifier,
          });
          if (!user) {
            throw new Error("No user found with this Email/Username");
          }
          if (!user.isVerified) {
            throw new Error(
              "User not verified, Please verify your accont befor login"
            );
          }
          const isPassowrdCorrect = await bycrypt.compare(
            credentials.password,
            user.password
          );
          if (isPassowrdCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user?._id?.toString();
        token.isVerified = user.isVerified;
        token.cartItems = user.cartItems;
        token.username = user.username;
        token.hasOrdered = user.hasOrdered;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.hasOrdered = token.hasOrdered;
        session.user.cartItems = token.cartItem;
      }
      return session;
    },
  },
};
