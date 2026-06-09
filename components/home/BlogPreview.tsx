import Link from "next/link";
import { getLatestBlogPosts } from "@/lib/data";
import { BlogCard } from "@/components/shared/BlogCard";

export function BlogPreview() {
  const posts = getLatestBlogPosts(3);
  return (
    <section className="w-full px-6 lg:px-12 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Полезное</h2>
        <Link href="/blog" className="text-sm text-white hover:text-neutral-300 transition-colors">
          Все статьи →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
