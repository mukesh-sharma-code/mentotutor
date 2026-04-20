import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../../features/blog/blogData";

function openBookingModal() {
  window.dispatchEvent(new Event("open-booking-modal"));
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="mx-auto w-[min(1120px,92%)] py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Post Not Found</h1>
        <p className="mt-4 text-slate-500">
          The blog post you're looking for doesn't exist.
        </p>
        <Link
          to="/blogs"
          className="mt-8 inline-block rounded-lg bg-[var(--wl-primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--wl-primary-dark)]"
        >
          ← Back to Blogs
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto w-[min(800px,92%)] py-12">
      {/* Back link */}
      <Link
        to="/blogs"
        className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[var(--wl-primary)]"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Back to Blogs
      </Link>

      {/* Category + Date */}
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
          {post.category}
        </span>
        <span className="text-sm text-slate-400">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
        {post.title}
      </h1>

      {/* Hero Image */}
      <div className="mt-8 overflow-hidden rounded-2xl">
        <img
          src={post.image}
          alt={post.title}
          className="h-auto w-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <div
        className="prose prose-slate mt-10 max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:mt-10 prose-h2:text-2xl prose-p:leading-relaxed prose-p:text-slate-600 prose-li:text-slate-600 prose-ul:my-4 prose-li:my-1 prose-strong:text-slate-800"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Bottom CTA */}
      <div
        className="mt-16 rounded-2xl p-8 text-center sm:p-12"
        style={{
          background:
            "linear-gradient(135deg, var(--wl-gradient-start), var(--wl-gradient-end))",
        }}
      >
        <h3 className="text-2xl font-bold text-white">
          Ready to transform your child's learning?
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/80">
          Book a free demo session and see how personalised tutoring can make a
          difference.
        </p>
        <button
          type="button"
          onClick={openBookingModal}
          className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-sm font-bold text-[var(--wl-primary)] shadow-lg transition hover:shadow-xl cursor-pointer"
        >
          Book a Demo
        </button>
      </div>

      {/* More posts */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-slate-900">More Articles</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {blogPosts
            .filter((p) => p.id !== post.id)
            .slice(0, 3)
            .map((p) => (
              <Link
                key={p.id}
                to={`/blogs/${p.slug}`}
                className="group block overflow-hidden rounded-xl ring-1 ring-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <span className="text-xs font-semibold text-rose-500">
                    {p.category}
                  </span>
                  <h4 className="mt-1 text-sm font-bold leading-snug text-slate-800 line-clamp-2">
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </article>
  );
}
