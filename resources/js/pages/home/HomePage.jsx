import { Link } from "react-router-dom";
import { whitelabel } from "../../shared/config/whitelabel";
import { blogPosts } from "../../features/blog/blogData";

const HOME_ASSETS = {
  heroBackground: "/image2.jpg",
  heroCard: "/image1.jpg",
  aboutVideoThumb: "/image1.jpg"
};

const LEVELS = [
  { title: "Elementary School", subtitle: "Grades K–5", variant: "rose", icon: "/images/levels/elementary.png" },
  { title: "Middle School", subtitle: "Grades 6–8", variant: "sky", icon: "/images/levels/middle-school.png" },
  { title: "High School", subtitle: "Grades 9–12", variant: "violet", icon: "/images/levels/high-school.png" }
];

const STATS = [
  { label: "Topics Covered", value: "2,500+", variant: "rose", icon: "/images/icons/open-book.png" },
  { label: "Pupils Taught", value: "1,000+", variant: "blue", icon: "/images/icons/graduation.png" },
  { label: "Experienced Online Tutors", value: "400+", variant: "roseSoft", icon: "/images/icons/webinar.png" },
  { label: "Live Sessions Delivered", value: "386,740+", variant: "gradient", icon: "/images/icons/video-camera.png" }
];

const COUNTRIES = [
  { name: "United States", description: "A hub of innovation and diversity in education." },
  { name: "United Kingdom", description: "Home to historic institutions with strong global ties." },
  { name: "Australia", description: "A premier destination for international students." },
  { name: "New Zealand", description: "Nature-inspired learning with world-class standards." },
  { name: "Canada", description: "An inclusive, diverse, and welcoming environment." }
];



const LATEST_BLOGS = blogPosts.slice(0, 3);

