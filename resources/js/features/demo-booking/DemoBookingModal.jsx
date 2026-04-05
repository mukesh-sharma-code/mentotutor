import { useEffect, useMemo, useRef, useState } from "react";
import { getAllCountries, getCountry, getTimezonesForCountry } from "countries-and-timezones";
import { whitelabel } from "../../shared/config/whitelabel";
import { createDemoBooking } from "../../shared/api/booking";

const sources = [
  "Google",
  "Organic Search",
  "Social Media",
  "Direct Traffic",
  "Live Chat",
  "Bark",
  "Sulekha",
  "Referral",
  "Others"
];
const grades = [
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "Grade 13",
  "Higher Grades (9-12)",
  "Lower level",
  "Secondary level",
  "Upper level",
  "College",
  "A level",
  "O level",
  "AP Subjects",
  "GCSE Exams",
  "NCEA Exams",
  "IELTS",
  "SAT",
  "ACT",
  "CogAT",
  "HAST",
  "NAPLAN",
  "OC",
  "Selective",
  "Coding",
  "Spanish",
  "Summer Course",
  "Bridge school programmes",
  "School readiness programmes",
  "Budding Entrepreneurship"
];
const subjects = ["Math", "Science", "English", "Coding", "SAT Prep"];

const initialForm = {
  date: "",
  time: "",
  countryCode: "",
  timezone: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNo: "",
  source: "",
  grade: "",
  subject: "",
  topic: "",
  additionalInfo: ""
};

