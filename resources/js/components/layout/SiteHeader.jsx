import { Link } from "react-router-dom";
import { whitelabel } from "../../shared/config/whitelabel";

export function SiteHeader({ onBookDemo }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] w-[min(1120px,92%)] items-center justify-between">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label={whitelabel.brandName}
        >
          <img
            src="/images/Mento-Tutor-1-scaled.png"
            alt=""
            className="h-11 max-h-[48px] w-auto object-contain object-left sm:h-12"
          />
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-sm font-semibold text-slate-700 sm:flex sm:text-base">
            <Link to="/" className="hover:text-[var(--wl-primary)]">
              {whitelabel.nav.home}
            </Link>

            <Dropdown
              label="Subjects"
              items={[
                { icon: "📘", label: "English" },
                { icon: "📐", label: "Math" },
                { icon: "🧪", label: "Science" },
                { icon: "📝", label: "Test Prep" },
                { icon: "📚", label: "Courses" }
              ]}
            />

            <Dropdown
              label="Countries"
              items={[
                { icon: "🇺🇸", label: "USA" },
                { icon: "🇬🇧", label: "UK" },
                { icon: "🇦🇺", label: "Australia" },
                { icon: "🇨🇦", label: "Canada" }
              ]}
            />

            <Link to="/about" className="hover:text-[var(--wl-primary)]">
              About Us
            </Link>

            <Link to="/blogs" className="hover:text-[var(--wl-primary)]">
              Blogs
            </Link>

            <Link to="/contact-us" className="hover:text-[var(--wl-primary)]">
              Contact Us
            </Link>
          </nav>

          <button
            type="button"
            onClick={onBookDemo}
            className="rounded-lg bg-[var(--wl-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--wl-primary-dark)]"
          >
            {whitelabel.cta.bookDemo}
          </button>
        </div>
      </div>
    </header>
  );
}

function Dropdown({ label, items }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 group-hover:bg-slate-100 group-hover:text-slate-900 focus-visible:bg-slate-100 focus-visible:text-slate-900"
      >
        <span>{label}</span>
        <span className="text-xs transition-transform group-hover:rotate-180">▾</span>
      </button>

      <div className="invisible absolute left-0 top-9 w-52 rounded-2xl border border-slate-200 bg-white/95 p-2 text-sm opacity-0 shadow-lg shadow-slate-900/10 transition group-hover:visible group-hover:opacity-100">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-slate-700 hover:bg-slate-100"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-base">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
