/**
 * Site-specific SEO Configuration
 *
 * This file contains the SEO configuration for the website.
 * It uses the default configuration from @workspace/seo and can be
 * customized with site-specific settings.
 */
import { createDefaultSEOConfig, mergeSEOConfig } from '@workspace/seo/config'
import type { SEOConfig } from '@workspace/seo/config'

/**
 * Get the site's SEO configuration
 *
 * This function creates the SEO configuration by merging the default
 * configuration from environment variables with site-specific overrides.
 *
 * @returns SEO configuration for the site
 */
export function getSEOConfig(): SEOConfig {
    const defaultConfig = createDefaultSEOConfig()

    // Site-specific customizations can be added here
    const siteConfig: Partial<SEOConfig> = {
        organization: {
            name: defaultConfig.siteName,
            url: defaultConfig.siteUrl,
            logo: `${defaultConfig.siteUrl}/logo.png`,
        },
    }

    return mergeSEOConfig(defaultConfig, siteConfig)
}

/**
 * Export the SEO configuration
 */
export const seoConfig = getSEOConfig()
