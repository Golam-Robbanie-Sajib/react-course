import type { MDXComponents } from "mdx/types"

/**
 * Customize how MDX content renders. Tailwind's `prose` classes on the
 * surrounding container handle typography, so we only override here when
 * we want different defaults.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
