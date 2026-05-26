import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  author: string;
  readingMinutes: number;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => readPost(file.replace(/\.mdx$/, "")));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function readPost(slug: string): BlogPost {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "1970-01-01",
    excerpt: data.excerpt ?? "",
    coverImage: data.coverImage,
    tags: data.tags ?? [],
    author: data.author ?? "Rain Tamer",
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    content,
  };
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    post.tags.forEach((t) => tags.add(t));
  }
  return Array.from(tags).sort();
}
