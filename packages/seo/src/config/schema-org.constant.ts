/**
 * Schema.org Constants
 *
 * This file contains constant values for schema.org types, contexts,
 * and other schema-related URLs and identifiers.
 *
 * All constants follow SCREAMING_SNAKE_CASE naming convention.
 */

/**
 * Schema.org context URL
 * Used as the @context value in JSON-LD objects
 */
export const SCHEMA_ORG_CONTEXT = 'https://schema.org'

/**
 * Schema.org type URLs
 */
export const SCHEMA_TYPE_ORGANIZATION = 'Organization'
export const SCHEMA_TYPE_WEBSITE = 'WebSite'
export const SCHEMA_TYPE_WEBPAGE = 'WebPage'
export const SCHEMA_TYPE_ARTICLE = 'Article'
export const SCHEMA_TYPE_BLOG_POSTING = 'BlogPosting'
export const SCHEMA_TYPE_NEWS_ARTICLE = 'NewsArticle'
export const SCHEMA_TYPE_BREADCRUMB_LIST = 'BreadcrumbList'
export const SCHEMA_TYPE_LIST_ITEM = 'ListItem'
export const SCHEMA_TYPE_FAQ_PAGE = 'FAQPage'
export const SCHEMA_TYPE_QUESTION = 'Question'
export const SCHEMA_TYPE_ANSWER = 'Answer'
export const SCHEMA_TYPE_PRODUCT = 'Product'
export const SCHEMA_TYPE_OFFER = 'Offer'
export const SCHEMA_TYPE_AGGREGATE_RATING = 'AggregateRating'
export const SCHEMA_TYPE_REVIEW = 'Review'
export const SCHEMA_TYPE_RATING = 'Rating'
export const SCHEMA_TYPE_LOCAL_BUSINESS = 'LocalBusiness'
export const SCHEMA_TYPE_POSTAL_ADDRESS = 'PostalAddress'
export const SCHEMA_TYPE_GEO_COORDINATES = 'GeoCoordinates'
export const SCHEMA_TYPE_CONTACT_POINT = 'ContactPoint'
export const SCHEMA_TYPE_PERSON = 'Person'
export const SCHEMA_TYPE_IMAGE_OBJECT = 'ImageObject'
export const SCHEMA_TYPE_VIDEO_OBJECT = 'VideoObject'
export const SCHEMA_TYPE_SEARCH_ACTION = 'SearchAction'

/**
 * Common schema.org property URLs
 */
export const SCHEMA_PROP_POTENTIAL_ACTION = 'potentialAction'
export const SCHEMA_PROP_SEARCH_ACTION = 'SearchAction'
export const SCHEMA_PROP_TARGET = 'target'
export const SCHEMA_PROP_QUERY_INPUT = 'query-input'

/**
 * Item availability values for Product schema
 */
export const ITEM_AVAILABILITY_IN_STOCK = 'https://schema.org/InStock'
export const ITEM_AVAILABILITY_OUT_OF_STOCK = 'https://schema.org/OutOfStock'
export const ITEM_AVAILABILITY_PREORDER = 'https://schema.org/PreOrder'
export const ITEM_AVAILABILITY_BACKORDER = 'https://schema.org/BackOrder'
export const ITEM_AVAILABILITY_DISCONTINUED = 'https://schema.org/Discontinued'
export const ITEM_AVAILABILITY_IN_STORE_ONLY = 'https://schema.org/InStoreOnly'
export const ITEM_AVAILABILITY_LIMITED_AVAILABILITY =
    'https://schema.org/LimitedAvailability'
export const ITEM_AVAILABILITY_ONLINE_ONLY = 'https://schema.org/OnlineOnly'
export const ITEM_AVAILABILITY_SOLD_OUT = 'https://schema.org/SoldOut'

/**
 * Item condition values for Product schema
 */
export const ITEM_CONDITION_NEW = 'https://schema.org/NewCondition'
export const ITEM_CONDITION_USED = 'https://schema.org/UsedCondition'
export const ITEM_CONDITION_REFURBISHED =
    'https://schema.org/RefurbishedCondition'
export const ITEM_CONDITION_DAMAGED = 'https://schema.org/DamagedCondition'

/**
 * Offer item condition values
 */
export const OFFER_ITEM_CONDITION_NEW = 'https://schema.org/NewCondition'
export const OFFER_ITEM_CONDITION_USED = 'https://schema.org/UsedCondition'
export const OFFER_ITEM_CONDITION_REFURBISHED =
    'https://schema.org/RefurbishedCondition'

/**
 * Business type values for LocalBusiness schema
 */
