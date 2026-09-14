import { PageHeader } from "../components/ui.jsx";
import { useSEO } from "../hooks/useSEO.js";
import { Rocket, Users, ShieldCheck, Sparkles } from "lucide-react";

export default function About() {
  useSEO({
    title: "About Us",
    description: "EtherAuthority Interns is a mentorship-led incubator building innovative blockchain projects and shaping the future of Web3.",
  });
  const values = [
    { icon: Rocket, title: "Innovation", text: "Pioneering Web3 experiences with fresh ideas from young builders." },
    { icon: Users, title: "Community", text: "Fostering a collaborative environment for interns and mentors." },
    { icon: ShieldCheck, title: "Trust", text: "Building safe, audited, transparent decentralized applications." },
    { icon: Sparkles, title: "Craft", text: "Attention to detail across UX, contracts and product design." },
  ];
  return (
    <div>
      <PageHeader title="About EtherAuthority Interns" subtitle="We're a group of passionate builders shaping the future of Web3." testid="about-page-header" />
      <div className="container mx-auto px-4 md:px-8 pb-16 space-y-10">
        <section className="glass rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-black">Empowering the next wave of blockchain talent.</h2>
              <p className="mt-4 text-slate-300 leading-relaxed">
                EtherAuthority Interns is a mentorship-led incubator where students and early-career engineers ship real Web3 products.
                Our teams have delivered production dApps, on-chain games, DAO tooling and more — with a strong focus on security and user experience.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000"
              alt=""
              className="rounded-2xl border border-white/10 aspect-video object-cover"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <div key={v.title} className="glass rounded-2xl p-6">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <v.icon className="h-5 w-5 text-white" />
              </div>
              <div className="mt-4 font-heading text-lg font-bold">{v.title}</div>
              <p className="mt-1 text-sm text-slate-400">{v.text}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
