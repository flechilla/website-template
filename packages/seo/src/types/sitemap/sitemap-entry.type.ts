/**
 * SitemapEntry
 */

export type SitemapEntry = {
    url: string
    lastModified?: string
    changeFrequency?:
        | 'always'
        | 'hourly'
        | 'daily'
        | 'weekly'
        | 'monthly'
        | 'yearly'
        | 'never'
    priority?: number
    alternates?: { hreflang: string; href: string }[]
}
