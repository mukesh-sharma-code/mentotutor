import { Link } from "react-router-dom";
import { whitelabel } from "../../shared/config/whitelabel";

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "#", icon: "/images/social/facebook.png",  invert: true  },
  { label: "X",         href: "#", icon: "/images/social/twitter.png",   customClass: "invert mix-blend-screen" },
  { label: "WhatsApp",  href: "#", icon: "/images/social/whatsapp.png",  invert: true  },
  { label: "Instagram", href: "#", icon: "/images/social/instagram.png", invert: true  },
  { label: "YouTube",   href: "#", icon: "/images/social/youtube.png",   invert: true  },
  { label: "LinkedIn",  href: "#", icon: "/images/social/linkedin.png",  invert: true  },
];

const QUICK_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Blogs", to: "/blogs" },
  { label: "Contact Us", to: "/contact-us" },
];

const SUBJECTS = [
  { label: "English Tutoring", to: "/" },
  { label: "Math Tutoring", to: "/" },
  { label: "Science Tutoring", to: "/" },
  { label: "Test Prep", to: "/" },
  { label: "Courses", to: "/" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
  { label: "Privacy Policy", to: "/privacy-policy" },
];

const OFFICES = [
  {
    flag: "🇺🇸",
    name: "US Office",
    address: "355 Bryant St Unit 403, San Francisco, CA 94107",
  },
  {
    flag: "🇦🇪",
    name: "UAE Office",
    address: "Building A1, Dubai Digital Park, Silicon Oasis, Dubai, UAE",
  },
  {
    flag: "🇮🇳",
    name: "India Office",
    address: "2nd Floor, 31/14, Deivasigamani St, Royapettah, Chennai – 600014",
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0e17] text-slate-400" id="contact">
      {/* Decorative Top Line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-500 opacity-80" />
      
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-rose-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />

      {/* Main footer grid */}
      <div className="relative mx-auto w-[min(1120px,92%)] py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">

          {/* ── Column 1: Brand + Contact ── */}
          <div className="space-y-8 md:col-span-5">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                {whitelabel.brandName}
              </h2>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-rose-500">
                Online 1-on-1 Learning
              </p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                Empowering students worldwide through personalized, high-quality tutoring. Your journey to academic excellence starts here.
              </p>
            </div>

            {/* Email */}
            <div className="inline-flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Support</p>
                <a href={`mailto:${whitelabel.supportEmail}`} className="text-sm font-bold text-white transition-colors hover:text-rose-400">
                  {whitelabel.supportEmail}
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon, invert, customClass }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-rose-500 hover:bg-rose-500 hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                >
                  <img
                    src={icon}
                    alt={label}
                    className={`h-4 w-4 object-contain opacity-70 transition-all duration-300 group-hover:opacity-100 ${
                      customClass ? customClass : (invert ? "brightness-0 invert" : "")
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div className="md:col-span-2">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
              <span className="mt-2 block h-1 w-8 rounded bg-rose-500"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="group flex items-center text-slate-400 transition-all duration-300 hover:text-white"
                  >
                    <span className="mr-2 text-rose-500 opacity-0 transition-all duration-300 group-hover:mr-3 group-hover:opacity-100">›</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Subjects ── */}
          <div className="md:col-span-2">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
              Subjects
              <span className="mt-2 block h-1 w-8 rounded bg-indigo-500"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {SUBJECTS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="group flex items-center text-slate-400 transition-all duration-300 hover:text-white"
                  >
                    <span className="mr-2 text-indigo-500 opacity-0 transition-all duration-300 group-hover:mr-3 group-hover:opacity-100">›</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Global Offices & Legal ── */}
          <div className="md:col-span-3">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
              Global Offices
              <span className="mt-2 block h-1 w-8 rounded bg-sky-500"></span>
            </h3>
            <div className="space-y-5 text-sm">
              {OFFICES.map((office) => (
                <div key={office.name} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-lg shadow-inner">
                    {office.flag}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{office.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{office.address}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 border-t border-white/5 pt-8">
              <div className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-wider">
                {LEGAL_LINKS.map(({ label, to }) => (
                  <Link key={label} to={to} className="w-fit text-slate-500 transition-colors hover:text-rose-400">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="mx-auto flex w-[min(1120px,92%)] flex-col items-center justify-between gap-4 py-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {whitelabel.brandFullName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-rose-500">♥</span> for students globally
          </p>
        </div>
      </div>
    </footer>
  );
}
