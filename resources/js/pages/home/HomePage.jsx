import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { whitelabel } from "../../shared/config/whitelabel";
import { blogPosts } from "../../features/blog/blogData";

const HOME_ASSETS = {
  heroBackground: "/image2.jpg?v=2",
  heroCard: "/image1.jpg?v=2",
  aboutVideoThumb: "/image1.jpg?v=2"
};

const LEVELS = [
  { title: "Elementary School", subtitle: "Grades K–5", variant: "rose", icon: "/images/levels/elementary.png" },
  { title: "Middle School", subtitle: "Grades 6–8", variant: "sky", icon: "/images/levels/middle-school.png" },
  { title: "High School", subtitle: "Grades 9–12", variant: "violet", icon: "/images/levels/high-school.png" }
];

const COUNTRIES = [
  { name: "United States", description: "A hub of innovation and diversity in education.", comingSoon: true },
  { name: "United Kingdom", description: "Home to historic institutions with strong global ties.", comingSoon: true },
  { name: "Australia", description: "A premier destination for international students.", comingSoon: true },
  { name: "New Zealand", description: "Nature-inspired learning with world-class standards.", comingSoon: true },
  { name: "Canada", description: "An inclusive, diverse, and welcoming environment.", comingSoon: true }
];

const SERVICES = [
  {
    num: "01",
    title: "Dedicated 1-on-1 Sessions",
    description: "Every student learns differently. We focus on one student at a time because that's how real learning happens.",
    icon: "/images/icons/open-book.png"
  },
  {
    num: "02",
    title: "Customized Study Plans",
    description: "Tailored lesson plans that match your child's strengths, target their weak areas, and accelerate their results.",
    icon: "/images/icons/webinar.png"
  },
  {
    num: "03",
    title: "Real-time Doubt Solving",
    description: "Engaging live sessions where every question gets answered and mistakes are corrected in real-time.",
    icon: "/images/icons/video-camera.png"
  },
  {
    num: "04",
    title: "Continuous Progress Tracking",
    description: "Smart progress tracking and regular parent updates to ensure consistent academic growth.",
    icon: "/images/icons/graduation.png"
  }
];

const PROBLEM_LIST = [
  "Not getting enough attention in school?",
  "Hesitant to ask doubts in class?",
  "Falling behind in key subjects?",
  "Spending hours studying but not seeing results?"
];

const REVIEWS = [
  {
    name: "Sarah M.",
    role: "Parent",
    text: "After just a few sessions, my child became more confident in math. The 1-on-1 attention is exactly what we needed.",
    rating: 5
  },
  {
    name: "James P.",
    role: "Parent",
    text: "Flexible scheduling is a lifesaver for our busy family. The tutors are patient, qualified, and my son actually looks forward to his sessions now.",
    rating: 5
  },
  {
    name: "Priya M.",
    role: "Grade 8 Student",
    text: "I love the interactive live classes! The real-time doubt clearing means I never feel stuck. My confidence in science has grown so much.",
    rating: 5
  }
];

const LATEST_BLOGS = blogPosts.slice(0, 3);

