import type { ComponentType, ReactNode } from "react";

/**
 * Inlined MDXComponents type. We avoid importing from "mdx/types" because:
 *   1. We don't actually use this file at runtime — blog MDX renders via
 *      `next-mdx-remote/rsc` which takes components as props directly.
 *   2. The "mdx/types" subpath import doesn't resolve under
 *      `moduleResolution: "bundler"` on Vercel's CI typecheck (the
 *      @types/mdx package doesn't declare an `exports` field).
 *
 * Keeping the file present so a future contributor can add file-based
 * `.mdx` routes under app/ without having to wire it up from scratch.
 */
type MDXComponents = Record<
  string,
  ComponentType<{ children?: ReactNode; [key: string]: unknown }> | undefined
>;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components;
}
