/**
 * SEO Configuration Type
 *
 * Defines the structure for site-wide SEO configuration including
 * metadata, social media settings, and environment-based overrides.
 */

/**
 * Twitter card types supported by the platform
 */
export type TwitterCardType =
    | 'summary'
    | 'summary_large_image'
    | 'app'
    | 'player'

/**
 * Open Graph types for different content types
 */
export type OpenGraphType =
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other'

/**
 * Social media profile configuration
 */
export type SocialProfile = {
    platform: string
    url: string
}

/**
 * Organization contact information
 */
export type ContactInfo = {
    email?: string
    phone?: string
    contactType?: string
    areaServed?: string
    availableLanguage?: string[]
}

/**
 * Image metadata for social sharing
 */
export type ImageMetadata = {
    url: string
    alt: string
    width?: number
    height?: number
    type?: string
}

/**
 * Default metadata configuration
 */
export type DefaultMetadata = {
    title: string
    description: string
    keywords?: string[]
    author?: string
    image?: ImageMetadata
    locale?: string
    alternateLocales?: string[]
}

/**
 * Twitter Card configuration
 */
export type TwitterConfig = {
    cardType: TwitterCardType
    site?: string
    creator?: string
    handle?: string
}

/**
 * Open Graph configuration
 */
export type OpenGraphConfig = {
    type: OpenGraphType
    siteName: string
    locale?: string
    images?: ImageMetadata[]
}

/**
 * Organization information for structured data
 */
export type OrganizationConfig = {
    name: string
    legalName?: string
    url: string
    logo?: string
    foundingDate?: string
    founders?: string[]
    address?: {
        streetAddress?: string
        addressLocality?: string
        addressRegion?: string
        postalCode?: string
        addressCountry?: string
    }
    contactInfo?: ContactInfo
    socialProfiles?: SocialProfile[]
}

/**
 * Robots meta tag configuration
 */
export type RobotsConfig = {
    index: boolean
    follow: boolean
    noarchive?: boolean
    nosnippet?: boolean
    noimageindex?: boolean
    notranslate?: boolean
    maxSnippet?: number
    maxImagePreview?: 'none' | 'standard' | 'large'
    maxVideoPreview?: number
}

/**
 * Environment-specific configuration
 */
export type EnvironmentConfig = {
    siteUrl: string
    environment: 'development' | 'staging' | 'production'
    enableIndexing: boolean
}

/**
 * Complete SEO configuration type
 *
 * This type defines all configuration options for the SEO package.
 * It should be used to create site-specific SEO configurations.
 *
 * @example
 * ```typescript
 * const seoConfig: SEOConfig = {
 *   siteName: "My Website",
 *   siteUrl: "https://example.com",
 *   defaultMetadata: {
 *     title: "My Website - Home",
 *     description: "Welcome to my website"
 *   },
 *   organization: {
 *     name: "My Company",
 *     url: "https://example.com"
 *   }
 * };
 * ```
 */
export type SEOConfig = {
    /**
     * The name of the website/brand
     */
    siteName: string

    /**
     * The base URL of the website (without trailing slash)
     */
    siteUrl: string

    /**
     * Default metadata for pages that don't specify their own
     */
    defaultMetadata: DefaultMetadata

    /**
     * Twitter/X card configuration
     */
    twitter?: TwitterConfig

    /**
     * Open Graph configuration for social sharing
     */
    openGraph?: OpenGraphConfig

    /**
     * Organization information for structured data
     */
    organization?: OrganizationConfig

    /**
     * Default robots meta tag configuration
     */
    robots?: RobotsConfig

    /**
     * Environment-specific configuration
     */
    environment?: EnvironmentConfig

    /**
     * Facebook App ID for social integration
     */
    facebookAppId?: string

    /**
     * Default language/locale (e.g., "en-US")
     */
    locale?: string

    /**
     * Alternate locales for multi-language sites
     */
    alternateLocales?: string[]

    /**
     * Enable/disable features
     */
    features?: {
        enableJsonLd?: boolean
        enableOpenGraph?: boolean
        enableTwitterCards?: boolean
        enableSitemap?: boolean
        enableRobotsTxt?: boolean
    }
}