function TypewriterText({ text, speed = 50, delay = 0, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let intervalId;
    let i = 0;
    setDisplayedText("");
    setIsTyping(false);
    setIsFinished(false);

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          setIsTyping(false);
          setIsFinished(true);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return (
    <span className="relative inline-block text-left w-full">
      <span className="invisible whitespace-pre-wrap">{text}</span>
      <span className="absolute left-0 top-0 whitespace-pre-wrap">
        {displayedText}
        <span
          className={`ml-1 inline-block w-[3px] bg-rose-400 translate-y-1 h-[0.9em] ${
            isFinished ? "animate-[pulse_1s_ease-in-out_infinite] opacity-60" : ""
          } ${!isTyping && !isFinished ? "hidden" : ""}`}
        ></span>
      </span>
    </span>
  );
}

export function HomePage() {
  return (
    <>
      <section
        className="relative overflow-hidden"
        id="home"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${HOME_ASSETS.heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/55" />

        <div className="relative mx-auto flex min-h-[70vh] w-[min(1120px,92%)] flex-col items-start justify-center gap-10 py-10 text-white md:flex-row md:py-16">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              {whitelabel.home.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-100 md:text-lg min-h-[4.5em] sm:min-h-[3em]">
              <TypewriterText text={whitelabel.home.description} speed={15} delay={200} />
            </p>
            
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-booking-modal"))}
                className="inline-flex items-center justify-center rounded-full bg-[var(--wl-primary)] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[var(--wl-primary)]/30 transition-all hover:-translate-y-0.5 hover:bg-[var(--wl-primary-dark)] hover:shadow-[var(--wl-primary)]/40"
              >
                👉 {whitelabel.cta.bookDemo}
              </button>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
              >
                👉 Talk to an Expert
              </a>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-slate-300">
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✔</span> Experienced Tutors
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✔</span> Flexible Timings
              </span>
              <span className="flex items-center gap-2">
                <span className="text-emerald-400">✔</span> Personalized Learning Plans
              </span>
            </div>
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

      <section className="py-12 md:py-16" id="about">
        <div className="mx-auto w-[min(1120px,92%)] space-y-10">
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

          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Is your child <span className="text-[var(--wl-primary)]">struggling</span> to keep up?
            </h2>
          </div>

          <article className="mt-10 grid items-center gap-10 md:grid-cols-[1.1fr_minmax(0,1fr)]">
            <div>
              <ul className="space-y-4">
                {PROBLEM_LIST.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[var(--wl-primary)]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <p className="mt-8 text-xl font-bold text-slate-900">
                You’re not alone—and it’s fixable.
              </p>
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
        </div>
      </section>

      {/* ── Services Section (from content.docx) ── */}
      <section className="bg-white py-12 md:py-16" id="services">
        <div className="mx-auto w-[min(1120px,92%)]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Here’s how <span className="text-[var(--wl-primary)]">{whitelabel.brandName}</span> helps
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              At {whitelabel.brandName}, we focus on one student at a time—because that’s how real learning happens.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <ServiceCard key={service.num} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-slate-900">
              No distractions. No shortcuts. Just results.
            </p>
          </div>
        </div>
      </section>

      {/* ── Benefits Section ── */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto w-[min(1120px,92%)]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              What your child will <span className="text-[var(--wl-primary)]">achieve</span>
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Better understanding of concepts",
              "Improved school performance",
              "Stronger confidence in exams",
              "Faster doubt resolution",
              "Consistent academic growth"
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-4 rounded-xl bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">✔</span>
                <span className="font-semibold text-slate-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose MentoTutor Section (from content.docx) ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24" id="how-we-help">
        <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-rose-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />

        <div className="relative mx-auto w-[min(1120px,92%)] text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            What makes us <span className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">different?</span>
          </h2>
          
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: "🌟", title: "High-Quality Tutors", desc: "Carefully selected experts" },
              { icon: "💡", title: "Concept Clarity", desc: "Focus on understanding, not rote learning" },
              { icon: "⏰", title: "Flexible Timings", desc: "Fits your busy schedule" },
              { icon: "🎯", title: "Personalized Attention", desc: "1-on-1 focus in every session" },
              { icon: "📊", title: "Parent Updates", desc: "Continuous progress tracking" }
            ].map((feature, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-rose-400/30 hover:bg-white/10 hover:shadow-xl hover:shadow-rose-500/10">
                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/0 to-rose-500/0 transition-all duration-300 group-hover:from-rose-500/10 group-hover:to-amber-500/5" />
                 <div className="relative">
                   <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>
                   <h3 className="font-bold text-white text-sm">{feature.title}</h3>
                   <p className="mt-2 text-xs text-slate-400 transition-colors duration-300 group-hover:text-slate-300">{feature.desc}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof Section ── */}
      <section className="bg-gradient-to-b from-rose-50/50 via-white to-sky-50/50 py-12 md:py-16" id="reviews">
        <div className="mx-auto w-[min(1120px,92%)]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              What <span className="text-[var(--wl-primary)]">parents</span> and <span className="text-[var(--wl-primary)]">students</span> are saying
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Strong CTA Section ── */}
      <section className="bg-gradient-to-r from-rose-500 via-rose-600 to-[var(--wl-primary-dark)] py-16 text-center text-white">
        <div className="mx-auto w-[min(800px,92%)]">
          <h2 className="text-3xl font-bold md:text-4xl">Give your child the advantage they deserve</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-booking-modal"))}
              className="rounded-full bg-white px-8 py-3.5 text-base font-bold text-[var(--wl-primary)] shadow-xl transition-transform hover:-translate-y-1 hover:bg-slate-50"
            >
              👉 Book a Free Demo Class Today
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-booking-modal"))}
              className="rounded-full border border-white/30 bg-black/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur transition-all hover:-translate-y-1 hover:bg-black/20"
            >
              👉 Start Learning with MentoTutor
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50 via-white to-rose-50 py-12 md:py-16">
        <div className="mx-auto w-[min(1120px,92%)]">
          <div className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center">
              <img src="/images/icons/globalreach.png" alt="Global Reach" className="h-12 w-12 object-contain" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Global <span className="text-[var(--wl-primary)]">reach</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Empowering students worldwide through cultural exchange, meaningful connections, and transformative
              education.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-5">
            {COUNTRIES.map((c) => (
              <CountryCard key={c.name} name={c.name} description={c.description} comingSoon={c.comingSoon} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="mx-auto w-[min(1120px,92%)]">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Latest <span className="text-[var(--wl-primary)]">blogs</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Insights, tips, and resources to help students and parents navigate the learning journey.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {LATEST_BLOGS.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/blogs"
              className="group inline-flex items-center rounded-full border border-[var(--wl-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--wl-primary)] transition-colors hover:bg-[var(--wl-primary)] hover:text-white"
            >
                View All Blogs →
            </Link>
          </div>
        </div>
      </section>


    </>
  );
}

function ServiceCard({ num, title, description, icon }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[var(--wl-primary)]/30">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-50/0 to-rose-50/0 transition-all duration-300 group-hover:from-rose-50/60 group-hover:to-amber-50/30" />
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--wl-primary)]/10">
            <img src={icon} alt={title} className="h-6 w-6 object-contain" />
          </div>
          <span className="text-2xl font-extrabold text-[var(--wl-primary)]/20">{num}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </article>
  );
}

function ReviewCard({ name, role, text, rating }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: rating }, (_, i) => (
          <span key={i} className="text-amber-400">★</span>
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-slate-600 italic">&ldquo;{text}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--wl-primary)] to-rose-400 text-sm font-bold text-white">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </article>
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

function CountryCard({ name, description, comingSoon }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-transparent bg-slate-900/90 text-white shadow-xl shadow-slate-900/40 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--wl-primary)]/50 hover:shadow-2xl hover:shadow-[var(--wl-primary)]/30">
      <div className="relative h-[220px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
        <div className="absolute left-4 top-4">
          <img src="/images/icons/location.png" alt="Location" className="h-6 w-6 object-contain brightness-0 invert drop-shadow-md transition-transform duration-300 group-hover:scale-125" />
        </div>
        {comingSoon && (
          <div className="absolute right-4 top-4 rounded-full bg-rose-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-300 backdrop-blur-md border border-rose-500/30">
            Coming Soon
          </div>
        )}
        <div className="absolute inset-x-4 bottom-5">
          <h3 className="text-lg font-semibold transition-colors duration-300 group-hover:text-rose-400">{name}</h3>
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
        {post.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {post.excerpt}
          </p>
        )}
        <p className="mt-3 text-xs font-medium text-slate-400">
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
