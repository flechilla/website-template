/**
 * Configuration Module
 *
 * Re-exports all configuration-related types, constants, and utilities.
 */

// Export configuration types
export type {
    SEOConfig,
    DefaultMetadata,
    TwitterConfig,
    TwitterCardType,
    OpenGraphConfig,
    OpenGraphType,
    OrganizationConfig,
    RobotsConfig,
    EnvironmentConfig,
    SocialProfile,
    ContactInfo,
    ImageMetadata,
} from './seo-config.type'

// Export schema.org constants
export * from './schema-org.constant'

// Export configuration utilities
export {
    getSiteUrl,
    getSiteName,
    getSiteDescription,
    getTwitterHandle,
    getFacebookAppId,
    getEnvironment,
    shouldEnableIndexing,
    getDefaultRobotsConfig,
    getLocale,
    createDefaultSEOConfig,
    mergeSEOConfig,
} from './seo.config'
