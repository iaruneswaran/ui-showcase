import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  MessageCircle,
  MessagesSquare,
  PenLine,
  Plus,
  SearchCheck,
  Star,
  Telescope,
  Upload,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northwind Research — Workspace" },
      {
        name: "description",
        content:
          "Welcome back, Priya. Pick up where you left off, run your research agents, and start something new.",
      },
      { property: "og:title", content: "Northwind Research — Workspace" },
      {
        property: "og:description",
        content:
          "Pick up where you left off, run your research agents, and start something new.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- Scroll reveal ---------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Data (from the extracted contents) ---------- */

const quickActions = [
  { icon: Plus, label: "New Research" },
  { icon: Bot, label: "Open an Agent" },
  { icon: Upload, label: "Upload Files" },
  { icon: MessagesSquare, label: "Ask an Expert" },
];

const projects = [
  { title: "EV Market Size 2026", status: "Draft", updated: "2 hours ago" },
  {
    title: "Competitor Pricing Review",
    status: "In progress",
    updated: "Yesterday",
  },
  { title: "Retail Trends Q4", status: "Done", updated: "3 days ago" },
];

const agents = [
  {
    icon: BarChart3,
    name: ["Market Research ", "Agent"],
    desc: "Sizes markets and finds key trends.",
  },
  {
    icon: Telescope,
    name: ["Competitor ", "Tracker"],
    desc: "Watches rival moves and prices.",
  },
  {
    icon: SearchCheck,
    name: ["", "Fact-Checker"],
    desc: "Checks claims against sources.",
  },
  {
    icon: PenLine,
    name: ["Report ", "Writer"],
    desc: "Turns notes into clean reports.",
  },
];

const statusStyles: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  "In progress": "bg-primary/10 text-primary",
  Done: "bg-success/10 text-success",
};

/* ---------- Page ---------- */

function Index() {
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(["EV Market Size 2026"])
  );

  const toggleFavorite = (title: string) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <TopBar />
      <main>
        <Hero />
        <ContinueSection
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <AgentsSection />
      </main>
      <ChatButton />
    </div>
  );
}

/* ---------- Top bar ---------- */

function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="hero-gradient size-8 rounded-xl" />
          <span className="font-display text-sm font-semibold tracking-tight text-foreground">
            Northwind Research <span className="text-muted-foreground font-normal">(Demo)</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-block">
            Admin
          </span>
          <a
            href="#agents"
            className="text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            Upgrade
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:pt-14">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Welcome card — lite gradient, inspired by the reference */}
        <div className="hero-gradient animate-rise relative overflow-hidden rounded-[2rem] p-8 text-on-hero sm:p-10">
          <div className="animate-float absolute -right-16 -top-20 size-64 rounded-full bg-on-hero/15 blur-3xl" />
          <div className="animate-float absolute -bottom-24 left-10 size-56 rounded-full bg-on-hero/10 blur-3xl [animation-delay:-3s]" />

          <div className="relative flex h-full min-h-[24rem] flex-col">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-on-hero/30 bg-on-hero/15 px-3.5 py-1.5 text-xs font-semibold tracking-wide">
                Professional Plan
              </span>
              <span className="font-script text-lg text-on-hero/80">
                Good to see you again!
              </span>
            </div>

            <h1 className="font-display mt-auto pt-12 text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              Welcome back,
              <br />
              <span className="relative inline-block font-semibold">
                Priya!
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 140 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    className="squiggle-path"
                    d="M2 10c10-9 18-9 27 0s18 9 27 0 18-9 27 0 18 9 27 0 15-7 28-3"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ color: "var(--color-primary-glow)" }}
                  />
                </svg>
              </span>
            </h1>

            <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-on-hero/85">
              <span className="font-medium">Northwind Research (Demo)</span>
              <span aria-hidden="true">·</span>
              <span>Admin</span>
            </div>
          </div>
        </div>

        {/* Quick actions panel */}
        <div
          className="animate-rise rounded-[2rem] bg-panel p-8 sm:p-10"
          style={{ animationDelay: "0.15s" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Quick Actions
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quickActions.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="card-lift group flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 text-left hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-20px_var(--color-primary)]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-4.5" />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {label}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-10 border-t border-border/70 pt-6">
            <p className="font-script text-xl text-foreground/70">
              Four agents ready to run today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Continue where you left off ---------- */

function ContinueSection({
  favorites,
  onToggleFavorite,
}: {
  favorites: Set<string>;
  onToggleFavorite: (title: string) => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Continue where you{" "}
          <span className="text-gradient">left off</span>
        </h2>
      </Reveal>

      <div className="mt-10 space-y-4">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 90}>
            <article className="card-lift group flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-6 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_24px_60px_-30px_var(--color-primary)] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onToggleFavorite(project.title)}
                  aria-label={`Favorite ${project.title}`}
                  aria-pressed={favorites.has(project.title)}
                  className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                >
                  <Star
                    className={`size-5 transition-all ${
                      favorites.has(project.title)
                        ? "fill-primary text-primary"
                        : ""
                    }`}
                  />
                </button>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {project.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}
                    >
                      {project.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Last updated {project.updated}
                    </span>
                  </div>
                </div>
              </div>

              <button className="card-lift shrink-0 self-start rounded-full bg-primary/10 px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:self-auto sm:group-hover:bg-primary sm:group-hover:text-primary-foreground">
                Resume
              </button>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- My Agents — numbered cards in the reference style ---------- */

function AgentsSection() {
  return (
    <section id="agents" className="mx-auto max-w-6xl px-6 pb-28 pt-10">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            My <span className="text-gradient">Agents</span>
          </h2>
          <a
            href="#agents"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            See all agents
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {agents.map((agent, i) => (
          <Reveal key={agent.name.join("")} delay={i * 80}>
            <article className="card-lift group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-8 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_30px_70px_-35px_var(--color-primary)]">
              <div className="pointer-events-none absolute -right-20 -top-24 size-52 rounded-full bg-primary/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0" />

              <div className="flex items-start justify-between">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <agent.icon className="size-5" />
                </span>
                <span className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>

              <h3 className="font-display mt-8 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
                {agent.name[0]}
                <span className="text-gradient">{agent.name[1]}</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {agent.desc}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-border/70 pt-5 [margin-top:2.5rem]">
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <button className="rounded-full border border-border px-6 py-2 text-sm font-medium text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  Run
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Floating chat / help ---------- */

function ChatButton() {
  return (
    <button
      aria-label="Chat or get help"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_16px_40px_-12px_var(--color-primary)] transition-transform hover:scale-105"
    >
      <span className="chat-ping absolute inset-0 rounded-full bg-primary" />
      <MessageCircle className="relative size-6" />
    </button>
  );
}
