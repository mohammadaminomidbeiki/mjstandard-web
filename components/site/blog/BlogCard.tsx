import Image from "next/image"
import Link from "next/link"

import type { BlogPost } from "@/data/blog"

import styles from "@/components/site/site-home.module.css"

type BlogCardProps = {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className={styles.blogCard}>
      <Link className={styles.blogCardLink} href={`/blog/${post.slug}`}>
        <div className={styles.blogCardImageWrap}>
          <Image
            alt={post.coverImageAlt}
            className={styles.blogCardImage}
            fill
            sizes="(max-width: 720px) 100vw, (max-width: 1080px) 50vw, 33vw"
            src={post.coverImage}
          />
        </div>

        <div className={styles.blogCardBody}>
          <div className={styles.blogCardMeta}>
            <span className={styles.cardCategory}>{post.category}</span>
            <span>{post.publishedAtDisplay}</span>
            <span>{post.readingTime}</span>
          </div>
          <h2 className={styles.blogCardTitle}>{post.title}</h2>
          <p className={styles.cardExcerpt}>{post.excerpt}</p>
          <div className={styles.cardTags}>
            {post.tags.slice(0, 2).map((tag) => (
              <span className={styles.cardTag} key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.cardReadingTime}>{post.readingTime}</span>
            <span className={styles.cardAction}>مطالعه مقاله</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
