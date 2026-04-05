import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { HomePage } from "../pages/home/HomePage";
import { DemoBookingModal } from "../features/demo-booking/DemoBookingModal";
import { Toast } from "../shared/ui/Toast";
import { whitelabel } from "../shared/config/whitelabel";

export function App() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const themeVars = useMemo(
    () => ({
      "--wl-primary": whitelabel.theme.primary,
      "--wl-primary-dark": whitelabel.theme.primaryDark,
      "--wl-gradient-start": whitelabel.theme.gradientStart,
      "--wl-gradient-end": whitelabel.theme.gradientEnd,
      "--wl-page-from": whitelabel.theme.pageFrom,
      "--wl-page-to": whitelabel.theme.pageTo
    }),
    []
  );

  const handleBookingSuccess = (message) => {
    setToastMessage(message || whitelabel.toast.bookingSuccess);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900" style={themeVars}>
      <SiteHeader onBookDemo={() => setBookingOpen(true)} />
      <main className="pt-24">
        <HomePage />
      </main>
      <SiteFooter />

      <DemoBookingModal
        isOpen={isBookingOpen}
        onClose={() => setBookingOpen(false)}
        onSuccess={handleBookingSuccess}
      />
      <Toast message={toastMessage} />
    </div>
  );
}
