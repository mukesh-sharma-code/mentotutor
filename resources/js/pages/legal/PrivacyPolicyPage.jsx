import { whitelabel } from "../../shared/config/whitelabel";

const LAST_UPDATED = "April 26, 2026";

export function PrivacyPolicyPage() {
  const brand = whitelabel.brandName;
  const brandFull = whitelabel.brandFullName;
  const email = whitelabel.supportEmail;

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 py-16 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="relative mx-auto w-[min(820px,92%)] text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-slate-200">
            Legal
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-slate-300 md:text-lg">
            Your privacy matters to us. This policy explains how{" "}
            <strong className="text-white">{brand}</strong> collects, uses, and protects your information.
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
              <strong className="font-semibold text-slate-900">{brandFull}</strong> (“{brand}”, “we”, “our”, or “us”) is committed to protecting the privacy and personal information of students, parents, and users who access our tutoring services (“Services”).
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              This Privacy Policy explains how we collect, use, store, disclose, and safeguard your information when you use our website, book tutoring sessions, or communicate with us.
            </p>
            <p className="mt-5 text-sm font-bold tracking-widest text-amber-600 uppercase">
              By using our Services, you agree to this Privacy Policy.
            </p>
          </div>

          <PolicySection number="1" title="About Our Services">
            <p>We provide personalized, one-on-one live tutoring sessions across various academic subjects for school students and learners preparing for examinations.</p>
            <p>Our Services are delivered primarily through live virtual sessions conducted via Google Meet.</p>
            <p>We may communicate with parents and students through email, phone, or messaging platforms such as WhatsApp.</p>
            <p className="font-medium text-slate-800">Our mission is to provide structured, focused, and individualized academic support in a safe and professional environment.</p>
          </PolicySection>

          <PolicySection number="2" title="Information We Collect">
            <p>We collect information directly from you and automatically through your interaction with us.</p>
            
            <p className="font-semibold text-slate-800 mt-4">A. Information You Provide</p>
            <p>When registering, booking sessions, or contacting us, we may collect:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Student’s full name</li>
              <li>Parent/guardian full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Country and time zone</li>
              <li>Grade/class level</li>
              <li>Subject preferences</li>
              <li>Academic concerns</li>
              <li>Payment confirmation details (if applicable)</li>
            </ul>

            <p className="font-semibold text-slate-800">B. Session-Related Information</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Attendance records</li>
              <li>Session schedules</li>
              <li>Tutor notes</li>
              <li>Homework or worksheets shared</li>
              <li>Academic progress feedback</li>
            </ul>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 font-medium mb-4">
              We do not record live sessions unless prior written consent is obtained from the parent or guardian.
            </div>

            <p className="font-semibold text-slate-800">C. Communication Information</p>
            <p>We may retain:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Email communications</li>
              <li>WhatsApp messages</li>
              <li>Inquiry form submissions</li>
            </ul>

            <p className="font-semibold text-slate-800">D. Technical Information</p>
            <p>If you visit our website, we may automatically collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device type</li>
              <li>General geographic location</li>
              <li>Website usage behavior</li>
            </ul>
          </PolicySection>

          <PolicySection number="3" title="How We Use Your Information">
            <p>We use collected information to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Provide tutoring services</li>
              <li>Schedule and manage sessions</li>
              <li>Communicate session updates</li>
              <li>Improve teaching quality</li>
              <li>Respond to inquiries</li>
              <li>Maintain internal records</li>
              <li>Ensure safety and compliance</li>
              <li>Send service-related announcements</li>
            </ul>
            <p className="font-semibold text-[var(--wl-primary)]">We do not sell or rent personal data.</p>
          </PolicySection>

          <PolicySection number="4" title="Legal Basis for Processing (For UK Users)">
            <p>If you are located in the United Kingdom, we process personal data based on:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contractual necessity (to provide tutoring services)</li>
              <li>Legitimate interests (service improvement and communication)</li>
              <li>Parental consent (for minors)</li>
            </ul>
          </PolicySection>

          <PolicySection number="5" title="Children and Minors">
            <p>Our Services are intended for students under parental supervision. If the student is under 18 years of age:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>A parent or legal guardian must register on behalf of the student.</li>
              <li>The parent/guardian consents to the collection and use of the student’s information.</li>
            </ul>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 font-medium">
              We do not knowingly collect information from children without parental consent.
            </div>
          </PolicySection>

          <PolicySection number="6" title="International Users">
            <p>We may provide services to users in:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>United States</li>
              <li>United Kingdom</li>
              <li>Canada</li>
              <li>United Arab Emirates</li>
              <li>Australia</li>
            </ul>
            <p>By using our Services, you understand that your information may be processed in the country where our business operates.</p>
          </PolicySection>

          <PolicySection number="7" title="Data Sharing and Disclosure">
            <p className="font-semibold text-[var(--wl-primary)] mb-2">We do not sell personal information.</p>
            <p>We may share information only:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>With tutors assigned to your child</li>
              <li>When required by law</li>
              <li>To protect legal rights</li>
              <li>To prevent fraud or misuse</li>
            </ul>
            <p>We may use third-party platforms strictly for delivering services, including:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Google Meet</li>
              <li>WhatsApp</li>
            </ul>
            <p className="text-sm text-slate-500">These services operate under their own privacy policies.</p>
          </PolicySection>

          <PolicySection number="8" title="Data Security">
            <p>We implement reasonable administrative and technical safeguards to protect personal information.</p>
            <p className="mt-2">However:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>No system is completely secure.</li>
              <li>Internet transmission cannot be guaranteed 100% secure.</li>
            </ul>
            <p className="font-medium text-slate-800">Users are responsible for safeguarding their login credentials and personal devices.</p>
          </PolicySection>

          <PolicySection number="9" title="Data Retention">
            <p>We retain information:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>For as long as the student is enrolled</li>
              <li>As necessary for academic records</li>
              <li>As required for legal or accounting purposes</li>
            </ul>
            <p>After this period, data may be deleted or anonymized.</p>
          </PolicySection>

          <PolicySection number="10" title="Your Rights">
            <p>Depending on your country of residence, you may have the right to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion</li>
              <li>Withdraw consent</li>
              <li>Object to processing</li>
            </ul>
            <p>To exercise rights, contact: <a href={`mailto:${email}`} className="text-[var(--wl-primary)] font-medium hover:underline">{email}</a></p>
          </PolicySection>

          <PolicySection number="11" title="Cookies (If You Have a Website)">
            <p>Our website may use basic cookies to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Improve performance</li>
              <li>Analyze traffic</li>
              <li>Enhance user experience</li>
            </ul>
            <p>You may disable cookies in your browser settings.</p>
          </PolicySection>

          <PolicySection number="12" title="Third-Party Links">
            <p>Our website may contain links to third-party platforms. We are not responsible for their privacy practices.</p>
          </PolicySection>

          <PolicySection number="13" title="Changes to This Privacy Policy">
            <p>We may update this Privacy Policy periodically. Updates will be posted on our website with a revised “Last Updated” date.</p>
            <p className="mt-2 font-medium">Continued use of our Services constitutes acceptance of changes.</p>
          </PolicySection>

          <PolicySection number="14" title="Contact Information">
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-2">
              <p className="font-semibold text-slate-900 text-lg">{brandFull}</p>
              <p className="text-slate-700">The United Arab Emirates</p>
              <p className="text-slate-700 pt-2">
                Email:{" "}
                <a href={`mailto:${email}`} className="text-[var(--wl-primary)] font-medium hover:underline">{email}</a>
              </p>
            </div>
          </PolicySection>

        </div>
      </section>
    </>
  );
}

function PolicySection({ number, title, children }) {
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
