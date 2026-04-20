import { whitelabel } from "../../shared/config/whitelabel";

const SOCIAL_LINKS = [
  { label: "Facebook",  href: "#", icon: "/images/social/facebook.png"  },
  { label: "X",         href: "#", icon: "/images/social/twitter.png"   },
  { label: "WhatsApp",  href: "#", icon: "/images/social/whatsapp.png"  },
  { label: "Instagram", href: "#", icon: "/images/social/instagram.png" },
  { label: "YouTube",   href: "#", icon: "/images/social/youtube.png"   },
  { label: "LinkedIn",  href: "#", icon: "/images/social/linkedin.png"  },
];

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white" id="contact">
      <div className="mx-auto flex w-[min(1120px,92%)] flex-col items-center justify-between gap-4 py-6 text-sm text-slate-600 sm:flex-row sm:py-8">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <p>© {new Date().getFullYear()} {whitelabel.brandFullName}</p>
          <p>{whitelabel.supportEmail}</p>
        </div>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="transition-opacity hover:opacity-75"
            >
              <img
                src={icon}
                alt={label}
                className="h-7 w-7 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
