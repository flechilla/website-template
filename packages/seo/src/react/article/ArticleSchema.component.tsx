import type { Article, BlogPosting, WithContext } from 'schema-dts'

import { buildArticleJsonLd } from '../../schemas/article.schema'
import type { ArticleSchemaProps } from '../../types/schema'
import { JsonLd } from '../JsonLd.component'

export function ArticleSchema(props: ArticleSchemaProps) {
    const data: WithContext<Article | BlogPosting> = buildArticleJsonLd(props)
    return <JsonLd data={data} />
}
