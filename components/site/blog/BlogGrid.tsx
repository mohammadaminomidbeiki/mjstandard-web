import type { BlogPost } from "@/data/blog"

import BlogCard from "./BlogCard"
import styles from "@/components/site/site-home.module.css"

type BlogGridProps = {
  posts: BlogPost[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return <div className={styles.emptyState}>هنوز مقاله منتشرشده‌ای برای نمایش وجود ندارد.</div>
  }

  return (
    <div className={styles.blogGrid}>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
