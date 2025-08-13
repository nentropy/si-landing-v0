import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const ADMIN_DOMAIN = "shaivraintel.com";

export async function requireSession(ctx: { req: NextApiRequest, res: NextApiResponse }) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  return session;
}

export function isAdminEmail(email?: string | null) {
  return !!email && email.toLowerCase().endsWith(`@${ADMIN_DOMAIN}`);
}