export function DemoBookingModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  /** Bump when modal opens so the booking UI remounts — reduces autofill reusing DOM heuristics. */
  const [formMountKey, setFormMountKey] = useState(0);
  const wasOpenRef = useRef(false);
  /** Blocks autofill until the user focuses a field (Chrome/Safari ignore autocomplete=off without this). */
  const [autofillLocked, setAutofillLocked] = useState(true);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const countryOptions = useMemo(() => {
    const all = getAllCountries();
    return Object.values(all)
      .map((c) => ({ code: c.id, name: c.name }))
      .sort((a, b) => a.name.localeCompare(b.name, "en"));
  }, []);

  const timezonesForCountry = useMemo(() => {
    if (!formData.countryCode) return [];
    const list = getTimezonesForCountry(formData.countryCode);
    if (!list?.length) return ["Etc/UTC"];
    return list
      .map((tz) => tz?.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "en"));
  }, [formData.countryCode]);

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

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      setFormMountKey((k) => k + 1);
      setFormData({ ...initialForm });
      setStep(1);
      setErrors({});
      setAutofillLocked(true);
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  function unlockAutofill(event) {
    setAutofillLocked(false);
    const el = event?.target;
    if (el && "readOnly" in el && el.readOnly) {
      el.readOnly = false;
    }
  }

  if (!isOpen) return null;

  const setField = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "", form: "" }));
  };

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setFormData((prev) => ({ ...prev, countryCode, timezone: "" }));
    setErrors((prev) => ({ ...prev, countryCode: "", timezone: "", form: "" }));
  };

  const validateStepOne = () => {
    const nextErrors = {};
    if (!formData.date) nextErrors.date = "Please select a date.";
    if (!formData.time) nextErrors.time = "Please select a time.";
    if (!formData.countryCode) nextErrors.countryCode = "Please select a country.";
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
    if (!formData.source) nextErrors.source = "Please select a source.";
    if (!formData.grade) nextErrors.grade = "Please select a grade.";
    if (!formData.subject) nextErrors.subject = "Please select a subject.";
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
    event?.preventDefault?.();
    if (step !== 2) return;
    if (isSubmitting) return;
    if (!validateStepTwo()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const { countryCode, ...rest } = formData;
      const countryName = getCountry(countryCode)?.name ?? countryCode;
      await createDemoBooking({ ...rest, country: countryName });
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
      className="fixed inset-0 z-[70] overflow-y-auto overflow-x-hidden overscroll-contain bg-slate-900/60"
      onClick={handleClose}
    >
      <div className="flex min-h-full items-end justify-center px-3 py-6 sm:items-center sm:px-4 sm:py-10">
        <div
          className="my-auto flex min-h-0 w-full max-w-4xl max-h-[min(92vh,56rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex shrink-0 items-center justify-between bg-gradient-to-r from-[var(--wl-gradient-start)] to-[var(--wl-gradient-end)] px-4 py-3 text-white sm:px-5 sm:py-4">
            <h2 className="pr-2 text-lg font-bold sm:text-xl">{whitelabel.cta.bookDemo}</h2>
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="shrink-0 rounded-md p-1 text-2xl leading-none hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Use div, not <form>: browsers fire implicit submit / Enter handling that extensions sometimes chain to "primary" actions. */}
          <div
            role="form"
            aria-label={whitelabel.cta.bookDemo}
            key={formMountKey}
            className="flex min-h-0 flex-1 flex-col"
            data-lpignore="true"
            data-1p-ignore="true"
            data-bwignore="true"
            data-form-type="other"
          >
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 md:px-6 md:py-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
            <span className={step === 1 ? "text-[var(--wl-primary)]" : "text-slate-400"}>Step 1</span>
            <span className="text-slate-300">/</span>
            <span className={step === 2 ? "text-[var(--wl-primary)]" : "text-slate-400"}>Step 2</span>
          </div>

          {step === 1 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date" required error={errors.date}>
                <input
                  type="date"
                  name={`db-${formMountKey}-date`}
                  autoComplete="off"
                  min={minDate}
                  value={formData.date}
                  readOnly={autofillLocked}
                  onFocus={unlockAutofill}
                  onChange={setField("date")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Time" required error={errors.time}>
                <input
                  type="time"
                  name={`db-${formMountKey}-time`}
                  autoComplete="off"
                  value={formData.time}
                  readOnly={autofillLocked}
                  onFocus={unlockAutofill}
                  onChange={setField("time")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Country" required error={errors.countryCode}>
                <select
                  name={`db-${formMountKey}-country`}
                  autoComplete="off"
                  value={formData.countryCode}
                  onFocus={unlockAutofill}
                  onChange={handleCountryChange}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                >
                  <option value="">Select country</option>
                  {countryOptions.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Timezone" required error={errors.timezone}>
                <select
                  name={`db-${formMountKey}-timezone`}
                  autoComplete="off"
                  value={formData.timezone}
                  onFocus={unlockAutofill}
                  onChange={setField("timezone")}
                  disabled={!formData.countryCode}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)] disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                >
                  <option value="">
                    {formData.countryCode ? "Select timezone" : "Select country first"}
                  </option>
                  {timezonesForCountry.map((timezone) => (
                    <option key={timezone} value={timezone}>
                      {timezone}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First Name" required error={errors.firstName}>
                <input
                  type="text"
                  name={`db-${formMountKey}-fn`}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={formData.firstName}
                  readOnly={autofillLocked}
                  onFocus={unlockAutofill}
                  onChange={setField("firstName")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Last Name" required error={errors.lastName}>
                <input
                  type="text"
                  name={`db-${formMountKey}-ln`}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={formData.lastName}
                  readOnly={autofillLocked}
                  onFocus={unlockAutofill}
                  onChange={setField("lastName")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Email" required error={errors.email}>
                <input
                  type="email"
                  name={`db-${formMountKey}-em`}
                  autoComplete="off"
                  inputMode="email"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={formData.email}
                  readOnly={autofillLocked}
                  onFocus={unlockAutofill}
                  onChange={setField("email")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="Contact No" required error={errors.contactNo}>
                <input
                  type="tel"
                  name={`db-${formMountKey}-tel`}
                  autoComplete="off"
                  value={formData.contactNo}
                  readOnly={autofillLocked}
                  onFocus={unlockAutofill}
                  onChange={setField("contactNo")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <Field label="How did you hear about us?" required error={errors.source}>
                <select
                  name={`db-${formMountKey}-src`}
                  autoComplete="off"
                  value={formData.source}
                  onFocus={unlockAutofill}
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

              <Field label="Grade" required error={errors.grade}>
                <select
                  name={`db-${formMountKey}-gr`}
                  autoComplete="off"
                  value={formData.grade}
                  onFocus={unlockAutofill}
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

              <Field label="Subject" required error={errors.subject}>
                <select
                  name={`db-${formMountKey}-subj`}
                  autoComplete="off"
                  value={formData.subject}
                  onFocus={unlockAutofill}
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
                  name={`db-${formMountKey}-topic`}
                  autoComplete="off"
                  value={formData.topic}
                  readOnly={autofillLocked}
                  onFocus={unlockAutofill}
                  onChange={setField("topic")}
                  className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Any additional info" error={errors.additionalInfo}>
                  <textarea
                    name={`db-${formMountKey}-notes`}
                    autoComplete="off"
                    rows={3}
                    value={formData.additionalInfo}
                    readOnly={autofillLocked}
                    onFocus={unlockAutofill}
                    onChange={setField("additionalInfo")}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[var(--wl-primary)]"
                  />
                </Field>
              </div>
            </div>
          )}

          {errors.form ? <p className="mt-4 text-sm text-rose-600">{errors.form}</p> : null}
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6 md:py-4">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                {step === 2 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    Cancel
                  </button>
                )}

                {step === 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[var(--wl-primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--wl-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto sm:w-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-[var(--wl-primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--wl-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto sm:w-auto"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, error, required: isRequired }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-slate-700">
        {label}
        {isRequired ? (
          <span className="text-rose-600" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs text-rose-600">{error}</span> : null}
    </label>
  );
}
