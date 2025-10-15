/**
 * SitemapRoute
 */
import type { SitemapEntry } from './sitemap-entry.type'

export type SitemapRoute = {
    path: string
    getEntries: () => Promise<SitemapEntry[]> | SitemapEntry[]
}
