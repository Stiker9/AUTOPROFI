import Link from "next/link";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-bg-secondary border border-border hover:border-accent transition-colors duration-200"
    >
      <div className="h-40 bg-bg-tertiary flex items-center justify-center text-text-dim text-sm">
        фото
      </div>
      <div className="p-4">
        <p className="text-xs text-text-dim mb-2">
          {new Date(post.date).toLocaleDateString("ru-RU")} · {post.readTime} мин
        </p>
        <h3 className="font-semibold text-white group-hover:text-accent transition-colors text-sm leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-xs text-text-dim line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
