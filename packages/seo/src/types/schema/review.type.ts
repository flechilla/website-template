export type ReviewRating = {
    ratingValue: number
    bestRating?: number
    worstRating?: number
}

export type ReviewSchemaProps = {
    author: string
    datePublished: string
    reviewBody?: string
    itemReviewed?: { name: string; url?: string }
    reviewRating?: ReviewRating
}
