/**
 * Sitemap Route Handler
 *
 * Generates dynamic sitemap.xml for the website including static and dynamic routes.
 * This file exports a function that returns MetadataRoute.Sitemap for Next.js.
 */
import {
    type SitemapConfig,
    convertToNextjsSitemap,
    createStaticRoutes,
    generateSitemapEntries,
} from '@workspace/seo'
import type { SitemapRoute } from '@workspace/seo'
import type { MetadataRoute } from 'next'

/**
 * Get the base URL for the site
 */
function getBaseUrl(): string {
    // Priority order: NEXT_PUBLIC_BASE_URL -> VERCEL_URL -> localhost
    if (process.env.NEXT_PUBLIC_BASE_URL) {
        return process.env.NEXT_PUBLIC_BASE_URL
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`
    }

    return 'http://localhost:3000'
}

/**
 * Create dynamic route configurations
 * TODO: Expand this as more dynamic routes are added (blog posts, products, etc.)
 */
async function createDynamicRoutes(): Promise<SitemapRoute[]> {
    const dynamicRoutes: SitemapRoute[] = []

    // Example: Blog posts route (uncomment when blog is implemented)
    // dynamicRoutes.push({
    //   path: '/blog',
    //   getEntries: async () => {
    //     const posts = await getBlogPosts() // Implement this function
    //     return posts.map(post => ({
    //       url: `/blog/${post.slug}`,
    //       lastModified: post.updatedAt,
    //       changeFrequency: 'weekly' as const,
    //       priority: 0.7
    //     }))
    //   }
    // })

    // Example: Product pages route (uncomment when products are implemented)
    // dynamicRoutes.push({
    //   path: '/products',
    //   getEntries: async () => {
    //     const products = await getProducts() // Implement this function
    //     return products.map(product => ({
    //       url: `/products/${product.slug}`,
    //       lastModified: product.updatedAt,
    //       changeFrequency: 'daily' as const,
    //       priority: 0.8
    //     }))
    //   }
    // })

    return dynamicRoutes
}

/**
 * Create static route configurations
 */
function createAppStaticRoutes(config: SitemapConfig): SitemapRoute[] {
    return [
        {
            path: '/',
            getEntries: () => [
                {
                    url: '/',
                    changeFrequency: 'daily',
                    priority: 1.0,
                    lastModified: new Date().toISOString(),
                },
            ],
        },
        {
            path: '/about',
            getEntries: () => [
                {
                    url: '/about',
                    changeFrequency: 'monthly',
                    priority: 0.8,
                    lastModified: new Date().toISOString(),
                },
            ],
        },
        // Add more static routes as they are created
        // {
        //   path: '/contact',
        //   getEntries: () => [{
        //     url: '/contact',
        //     changeFrequency: 'monthly',
        //     priority: 0.6,
        //     lastModified: new Date().toISOString()
        //   }]
        // },
        // {
        //   path: '/privacy',
        //   getEntries: () => [{
        //     url: '/privacy',
        //     changeFrequency: 'yearly',
        //     priority: 0.3,
        //     lastModified: new Date().toISOString()
        //   }]
        // },
        // {
        //   path: '/terms',
        //   getEntries: () => [{
        //     url: '/terms',
        //     changeFrequency: 'yearly',
        //     priority: 0.3,
        //     lastModified: new Date().toISOString()
        //   }]
        // }
    ]
}

/**
 * Main sitemap generation function
 * This is called by Next.js to generate the sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getBaseUrl()

    const config: SitemapConfig = {
        baseUrl,
        defaultChangeFrequency: 'weekly',
        defaultPriority: 0.5,
        maxUrlsPerSitemap: 50000,
    }

    try {
        // Combine static and dynamic routes
        const staticRoutes = createAppStaticRoutes(config)
        const dynamicRoutes = await createDynamicRoutes()
        const allRoutes = [...staticRoutes, ...dynamicRoutes]

        // Generate sitemap entries
        const entries = await generateSitemapEntries(allRoutes, config)

        // Convert to Next.js format and return
        return convertToNextjsSitemap(entries)
    } catch (error) {
        console.error('Error generating sitemap:', error)

        // Fallback to basic static routes only
        const fallbackRoutes = createAppStaticRoutes(config)
        const fallbackEntries = await generateSitemapEntries(
            fallbackRoutes,
            config
        )
        return convertToNextjsSitemap(fallbackEntries)
    }
}

// Export the sitemap function as the default export
// This is required by Next.js for sitemap.ts files
