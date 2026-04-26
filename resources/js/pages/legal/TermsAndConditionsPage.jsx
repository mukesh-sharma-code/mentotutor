import { whitelabel } from "../../shared/config/whitelabel";

const LAST_UPDATED = "April 26, 2026";

export function TermsAndConditionsPage() {
  const brand = whitelabel.brandName;
  const brandFull = whitelabel.brandFullName;
  const email = whitelabel.supportEmail;

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 py-16 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />
        </div>
        <div className="relative mx-auto w-[min(820px,92%)] text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-slate-200">
            Legal
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 text-base text-slate-300 md:text-lg">
            Please read these terms carefully before using <strong className="text-white">{brand}</strong>'s services.
          </p>
          <p className="mt-3 text-sm text-slate-400">Last Updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-[min(820px,92%)] py-14">
        <div className="space-y-10 text-slate-700">

          {/* Preamble */}
          <div className="border-l-4 border-amber-500 py-2 pl-6 md:pl-8">
            <p className="text-lg font-light leading-relaxed text-slate-700 md:text-xl md:leading-relaxed">
              These Terms of Service (“Terms”) govern your access to and use of the tutoring services provided by{" "}
              <strong className="font-semibold text-slate-900">{brandFull}</strong> (“{brand}”, “we”, “our”, or “us”).
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              By registering, booking, or participating in tutoring sessions, you agree to be legally bound by these Terms.
              If you do not agree, you must not use our Services.
            </p>
          </div>

          <TermsSection number="1" title="Services Provided">
            <p>We provide one-on-one online tutoring sessions in various academic subjects. Sessions are conducted virtually via Google Meet or similar platforms at our discretion.</p>
            <p>Communication may occur through:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Email</li>
              <li>Phone</li>
              <li>WhatsApp</li>
            </ul>
            <p className="mt-2 text-sm font-medium italic text-slate-500">We reserve the right to modify or discontinue services at any time.</p>
          </TermsSection>

          <TermsSection number="2" title="Eligibility & Minor Users">
            <p>Our services are intended for students under parental supervision. If the student is under 18 years of age:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A parent or legal guardian must register and provide consent.</li>
              <li>The parent/guardian agrees to supervise participation.</li>
              <li>The parent/guardian accepts full responsibility for the minor’s conduct.</li>
            </ul>
            <p className="mt-2 text-sm font-medium italic text-slate-500">We reserve the right to request age verification.</p>
          </TermsSection>

          <TermsSection number="3" title="Account Responsibility">
            <p>You agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate information</li>
              <li>Keep contact details updated</li>
              <li>Maintain confidentiality of login credentials</li>
              <li>Ensure stable internet access during sessions</li>
            </ul>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 font-medium">
              We are not responsible for disruptions caused by the user’s technical issues.
            </div>
          </TermsSection>

          <TermsSection number="4" title="Bookings, Payments & Refunds">
            <p className="font-semibold text-slate-800">A. Payment Terms</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Sessions must be paid in advance unless otherwise agreed.</li>
              <li>Prices are subject to change with notice.</li>
            </ul>
            
            <p className="font-semibold text-slate-800">B. Cancellation Policy</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Cancellation 24+ hours before session → full refund or reschedule</li>
              <li>Cancellation less than 12 hours → no refund</li>
              <li>No-show → session forfeited</li>
            </ul>

            <p className="font-semibold text-slate-800">C. Late Arrival</p>
            <p>If a student joins late:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Session will end at the scheduled time.</li>
              <li>No extension is guaranteed.</li>
            </ul>
          </TermsSection>

          <TermsSection number="5" title="Code of Conduct">
            <p>Users agree NOT to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Record sessions without written consent</li>
              <li>Share session links with unauthorized individuals</li>
              <li>Use abusive, inappropriate, or disruptive behavior</li>
              <li>Distribute teaching materials publicly</li>
              <li>Misuse tutor intellectual property</li>
            </ul>
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900 font-medium">
              We reserve the right to immediately terminate sessions for misconduct. No refund will be issued for termination due to misconduct.
            </div>
          </TermsSection>

          <TermsSection number="6" title="Session Recordings">
            <p>Sessions are not recorded by default.</p>
            <p className="mt-2">If recordings are introduced in the future:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Written consent will be obtained.</li>
              <li>Usage terms will be clearly disclosed.</li>
            </ul>
            <p className="mt-2 font-medium text-slate-800">Users may not record sessions without explicit written consent from {brand}.</p>
          </TermsSection>

          <TermsSection number="7" title="Intellectual Property">
            <p>All materials provided during sessions including:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Notes</li>
              <li>Worksheets</li>
              <li>Study plans</li>
              <li>Teaching methods</li>
            </ul>
            <p>are the intellectual property of {brandFull}. You may use materials for personal educational purposes only.</p>
            <p className="mt-4 font-semibold text-slate-800">You may NOT:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reproduce</li>
              <li>Resell</li>
              <li>Distribute</li>
              <li>Publish</li>
              <li>Upload online</li>
            </ul>
            <p className="mt-2 text-sm">without written permission.</p>
          </TermsSection>

          <TermsSection number="8" title="No Guarantee of Results">
            <p>While we aim to provide high-quality tutoring:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>We do not guarantee academic improvement.</li>
              <li>We do not guarantee exam results.</li>
              <li>Outcomes depend on student effort and external factors.</li>
            </ul>
          </TermsSection>

          <TermsSection number="9" title="Limitation of Liability">
            <p>To the fullest extent permitted by law, {brandFull} shall not be liable for:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Indirect or consequential damages</li>
              <li>Loss of academic performance</li>
              <li>Internet connectivity issues</li>
              <li>Platform outages (including Google Meet disruptions)</li>
              <li>Communication issues on WhatsApp</li>
            </ul>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 font-medium">
              Total liability shall not exceed the fees paid for the most recent session or package.
            </div>
          </TermsSection>

          <TermsSection number="10" title="Data Protection">
            <p>Use of personal data is governed by our <a href="/privacy-policy" className="text-[var(--wl-primary)] font-medium hover:underline">Privacy Policy</a>.</p>
            <p>By using our Services, you consent to data processing as described in that policy.</p>
          </TermsSection>

          <TermsSection number="11" title="Termination">
            <p>We may suspend or terminate services if:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Payment is not made</li>
              <li>Terms are violated</li>
              <li>Misconduct occurs</li>
              <li>False information is provided</li>
            </ul>
            <p>You may discontinue services at any time subject to the cancellation policy.</p>
          </TermsSection>

          <TermsSection number="12" title="Force Majeure">
            <p>We are not liable for delays or failures caused by:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Natural disasters</li>
              <li>Government actions</li>
              <li>Internet outages</li>
              <li>Technical failures</li>
              <li>Events beyond our control</li>
            </ul>
          </TermsSection>

          <TermsSection number="13" title="Governing Law & Jurisdiction">
            <p>These Terms shall be governed by the laws of <strong>The United Arab Emirates</strong> (or applicable jurisdiction).</p>
            <p>Any disputes shall be resolved exclusively in the courts of that jurisdiction.</p>
          </TermsSection>

          <TermsSection number="14" title="Modifications">
            <p>We reserve the right to update these Terms at any time. Continued use of our Services after updates constitutes acceptance.</p>
          </TermsSection>

          <TermsSection number="15" title="Contact Information">
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-2">
              <p className="font-semibold text-slate-900 text-lg">{brandFull}</p>
              <p className="text-slate-700">Building A1, Dubai Digital Park, Silicon Oasis, Dubai, UAE</p>
              <p className="text-slate-700 pt-2">
                Email:{" "}
                <a href={`mailto:${email}`} className="text-[var(--wl-primary)] font-medium hover:underline">{email}</a>
              </p>
            </div>
          </TermsSection>

        </div>
      </section>
    </>
  );
}

function TermsSection({ number, title, children }) {
  return (
    <div className="scroll-mt-24" id={`section-${number}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white">
          {number}
        </span>
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">{title}</h2>
      </div>
      <div className="space-y-3 pl-11 text-slate-700 leading-7">{children}</div>
    </div>
  );
}
