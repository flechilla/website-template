import { WebPageSchema } from '@workspace/seo/react'
import { Button } from '@workspace/ui/components/button'

import { seoConfig } from '@/lib/seo-config'
import { toNextMetadata } from '@/lib/seo/metadata'

/**
 * Homepage Metadata
 *
 * Implements SEO best practices for the homepage including:
 * - Unique, descriptive title (< 60 characters)
 * - Compelling meta description (< 160 characters)
 * - Open Graph tags for social sharing
 * - Twitter Card configuration
 * - Canonical URL
 */
export const metadata = toNextMetadata(seoConfig, {
    // Canonical URL for homepage
    canonical: '/',

    // Page-specific metadata
    title: seoConfig.defaultMetadata.title,
    description: seoConfig.defaultMetadata.description,

    // Open Graph tags for social sharing
    openGraph: {
        title: seoConfig.defaultMetadata.title,
        description: seoConfig.defaultMetadata.description,
        url: seoConfig.siteUrl,
        type: 'website',
        siteName: seoConfig.siteName,
        images: seoConfig.defaultMetadata.image
            ? [
                  {
                      url: seoConfig.defaultMetadata.image.url,
                      width: seoConfig.defaultMetadata.image.width ?? 1200,
                      height: seoConfig.defaultMetadata.image.height ?? 630,
                      alt: seoConfig.defaultMetadata.image.alt,
                  },
              ]
            : undefined,
    },

    // Twitter Card tags
    twitter: {
        card: seoConfig.twitter?.cardType ?? 'summary_large_image',
        title: seoConfig.defaultMetadata.title,
        description: seoConfig.defaultMetadata.description,
        site: seoConfig.twitter?.site,
        creator: seoConfig.twitter?.creator ?? seoConfig.twitter?.handle,
        images: seoConfig.defaultMetadata.image
            ? [seoConfig.defaultMetadata.image.url]
            : undefined,
    },

    // Keywords (if available)
    keywords: seoConfig.defaultMetadata.keywords,

    // Additional metadata
    authors: seoConfig.defaultMetadata.author
        ? [{ name: seoConfig.defaultMetadata.author }]
        : undefined,
})

export default function Page() {
    return (
        <div className='flex min-h-svh items-center justify-center'>
            {/* JSON-LD minimal usage for homepage */}
            <WebPageSchema
                name={seoConfig.defaultMetadata.title}
                url={seoConfig.siteUrl}
                description={seoConfig.defaultMetadata.description}
            />
            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className='text-2xl font-bold'>Hello World</h1>
                <Button size='sm'>Button</Button>
            </div>
        </div>
    )
}
