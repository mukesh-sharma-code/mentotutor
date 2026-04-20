import { Link } from "react-router-dom";
import { blogPosts } from "../../features/blog/blogData";

export function BlogListPage() {
  return (
    <section className="mx-auto w-[min(1120px,92%)] py-12">
      {/* Hero heading */}
      <div className="mb-12 text-center">
        <span
          className="mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{
            background:
              "linear-gradient(135deg, var(--wl-gradient-start), var(--wl-gradient-end))",
            color: "#fff",
          }}
        >
          Our Blog
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Insights &amp; Resources
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
          Expert advice on tutoring, study strategies, and helping your child
          thrive academically.
        </p>
      </div>

      {/* Blog grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

/* ─── Individual Blog Card ─── */
function BlogCard({ post }) {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-slate-300/80"
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category pill */}
        <span className="inline-block rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
          {post.category}
        </span>

        {/* Title */}
        <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-[var(--wl-primary)]">
          {post.title}
        </h2>

        {/* Date */}
        <p className="mt-2 text-sm text-slate-400">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
