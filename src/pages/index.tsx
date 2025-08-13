import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-spectral flex flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Shaivra" width={42} height={42} priority />
          <span className="tracking-widest text-xl">SHAIVRA</span>
        </div>
        <Link href="/api/auth/signin" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
          SSO
        </Link>
      </header>
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="grid place-items-center gap-8"
        >
          <Image src="/logo.png" className="aura rounded-full" alt="Shaivra Glyph" width={220} height={220} />
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">Through the unseen, we protect the sacred.</h1>
            <p className="text-white/60 max-w-2xl mx-auto">From stillness, strike. From silence, shape. Shaivra.</p>
          </div>
        </motion.div>
      </section>
      <footer className="px-6 py-6 text-xs text-white/50 flex justify-between">
        <div>&copy; {new Date().getFullYear()} Shaivra</div>
        <div className="space-x-4">
          <a className="underline" href="mailto:core@umbrellaforge.app">core@umbrellaforge.app</a>
          <a className="underline" href="mailto:observer@shaivra.observer">observer@shaivra.observer</a>
        </div>
      </footer>
    </main>
  );
}
