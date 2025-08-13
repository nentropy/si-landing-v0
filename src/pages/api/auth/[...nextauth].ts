
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GCP_CLIENT_ID!,
      clientSecret: process.env.GCP_CLIENT_SECRET!,
    }),
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET ? [GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    })] : [])
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      const email = (user?.email || "").toLowerCase();
      // 1) Always allow org admins
      if (email.endsWith("@shaivraintel.com")) return true;

      // 2) Require a valid, non-expired, unused invite for this email
      const invite = await prisma.invite.findFirst({
        where: {
          email: email,
          usedAt: null,
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: "desc" },
      });

      if (!invite) return false;

      // Mark invite as used at sign-in (idempotent)
      await prisma.invite.update({
        where: { token: invite.token },
        data: { usedAt: new Date() },
      });

      return true;
    },
    async jwt({ token }) {
      const email = (token.email || "").toLowerCase();
      let role = "user";
      if (email.endsWith("@shaivraintel.com")) role = "admin";
      else {
        // If user was invited with a specific role, apply it
        const invite = await prisma.invite.findFirst({
          where: { email: email },
          orderBy: { createdAt: "desc" },
        });
        if (invite?.role) role = invite.role;
      }
      token.role = role;
      return token;
    },
    async session({ session, token }) {
      session.user = { ...(session.user || {}), email: token.email as string, role: token.role as string };
      return session;
    }
  },
  pages: { signIn: "/api/auth/signin" },
};

export default NextAuth(authOptions);
