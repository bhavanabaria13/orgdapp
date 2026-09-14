import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { LayoutDashboard, Gamepad2, LayoutGrid, FileText, LogOut, Home, Hexagon, Mail, Tags, Send } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/games", label: "Games", icon: Gamepad2 },
  { to: "/admin/dapps", label: "dApps", icon: LayoutGrid },
  { to: "/admin/blogs", label: "Blogs", icon: FileText },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/newsletter", label: "Newsletter", icon: Send },
  { to: "/admin/contacts", label: "Contacts", icon: Mail },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <div className="min-h-screen bg-[#050914] text-white flex">
      <aside data-testid="admin-sidebar" className="w-64 shrink-0 border-r border-white/5 bg-[#070c1a] p-4 flex flex-col">
        <div className="flex items-center gap-2 px-2 py-3 mb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Hexagon className="h-5 w-5 text-white" />
          </span>
          <div>
            <div className="font-heading font-black text-white">EtherAdmin</div>
            <div className="text-[10px] tracking-[0.24em] text-purple-300/80 -mt-0.5">CONSOLE</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                data-testid={`admin-nav-${n.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-purple-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-4 space-y-1">
          <a
            href="/"
            data-testid="admin-back-to-site"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5"
          >
            <Home className="h-4 w-4" />
            Back to site
          </a>
          <button
            onClick={doLogout}
            data-testid="admin-logout"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
          <div className="mt-3 px-3 py-2 text-xs text-slate-500 truncate">Signed in as {user?.email}</div>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
