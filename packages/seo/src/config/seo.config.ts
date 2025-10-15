/**
 * SEO Configuration
 *
 * Main configuration file for SEO settings. This file provides utilities
 * for reading environment variables and creating SEO configuration objects.
 */
import {
    DEFAULT_LOCALE,
    OG_TYPE_WEBSITE,
    ROBOTS_FOLLOW,
    ROBOTS_INDEX,
    ROBOTS_NOFOLLOW,
    ROBOTS_NOINDEX,
    TWITTER_CARD_SUMMARY_LARGE_IMAGE,
} from './schema-org.constant'
import type { RobotsConfig, SEOConfig } from './seo-config.type'

/**
 * Get environment variable value
 *
 * @param key - Environment variable key
 * @param defaultValue - Default value if environment variable is not set
 * @returns Environment variable value or default value
 */
function getEnvVar(key: string, defaultValue: string = ''): string {
    if (typeof process !== 'undefined' && process.env) {
        return process.env[key] ?? defaultValue
    }
    return defaultValue
}

/**
 * Get site URL from environment variables
 *
 * Reads NEXT_PUBLIC_SITE_URL or falls back to a default value.
 * Removes trailing slash if present.
 *
 * @returns Site URL without trailing slash
 */
export function getSiteUrl(): string {
    const url = getEnvVar('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000')
    return url.endsWith('/') ? url.slice(0, -1) : url
}

/**
 * Get site name from environment variables
 *
 * @returns Site name
 */
export function getSiteName(): string {
    return getEnvVar('NEXT_PUBLIC_SITE_NAME', 'My Website')
}

/**
 * Get site description from environment variables
 *
 * @returns Site description
 */
export function getSiteDescription(): string {
    return getEnvVar('NEXT_PUBLIC_SITE_DESCRIPTION', 'A modern web application')
}

/**
 * Get Twitter handle from environment variables
 *
 * @returns Twitter handle (with @ prefix)
 */
export function getTwitterHandle(): string | undefined {
    const handle = getEnvVar('NEXT_PUBLIC_TWITTER_HANDLE', '')
    return handle || undefined
}

/**
 * Get Facebook App ID from environment variables
 *
 * @returns Facebook App ID
 */
export function getFacebookAppId(): string | undefined {
    const appId = getEnvVar('NEXT_PUBLIC_FACEBOOK_APP_ID', '')
    return appId || undefined
}

/**
 * Get current environment
 *
 * @returns Current environment (development, staging, production)
 */
export function getEnvironment(): 'development' | 'staging' | 'production' {
    const env = getEnvVar('NODE_ENV', 'development')
    if (env === 'production') return 'production'
    if (env === 'staging') return 'staging'
    return 'development'
}

/**
 * Check if indexing should be enabled
 *
 * Indexing is disabled in development and staging environments by default.
 * Can be overridden with NEXT_PUBLIC_ENABLE_INDEXING environment variable.
 *
 * @returns Whether indexing should be enabled
 */
export function shouldEnableIndexing(): boolean {
    const enableIndexing = getEnvVar('NEXT_PUBLIC_ENABLE_INDEXING', '')
    if (enableIndexing !== '') {
        return enableIndexing === 'true' || enableIndexing === '1'
    }

    // Default: only enable indexing in production
    const environment = getEnvironment()
    return environment === 'production'
}

/**
 * Get default robots configuration based on environment
 *
 * @returns Robots configuration
 */
export function getDefaultRobotsConfig(): RobotsConfig {
    const enableIndexing = shouldEnableIndexing()

    return {
        index: enableIndexing,
        follow: enableIndexing,
        noarchive: !enableIndexing,
        maxImagePreview: enableIndexing ? 'large' : 'none',
        maxSnippet: enableIndexing ? 160 : 0,
    }
}

/**
 * Get locale from environment variables
 *
 * @returns Locale (e.g., "en-US")
 */
export function getLocale(): string {
    return getEnvVar('NEXT_PUBLIC_LOCALE', DEFAULT_LOCALE)
}

/**
 * Create default SEO configuration from environment variables
 *
 * This function creates a default SEO configuration object by reading
 * environment variables. It can be used as a base configuration and
 * extended with site-specific settings.
 *
 * @example
 * ```typescript
 * const seoConfig = createDefaultSEOConfig();
 * ```
 *
 * @returns Default SEO configuration
 */
export function createDefaultSEOConfig(): SEOConfig {
    const siteUrl = getSiteUrl()
    const siteName = getSiteName()
    const description = getSiteDescription()
    const twitterHandle = getTwitterHandle()
    const facebookAppId = getFacebookAppId()
    const locale = getLocale()
    const environment = getEnvironment()
    const enableIndexing = shouldEnableIndexing()

    return {
        siteName,
        siteUrl,
        defaultMetadata: {
            title: siteName,
            description,
            locale,
        },
        twitter: {
            cardType: TWITTER_CARD_SUMMARY_LARGE_IMAGE,
            site: twitterHandle,
            creator: twitterHandle,
        },
        openGraph: {
            type: OG_TYPE_WEBSITE,
            siteName,
            locale,
        },
        robots: getDefaultRobotsConfig(),
        environment: {
            siteUrl,
            environment,
            enableIndexing,
        },
        facebookAppId,
        locale,
        features: {
            enableJsonLd: true,
            enableOpenGraph: true,
            enableTwitterCards: true,
            enableSitemap: enableIndexing,
            enableRobotsTxt: true,
        },
    }
}

/**
 * Merge SEO configurations
 *
 * Deep merges two SEO configuration objects, with the override object
 * taking precedence over the base object.
 *
 * @param base - Base SEO configuration
 * @param override - Override SEO configuration
 * @returns Merged SEO configuration
 */
export function mergeSEOConfig(
    base: SEOConfig,
    override: Partial<SEOConfig>
): SEOConfig {
    return {
        ...base,
        ...override,
        defaultMetadata: {
            ...base.defaultMetadata,
            ...override.defaultMetadata,
        },
        twitter: override.twitter
            ? {
                  ...base.twitter,
                  ...override.twitter,
              }
            : base.twitter,
        openGraph: override.openGraph
            ? {
                  ...base.openGraph,
                  ...override.openGraph,
              }
            : base.openGraph,
        organization: override.organization
            ? {
                  ...base.organization,
                  ...override.organization,
              }
            : base.organization,
        robots: override.robots
            ? {
                  ...base.robots,
                  ...override.robots,
              }
            : base.robots,
        environment: override.environment
            ? {
                  ...base.environment,
                  ...override.environment,
              }
            : base.environment,
        features: override.features
            ? {
                  ...base.features,
                  ...override.features,
              }
            : base.features,
    }
}
