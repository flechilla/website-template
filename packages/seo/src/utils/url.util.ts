/**
 * URL Utilities
 *
 * Helpers to construct absolute, canonical, and parameterized URLs in a
 * framework-agnostic manner. These utilities rely on the package config
 * helpers to resolve the site base URL from the environment.
 */
import { getSiteUrl } from '../config'

type QueryParams = Record<string, string | number | boolean | undefined | null>

/**
 * Join path segments ensuring single slashes between them.
 */
function joinPaths(...segments: Array<string | undefined>): string {
    const filtered = segments.filter(Boolean) as string[]
    return filtered
        .map((s, i) => {
            if (i === 0) return s.replace(/\/$/, '')
            return s.replace(/^\//, '').replace(/\/$/, '')
        })
        .join('/')
}

/**
 * Build a URL string from parts.
 */
export function buildUrl(options: {
    baseUrl?: string
    path?: string
    query?: QueryParams
    locale?: string
}): string {
    const base = options.baseUrl ?? getSiteUrl()
    const localeSegment = options.locale ? `/${options.locale}` : ''
    const pathname = joinPaths(base, localeSegment, options.path)

    // Use WHATWG URL for safe query handling
    const url = new URL(pathname)
    const query = options.query ?? {}
    for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null) continue
        url.searchParams.set(key, String(value))
    }
    return url.toString()
}

/**
 * Convert a path or URL into an absolute URL using the site base URL.
 */
export function getAbsoluteUrl(pathOrUrl: string): string {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
    return buildUrl({ path: pathOrUrl })
}

/**
 * Build a canonical URL for a given path, removing tracking query params.
 */
export function getCanonicalUrl(pathOrUrl: string): string {
    const absolute = getAbsoluteUrl(pathOrUrl)
    const url = new URL(absolute)
    // Strip common tracking parameters for canonical form
    const paramsToRemove = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'gclid',
        'fbclid',
    ]
    paramsToRemove.forEach((p) => url.searchParams.delete(p))
    return url.toString()
}
