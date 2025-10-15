/**
 * OrganizationSchemaProps
 */

export type OrganizationSchemaProps = {
    name: string
    url: string
    logo?: string
    legalName?: string
    foundingDate?: string
    founders?: string[]
    address?: {
        streetAddress?: string
        addressLocality?: string
        addressRegion?: string
        postalCode?: string
        addressCountry?: string
    }
    contactPoint?: Array<{
        contactType: string
        telephone?: string
        email?: string
        areaServed?: string
        availableLanguage?: string[]
    }>
    sameAs?: string[]
}
