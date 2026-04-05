import { useState } from "react";
import { createUser } from "../../shared/api/user";

const initialForm = {
  name: "",
  email: "",
  phone: ""
};

export function UserForm({ onSuccess }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "", form: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = "Valid email is required.";
    if (formData.phone.trim().length > 32) nextErrors.phone = "Phone must be <= 32 characters.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await createUser(formData);
      setFormData(initialForm);
      if (onSuccess) onSuccess(response?.message || "User created successfully.");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        ...(error?.errors || {}),
        form: error?.message || "Unable to create user right now."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Create User</h2>
      <p className="mt-1 text-sm text-slate-600">Connects to backend `POST /api/v1/users`.</p>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={formData.name}
            onChange={setField("name")}
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

        <Field label="Phone" error={errors.phone}>
          <input
            type="tel"
            value={formData.phone}
            onChange={setField("phone")}
            className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-[var(--wl-primary)]"
          />
        </Field>

        {errors.form ? <p className="text-sm text-rose-600">{errors.form}</p> : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-[var(--wl-primary)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--wl-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create User"}
        </button>
      </form>
    </article>
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
