import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2, Layers, Rocket, Users, Sparkles, TrendingUp } from "lucide-react";
import { API } from "../lib/api.js";
import ProjectCard from "../components/ProjectCard.jsx";
import BlogCard from "../components/BlogCard.jsx";
import { SectionTitle, Skeleton } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";

const kFmt = (n) => {
  if (!n && n !== 0) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
};

export default function Home() {
  useSEO({
    title: "Blockchain Games & dApps by our Interns",
    description: "Discover innovative blockchain games and dApps built by EtherAuthority Interns. Rankings, reviews, and tutorials on the future of Web3.",
    image: "https://images.unsplash.com/photo-1637825891028-564f672aa42c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  });
  const [games, setGames] = useState([]);
  const [dapps, setDapps] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/games/top?limit=5"),
      API.get("/dapps/top?limit=5"),
      API.get("/blogs/top?limit=6"),
      API.get("/stats"),
    ])
      .then(([g, d, b, s]) => {
        setGames(g.data.items);
        setDapps(d.data.items);
        setBlogs(b.data.items);
        setStats(s.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-glow" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        <div className="container mx-auto px-4 md:px-8 pt-20 pb-16 md:pt-28 md:pb-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-purple-300"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Discover the Best Web3 Projects
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 font-heading font-black tracking-tight text-4xl sm:text-5xl lg:text-7xl leading-[1.05]"
              >
                Blockchain
                <br />
                <span className="text-gradient">Games & dApps</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 text-slate-400 text-lg max-w-lg"
              >
                Explore innovative blockchain projects built by EtherAuthority interns. Discover, play, and learn about the future of Web3.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  to="/games"
                  data-testid="hero-explore-games"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold transition hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] hover:scale-[1.02]"
                >
                  Explore Games <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/dapps"
                  data-testid="hero-explore-dapps"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass glass-hover text-white font-semibold transition"
                >
                  Explore dApps
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-[520px] ml-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1637825891028-564f672aa42c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000"
                  alt="Web3 hero"
                  className="relative w-full h-full object-cover rounded-3xl border border-white/10 shadow-2xl animate-float"
                />
                <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Live Rankings</div>
                      <div className="font-bold">Top {kFmt(stats?.totalGames || 0)} Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="container mx-auto px-4 md:px-8 -mt-6 mb-16 relative">
        <div className="glass rounded-3xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6" data-testid="home-stats">
          <Stat icon={Gamepad2} label="Games" value={stats?.approvedGames} tone="from-blue-500 to-cyan-500" />
          <Stat icon={Layers} label="dApps" value={stats?.approvedDapps} tone="from-purple-500 to-pink-500" />
          <Stat icon={Rocket} label="Blog Posts" value={stats?.publishedBlogs} tone="from-amber-500 to-red-500" />
          <Stat icon={Users} label="Views" value={stats?.totalViews} tone="from-emerald-500 to-teal-500" />
        </div>
      </section>

      {/* Latest Games */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <SectionTitle
          title="Latest Games"
          action={
            <Link to="/games" data-testid="home-view-all-games" className="text-sm text-purple-300 hover:text-white inline-flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {games.map((g, i) => (
              <ProjectCard key={g.id} item={g} type="game" index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Latest dApps */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <SectionTitle
          title="Latest dApps"
          action={
            <Link to="/dapps" data-testid="home-view-all-dapps" className="text-sm text-purple-300 hover:text-white inline-flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        {loading ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {dapps.map((d, i) => (
              <ProjectCard key={d.id} item={d} type="dapp" index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Latest Blogs */}
      <section className="container mx-auto px-4 md:px-8 mb-16">
        <SectionTitle
          title="Latest Blogs"
          action={
            <Link to="/blog" data-testid="home-view-all-blogs" className="text-sm text-purple-300 hover:text-white inline-flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(0, 6).map((b, i) => (
              <BlogCard key={b.id} item={b} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-8 mb-20">
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/20 p-10 md:p-14">
          <div className="hero-glow opacity-50" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-3xl md:text-4xl font-black">Building the Future of Web3</h3>
              <p className="text-slate-300 mt-2 max-w-xl">EtherAuthority interns are building innovative blockchain projects to shape the decentralized future.</p>
            </div>
            <Link
              to="/about"
              data-testid="home-cta-about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition"
            >
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tone }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${tone} flex items-center justify-center shadow-lg`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <div className="text-2xl md:text-3xl font-heading font-black">{kFmt(value || 0)}</div>
        <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="aspect-[3/4]" />
      ))}
    </div>
  );
}
