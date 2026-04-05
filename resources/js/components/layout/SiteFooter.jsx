import { whitelabel } from "../../shared/config/whitelabel";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white" id="contact">
      <div className="mx-auto flex min-h-[70px] w-[min(1120px,92%)] flex-col items-center justify-center gap-1 py-3 text-sm text-slate-600 sm:flex-row sm:justify-between sm:py-0">
        <p>© {new Date().getFullYear()} {whitelabel.brandFullName}</p>
        <p>{whitelabel.supportEmail}</p>
      </div>
    </footer>
  );
}
