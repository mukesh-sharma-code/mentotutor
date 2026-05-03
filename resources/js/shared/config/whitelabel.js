const env = import.meta.env;

export const whitelabel = {
  brandName: env.VITE_BRAND_NAME || "Mento Tutor",
  brandFullName: env.VITE_BRAND_FULL_NAME || "Mento Tutor",
  logoUrl: env.VITE_LOGO_URL || "https://mentotutor.com/wp-content/uploads/2026/03/Mento-Tutor-1-scaled.png",
  supportEmail: env.VITE_SUPPORT_EMAIL || "support@mentotutor.com",
  nav: {
    home: env.VITE_NAV_HOME_LABEL || "Home",
    about: env.VITE_NAV_ABOUT_LABEL || "About",
    contact: env.VITE_NAV_CONTACT_LABEL || "Contact"
  },
  cta: {
    bookDemo: env.VITE_BOOK_DEMO_LABEL || "Book a Demo"
  },
  home: {
    eyebrow: env.VITE_HOME_EYEBROW || "1:1 Tutoring",
    title: env.VITE_HOME_TITLE || "Helping Your Child Excel Anywhere",
    description:
      env.VITE_HOME_DESCRIPTION ||
      "Experience personalized learning through live sessions with our expert tutors, designed exclusively to address a child's academic needs."
  },
  toast: {
    bookingSuccess:
      env.VITE_TOAST_BOOKING_SUCCESS || "Thank you! Your demo booking request has been submitted."
  },
  theme: {
    primary: env.VITE_THEME_PRIMARY || "#e11d48",
    primaryDark: env.VITE_THEME_PRIMARY_DARK || "#be123c",
    gradientStart: env.VITE_THEME_GRADIENT_START || "#fb7185",
    gradientEnd: env.VITE_THEME_GRADIENT_END || "#e11d48",
    pageFrom: env.VITE_THEME_PAGE_FROM || "#fff1f2",
    pageTo: env.VITE_THEME_PAGE_TO || "#f8fafc"
  }
};