export function HomePage() {
  return (
    <>
      <section
        className="relative overflow-hidden"
        id="home"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HOME_ASSETS.heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/55" />

        <div className="relative mx-auto flex min-h-[70vh] w-[min(1120px,92%)] flex-col items-start justify-center gap-10 py-10 text-white md:flex-row md:py-16">
          <div className="max-w-xl">
            <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-rose-200">
              {whitelabel.home.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-5xl">
              {whitelabel.home.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-100 md:text-lg">
              {whitelabel.home.description}
            </p>
          </div>

          <div className="relative w-full max-w-xl rounded-[32px] bg-white/5 p-1 backdrop-blur-sm">
            <div
              className="h-[260px] w-full rounded-[28px] bg-cover bg-center shadow-2xl shadow-black/40 md:h-[320px]"
              style={{ backgroundImage: `url(${HOME_ASSETS.heroCard})` }}
              aria-label="Students in an online tutoring class"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-[min(1120px,92%)] space-y-10 py-12 md:py-16" id="about">
        <div className="grid gap-6 md:grid-cols-3">
          {LEVELS.map((level) => (
            <LevelCard
              key={level.title}
              title={level.title}
              subtitle={level.subtitle}
              variant={level.variant}
              icon={level.icon}
            />
          ))}
        </div>

        <article className="grid items-center gap-10 md:grid-cols-[1.1fr_minmax(0,1fr)]">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              About <span className="text-[var(--wl-primary)]">{whitelabel.brandName}</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700">
              {whitelabel.home.description}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              Our 1‑on‑1 tutoring approach combines simplicity, personalization, and practicality to create a seamless
              learning experience for every child.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center rounded-full bg-[var(--wl-primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--wl-primary-dark)]"
            >
              Read More
            </button>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
            <div className="relative aspect-video w-full bg-slate-900/5">
              <div
                className="h-full w-full rounded-[28px] bg-cover bg-center"
                style={{ backgroundImage: `url(${HOME_ASSETS.aboutVideoThumb})` }}
              />
              <button
                type="button"
                className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-white/90 text-[var(--wl-primary)] shadow-lg shadow-slate-900/30"
              >
                ▶
              </button>
            </div>
          </div>
        </article>
      </section>

      <section className="bg-gradient-to-r from-rose-50 via-white to-sky-50 py-12 md:py-16">
        <div className="mx-auto w-[min(1120px,92%)] text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            <span className="text-rose-500">Personal</span> and{" "}
            <span className="text-blue-600">Professional</span>
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Online Tutoring is what we do best
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            With a strong foundation in quality online education, we&apos;re proud to share the milestones that reflect
            our commitment.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                variant={stat.variant}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50 via-white to-rose-50 py-12 md:py-16">
        <div className="mx-auto w-[min(1120px,92%)]">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-indigo-500 text-white shadow-md">
              <img src="/images/icons/globalreach.png" alt="Global Reach" className="h-7 w-7 object-contain" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Global <span className="text-[var(--wl-primary)]">Reach</span>
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 md:text-lg">
              Empowering students worldwide through cultural exchange, meaningful connections, and transformative
              education.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {COUNTRIES.map((c) => (
              <CountryCard key={c.name} name={c.name} description={c.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto w-[min(1120px,92%)]">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Latest <span className="text-[var(--wl-primary)]">Blogs</span>
            </h2>
            <Link
              to="/blogs"
              className="shrink-0 rounded-full border border-[var(--wl-primary)] px-5 py-2 text-sm font-semibold text-[var(--wl-primary)] transition-colors hover:bg-[var(--wl-primary)] hover:text-white"
            >
              View All Blogs →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {LATEST_BLOGS.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>


    </>
  );
}

function LevelCard({ title, subtitle, variant = "rose", icon }) {
  const styles = {
    rose: {
      baseBg: "bg-gradient-to-b from-rose-50/70 to-white",
      border: "hover:border-rose-200 focus-within:border-rose-200",
      shadow: "hover:shadow-rose-500/10 focus-within:shadow-rose-500/10",
      blobA: "from-rose-400/30 to-amber-300/15",
      blobB: "from-fuchsia-400/20 to-rose-400/15",
      icon: "group-hover:border-rose-200 group-hover:bg-rose-50"
    },
    sky: {
      baseBg: "bg-gradient-to-b from-sky-50/70 to-white",
      border: "hover:border-sky-200 focus-within:border-sky-200",
      shadow: "hover:shadow-sky-500/10 focus-within:shadow-sky-500/10",
      blobA: "from-sky-400/30 to-emerald-300/15",
      blobB: "from-indigo-400/20 to-sky-400/15",
      icon: "group-hover:border-sky-200 group-hover:bg-sky-50"
    },
    violet: {
      baseBg: "bg-gradient-to-b from-violet-50/70 to-white",
      border: "hover:border-violet-200 focus-within:border-violet-200",
      shadow: "hover:shadow-violet-500/10 focus-within:shadow-violet-500/10",
      blobA: "from-violet-400/28 to-pink-300/15",
      blobB: "from-purple-400/18 to-violet-400/15",
      icon: "group-hover:border-violet-200 group-hover:bg-violet-50"
    }
  };

  const s = styles[variant] || styles.rose;
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-slate-200 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-within:-translate-y-1 focus-within:shadow-xl ${s.baseBg} ${s.border} ${s.shadow}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className={`absolute -left-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${s.blobA} blur-2xl`} />
        <div className={`absolute -bottom-10 -right-12 h-44 w-44 rounded-full bg-gradient-to-br ${s.blobB} blur-2xl`} />
      </div>

      <div
        className={`relative mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[var(--wl-primary)] shadow-sm transition duration-300 ${s.icon}`}
      >
        <img src={icon} alt={title} className="h-7 w-7 object-contain" />
      </div>
      <h3 className="relative text-lg font-semibold text-slate-900">{title}</h3>
      <p className="relative mt-1 text-sm text-slate-600">{subtitle}</p>
    </article>
  );
}

function StatCard({ label, value, variant = "rose", icon }) {
  const variants = {
    rose: {
      cardBase: "border-rose-200/80 bg-white shadow-lg shadow-rose-500/10",
      cardHover: "hover:bg-gradient-to-b hover:from-rose-600 hover:to-rose-500 hover:border-transparent hover:shadow-2xl hover:shadow-rose-600/25",
      iconBase: "bg-rose-50 text-rose-500 ring-1 ring-rose-200/70",
      iconHover: "group-hover:bg-white/90 group-hover:text-slate-900 group-hover:ring-white/40",
      valueBase: "text-slate-900",
      valueHover: "group-hover:text-white",
      labelBase: "text-slate-600",
      labelHover: "group-hover:text-white/90"
    },
    blue: {
      cardBase: "border-sky-200/80 bg-white shadow-lg shadow-sky-500/10",
      cardHover: "hover:bg-gradient-to-b hover:from-blue-600 hover:to-sky-500 hover:border-transparent hover:shadow-2xl hover:shadow-blue-600/25",
      iconBase: "bg-sky-50 text-blue-600 ring-1 ring-sky-200/70",
      iconHover: "group-hover:bg-white/90 group-hover:text-slate-900 group-hover:ring-white/40",
      valueBase: "text-slate-900",
      valueHover: "group-hover:text-white",
      labelBase: "text-slate-600",
      labelHover: "group-hover:text-white/90"
    },
    roseSoft: {
      cardBase: "border-rose-200/50 bg-white shadow-lg shadow-rose-500/5",
      cardHover: "hover:bg-gradient-to-b hover:from-rose-600 hover:to-fuchsia-500 hover:border-transparent hover:shadow-2xl hover:shadow-fuchsia-600/20",
      iconBase: "bg-rose-50 text-rose-500 ring-1 ring-rose-200/60",
      iconHover: "group-hover:bg-white/90 group-hover:text-slate-900 group-hover:ring-white/40",
      valueBase: "text-slate-900",
      valueHover: "group-hover:text-white",
      labelBase: "text-slate-600",
      labelHover: "group-hover:text-white/90"
    },
    gradient: {
      cardBase: "border-slate-200 bg-white shadow-lg shadow-slate-900/10",
      cardHover:
        "hover:bg-gradient-to-b hover:from-blue-600 hover:via-indigo-600 hover:to-rose-600 hover:border-transparent hover:shadow-2xl hover:shadow-blue-600/25",
      iconBase: "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
      iconHover: "group-hover:bg-white/90 group-hover:text-slate-900 group-hover:ring-white/40",
      valueBase: "text-slate-900",
      valueHover: "group-hover:text-white",
      labelBase: "text-slate-600",
      labelHover: "group-hover:text-white/90"
    }
  };
  const v = variants[variant] || variants.rose;
  return (
    <article
      className={`group rounded-2xl border px-6 py-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl ${v.cardBase} ${v.cardHover}`}
    >
      <div
        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition duration-300 ${v.iconBase} ${v.iconHover}`}
      >
        <img src={icon} alt={label} className="h-7 w-7 object-contain" />
      </div>
      <p className={`text-2xl font-extrabold transition duration-300 ${v.valueBase} ${v.valueHover}`}>{value}</p>
      <p className={`mt-1 text-sm font-semibold transition duration-300 ${v.labelBase} ${v.labelHover}`}>{label}</p>
    </article>
  );
}

function CountryCard({ name, description }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-slate-900/90 text-white shadow-xl shadow-slate-900/40">
      <div className="relative h-[220px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-white shadow-md">
          <img src="/images/icons/location.png" alt="Location" className="h-4 w-4 object-contain brightness-0 invert" />
        </div>
        <div className="absolute inset-x-4 bottom-5">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="mt-2 text-xs leading-5 text-slate-100/90">{description}</p>
        </div>
      </div>
    </article>
  );
}



function BlogCard({ post }) {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-slate-300/80"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-block w-fit rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
          {post.category}
        </span>
        <h3 className="mt-3 line-clamp-2 text-base font-bold leading-snug text-slate-900 group-hover:text-[var(--wl-primary)] md:text-lg">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--wl-primary)]">
          Read More →
        </span>
      </div>
    </Link>
  );
}
