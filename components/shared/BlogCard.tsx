import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-bg-secondary border border-border hover:border-white transition-colors duration-200 cursor-pointer"
    >
      <div className="relative h-44 bg-bg-tertiary overflow-hidden">
        <Image
          src={post.image}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/15 transition-colors duration-200 group-hover:bg-black/5" />
      </div>
      <div className="p-4">
        <p className="text-xs text-text-dim mb-2">
          {new Date(post.date).toLocaleDateString("ru-RU")} · {post.readTime} мин
        </p>
        <h3 className="font-semibold text-white group-hover:text-white transition-colors text-sm leading-snug mb-2">
          {post.title}
        </h3>
        <p className="text-xs text-text-dim line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
