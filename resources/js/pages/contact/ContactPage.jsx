import { useState } from "react";
import { Link } from "react-router-dom";
import { whitelabel } from "../../shared/config/whitelabel";
import { apiRequest } from "../../shared/api/client";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    userType: "Student",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  const setField = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "", form: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = "Valid email is required.";
    if (!formData.contactNo.trim()) nextErrors.contactNo = "Contact number is required.";
    if (!formData.message.trim()) nextErrors.message = "Message is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccess(null);

    try {
      await apiRequest("/api/v1/contact-messages", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setSuccess("Your inquiry was submitted successfully. We will be in touch soon!");
      setFormData({ name: "", email: "", contactNo: "", userType: "Student", message: "" });
    } catch (error) {
      setErrors({ form: error?.message || "Unable to submit your inquiry right now. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fbfcff]">
      {/* Hero Section */}
      <section className="relative flex h-[350px] items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <img
            src="/images/about/hero.png" // Reusing hero image for background
            alt="Contact hero background"
            className="h-full w-full object-cover blur-[2px]"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-extrabold sm:text-6xl">Contact Us</h1>
          <p className="mt-4 text-lg text-white/90">We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="mx-auto w-[min(1120px,92%)] py-16 sm:py-24">
        <div className="grid gap-12 rounded-[2rem] bg-white p-6 shadow-xl sm:p-10 lg:grid-cols-2 lg:items-center">
          
          {/* Left Illustration */}
          <div className="hidden lg:block h-full">
            <div className="flex h-full flex-col items-center justify-center rounded-[1.5rem] bg-[#FDF2ED] p-8 text-center border-4 border-white shadow-inner">
               <img 
                 src="/images/about/mission.png" 
                 alt="Illustration of our friendly team" 
                 className="w-full max-w-sm drop-shadow-xl"
               />
               <h3 className="mt-8 text-2xl font-bold text-slate-900">We're Here to Help!</h3>
               <p className="mt-2 text-slate-600">Have a question about our tutoring services? Fill out the form and our team will get back to you within 24 hours.</p>
            </div>
          </div>

          {/* Right Form */}
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6">Send us a Message</h2>
            {success && (
              <div className="mb-6 rounded-xl bg-emerald-50 p-4 text-emerald-800 border border-emerald-200">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="flex gap-6 mb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="userType" 
                    value="Student" 
                    checked={formData.userType === "Student"} 
                    onChange={setField("userType")}
                    className="h-5 w-5 text-[var(--wl-primary)] focus:ring-[var(--wl-primary)]"
                  />
                  <span className="font-medium text-slate-700">Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="userType" 
                    value="Parent" 
                    checked={formData.userType === "Parent"} 
                    onChange={setField("userType")}
                    className="h-5 w-5 text-[var(--wl-primary)] focus:ring-[var(--wl-primary)]"
                  />
                  <span className="font-medium text-slate-700">Parent</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={setField("name")}
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-[var(--wl-primary)] focus:ring-1 focus:ring-[var(--wl-primary)] transition"
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-xs text-rose-600 mt-1">{errors.name}</span>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={setField("email")}
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-[var(--wl-primary)] focus:ring-1 focus:ring-[var(--wl-primary)] transition"
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-xs text-rose-600 mt-1">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Number *</label>
                <input
                  type="tel"
                  value={formData.contactNo}
                  onChange={setField("contactNo")}
                  className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-[var(--wl-primary)] focus:ring-1 focus:ring-[var(--wl-primary)] transition"
                  placeholder="+1 234 567 890"
                />
                {errors.contactNo && <span className="text-xs text-rose-600 mt-1">{errors.contactNo}</span>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  value={formData.message}
                  onChange={setField("message")}
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[var(--wl-primary)] focus:ring-1 focus:ring-[var(--wl-primary)] transition"
                  placeholder="How can we help you?"
                />
                {errors.message && <span className="text-xs text-rose-600 mt-1">{errors.message}</span>}
              </div>

              {errors.form && <p className="text-sm text-rose-600">{errors.form}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-[var(--wl-primary)] text-lg font-bold text-white shadow-lg transition hover:scale-[1.02] hover:bg-[var(--wl-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Locations Section */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-100">
        <div className="mx-auto w-[min(1120px,92%)]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Our Global Presence</h2>
            <p className="mt-4 text-lg text-slate-600">Find us in offices across the globe.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <LocationCard 
              title="U.S Headquarters" 
              address="123 Education Lane, Suite 400, New York, NY 10001" 
              phone="+1 855 688 8867" 
              email="us@mentotutor.com" 
            />
            {/* Card 2 */}
            <LocationCard 
              title="Indian Office" 
              address="45 Knowledge Park, Tech Hub Rd, Bengaluru 560100" 
              phone="+91 800 123 4567" 
              email="india@mentotutor.com" 
            />
            {/* Card 3 */}
            <LocationCard 
              title="Australian Office" 
              address="Level 10, 200 Learning Street, Sydney NSW 2000" 
              phone="+61 1800 999 888" 
              email="au@mentotutor.com" 
            />
            {/* Card 4 */}
            <LocationCard 
              title="UK Office" 
              address="10 Oxford Road, Education Quarter, London W1D 1BL" 
              phone="+44 800 111 2222" 
              email="uk@mentotutor.com" 
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function LocationCard({ title, address, phone, email }) {
  return (
    <div className="flex flex-col rounded-[1.5rem] bg-slate-50 p-6 border border-slate-100 shadow-sm transition hover:shadow-md">
      <h3 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">{title}</h3>
      <div className="flex-1 space-y-4 text-sm text-slate-600">
        <div>
          <span className="block font-semibold text-slate-900 mb-1">Address</span>
          <p>{address}</p>
        </div>
        <div>
          <span className="block font-semibold text-slate-900 mb-1">Contact</span>
          <p>{phone}</p>
        </div>
        <div>
          <span className="block font-semibold text-slate-900 mb-1">Email</span>
          <p className="text-[var(--wl-primary)] font-medium">{email}</p>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-200 text-center">
        <a href="#" className="text-sm font-bold text-[var(--wl-primary)] hover:underline">
          View on Map →
        </a>
      </div>
    </div>
  );
}
