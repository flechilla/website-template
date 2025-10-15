export type ProductOffer = {
    price: number
    priceCurrency: string
    availability?: string
    url?: string
}

export type ProductAggregateRating = {
    ratingValue: number
    reviewCount?: number
}

export type ProductSchemaProps = {
    name: string
    description?: string
    sku?: string
    brand?: string
    image?: string | string[]
    url?: string
    offers?: ProductOffer | ProductOffer[]
    aggregateRating?: ProductAggregateRating
}
