import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { HomePage } from "../pages/home/HomePage";
import { AboutPage } from "../pages/about/AboutPage";
import { ContactPage } from "../pages/contact/ContactPage";
import { BlogListPage } from "../pages/blog/BlogListPage";
import { BlogDetailPage } from "../pages/blog/BlogDetailPage";
import { DemoBookingModal } from "../features/demo-booking/DemoBookingModal";
import { Toast } from "../shared/ui/Toast";
import { whitelabel } from "../shared/config/whitelabel";

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  /* Allow any component to open the booking modal via a custom event */
  useEffect(() => {
    const handler = () => setBookingOpen(true);
    window.addEventListener("open-booking-modal", handler);
    return () => window.removeEventListener("open-booking-modal", handler);
  }, []);

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
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900" style={themeVars}>
        <SiteHeader onBookDemo={() => setBookingOpen(true)} />
        <main className="pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/blogs" element={<BlogListPage />} />
            <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          </Routes>
        </main>
        <SiteFooter />

        <DemoBookingModal
          isOpen={isBookingOpen}
          onClose={() => setBookingOpen(false)}
          onSuccess={handleBookingSuccess}
        />
        <Toast message={toastMessage} />
      </div>
    </BrowserRouter>
  );
}
