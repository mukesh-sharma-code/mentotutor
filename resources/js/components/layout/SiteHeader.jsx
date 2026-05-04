import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { whitelabel } from "../../shared/config/whitelabel";

export function SiteHeader({ onBookDemo }) {
  const [scrollProgress, setScrollProgress] = useState("0%");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(`${progress}%`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getLinkClass = (path) => {
    return `group transition-colors ${isActive(path) ? "" : "text-slate-500"}`;
  };

  const getSpanClass = (path) => {
    return isActive(path) ? "text-rose-600 font-bold" : "group-hover:text-slate-900";
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur">
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-rose-500 via-indigo-500 to-sky-500 transition-all duration-150 ease-out"
        style={{ width: scrollProgress }}
      />
      <div className="mx-auto flex h-[72px] w-[min(1120px,92%)] items-center justify-between">
        <Link
          to="/"
          className="flex shrink-0 items-center group"
          aria-label={whitelabel.brandName}
        >
          <img
            src="/images/Mento-Tutor-1-scaled.png"
            alt={whitelabel.brandName}
            className="h-12 max-h-[48px] w-auto object-contain object-left transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:max-h-[56px]"
          />
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-8 text-[15px] font-medium text-slate-500 sm:flex">
            <Link to="/" className={getLinkClass('/')}>
              <span className={getSpanClass('/')}>{whitelabel.nav.home}</span>
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

            <Link to="/about" className={getLinkClass('/about')}>
              <span className={getSpanClass('/about')}>About Us</span>
            </Link>

            <Link to="/blogs" className={getLinkClass('/blogs')}>
              <span className={getSpanClass('/blogs')}>Blogs</span>
            </Link>

            <Link to="/contact-us" className={getLinkClass('/contact-us')}>
              <span className={getSpanClass('/contact-us')}>Contact Us</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={onBookDemo}
            className="inline-flex items-center justify-center rounded-full bg-[var(--wl-primary)] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-[var(--wl-primary)]/30 transition-all hover:-translate-y-0.5 hover:bg-[var(--wl-primary-dark)] hover:shadow-[var(--wl-primary)]/40"
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
        className="inline-flex items-center gap-1 py-1.5 font-medium text-slate-500 transition-colors hover:text-black group-hover:text-black focus-visible:text-black"
      >
        <span>{label}</span>
        <span className="text-[10px] transition-transform group-hover:rotate-180">▼</span>
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
