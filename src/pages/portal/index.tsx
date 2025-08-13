import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import type { GetServerSideProps } from "next";
import { useState } from "react";
import Link from "next/link";

export default function Portal({ user }: { user: { email: string } }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="min-h-screen flex bg-black text-spectral">
      <aside className={`transition-all ${open ? "w-72" : "w-16"} p-4 border-r border-white/10`}>
        <button onClick={() => setOpen(!open)} className="mb-6 text-xs underline">Toggle</button>
        <nav className="space-y-3 text-sm">
          <a href="https://github.com" target="_blank" className="block hover:underline">GitHub</a>
          <a href="https://www.notion.so" target="_blank" className="block hover:underline">Notion</a>
          <a href="https://id.atlassian.com/login" target="_blank" className="block hover:underline">Atlassian</a>
          <Link href="/api/auth/signout" className="block hover:underline">Sign out</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h1 className="text-2xl">Welcome, {user?.email}</h1>
        <p className="text-white/60 mt-2">This portal is SSO-gated. Admin signup is restricted to @shaivraintel.com addresses.</p>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return { redirect: { destination: "/api/auth/signin", permanent: false } };
  }
  return { props: { user: session.user } as any };
}
