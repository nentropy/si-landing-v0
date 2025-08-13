
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const email = session?.user?.email?.toLowerCase() || "";
  if (!email.endsWith("@shaivraintel.com")) return res.status(403).json({ message: "Admins only" });
  if (req.method !== "POST") return res.status(405).end();

  const { email: invitee, days = 7, role = "user" } = req.body || {};
  const token = crypto.randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + Math.max(1, Number(days)) * 24 * 60 * 60 * 1000);

  await prisma.invite.create({
    data: { email: (invitee || "").toLowerCase(), role, token, expiresAt }
  });

  const link = `${process.env.NEXTAUTH_URL || ""}/invite/${token}`;
  res.json({ message: "Created", link });
}
