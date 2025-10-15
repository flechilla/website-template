/**
 * ArticleSchemaProps
 */

export type ArticleSchemaProps = {
    type?: 'Article' | 'BlogPosting'
    headline: string
    description?: string
    author: string | { name: string; url?: string }
    datePublished: string
    dateModified?: string
    image?: string | string[]
    mainEntityOfPage?: string
    publisher?: {
        name: string
        logo?: string
        url?: string
    }
}
