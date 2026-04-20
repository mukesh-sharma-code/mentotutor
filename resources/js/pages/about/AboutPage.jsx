import { Link } from "react-router-dom";

export function AboutPage() {
  const openBookingModal = () => {
    window.dispatchEvent(new Event("open-booking-modal"));
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#FDF2ED] py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto w-[min(1120px,92%)] grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text Content - Left Side */}
          <div>
            <h1 className="w-full max-w-none text-2xl font-extrabold leading-[1.15] text-slate-900 sm:text-3xl lg:text-4xl">
              We understand every child learns in their own way, we're here to deliver truly personalized learning experiences that deliver results.
            </h1>
            <div className="mt-10">
              <button
                onClick={openBookingModal}
                className="inline-block rounded-full bg-[var(--wl-primary)] px-8 py-4 text-base font-bold text-white shadow-lg transition hover:scale-105 hover:bg-[var(--wl-primary-dark)]"
              >
                Find the perfect tutor
              </button>
            </div>
          </div>
          
          {/* Image Content - Right Side */}
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img
              src="/images/about/hero.png"
              alt="Diverse group of students and tutor"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto w-[min(1120px,92%)] grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/images/about/mission.png" 
              alt="Student smiling feeling understood" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl text-balance">
              Back in 2026, we noticed something broken in education.
            </h2>
            <div className="mt-6 space-y-6 text-lg text-slate-600">
              <p>
                In standard classrooms, one teacher is expected to teach 30 students all at the same pace. But every single student has a unique learning style, varying attention spans, and different strengths and weaknesses.
              </p>
              <p>
                We realized that the best learning happens one-on-one, where a mentor can adapt dynamically to the student. We started Mento Tutor with a simple goal: connect every student with a dedicated tutor who truly understands how to unlock their potential.
              </p>
              <p>
                Today, our community of handpicked educators spans the globe, empowering thousands of students to learn with confidence and joy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto w-[min(1120px,92%)] grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Our Core Values
            </h2>
            <div className="mt-8 space-y-8">
              <div className="flex bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200/50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  💡
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-slate-900">Empowerment</h3>
                  <p className="mt-2 text-slate-600">We aim to give students the confidence they need to tackle complex problems independently.</p>
                </div>
              </div>
              <div className="flex bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200/50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl">
                  🤝
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-slate-900">Empathy</h3>
                  <p className="mt-2 text-slate-600">We meet students where they are, understanding their unique struggles without judgment.</p>
                </div>
              </div>
              <div className="flex bg-white p-6 rounded-2xl shadow-sm ring-1 ring-slate-200/50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                  🚀
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-slate-900">Excellence</h3>
                  <p className="mt-2 text-slate-600">We strive for academic excellence by hiring only the top percentile of qualified tutors.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/images/about/values.png" 
              alt="Tutor and student high-fiving" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="mx-auto w-[min(800px,92%)]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">The story of Mento Tutor</h2>
          </div>
          
          <div className="relative border-l-4 border-slate-200 ml-6 md:ml-0 md:border-l-0">
            {/* MD vertical center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2"></div>
            
            <div className="space-y-12">
              <TimelineItem 
                year="2020" 
                title="The Idea is Born" 
                desc="A small group of passionate educators set out to solve the fundamental issues with mass schooling by providing 1-on-1 mentorship."
                align="left"
              />
              <TimelineItem 
                year="2022" 
                title="Reaching 10,000 Students" 
                desc="Mento Tutor grew rapidly, matching over 10,000 students globally with world-class tutors and launching our proprietary modern classroom."
                align="right"
              />
              <TimelineItem 
                year="2024" 
                title="Global Expansion" 
                desc="We expanded our tutoring network across the USA, UK, Canada, and Australia, hiring dedicated experts for local curricula."
                align="left"
              />
              <TimelineItem 
                year="2026" 
                title="The Future of Learning" 
                desc="Continuously innovating with AI tools and better matching algorithms to provide the ultimate personalized experience."
                align="right"
              />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

function TimelineItem({ year, title, desc, align }) {
  const isLeft = align === "left";
  return (
    <div className={`relative flex flex-col md:flex-row items-start md:items-center ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      {/* Mobile dot */}
      <div className="absolute -left-[30px] md:hidden top-2 h-5 w-5 rounded-full bg-[var(--wl-primary)] ring-4 ring-white"></div>
      
      {/* Content Side */}
      <div className={`pl-6 md:pl-0 w-full md:w-1/2 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
        <div className="bg-white p-6 rounded-2xl shadow-md ring-1 ring-slate-200/50 hover:shadow-lg transition">
          <span className="text-sm font-bold text-[var(--wl-primary)] tracking-wider">{year}</span>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{title}</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">{desc}</p>
        </div>
      </div>
      
      {/* Desktop Dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-10 w-10 items-center justify-center rounded-full bg-white ring-4 ring-slate-100 shadow-sm z-10 text-[var(--wl-primary)]">
        <div className="h-4 w-4 rounded-full bg-[var(--wl-primary)]"></div>
      </div>
    </div>
  );
}
