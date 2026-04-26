import { Link } from "react-router-dom";
import { whitelabel } from "../../shared/config/whitelabel";

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "#", icon: "/images/social/facebook.png",  invert: true  },
  { label: "X",         href: "#", icon: "/images/social/twitter.png",   invert: false },
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
    <footer className="bg-[#0f1117] text-slate-400" id="contact">
      {/* Main footer grid */}
      <div className="mx-auto w-[min(1120px,92%)] py-14">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">

          {/* ── Column 1: Brand + contact + offices ── */}
          <div className="space-y-6">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon, invert }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-opacity hover:opacity-80"
                >
                  <img
                    src={icon}
                    alt={label}
                    className={`h-5 w-5 object-contain opacity-80 transition-opacity hover:opacity-100 ${
                      invert ? "brightness-0 invert" : ""
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Email & Phone */}
            <div className="space-y-2 text-sm">
              <a
                href={`mailto:${whitelabel.supportEmail}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <span className="text-base">✉️</span>
                {whitelabel.supportEmail}
              </a>
            </div>

            {/* Offices */}
            <div className="space-y-4 text-sm">
              {OFFICES.map((office) => (
                <div key={office.name}>
                  <p className="flex items-center gap-2 font-semibold text-white">
                    <span className="text-base">{office.flag}</span>
                    {office.name}
                  </p>
                  <p className="mt-1 text-slate-500 leading-relaxed">{office.address}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Subjects ── */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Subjects
            </h3>
            <ul className="space-y-3 text-sm">
              {SUBJECTS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Legal ── */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              {LEGAL_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto w-[min(1120px,92%)] flex flex-col items-center justify-center gap-1 py-5 text-center text-sm text-slate-400 sm:flex-row sm:gap-2">
          <span>© {new Date().getFullYear()} {whitelabel.brandFullName}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
