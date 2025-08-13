
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { token } = req.body || {};
  if (!token) return res.status(400).json({ message: "token required" });

  const invite = await prisma.invite.findUnique({ where: { token } });
  if (!invite) return res.status(404).json({ message: "invalid token" });
  if (invite.usedAt) return res.status(410).json({ message: "already used" });
  if (invite.expiresAt < new Date()) return res.status(410).json({ message: "expired" });

  await prisma.invite.update({ where: { token }, data: { usedAt: new Date() } });
  res.json({ message: "redeemed" });
}
