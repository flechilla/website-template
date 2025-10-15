export type BreadcrumbItem = {
    name: string
    item: string
    position?: number
}

export type BreadcrumbSchemaProps = {
    items: BreadcrumbItem[]
}
