import { Link } from "react-router-dom";
import { Twitter, Github, Send, Hexagon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { API } from "../lib/api.js";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/newsletter", { email });
      toast.success("Subscribed! Welcome aboard.");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Subscribe failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer data-testid="site-footer" className="mt-20 border-t border-white/5 bg-[#050914]">
      <div className="container mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
              <Hexagon className="h-5 w-5 text-white" />
            </span>
            <div>
              <div className="font-heading font-black text-white">EtherAuthority</div>
              <div className="text-[10px] tracking-[0.24em] text-purple-300/80 -mt-0.5">INTERNS</div>
            </div>
          </Link>
          <p className="text-slate-400 text-sm max-w-xs">
            Empowering interns to build the future of Web3, one dApp at a time.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" data-testid="footer-twitter" className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500/40">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" data-testid="footer-github" className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-500/40">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Explore</div>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><Link to="/games" className="hover:text-white">Games</Link></li>
            <li><Link to="/dapps" className="hover:text-white">dApps</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Company</div>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/login" className="hover:text-white">Admin</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Newsletter</div>
          <p className="text-slate-400 text-sm mb-3">Get the latest updates directly in your inbox.</p>
          <form onSubmit={subscribe} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1 focus-within:border-purple-500/40">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="newsletter-email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={loading}
              data-testid="newsletter-submit"
              className="inline-flex items-center justify-center h-9 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8 py-5 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} EtherAuthority Interns. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
