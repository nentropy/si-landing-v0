
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Invite = { token: string; email?: string; role: string; expiresAt: string; usedAt?: string };

export default function Invites() {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [days, setDays] = useState<number>(7);
  const [role, setRole] = useState<string>("user");
  const [invites, setInvites] = useState<Invite[]>([]);
  const domainAdmin = (session?.user?.email || '').endsWith("@shaivraintel.com");

  async function load() {
    const res = await fetch("/api/invite/list");
    const json = await res.json();
    setInvites(json.invites || []);
  }
  useEffect(() => { load(); }, []);

  async function createInvite() {
    const res = await fetch("/api/invite/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, days, role }),
    });
    const json = await res.json();
    load();
    alert(json.link || json.message);
  }

  if (!domainAdmin) return <div className="p-8">Admins only.</div>;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl">Admin Invites</h1>
      <div className="grid gap-3 max-w-lg">
        <input className="bg-white/10 px-3 py-2 rounded" placeholder="Invitee email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="bg-white/10 px-3 py-2 rounded" type="number" min={1} value={days} onChange={e=>setDays(parseInt(e.target.value||'7'))} />
        <select className="bg-white/10 px-3 py-2 rounded" value={role} onChange={e=>setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="partner">partner</option>
          <option value="analyst">analyst</option>
        </select>
        <button onClick={createInvite} className="px-4 py-2 rounded bg-white/10 hover:bg-white/20">Create Invite</button>
      </div>

      <h2 className="text-xl mt-8">Recent Invites</h2>
      <div className="text-sm text-white/70">
        {invites.map((i) => (
          <div key={i.token} className="py-2 border-b border-white/10">
            <div>{i.email} • role: {i.role} • exp: {new Date(i.expiresAt).toLocaleString()} • used: {i.usedAt ? new Date(i.usedAt).toLocaleString() : "no"}</div>
            <div className="text-white/50">Link: {`${globalThis?.location?.origin || ""}/invite/${i.token}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