export const BUSINESS_TYPE_RESTAURANT = 'Restaurant'
export const BUSINESS_TYPE_STORE = 'Store'
export const BUSINESS_TYPE_HOTEL = 'Hotel'
export const BUSINESS_TYPE_MEDICAL_ORGANIZATION = 'MedicalOrganization'
export const BUSINESS_TYPE_EDUCATIONAL_ORGANIZATION = 'EducationalOrganization'
export const BUSINESS_TYPE_AUTOMOTIVE_BUSINESS = 'AutomotiveBusiness'
export const BUSINESS_TYPE_ENTERTAINMENT_BUSINESS = 'EntertainmentBusiness'
export const BUSINESS_TYPE_FINANCIAL_SERVICE = 'FinancialService'
export const BUSINESS_TYPE_FOOD_ESTABLISHMENT = 'FoodEstablishment'
export const BUSINESS_TYPE_GOVERNMENT_OFFICE = 'GovernmentOffice'
export const BUSINESS_TYPE_HEALTH_AND_BEAUTY_BUSINESS =
    'HealthAndBeautyBusiness'
export const BUSINESS_TYPE_HOME_AND_CONSTRUCTION_BUSINESS =
    'HomeAndConstructionBusiness'
export const BUSINESS_TYPE_LEGAL_SERVICE = 'LegalService'
export const BUSINESS_TYPE_LIBRARY = 'Library'
export const BUSINESS_TYPE_LODGING_BUSINESS = 'LodgingBusiness'
export const BUSINESS_TYPE_PROFESSIONAL_SERVICE = 'ProfessionalService'
export const BUSINESS_TYPE_SPORTS_ACTIVITY_LOCATION = 'SportsActivityLocation'

/**
 * Contact type values for ContactPoint schema
 */
export const CONTACT_TYPE_CUSTOMER_SERVICE = 'customer service'
export const CONTACT_TYPE_TECHNICAL_SUPPORT = 'technical support'
export const CONTACT_TYPE_BILLING_SUPPORT = 'billing support'
export const CONTACT_TYPE_SALES = 'sales'
export const CONTACT_TYPE_RESERVATIONS = 'reservations'
export const CONTACT_TYPE_EMERGENCY = 'emergency'

/**
 * Day of week values for OpeningHoursSpecification
 */
export const DAY_MONDAY = 'https://schema.org/Monday'
export const DAY_TUESDAY = 'https://schema.org/Tuesday'
export const DAY_WEDNESDAY = 'https://schema.org/Wednesday'
export const DAY_THURSDAY = 'https://schema.org/Thursday'
export const DAY_FRIDAY = 'https://schema.org/Friday'
export const DAY_SATURDAY = 'https://schema.org/Saturday'
export const DAY_SUNDAY = 'https://schema.org/Sunday'

/**
 * Default values for common properties
 */
export const DEFAULT_IMAGE_WIDTH = 1200
export const DEFAULT_IMAGE_HEIGHT = 630
export const DEFAULT_LOCALE = 'en-US'
export const DEFAULT_CURRENCY = 'USD'

/**
 * Robots meta tag values
 */
export const ROBOTS_INDEX = 'index'
export const ROBOTS_NOINDEX = 'noindex'
export const ROBOTS_FOLLOW = 'follow'
export const ROBOTS_NOFOLLOW = 'nofollow'
export const ROBOTS_NOARCHIVE = 'noarchive'
export const ROBOTS_NOSNIPPET = 'nosnippet'
export const ROBOTS_NOIMAGEINDEX = 'noimageindex'
export const ROBOTS_NOTRANSLATE = 'notranslate'

/**
 * Twitter card types
 */
export const TWITTER_CARD_SUMMARY = 'summary'
export const TWITTER_CARD_SUMMARY_LARGE_IMAGE = 'summary_large_image'
export const TWITTER_CARD_APP = 'app'
export const TWITTER_CARD_PLAYER = 'player'

/**
 * Open Graph types
 */
export const OG_TYPE_WEBSITE = 'website'
export const OG_TYPE_ARTICLE = 'article'
export const OG_TYPE_BOOK = 'book'
export const OG_TYPE_PROFILE = 'profile'
export const OG_TYPE_VIDEO_MOVIE = 'video.movie'
export const OG_TYPE_VIDEO_EPISODE = 'video.episode'
export const OG_TYPE_VIDEO_TV_SHOW = 'video.tv_show'
export const OG_TYPE_VIDEO_OTHER = 'video.other'
export const OG_TYPE_MUSIC_SONG = 'music.song'
export const OG_TYPE_MUSIC_ALBUM = 'music.album'
export const OG_TYPE_MUSIC_PLAYLIST = 'music.playlist'
export const OG_TYPE_MUSIC_RADIO_STATION = 'music.radio_station'

/**
 * Search input encoding
 */
export const SEARCH_INPUT_ENCODING = 'required name=search_term_string'
