
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const email = session?.user?.email?.toLowerCase() || "";
  if (!email.endsWith("@shaivraintel.com")) return res.status(403).json({ message: "Admins only" });
  const invites = await prisma.invite.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  res.json({ invites });
}
