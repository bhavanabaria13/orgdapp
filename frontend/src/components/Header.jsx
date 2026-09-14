import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Search, Menu, X, Hexagon } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
  { to: "/dapps", label: "dApps" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    nav(`/search?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  return (
    <header
      ref={ref}
      data-testid="site-header"
      className={`sticky top-0 z-40 transition-all ${
        scrolled ? "backdrop-blur-xl bg-[#050914]/80 border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center gap-4">
        <Link to="/" data-testid="header-logo" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            <Hexagon className="h-5 w-5 text-white" strokeWidth={2.2} />
          </span>
          <div className="leading-tight">
            <div className="font-heading font-black text-white tracking-tight">EtherAuthority</div>
            <div className="text-[10px] tracking-[0.24em] text-purple-300/80 font-medium -mt-0.5">INTERNS</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-6">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white bg-white/5"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={submit} className="hidden md:flex ml-auto items-center gap-2 relative">
          <div className="relative">
            <input
              data-testid="header-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search games, dApps, blogs..."
              className="w-64 h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 transition"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </form>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden ml-auto p-2 rounded-lg bg-white/5 border border-white/10"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-[#050914]/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <form onSubmit={submit} className="relative mb-2">
              <input
                data-testid="mobile-search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </form>
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-sm font-medium ${
                    isActive ? "text-white bg-white/10" : "text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
