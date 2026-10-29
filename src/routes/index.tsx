import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  FlaskConical,
  FolderArchive,
  Lock,
  MessageCircle,
  MessagesSquare,
  PenLine,
  Plus,
  SearchCheck,
  Sparkles,
  Star,
  Telescope,
  User,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

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
  {
    label: "New Research",
    title: (
      <>
        New
        <br />
        Research
      </>
    ),
    subline: "Start a fresh topic analysis",
  },
  {
    label: "Open an Agent",
    title: (
      <>
        Open an
        <br />
        Agent
      </>
    ),
    subline: "Launch ready AI workflows",
  },
  {
    label: "Ask an Expert",
    title: (
      <>
        Ask an
        <br />
        Expert
      </>
    ),
    subline: "Direct human advisory session",
  },
];

const projects = [
  {
    title: "EV Market Size 2026",
    status: "Draft",
    updated: "2 hours ago",
  },
  {
    title: "Competitor Pricing Review",
    status: "In progress",
    updated: "Yesterday",
  },
  {
    title: "Retail Trends Q4",
    status: "Done",
    updated: "3 days ago",
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
      <Toaster />
    </div>
  );
}

/* ---------- Top bar ---------- */

function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 sm:px-6 xl:px-0 py-4 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="hero-gradient size-8 rounded-xl" />
          <span className="font-display text-sm font-medium tracking-tight text-foreground">
            Northwind Research <span className="text-muted-foreground font-normal">(Demo)</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden rounded-full bg-muted px-3.5 py-1 text-sm font-medium text-muted-foreground sm:inline-block">
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

/* ---------- Curved Quick Action Card Component ---------- */

function getCurvedCardPath(
  w: number,
  h: number,
  R = 24,
  cx = 24,
  cy = 24,
  R_cut = 28,
  r_f = 10
) {
  const width = Math.max(w, 140);
  const height = Math.max(h, 100);
  const hyp = R_cut + r_f;
  const dy = Math.abs(r_f - cy);
  const dx = Math.sqrt(Math.max(0, hyp * hyp - dy * dy));

  const t1_x = width - cx - dx;
  const c2_x = width - cx - dx;
  const c2_y = r_f;
  const c1_x = width - cx;
  const c1_y = cy;

  const v_x = c1_x - c2_x;
  const v_y = c1_y - c2_y;
  const u_x = v_x / hyp;
  const u_y = v_y / hyp;

  const p1_x = c2_x + r_f * u_x;
  const p1_y = c2_y + r_f * u_y;

  const c3_x = width - r_f;
  const c3_y = cy + dx;
  const p2_x = c3_x - r_f * u_y;
  const p2_y = c3_y - r_f * u_x;

  const t2_x = width;
  const t2_y = cy + dx;

  return [
    `M ${R} 0`,
    `L ${t1_x.toFixed(2)} 0`,
    `A ${r_f} ${r_f} 0 0 1 ${p1_x.toFixed(2)} ${p1_y.toFixed(2)}`,
    `A ${R_cut} ${R_cut} 0 0 0 ${p2_x.toFixed(2)} ${p2_y.toFixed(2)}`,
    `A ${r_f} ${r_f} 0 0 1 ${t2_x.toFixed(2)} ${t2_y.toFixed(2)}`,
    `L ${width} ${height - R}`,
    `A ${R} ${R} 0 0 1 ${width - R} ${height}`,
    `L ${R} ${height}`,
    `A ${R} ${R} 0 0 1 0 ${height - R}`,
    `L 0 ${R}`,
    `A ${R} ${R} 0 0 1 ${R} 0 Z`,
  ].join(" ");
}

