/**
 * Sanitization Utilities
 *
 * Provides helpers to safely serialize objects for JSON-LD and to escape
 * potentially dangerous characters to reduce XSS risk when embedding
 * structured data.
 */

/**
 * Escape characters in a JSON string that could break out of a script tag.
 * We replace <, >, &, and U+2028/U+2029 line separators.
 */
export function escapeJsonForHtml(json: string): string {
    return json
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029')
}

/**
 * Safely stringify and sanitize an object for embedding in JSON-LD.
 */
export function sanitizeForJsonLd<T>(value: T): string {
    const json = JSON.stringify(value)
    return escapeJsonForHtml(json)
}
