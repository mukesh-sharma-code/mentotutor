import { useEffect, useMemo, useState } from "react";
import { whitelabel } from "../../shared/config/whitelabel";
import { createDemoBooking } from "../../shared/api/booking";

const timezones = [
  "Asia/Kolkata",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Australia/Sydney"
];

const countries = ["India", "United States", "United Kingdom", "Canada", "Australia"];
const sources = ["Google", "Instagram", "YouTube", "Friend", "School", "Other"];
const grades = ["Grade 1-3", "Grade 4-6", "Grade 7-9", "Grade 10-12", "College"];
const subjects = ["Math", "Science", "English", "Coding", "SAT Prep"];

const initialForm = {
  date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
  time: "14:00",
  timezone: "Asia/Kolkata",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  contactNo: "+91-9876543210",
  country: "India",
  source: "Google",
  grade: "Grade 7-9",
  subject: "Math",
  topic: "Algebra Basics",
  additionalInfo: "Test booking"
};

export function DemoBookingModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  function handleClose() {
    if (isSubmitting) return;
    setStep(1);
    setErrors({});
    onClose();
  }

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const setField = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "", form: "" }));
  };

  const validateStepOne = () => {
    const nextErrors = {};
    if (!formData.date) nextErrors.date = "Please select a date.";
    if (!formData.time) nextErrors.time = "Please select a time.";
    if (!formData.timezone) nextErrors.timezone = "Please select a timezone.";
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateStepTwo = () => {
    const nextErrors = {};
    if (!formData.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!formData.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = "Valid email is required.";
    if (!formData.contactNo.trim()) nextErrors.contactNo = "Contact number is required.";
    if (!formData.country) nextErrors.country = "Please select a country.";
    if (!formData.source) nextErrors.source = "Please select a source.";
    if (!formData.grade) nextErrors.grade = "Please select a grade.";
    if (!formData.subject) nextErrors.subject = "Please select a subject.";
    if (!formData.topic.trim()) nextErrors.topic = "Topic is required.";
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStepOne()) return;
    setStep(2);
  };

  const handleBack = () => {
    if (isSubmitting) return;
    setStep(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!validateStepTwo()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await createDemoBooking(formData);
      setFormData(initialForm);
      setStep(1);
      onClose();
      if (onSuccess) onSuccess(whitelabel.toast.bookingSuccess);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        ...(error?.errors || {}),
        form: error?.message || "Unable to submit booking right now."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 px-4 py-8"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-[var(--wl-gradient-start)] to-[var(--wl-gradient-end)] px-5 py-4 text-white">
          <h2 className="text-xl font-bold">{whitelabel.cta.bookDemo}</h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-md p-1 text-2xl leading-none hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <span className={step === 1 ? "text-[var(--wl-primary)]" : "text-slate-400"}>Step 1</span>
            <span className="text-slate-300">/</span>
            <span className={step === 2 ? "text-[var(--wl-primary)]" : "text-slate-400"}>Step 2</span>
          </div>

          {step === 1 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date" error={errors.date}>
                <input
                  type="date"
                  min={minDate}
                  value={formData.date}
                  onChange={setField("date")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Time" error={errors.time}>
                <input
                  type="time"
                  value={formData.time}
                  onChange={setField("time")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Timezone" error={errors.timezone}>
                <select
                  value={formData.timezone}
                  onChange={setField("timezone")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                >
                  <option value="">Select timezone</option>
                  {timezones.map((timezone) => (
                    <option key={timezone} value={timezone}>
                      {timezone}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First Name" error={errors.firstName}>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={setField("firstName")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Last Name" error={errors.lastName}>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={setField("lastName")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={formData.email}
                  onChange={setField("email")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Contact No" error={errors.contactNo}>
                <input
                  type="tel"
                  value={formData.contactNo}
                  onChange={setField("contactNo")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Country" error={errors.country}>
                <select
                  value={formData.country}
                  onChange={setField("country")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                >
                  <option value="">Select country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="How did you hear about us?" error={errors.source}>
                <select
                  value={formData.source}
                  onChange={setField("source")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                >
                  <option value="">Select source</option>
                  {sources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Grade" error={errors.grade}>
                <select
                  value={formData.grade}
                  onChange={setField("grade")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                >
                  <option value="">Select grade</option>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Subject" error={errors.subject}>
                <select
                  value={formData.subject}
                  onChange={setField("subject")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                >
                  <option value="">Select subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Topic" error={errors.topic}>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={setField("topic")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Any additional info" error={errors.additionalInfo}>
                  <textarea
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={setField("additionalInfo")}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[var(--wl-primary)]"
                  />
                </Field>
              </div>
            </div>
          )}

          {errors.form ? <p className="mt-4 text-sm text-rose-600">{errors.form}</p> : null}

          <div className="mt-6 flex items-center justify-between">
            {step === 2 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
            )}

            {step === 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="rounded-lg bg-[var(--wl-primary)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--wl-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-[var(--wl-primary)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--wl-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}