function CurvedQuickActionCard({
  label,
  title,
  subline,
  onAction,
}: {
  label: string;
  title?: React.ReactNode;
  subline: string;
  onAction: (label: string) => void;
}) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [dim, setDim] = useState({ w: 230, h: 160 });

  useEffect(() => {
    if (typeof window === "undefined" || typeof ResizeObserver === "undefined")
      return;
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      if (el.offsetWidth && el.offsetHeight) {
        setDim({
          w: el.offsetWidth,
          h: el.offsetHeight,
        });
      }
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const d = getCurvedCardPath(dim.w, dim.h);

  return (
    <button
      ref={containerRef}
      onClick={() => onAction(label)}
      className="group relative flex min-h-[160px] flex-col justify-end p-5 text-left transition-transform duration-300 hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* SVG Background Layer with Continuous Smooth Inverted Fillets — 100% White Only */}
      <svg
        className="absolute inset-0 size-full pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.04)] dark:drop-shadow-none"
        width={dim.w}
        height={dim.h}
        viewBox={`0 0 ${dim.w} ${dim.h}`}
      >
        <path
          d={d}
          className="fill-white transition-colors duration-200 dark:fill-card"
        />
      </svg>

      {/* Floating White Circular Arrow Button nestled inside the smoothly curved notch */}
      <div className="absolute top-1.5 right-1.5 size-9 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-200/80 dark:border-zinc-700 z-20 transition-transform duration-200 group-hover:scale-105 group-hover:rotate-12">
        <ArrowUpRight
          className="size-4 text-zinc-950 dark:text-white"
          strokeWidth={2.25}
        />
      </div>

      {/* Content: Heading & Small Subline in Black / Dark */}
      <div className="relative z-10 pr-2">
        <h4 className="font-display text-[24px] font-medium leading-[1.15] tracking-tight text-zinc-950 dark:text-white">
          {title || label}
        </h4>
        <p className="mt-1.5 text-sm font-normal leading-snug text-zinc-600 dark:text-zinc-400">
          {subline}
        </p>
      </div>
    </button>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const handleAction = (label: string) => {
    toast.success(`Action: "${label}"`, {
      description: "Opening workspace workflow...",
      duration: 3000,
    });
  };

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 xl:px-0 pt-4 pb-8 sm:pt-6 sm:pb-10">
      {/* Welcome Card — 1320px Width */}
      <div className="hero-gradient animate-rise relative overflow-hidden rounded-[2.5rem] p-6 text-on-hero sm:p-8 md:p-10 pb-20 sm:pb-24 md:pb-26 w-full">
        <div className="animate-float pointer-events-none absolute -right-16 -top-20 size-80 rounded-full bg-on-hero/15 blur-3xl" />
        <div className="animate-float pointer-events-none absolute -bottom-24 left-10 size-72 rounded-full bg-on-hero/10 blur-3xl [animation-delay:-3s]" />

        <div className="relative z-10 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-script text-2xl sm:text-[28px] text-on-hero/90 leading-none">
                Good to see you again!
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-on-hero/85 font-mono">
              <span className="font-medium">Northwind Research (Demo)</span>
              <span aria-hidden="true">·</span>
              <span>Admin</span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 mb-1">
            <h1 className="font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
              Welcome back, <span className="font-medium">Priya!</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Quick Actions Overlay Card — 1220px Width Overlapping Welcome Card Bottom */}
      <div className="relative z-20 -mt-14 sm:-mt-16 lg:-mt-20 mx-auto w-full max-w-[1220px] px-3 sm:px-4 xl:px-0">
        <div
          className="animate-rise rounded-[2rem] bg-panel p-4 sm:p-6 shadow-lg border border-white/70 dark:border-zinc-800"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Header */}
          <div className="mb-3.5 flex items-center justify-between">
            <p className="text-sm font-medium tracking-wide text-muted-foreground">
              Quick Actions
            </p>
          </div>

          {/* Bento Grid: Left Deployed Card + Right 3 Actions in single line — Scallop Cutout Style from Reference */}
          <div className="grid gap-3.5 lg:grid-cols-[330px_1fr]">
            {/* Left Banner: Luminous warm yellow gradient card — Top to Bottom Gradient */}
            <a
              href="#agents"
              className="group relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-b from-[#fef08a] via-[#fef9c3] to-[#fefce8] p-5 text-zinc-900 transition-all duration-300 hover:-translate-y-1 dark:from-[#ca8a04]/30 dark:via-[#eab308]/15 dark:to-zinc-900/90 dark:text-white cursor-pointer shadow-none"
            >
              <div className="relative z-10 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    Deployed
                  </span>
                  <ArrowRight className="size-4 text-zinc-700 transition-transform duration-200 group-hover:translate-x-1 dark:text-zinc-300" />
                </div>

                <div className="my-1">
                  <h4 className="font-display text-[24px] font-medium tracking-tight text-zinc-950 dark:text-white leading-[1.15]">
                    3 Agents
                    <br />
                    Active Now
                  </h4>
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Three agents ready to run today.
                  </p>
                </div>
              </div>
            </a>

            {/* Right: 3 Quick Actions in single line — White Cards with Smooth Curved Notch Edges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickActions.map((action) => (
                <CurvedQuickActionCard
                  key={action.label}
                  label={action.label}
                  title={action.title}
                  subline={action.subline}
                  onAction={handleAction}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Continue where you left off — 2 Cards Visible, 3rd Card Partially Visible ---------- */

function ContinueSection({
  favorites,
  onToggleFavorite,
}: {
  favorites: Set<string>;
  onToggleFavorite: (title: string) => void;
}) {
  const [resumingTitle, setResumingTitle] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleResume = (title: string) => {
    setResumingTitle(title);
    toast.success(`Resuming "${title}"`, {
      description: "Restoring active workspace and syncing latest telemetry...",
      duration: 3000,
    });
    setTimeout(() => {
      setResumingTitle(null);
    }, 2000);
  };

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.48;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 xl:px-0 py-6 sm:py-8">
      <div className="rounded-[2rem] bg-panel p-5 sm:p-6 md:p-8 border border-white/70 dark:border-zinc-800 shadow-sm">
        {/* Header layout matching the attached image */}
        <Reveal>
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-[32px] sm:text-[36px] font-medium tracking-tight text-zinc-950 leading-tight dark:text-white">
                Continue where you left off
              </h2>
            </div>
            {/* Scroll navigation arrows */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-[oklch(0.48_0.2_262)] hover:text-[oklch(0.48_0.2_262)] disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-[oklch(0.48_0.2_262)] hover:text-[oklch(0.48_0.2_262)] disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Horizontal Carousel: 2 cards visible, 3rd card partially visible on the right */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* CARD 1: EV Market Size 2026 (Draft) — Quick Actions Card bg-panel Palette */}
          <div className="w-[86vw] sm:w-[calc(48%-10px)] lg:w-[calc(48%-10px)] shrink-0 snap-start">
            <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border/60 bg-white text-zinc-950 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:bg-card dark:text-white">
            <div className="flex h-full flex-col sm:flex-row">
              {/* Left Column: Title, Favorite, Status, Last Updated, Resume */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-medium tracking-tight text-zinc-950 sm:text-xl">
                      EV Market Size 2026
                    </h3>
                    <button
                      onClick={() => onToggleFavorite("EV Market Size 2026")}
                      aria-label="Toggle favorite"
                      className="shrink-0 rounded-full p-1 transition-colors cursor-pointer"
                    >
                      <Star
                        className={`size-5 transition-all ${
                          favorites.has("EV Market Size 2026")
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-400 hover:text-amber-500"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="my-5 sm:my-6">
                  <div className="font-display text-[30px] font-medium tracking-tight text-zinc-950 leading-tight">
                    Draft
                  </div>
                  <p className="mt-1.5 font-mono text-sm text-zinc-600">
                    Last updated 2 hours ago
                  </p>
                </div>

                <button
                  onClick={() => handleResume("EV Market Size 2026")}
                  className="w-full rounded-xl bg-zinc-950 py-3 px-6 text-center text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] shadow-none cursor-pointer"
                >
                  {resumingTitle === "EV Market Size 2026" ? "Opening..." : "Resume"}
                </button>
              </div>

              {/* Vertical dashed divider */}
              <div className="hidden border-r border-dashed border-zinc-900/15 sm:block" />
              <div className="border-b border-dashed border-zinc-900/15 sm:hidden mx-6" />

              {/* Right Column: Project details */}
              <div className="flex flex-1 flex-col justify-center space-y-3.5 p-6 sm:p-7">
                <div className="flex items-center gap-3.5">
                  <BarChart3 className="size-4.5 shrink-0 text-zinc-800" />
                  <span className="text-sm font-medium text-zinc-800">
                    Market sizing model v2.1
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <FolderArchive className="size-4.5 shrink-0 text-zinc-800" />
                  <span className="text-sm font-medium text-zinc-800">
                    14 regional datasets linked
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Sparkles className="size-4.5 shrink-0 text-zinc-800" />
                  <span className="text-sm font-medium text-zinc-800">
                    Draft synthesis in progress
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Clock className="size-4.5 shrink-0 text-zinc-600" />
                  <span className="text-sm font-medium text-zinc-600">
                    Last updated 2 hours ago
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* CARD 2: Competitor Pricing Review (In progress) — Quick Actions Card bg-panel Palette */}
        <div className="w-[86vw] sm:w-[calc(48%-10px)] lg:w-[calc(48%-10px)] shrink-0 snap-start">
          <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border/60 bg-white text-zinc-950 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:bg-card dark:text-white">
            <div className="flex h-full flex-col sm:flex-row">
              {/* Left Column: Title, Favorite, Status, Last Updated, Resume */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-medium tracking-tight text-zinc-950 sm:text-xl">
                      Competitor Pricing Review
                    </h3>
                    <button
                      onClick={() => onToggleFavorite("Competitor Pricing Review")}
                      aria-label="Toggle favorite"
                      className="shrink-0 rounded-full p-1 transition-colors cursor-pointer"
                    >
                      <Star
                        className={`size-5 transition-all ${
                          favorites.has("Competitor Pricing Review")
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-400 hover:text-amber-500"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="my-5 sm:my-6">
                  <div className="font-display text-[30px] font-medium tracking-tight text-zinc-950 leading-tight">
                    In progress
                  </div>
                  <p className="mt-1.5 font-mono text-sm text-zinc-600">
                    Last updated Yesterday
                  </p>
                </div>

                <button
                  onClick={() => handleResume("Competitor Pricing Review")}
                  className="w-full rounded-xl bg-zinc-950 py-3 px-6 text-center text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] shadow-none cursor-pointer"
                >
                  {resumingTitle === "Competitor Pricing Review" ? "Opening..." : "Resume"}
                </button>
              </div>

              {/* Vertical dashed divider */}
              <div className="hidden border-r border-dashed border-zinc-900/15 sm:block" />
              <div className="border-b border-dashed border-zinc-900/15 sm:hidden mx-6" />

              {/* Right Column: Project details */}
              <div className="flex flex-1 flex-col justify-center space-y-3.5 p-6 sm:p-7">
                <div className="flex items-center gap-3.5">
                  <Telescope className="size-4.5 shrink-0 text-zinc-800" />
                  <span className="text-sm font-medium text-zinc-800">
                    8 competitor benchmark tiers
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Zap className="size-4.5 shrink-0 text-zinc-800" />
                  <span className="text-sm font-medium text-zinc-800">
                    Live price deviation radar
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <User className="size-4.5 shrink-0 text-zinc-800" />
                  <span className="text-sm font-medium text-zinc-800">
                    Margin sensitivity matrix
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Clock className="size-4.5 shrink-0 text-zinc-600" />
                  <span className="text-sm font-medium text-zinc-600">
                    Last updated Yesterday
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* CARD 3: Retail Trends Q4 (Done — Partially Visible!) — Quick Actions Card bg-panel Palette */}
        <div className="w-[86vw] sm:w-[calc(48%-10px)] lg:w-[calc(48%-10px)] shrink-0 snap-start">
          <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border/60 bg-white text-zinc-950 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:bg-card dark:text-white">
            <div className="flex h-full flex-col sm:flex-row">
              {/* Left Column: Title, Favorite, Status, Last Updated, Resume */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-medium tracking-tight text-zinc-950 sm:text-xl">
                      Retail Trends Q4
                    </h3>
                    <button
                      onClick={() => onToggleFavorite("Retail Trends Q4")}
                      aria-label="Toggle favorite"
                      className="shrink-0 rounded-full p-1 transition-colors cursor-pointer"
                    >
                      <Star
                        className={`size-5 transition-all ${
                          favorites.has("Retail Trends Q4")
                            ? "fill-amber-400 text-amber-400"
                            : "text-zinc-400 hover:text-amber-500"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="my-5 sm:my-6">
                  <div className="font-display text-[30px] font-medium tracking-tight text-zinc-950 leading-tight">
                    Done
                  </div>
                  <p className="mt-1.5 font-mono text-sm text-zinc-600">
                    Last updated 3 days ago
                  </p>
                </div>

                <button
                  onClick={() => handleResume("Retail Trends Q4")}
                  className="w-full rounded-xl bg-zinc-950 py-3 px-6 text-center text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] shadow-none cursor-pointer"
                >
                  {resumingTitle === "Retail Trends Q4" ? "Opening..." : "Resume"}
                </button>
              </div>

              {/* Vertical dashed divider */}
              <div className="hidden border-r border-dashed border-zinc-900/15 sm:block" />
              <div className="border-b border-dashed border-zinc-900/15 sm:hidden mx-6" />

              {/* Right Column: Project details */}
              <div className="flex flex-1 flex-col justify-center space-y-3.5 p-6 sm:p-7">
                <div className="flex items-center gap-3.5">
                  <CheckCircle2 className="size-4.5 shrink-0 text-emerald-600" />
                  <span className="text-sm font-medium text-zinc-800">
                    Full sector synthesis complete
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <BarChart3 className="size-4.5 shrink-0 text-zinc-800" />
                  <span className="text-sm font-medium text-zinc-800">
                    Cross-channel demand metrics
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <FolderArchive className="size-4.5 shrink-0 text-zinc-800" />
                  <span className="text-sm font-medium text-zinc-800">
                    Export to Pdf & Markdown
                  </span>
                </div>
                <div className="flex items-center gap-3.5">
                  <Clock className="size-4.5 shrink-0 text-zinc-600" />
                  <span className="text-sm font-medium text-zinc-600">
                    Last updated 3 days ago
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
  );
}

/* ---------- My Agents — Pure Content & Authentic Luxury Style ---------- */

function AgentsSection() {
  const [runningAgent, setRunningAgent] = useState<string | null>(null);

  const handleRun = (agentName: string) => {
    setRunningAgent(agentName);
    toast.success(`Agent "${agentName}" initialized`, {
      description: "Running agent workflow...",
      duration: 3000,
    });
    setTimeout(() => {
      setRunningAgent(null);
    }, 2000);
  };

  return (
    <section id="agents" className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 xl:px-0 pt-4 pb-16 sm:pt-6 sm:pb-20">
      <div className="rounded-[2rem] bg-panel p-5 sm:p-6 md:p-8 border border-white/70 dark:border-zinc-800 shadow-sm">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-[32px] sm:text-[36px] font-medium tracking-tight text-zinc-950 leading-tight dark:text-white">
                My Agents
              </h2>
            </div>
          </div>
        </Reveal>

      {/* 3 Agents: Compact Height, Balanced Padding & Spacing */}
      <div className="mt-6 sm:mt-7 grid gap-5 sm:gap-6 lg:grid-cols-3 xl:gap-6">
        {/* CARD 01: Market Research Agent — Diagonal Top-Left Gradient Placement */}
        <Reveal delay={0}>
          <article className="hero-gradient-1 group relative flex h-full min-h-[400px] flex-col justify-between overflow-hidden rounded-[1.75rem] border-0 p-6 sm:p-7 text-white shadow-none select-none">
            {/* Ambient glow matching top-left to bottom-right trajectory */}
            <div className="animate-float pointer-events-none absolute -top-16 -left-10 h-80 w-80 rounded-full bg-white/20 blur-3xl opacity-80" />
            <div className="animate-float pointer-events-none absolute -bottom-24 -right-8 h-64 w-64 rounded-full bg-white/10 blur-3xl [animation-delay:-3s]" />

            {/* Header: category title & icon left-aligned, diagonal arrow right-aligned */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/90">
                <BarChart3 className="size-4.5 text-white" />
                <span className="font-mono text-sm text-white/90 font-medium">
                  Market Intelligence
                </span>
              </div>
              <ArrowUpRight
                className="size-5 text-white/90 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
              />
            </div>

            {/* Middle body: Name & Description only */}
            <div className="relative z-10 mt-5 sm:mt-6">
              <h3 className="font-display text-3xl sm:text-[2.1rem] font-normal leading-[1.15] tracking-tight text-white">
                Market Research
                <br />
                Agent
              </h3>
              <p className="mt-3 text-sm text-white/85 leading-relaxed max-w-[300px]">
                Sizes markets and finds key trends.
              </p>
            </div>

            {/* Footer: 01 and Action: Run Agent */}
            <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/20 pt-4">
              <span className="font-mono text-sm font-medium tracking-widest text-white/75">
                01
              </span>
              <button
                onClick={() => handleRun("Market Research Agent")}
                className="rounded-full bg-white px-6 py-2 text-sm font-medium text-zinc-950 shadow-sm transition-all duration-200 hover:bg-white/90 cursor-pointer"
              >
                {runningAgent === "Market Research Agent" ? "Running..." : "Run Agent"}
              </button>
            </div>
          </article>
        </Reveal>

        {/* CARD 02: Competitor Tracker — Vertical Center-Stage Gradient Placement */}
        <Reveal delay={90}>
          <article className="hero-gradient-2 group relative flex h-full min-h-[400px] flex-col justify-between overflow-hidden rounded-[1.75rem] border-0 p-6 sm:p-7 text-white shadow-none select-none">
            {/* Ambient glow matching vertical stage light and bottom telemetry highlight */}
            <div className="animate-float pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 h-72 w-80 rounded-full bg-white/20 blur-3xl opacity-80" />
            <div className="animate-float pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-white/10 blur-3xl [animation-delay:-2s]" />

            {/* Header: category title & icon left-aligned, diagonal arrow right-aligned */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/90">
                <Telescope className="size-4.5 text-white" />
                <span className="font-mono text-sm text-white/90 font-medium">
                  Rival Surveillance
                </span>
              </div>
              <ArrowUpRight
                className="size-5 text-white/90 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
              />
            </div>

            {/* Middle body: Name & Description only */}
            <div className="relative z-10 mt-5 sm:mt-6">
              <h3 className="font-display text-3xl sm:text-[2.1rem] font-normal leading-[1.15] tracking-tight text-white">
                Competitor
                <br />
                Tracker
              </h3>
              <p className="mt-3 text-sm text-white/85 leading-relaxed max-w-[300px]">
                Watches rival moves and prices.
              </p>
            </div>

            {/* Footer: 02 and Action: Run Agent */}
            <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/20 pt-4">
              <span className="font-mono text-sm font-medium tracking-widest text-white/75">
                02
              </span>
              <button
                onClick={() => handleRun("Competitor Tracker")}
                className="rounded-full bg-white px-6 py-2 text-sm font-medium text-zinc-950 shadow-sm transition-all duration-200 hover:bg-white/90 cursor-pointer"
              >
                {runningAgent === "Competitor Tracker" ? "Running..." : "Run Agent"}
              </button>
            </div>
          </article>
        </Reveal>

        {/* CARD 03: Report Writer — Diagonal Top-Right Gradient Placement */}
        <Reveal delay={180}>
          <article className="hero-gradient-3 group relative flex h-full min-h-[400px] flex-col justify-between overflow-hidden rounded-[1.75rem] border-0 p-6 sm:p-7 text-white shadow-none select-none">
            {/* Ambient glow matching top-right to bottom-left trajectory */}
            <div className="animate-float pointer-events-none absolute -top-16 -right-10 h-80 w-80 rounded-full bg-white/20 blur-3xl opacity-80" />
            <div className="animate-float pointer-events-none absolute -bottom-20 -left-6 h-64 w-64 rounded-full bg-white/10 blur-3xl [animation-delay:-2.5s]" />

            {/* Header: category title & icon left-aligned, diagonal arrow right-aligned */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/90">
                <PenLine className="size-4.5 text-white" />
                <span className="font-mono text-sm font-medium text-white/90">
                  Document Synthesis
                </span>
              </div>
              <ArrowUpRight
                className="size-5 text-white/90 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
              />
            </div>

            {/* Middle body: Name & Description in white */}
            <div className="relative z-10 mt-5 sm:mt-6">
              <h3 className="font-display text-3xl sm:text-[2.1rem] font-normal leading-[1.15] tracking-tight text-white">
                Report
                <br />
                Writer
              </h3>
              <p className="mt-3 text-sm text-white/85 leading-relaxed max-w-[300px]">
                Turns notes into clean reports.
              </p>
            </div>

            {/* Footer: 03 and Action: Run Agent */}
            <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/20 pt-4">
              <span className="font-mono text-sm font-medium tracking-widest text-white/75">
                03
              </span>
              <button
                onClick={() => handleRun("Report Writer")}
                className="rounded-full bg-white px-6 py-2 text-sm font-medium text-zinc-950 shadow-sm transition-all duration-200 hover:bg-white/90 cursor-pointer"
              >
                {runningAgent === "Report Writer" ? "Running..." : "Run Agent"}
              </button>
            </div>
          </article>
        </Reveal>
      </div>
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
